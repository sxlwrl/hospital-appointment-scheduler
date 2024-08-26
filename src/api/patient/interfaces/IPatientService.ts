import { Patient } from '../patient.model';
import { UpdatePatientDto } from '../patient.dto';

/**
 * An interface of patient service
 */

export interface IPatientService {
  findById(id: number): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
  updatePatient(id: number, data: UpdatePatientDto): Promise<Patient>;
  deletePatient(id: number): Promise<void>;
}
