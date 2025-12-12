export type ErrorDetails = Record<string, string | number | boolean | null | undefined>;

export class AppError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: ErrorDetails;

  constructor(options: { message: string; status?: number; code?: string; details?: ErrorDetails; cause?: unknown }) {
    super(options.message);
    this.name = 'AppError';
    this.status = options.status ?? 500;
    this.code = options.code ?? 'INTERNAL_ERROR';
    this.details = options.details;
    if (options.cause) {
      // @ts-expect-error Error.cause is available in modern runtimes
      this.cause = options.cause;
    }
  }

  static badRequest(message: string, details?: ErrorDetails) {
    return new AppError({ message, status: 400, code: 'BAD_REQUEST', details });
  }

  static unauthorized(message = 'Unauthorized') {
    return new AppError({ message, status: 401, code: 'UNAUTHORIZED' });
  }

  static forbidden(message = 'Forbidden') {
    return new AppError({ message, status: 403, code: 'FORBIDDEN' });
  }

  static notFound(message = 'Not Found') {
    return new AppError({ message, status: 404, code: 'NOT_FOUND' });
  }
}




