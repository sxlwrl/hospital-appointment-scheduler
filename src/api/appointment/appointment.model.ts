/**
 * Appointment model
 */

export class Appointment {
  constructor(
    public id: number,
    public patient_id: number,
    public doctor_id: number,
    public specialization_id: number,
    public appointment_date: Date,
    public appointment_time: string,
    public duration: number, // in minutes
  ) {}
}
