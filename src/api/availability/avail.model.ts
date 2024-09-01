/**
 * Availability model
 */

export class Availability {
  constructor(
    public id: number,
    public doctor_id: number,
    public available_date: Date,
    public available_time: string,
    public duration: number, // in minutes
  ) {}
}
