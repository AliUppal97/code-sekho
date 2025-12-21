import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { env } from '@/server/config/env';
import { handleStripeWebhook } from '@/server/modules/payments/service';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

const stripe = env.STRIPE_SECRET_KEY
  ? new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    })
  : null;

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    if (!stripe || !env.STRIPE_WEBHOOK_SECRET) {
      return jsonResponse({ error: 'Stripe webhook not configured' }, 400);
    }

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return jsonResponse({ error: 'Missing signature' }, 400);
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
    } catch (error: any) {
      return jsonResponse({ error: `Webhook signature verification failed: ${error.message}` }, 400);
    }

    await handleStripeWebhook(event);

    return jsonResponse({ received: true }, 200);
  });
}


