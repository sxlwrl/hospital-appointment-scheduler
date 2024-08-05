export class Patient {
  constructor(
    public id: number,
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public passwordHash: string,
  ) {}
}
