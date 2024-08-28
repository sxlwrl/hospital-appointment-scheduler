import { Pool, QueryResult } from 'pg';
import { Specialization } from './specialization.model';
import {
  CreateSpecializationDto,
  UpdateSpecializationDto,
} from './specialization.dto';

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
    const queryResult = await this.executeQuery(query);
    return queryResult.rows.map(this.mapToSpecialization);
  }

  async create(data: CreateSpecializationDto): Promise<Specialization> {
    const query = `INSERT INTO specializations (title) VALUES ($1) RETURNING *`;
    const result = await this.executeQuery(query, [data.title]);
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

    const result = await this.executeQuery(query, values);
    return this.mapToSpecialization(result.rows[0]);
  }

  async delete(id: number): Promise<void> {
    const query = 'DELETE FROM specializations WHERE id = $1';
    await this.executeQuery(query, [id]);
  }

  private async findByData(
    field: string,
    value: any,
  ): Promise<Specialization | null> {
    const query = `SELECT * FROM specializations WHERE ${field} = $1`;
    const result = await this.executeQuery(query, [value]);
    return result.rowCount ? this.mapToSpecialization(result.rows[0]) : null;
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

  private mapToSpecialization(row: any): Specialization {
    if (!row) throw new Error('Cannot map to specialization');
    return new Specialization(row.id, row.title);
  }
}
