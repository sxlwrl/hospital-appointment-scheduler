/**
 * Patient model
 */

export class Patient {
  constructor(
    public id: number,
    public username: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public password_hash: string,
  ) {}
}
