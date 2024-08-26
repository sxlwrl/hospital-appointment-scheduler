export class AlreadyExistsError extends Error {
  public code: number;
  constructor(name: string) {
    super(`${name} already exists`);
    this.name = `${name}AlreadyExistsError`;
    this.code = 409;
  }
}
