import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { Database } from 'better-sqlite3';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Invalid input',
      errors: error.errors,
    });
  }

  if (error instanceof Database.SqliteError) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({
        message: 'Database constraint violation',
      });
    }
  }

  res.status(500).json({
    message: 'Internal server error',
  });
}