export class InvalidCredentialsError extends Error {
  public code: number;
  constructor(message?: string) {
    super(message);
    this.name = `InvalidCredentialsError`;
    this.code = 401;
  }
}
