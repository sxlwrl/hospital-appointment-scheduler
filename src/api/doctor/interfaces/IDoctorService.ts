import { CreateDoctorDto, UpdateDoctorDto } from '../doctor.dto';
import { Doctor } from '../doctor.model';

/**
 * An interface of doctor service
 */

export interface IDoctorService {
  findById(id: number): Promise<Doctor>;
  findAll(): Promise<Doctor[]>;
  createDoctor(data: CreateDoctorDto): Promise<Doctor>;
  updateDoctor(id: number, data: UpdateDoctorDto): Promise<Doctor>;
  deleteDoctor(id: number): Promise<void>;
}
