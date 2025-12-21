// ============================================================================
// Payments Service
// Enterprise-grade payment processing with Stripe
// ============================================================================

import Stripe from 'stripe';
import { db } from '../../db/client';
import { AppError } from '../../core/errors';
import { env } from '../../config/env';
import type { CreatePaymentIntentInput, PaymentQuery } from './schema';
import { Prisma } from '@prisma/client';

const stripe = env.STRIPE_SECRET_KEY
  ? new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    })
  : null;

export interface PaymentListResult {
  data: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function createPaymentIntent(
  input: CreatePaymentIntentInput,
  userId: string,
): Promise<any> {
  if (!stripe) {
    throw AppError.badRequest('Stripe is not configured');
  }

  // Check if course exists
  const course = await db.course.findUnique({
    where: { id: input.courseId },
  });

  if (!course) {
    throw AppError.notFound('Course not found');
  }

  if (!course.isPublished) {
    throw AppError.badRequest('Course is not published');
  }

  // Check if already enrolled
  const existingEnrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: input.courseId,
      },
    },
  });

  if (existingEnrollment) {
    throw AppError.badRequest('Already enrolled in this course');
  }

  // Check if there's a pending payment
  const pendingPayment = await db.payment.findFirst({
    where: {
      userId,
      courseId: input.courseId,
      status: 'PENDING',
    },
  });

  if (pendingPayment) {
    // Return existing payment intent
    if (pendingPayment.stripePaymentId) {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          pendingPayment.stripePaymentId,
        );
        return {
          clientSecret: paymentIntent.client_secret,
          paymentId: pendingPayment.id,
        };
      } catch {
        // Payment intent not found, create new one
      }
    }
  }

  // Calculate amount (use discount price if available)
  const amount = course.discountPrice || course.price;
  const amountInCents = Math.round(Number(amount) * 100);

  // Create Stripe payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    metadata: {
      userId,
      courseId: input.courseId,
    },
  });

  // Create payment record
  const payment = await db.payment.create({
    data: {
      userId,
      courseId: input.courseId,
      amount: amount,
      currency: 'USD',
      status: 'PENDING',
      stripePaymentId: paymentIntent.id,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentId: payment.id,
  };
}

export async function handleStripeWebhook(
  event: Stripe.Event,
): Promise<void> {
  if (!stripe) {
    throw AppError.badRequest('Stripe is not configured');
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentSuccess(paymentIntent.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentFailure(paymentIntent.id);
      break;
    }

    default:
      // Unhandled event type
      break;
  }
}

async function handlePaymentSuccess(stripePaymentId: string): Promise<void> {
  const payment = await db.payment.findUnique({
    where: { stripePaymentId },
    include: {
      user: true,
      course: true,
    },
  });

  if (!payment) {
    return;
  }

  // Update payment status
  await db.payment.update({
    where: { id: payment.id },
    data: {
      status: 'COMPLETED',
    },
  });

  // Create enrollment if courseId exists
  if (payment.courseId) {
    // Check if already enrolled
    const existingEnrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: payment.userId,
          courseId: payment.courseId,
        },
      },
    });

    if (!existingEnrollment) {
      // Create enrollment
      await db.enrollment.create({
        data: {
          userId: payment.userId,
          courseId: payment.courseId,
          progress: 0,
          completed: false,
        },
      });

      // Create course progress
      await db.courseProgress.create({
        data: {
          userId: payment.userId,
          courseId: payment.courseId,
          progress: 0,
        },
      });

      // Update course enrollment count
      await db.course.update({
        where: { id: payment.courseId },
        data: {
          enrollmentCount: {
            increment: 1,
          },
        },
      });
    }
  }
}

async function handlePaymentFailure(stripePaymentId: string): Promise<void> {
  const payment = await db.payment.findUnique({
    where: { stripePaymentId },
  });

  if (!payment) {
    return;
  }

  await db.payment.update({
    where: { id: payment.id },
    data: {
      status: 'FAILED',
    },
  });
}

export async function listPayments(params: PaymentQuery, userId?: string): Promise<PaymentListResult> {
  const { page, limit, status } = params;

  const where: Prisma.PaymentWhereInput = {};

  if (userId) {
    where.userId = userId;
  }

  if (status) {
    where.status = status;
  }

  const total = await db.payment.count({ where });

  const payments = await db.payment.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    data: payments.map((payment) => ({
      ...payment,
      amount: Number(payment.amount),
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getPaymentById(id: string, userId?: string): Promise<any> {
  const where: any = { id };

  if (userId) {
    where.userId = userId;
  }

  const payment = await db.payment.findFirst({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  if (!payment) {
    throw AppError.notFound('Payment not found');
  }

  return {
    ...payment,
    amount: Number(payment.amount),
  };
}


