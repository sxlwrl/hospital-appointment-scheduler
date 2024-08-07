export class NotFoundError extends Error {
  constructor(name: string) {
    super(`${name} is not found`);
    this.name = `NotFoundError`;
  }
}
