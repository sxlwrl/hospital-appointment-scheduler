import { CreatePatientDto, UpdatePatientDto } from '../patient.dto';
import { Patient } from '../patient.model';

/**
 * An interface of patient repository
 */

export interface IPatientRepository {
  findById(id: number): Promise<Patient | null>;
  findByUsername(username: string): Promise<Patient | null>;
  findByEmail(email: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
  create(data: CreatePatientDto): Promise<Patient>;
  update(id: number, data: UpdatePatientDto): Promise<Patient>;
  delete(id: number): Promise<void>;
}
