export class InvalidCredentialsError extends Error {
  constructor(name: string) {
    super(`Invalid Credentials: ${name}`);
    this.name = `InvalidCredentialsError`;
  }
}
