import dotenv from 'dotenv';
import { join } from 'path';
import { IAvailRepository } from './interfaces/IAvailRepository';
import { CreateAvailDto, UpdateAvailDto } from './avail.dto';
import { IDoctorRepository } from '../doctor/interfaces/IDoctorRepository';
import { NotFoundError } from '../../errors/NotFound.error';

dotenv.config({ path: join(__dirname, '../../../.env') });

/**
 * Availability service
 */

export class AvailService {
  constructor(
    private readonly availabilityRepository: IAvailRepository,
    private readonly doctorRepository: IDoctorRepository,
  ) {}

  async findById(id: number) {
    const availability = await this.availabilityRepository.findById(id);

    if (!availability)
      throw new NotFoundError('Availability with described id doesnt exist');

    return availability;
  }

  async findAll() {
    return await this.availabilityRepository.findAll();
  }

  async createAvail(data: CreateAvailDto) {
    const doctor = await this.doctorRepository.findById(data.doctor_id);

    if (!doctor)
      throw new NotFoundError('Doctor with described id doesnt exist');

    return await this.availabilityRepository.create(data);
  }

  async updateAvail(id: number, data: UpdateAvailDto) {
    await this.findById(id);

    const doctor = await this.doctorRepository.findById(data.doctor_id);

    if (!doctor)
      throw new NotFoundError('Doctor with described id doesnt exist');

    return await this.availabilityRepository.update(id, data);
  }

  async deleteAvail(id: number) {
    await this.findById(id);
    await this.availabilityRepository.delete(id);
  }
}
