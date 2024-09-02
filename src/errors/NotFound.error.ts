export class NotFoundError extends Error {
  public code: number;
  constructor(message?: string) {
    super(message);
    this.code = 404;
  }
}
