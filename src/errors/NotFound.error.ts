export class NotFoundError extends Error {
  public code: number;
  constructor(name: string) {
    super(`${name} is not found`);
    this.name = `NotFoundError`;
    this.code = 404;
  }
}
