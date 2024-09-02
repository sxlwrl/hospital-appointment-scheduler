export class AlreadyExistsError extends Error {
  public code: number;
  constructor(message?: string) {
    super(message);
    this.name = `AlreadyExistsError`;
    this.code = 409;
  }
}
