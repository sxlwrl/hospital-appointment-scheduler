import { Pool } from 'pg';
import { Patient } from './patient.model';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';
import { executeQuery } from '../../utils/executeQuery';
import { findByData } from '../../utils/findByData';

export class PatientRepository {
  constructor(private readonly pool: Pool) {}

  async findById(id: number): Promise<Patient | null> {
    return findByData(this.pool, 'patients', 'id', id, this.mapToPatient);
  }

  async findByUsername(username: string): Promise<Patient | null> {
    return findByData(
      this.pool,
      'patients',
      'username',
      username,
      this.mapToPatient,
    );
  }

  async findByEmail(email: string): Promise<Patient | null> {
    return findByData(this.pool, 'patients', 'email', email, this.mapToPatient);
  }

  async findAll(): Promise<Patient[]> {
    const query = `SELECT * FROM patients`;
    const queryResult = await executeQuery(this.pool, query);
    return queryResult.rows.map(this.mapToPatient);
  }

  async create(data: CreatePatientDto): Promise<Patient> {
    const query = `INSERT INTO patients (username, first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [
      data.username,
      data.firstName,
      data.lastName,
      data.email,
      data.password,
    ];

    const result = await executeQuery(this.pool, query, values);
    return this.mapToPatient(result.rows[0]);
  }

  async update(id: number, data: UpdatePatientDto): Promise<Patient> {
    const fields = [];
    const values = [];

    if (data.username) {
      fields.push('username = $' + (fields.length + 1));
      values.push(data.username);
    }
    if (data.firstName) {
      fields.push('first_name = $' + (fields.length + 1));
      values.push(data.firstName);
    }
    if (data.lastName) {
      fields.push('last_name = $' + (fields.length + 1));
      values.push(data.lastName);
    }
    if (data.email) {
      fields.push('email = $' + (fields.length + 1));
      values.push(data.email);
    }
    if (data.password) {
      fields.push('password_hash = $' + (fields.length + 1));
      values.push(data.password);
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const query = `UPDATE patients SET ${fields.join(', ')} WHERE id = ${id} RETURNING *`;

    const result = await executeQuery(this.pool, query, values);
    return this.mapToPatient(result.rows[0]);
  }

  async delete(id: number): Promise<void> {
    const query = 'DELETE FROM patients WHERE id = $1';
    await executeQuery(this.pool, query, [id]);
  }

  private mapToPatient(row: any): Patient {
    if (!row) throw new Error('Cannot map to patient');
    return new Patient(
      row.id,
      row.username,
      row.first_name,
      row.last_name,
      row.email,
      row.password_hash,
    );
  }
}
