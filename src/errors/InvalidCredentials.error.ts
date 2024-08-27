export class InvalidCredentialsError extends Error {
  public code: number;
  constructor(name: string) {
    super(`Invalid Credentials: ${name}`);
    this.name = `InvalidCredentialsError`;
    this.code = 401;
  }
}
