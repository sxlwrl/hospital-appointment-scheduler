export class AlreadyExistsError extends Error {
  constructor(name: string) {
    super(`${name} already exists`);
    this.name = `${name}AlreadyExistsError`;
  }
}
