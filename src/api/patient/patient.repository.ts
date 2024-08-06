import { Pool, QueryResult } from 'pg';
import { Patient } from './patient.model';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';

export class PatientRepository {
  constructor(private readonly pool: Pool) {}

  async findById(id: number): Promise<Patient | null> {
    return this.findByData('id', id);
  }

  async findByUsername(username: string): Promise<Patient | null> {
    return this.findByData('username', username);
  }

  async findByEmail(email: string): Promise<Patient | null> {
    return this.findByData('email', email);
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

    const queryResult = await this.executeQuery(query, values);
    return this.mapToPatient(queryResult.rows[0]);
  }

  // async update(data: UpdatePatientDto): Promise<Patient> {}

  // async delete(id: number): Promise<void> {}

  private async findByData(field: string, value: any): Promise<Patient | null> {
    const query = `SELECT * FROM patients WHERE ${field} = $1`;
    const values = [value];
    const result = await this.executeQuery(query, values);
    return result.rowCount ? this.mapToPatient(result.rows[0]) : null;
  }

  private async executeQuery(
    query: string,
    values: any[],
  ): Promise<QueryResult> {
    try {
      return await this.pool.query(query, values);
    } catch (err) {
      // TODO refactor this part
      if (err instanceof Error) throw new Error(err.message);
      else throw err;
    }
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
