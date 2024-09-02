import { Pool } from 'pg';
import { Specialization } from './specialization.model';
import {
  CreateSpecializationDto,
  UpdateSpecializationDto,
} from './specialization.dto';
import { executeQuery } from '../../utils/executeQuery';

export class SpecializationRepository {
  constructor(private readonly pool: Pool) {}

  async findById(id: number): Promise<Specialization | null> {
    return this.findByData('id', id);
  }

  async findByTitle(title: string): Promise<Specialization | null> {
    return this.findByData('title', title);
  }

  async findAll(): Promise<Specialization[]> {
    const query = `SELECT * FROM specializations`;
    const queryResult = await executeQuery(this.pool, query);
    return queryResult.rows.map(this.mapToSpecialization);
  }

  async create(data: CreateSpecializationDto): Promise<Specialization> {
    const query = `INSERT INTO specializations (title) VALUES ($1) RETURNING *`;
    const result = await executeQuery(this.pool, query, [data.title]);
    return this.mapToSpecialization(result.rows[0]);
  }

  async update(
    id: number,
    data: UpdateSpecializationDto,
  ): Promise<Specialization> {
    const fields = [];
    const values = [];

    if (data.title) {
      fields.push('title = $' + (fields.length + 1));
      values.push(data.title);
    }

    const query = `UPDATE specializations SET ${fields.join(', ')} WHERE id = ${id} RETURNING *`;

    const result = await executeQuery(this.pool, query, values);
    return this.mapToSpecialization(result.rows[0]);
  }

  async delete(id: number): Promise<void> {
    const query = 'DELETE FROM specializations WHERE id = $1';
    await executeQuery(this.pool, query, [id]);
  }

  private async findByData(
    field: string,
    value: any,
  ): Promise<Specialization | null> {
    const query = `SELECT * FROM specializations WHERE ${field} = $1`;
    const result = await executeQuery(this.pool, query, [value]);
    return result.rowCount ? this.mapToSpecialization(result.rows[0]) : null;
  }

  private mapToSpecialization(row: any): Specialization {
    if (!row) throw new Error('Cannot map to specialization');
    return new Specialization(row.id, row.title);
  }
}
