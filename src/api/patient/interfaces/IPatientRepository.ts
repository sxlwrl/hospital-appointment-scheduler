import { CreatePatientDto, UpdatePatientDto } from '../patient.dto';
import { Patient } from '../patient.model';

export interface IPatientRepository {
  findById(id: number): Promise<Patient | null>;
  findByUsername(username: string): Promise<Patient | null>;
  create(data: CreatePatientDto): Promise<Patient>;
  update(data: UpdatePatientDto): Promise<Patient>;
  delete(id: number): Promise<void>;
}
