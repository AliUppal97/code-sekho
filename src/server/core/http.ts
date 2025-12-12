import { NextResponse } from 'next/server';

import type { ApiResponse } from '@/types';

import { logger } from '../logger';
import { AppError } from './errors';

export function jsonResponse<T>(data: T, init?: number | ResponseInit, message?: string) {
  const initOptions = typeof init === 'number' ? { status: init } : init;
  return NextResponse.json<ApiResponse<T>>(
    { success: true, data, message },
    initOptions,
  );
}

export function errorResponse(error: unknown) {
  const normalized = normalizeError(error);
  logger.error(
    {
      code: normalized.code,
      status: normalized.status,
      details: normalized.details,
      stack: normalized.stack,
    },
    normalized.message,
  );

  return NextResponse.json<ApiResponse<null>>(
    {
      success: false,
      data: null,
      error: {
        code: normalized.code,
        message: normalized.message,
        details: normalized.details,
      },
    },
    { status: normalized.status },
  );
}

export async function withErrorHandling<T>(
  handler: () => Promise<NextResponse<ApiResponse<T>>> | NextResponse<ApiResponse<T>>,
) {
  try {
    return await handler();
  } catch (error) {
    return errorResponse(error);
  }
}

function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError({
      message: error.message || 'Internal server error',
      status: 500,
      code: 'INTERNAL_ERROR',
      cause: error,
    });
  }

  return new AppError({
    message: 'Internal server error',
    status: 500,
    code: 'INTERNAL_ERROR',
  });
}


