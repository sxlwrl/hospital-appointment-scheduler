import dotenv from 'dotenv';
import { join } from 'path';
import { IDoctorRepository } from './interfaces/IDoctorRepository';
import { NotFoundError } from '../../errors/NotFound.error';
import { CreateDoctorDto, UpdateDoctorDto } from './doctor.dto';

dotenv.config({ path: join(__dirname, '../../../.env') });

/**
 * Doctor service
 */

export class DoctorService {
  constructor(private readonly doctorRepository: IDoctorRepository) {}

  async findById(id: number) {
    const doctor = await this.doctorRepository.findById(id);

    if (!doctor) {
      throw new NotFoundError('doctor');
    }

    return doctor;
  }

  async findAll() {
    return await this.doctorRepository.findAll();
  }

  async createDoctor(data: CreateDoctorDto) {
    return await this.doctorRepository.create(data);
  }

  async updateDoctor(id: number, data: UpdateDoctorDto) {
    await this.findById(id);
    return await this.doctorRepository.update(id, data);
  }

  async deleteDoctor(id: number) {
    await this.findById(id);
    await this.doctorRepository.delete(id);
  }
}
