import { Pool } from 'pg';
import { Availability } from './avail.model';
import { CreateAvailDto, UpdateAvailDto } from './avail.dto';
import { executeQuery } from '../../utils/executeQuery';
import { findByData } from '../../utils/findByData';

export class AvailRepository {
  constructor(private readonly pool: Pool) {}

  async findById(id: number): Promise<Availability | null> {
    return findByData<Availability>(
      this.pool,
      'availability',
      'id',
      id,
      this.mapToAvailability,
    );
  }

  async findAll(): Promise<Availability[]> {
    const query = 'SELECT * FROM availability';
    const queryResult = await executeQuery(this.pool, query);
    return queryResult.rows.map(this.mapToAvailability);
  }

  async create(data: CreateAvailDto): Promise<Availability> {
    const query = `INSERT INTO availability (doctor_id, available_date, available_time, duration) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await executeQuery(this.pool, query, [
      data.doctor_id,
      data.available_date,
      data.available_time,
      data.duration,
    ]);

    return this.mapToAvailability(result.rows[0]);
  }

  async update(id: number, data: UpdateAvailDto): Promise<Availability> {
    const fields = [];
    const values = [];

    if (data.doctor_id) {
      fields.push('doctor_id = $' + (fields.length + 1));
      values.push(String(data.doctor_id));
    }

    if (data.available_date) {
      fields.push('available_date = $' + (fields.length + 1));
      values.push(String(data.available_date));
    }

    if (data.doctor_id) {
      fields.push('available_time = $' + (fields.length + 1));
      values.push(String(data.available_time));
    }

    if (data.duration) {
      fields.push('duration = $' + (fields.length + 1));
      values.push(String(data.duration));
    }

    const query = `UPDATE availability SET ${fields.join(', ')} WHERE id = ${id} RETURNING *`;

    const result = await executeQuery(this.pool, query, values);
    return this.mapToAvailability(result.rows[0]);
  }

  async delete(id: number): Promise<void> {
    const query = 'DELETE FROM availability WHERE id = $1';
    await executeQuery(this.pool, query, [id]);
  }

  private mapToAvailability(row: any): Availability {
    if (!row) throw new Error('Cannot map to availability');
    return new Availability(
      row.id,
      row.doctor_id,
      row.available_date,
      row.available_time,
      row.duration,
    );
  }
}
