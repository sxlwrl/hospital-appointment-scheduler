import { IPatientRepository } from './interfaces/IPatientRepository';
import { UpdatePatientDto } from './patient.dto';
import { join } from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { NotFoundError } from '../../errors/NotFound.error';

dotenv.config({ path: join(__dirname, '../../../.env') });

/**
 * Patient service
 */

export class PatientService {
  constructor(private readonly patientRepository: IPatientRepository) {}

  async findById(id: number) {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new NotFoundError('patient');
    }

    return patient;
  }

  async findAll() {
    return await this.patientRepository.findAll();
  }

  async updatePatient(id: number, data: UpdatePatientDto) {
    const patient = await this.findById(id);

    const hashedPassword = data.password
      ? await bcrypt.hash(data.password, 10)
      : patient.passwordHash;

    return await this.patientRepository.update(id, {
      ...data,
      password: hashedPassword,
    });
  }

  async deletePatient(id: number) {
    await this.findById(id);
    await this.patientRepository.delete(id);
  }
}
