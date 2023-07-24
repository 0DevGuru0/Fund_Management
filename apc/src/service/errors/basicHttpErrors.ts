/* eslint-disable max-classes-per-file */
import { makeHttpError } from './HttpError';

export class BadRequestError extends makeHttpError(400) {}
export class UnauthorizedError extends makeHttpError(401) {}
export class ForbiddenError extends makeHttpError(403) {}
export class NotFoundError extends makeHttpError(404) {}
export class DuplicateContent extends makeHttpError(409) {}
export class InternalServerError extends makeHttpError(500) {}
export class InvalidTokenError extends makeHttpError(498) {}
export class TokenRequiredError extends makeHttpError(499) {}
