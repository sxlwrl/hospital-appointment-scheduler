/**
 * Doctor model
 */

export class Doctor {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public specialization_id: number,
  ) {}
}