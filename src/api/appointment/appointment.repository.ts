import { Pool, QueryResult } from 'pg';
import { Appointment } from './appointment.model';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';
import { UpdateAvailDto } from '../availability/avail.dto';
import { Availability } from '../availability/avail.model';

export class AppointmentRepository {
  constructor(private readonly pool: Pool) {}

  async findById(id: number): Promise<Appointment | null> {
    return this.findByData('id', id);
  }

  async findAll(): Promise<Appointment[]> {
    const query = 'SELECT * FROM appointments';
    const queryResult = await this.executeQuery(query);
    return queryResult.rows.map(this.mapToAppointment);
  }

  async create(data: CreateAppointmentDto): Promise<Appointment> {
    const availableSlot = await this.executeQuery(
      `SELECT * FROM availability WHERE doctor_id = $1 AND available_date = $2 AND available_time = $3 AND duration >= $4`,
      [
        data.doctor_id,
        data.appointment_date,
        data.appointment_time,
        data.duration,
      ],
    );

    if (availableSlot.rows.length === 0) {
      throw new Error('No available slot for the given date and time');
    }

    const query = `INSERT INTO appointments (patient_id, doctor_id, specialization_id, appointment_date, appointment_time, duration) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const result = await this.executeQuery(query, [
      data.patient_id,
      data.doctor_id,
      data.specialization_id,
      data.appointment_date,
      data.appointment_time,
      data.duration,
    ]);

    return this.mapToAppointment(result.rows[0]);
  }

  async update(id: number, data: UpdateAppointmentDto): Promise<Appointment> {
    const fields = [];
    const values = [];

    if (data.patient_id) {
      fields.push('patient_id = $' + (fields.length + 1));
      values.push(String(data.patient_id));
    }

    if (data.doctor_id) {
      fields.push('doctor_id = $' + (fields.length + 1));
      values.push(String(data.doctor_id));
    }

    if (data.specialization_id) {
      fields.push('specialization_id = $' + (fields.length + 1));
      values.push(String(data.specialization_id));
    }

    if (data.appointment_date) {
      fields.push('appointment_date = $' + (fields.length + 1));
      values.push(String(data.appointment_date));
    }

    if (data.appointment_time) {
      fields.push('appointment_time = $' + (fields.length + 1));
      values.push(String(data.appointment_time));
    }
    if (data.duration) {
      fields.push('duration = $' + (fields.length + 1));
      values.push(String(data.duration));
    }

    const query = `UPDATE appointments SET ${fields.join(', ')} WHERE id = ${id} RETURNING *`;

    const result = await this.executeQuery(query, values);
    return this.mapToAppointment(result.rows[0]);
  }

  async delete(id: number): Promise<void> {
    const query = 'DELETE FROM appointments WHERE id = $1';
    await this.executeQuery(query, [id]);
  }

  private async findByData(
    field: string,
    value: any,
  ): Promise<Appointment | null> {
    const query = `SELECT * FROM appointments WHERE ${field} = $1`;
    const result = await this.executeQuery(query, [value]);
    return result.rowCount ? this.mapToAppointment(result.rows[0]) : null;
  }

  private async executeQuery(
    query: string,
    values?: any[],
  ): Promise<QueryResult> {
    try {
      return values
        ? await this.pool.query(query, values)
        : await this.pool.query(query);
    } catch (error) {
      throw new Error('Cannot execute query');
    }
  }

  private mapToAppointment(row: any): Appointment {
    if (!row) throw new Error('Cannot map to appointment');
    return new Appointment(
      row.id,
      row.patient_id,
      row.doctor_id,
      row.specialization_id,
      row.appointment_date,
      row.appointment_time,
      row.duration,
    );
  }
}
