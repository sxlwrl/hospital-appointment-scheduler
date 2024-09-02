import dotenv from 'dotenv';
import { join } from 'path';
import { IDoctorRepository } from './interfaces/IDoctorRepository';
import { NotFoundError } from '../../errors/NotFound.error';
import { CreateDoctorDto, UpdateDoctorDto } from './doctor.dto';
import { ISpecializationRepository } from '../specialization/interfaces/ISpecializationRepository';

dotenv.config({ path: join(__dirname, '../../../.env') });

/**
 * Doctor service
 */

export class DoctorService {
  constructor(
    private readonly doctorRepository: IDoctorRepository,
    private readonly specializationRepository: ISpecializationRepository,
  ) {}

  async findById(id: number) {
    const doctor = await this.doctorRepository.findById(id);

    if (!doctor)
      throw new NotFoundError('Doctor with described id doesnt exist');

    return doctor;
  }

  async findAll() {
    return await this.doctorRepository.findAll();
  }

  async createDoctor(data: CreateDoctorDto) {
    const specialization = await this.specializationRepository.findById(
      data.specialization_id,
    );

    if (!specialization)
      throw new NotFoundError('Specialization with described id doesnt exist');

    return await this.doctorRepository.create(data);
  }

  async updateDoctor(id: number, data: UpdateDoctorDto) {
    await this.findById(id);

    const specialization = await this.specializationRepository.findById(
      data.specialization_id,
    );

    if (!specialization)
      throw new NotFoundError('Specialization with described id doesnt exist');

    return await this.doctorRepository.update(id, data);
  }

  async deleteDoctor(id: number) {
    await this.findById(id);
    await this.doctorRepository.delete(id);
  }
}
