import { Pool } from 'pg';
import { Doctor } from './doctor.model';
import { CreateDoctorDto, UpdateDoctorDto } from './doctor.dto';
import { executeQuery } from '../../utils/executeQuery';

export class DoctorRepository {
  constructor(private readonly pool: Pool) {}

  async findById(id: number): Promise<Doctor | null> {
    return this.findByData('id', id);
  }

  async findAll(): Promise<Doctor[]> {
    const query = `SELECT * FROM doctors`;
    const queryResult = await executeQuery(this.pool, query);
    return queryResult.rows.map(this.mapToDoctor);
  }

  async create(data: CreateDoctorDto): Promise<Doctor> {
    const query = `INSERT INTO doctors (first_name, last_name, specialization_id) VALUES ($1, $2, $3) RETURNING *`;
    const result = await executeQuery(this.pool, query, [
      data.firstName,
      data.lastName,
      data.specialization_id,
    ]);
    return this.mapToDoctor(result.rows[0]);
  }

  async update(id: number, data: UpdateDoctorDto): Promise<Doctor> {
    const fields = [];
    const values = [];

    if (data.firstName) {
      fields.push('first_name = $' + (fields.length + 1));
      values.push(data.firstName);
    }

    if (data.lastName) {
      fields.push('last_name = $' + (fields.length + 1));
      values.push(data.lastName);
    }

    if (data.specialization_id) {
      fields.push('specialization_id = $' + (fields.length + 1));
      values.push(String(data.specialization_id));
    }

    const query = `UPDATE doctors SET ${fields.join(', ')} WHERE id = ${id} RETURNING *`;

    const result = await executeQuery(this.pool, query, values);
    return this.mapToDoctor(result.rows[0]);
  }

  async delete(id: number): Promise<void> {
    const query = 'DELETE FROM doctors WHERE id = $1';
    await executeQuery(this.pool, query, [id]);
  }

  private async findByData(field: string, value: any): Promise<Doctor | null> {
    const query = `SELECT * FROM doctors WHERE ${field} = $1`;
    const result = await executeQuery(this.pool, query, [value]);
    return result.rowCount ? this.mapToDoctor(result.rows[0]) : null;
  }

  private mapToDoctor(row: any): Doctor {
    if (!row) throw new Error('Cannot map to doctor');
    return new Doctor(
      row.id,
      row.first_name,
      row.last_name,
      row.specialization_id,
    );
  }
}
