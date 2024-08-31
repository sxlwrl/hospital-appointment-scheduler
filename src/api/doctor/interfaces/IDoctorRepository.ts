import { CreateDoctorDto, UpdateDoctorDto } from '../doctor.dto';
import { Doctor } from '../doctor.model';

/**
 * An interface of doctor repository
 */

export interface IDoctorRepository {
  findById(id: number): Promise<Doctor | null>;
  findAll(): Promise<Doctor[]>;
  create(data: CreateDoctorDto): Promise<Doctor>;
  update(id: number, data: UpdateDoctorDto): Promise<Doctor>;
  delete(id: number): Promise<void>;
}
