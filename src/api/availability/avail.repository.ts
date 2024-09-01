import { Pool, QueryResult } from 'pg';
import { Availability } from './avail.model';
import { CreateAvailDto, UpdateAvailDto } from './avail.dto';

export class AvailRepository {
  constructor(private readonly pool: Pool) {}

  async findById(id: number): Promise<Availability | null> {
    return this.findByData('id', id);
  }

  async findAll(): Promise<Availability[]> {
    const query = 'SELECT * FROM availability';
    const queryResult = await this.executeQuery(query);
    return queryResult.rows.map(this.mapToAvailability);
  }

  async create(data: CreateAvailDto): Promise<Availability> {
    const query = `INSERT INTO availability (doctor_id, available_date, available_time, duration) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await this.executeQuery(query, [
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

    const result = await this.executeQuery(query, values);
    return this.mapToAvailability(result.rows[0]);
  }

  async delete(id: number): Promise<void> {
    const query = 'DELETE FROM availability WHERE id = $1';
    await this.executeQuery(query, [id]);
  }

  private async findByData(
    field: string,
    value: any,
  ): Promise<Availability | null> {
    const query = `SELECT * FROM availability WHERE ${field} = $1`;
    const result = await this.executeQuery(query, [value]);
    return result.rowCount ? this.mapToAvailability(result.rows[0]) : null;
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
