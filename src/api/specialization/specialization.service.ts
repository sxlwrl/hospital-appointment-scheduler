import dotenv from 'dotenv';
import { join } from 'path';
import { ISpecializationRepository } from './interfaces/ISpecializationRepository';
import { NotFoundError } from '../../errors/NotFound.error';
import {
  CreateSpecializationDto,
  UpdateSpecializationDto,
} from './specialization.dto';
import { AlreadyExistsError } from '../../errors/AlreadyExists.error';

dotenv.config({ path: join(__dirname, '../../../.env') });

/**
 * Specialization service
 */

export class SpecializationService {
  constructor(
    private readonly specializationRepository: ISpecializationRepository,
  ) {}

  async findById(id: number) {
    const specialization = await this.specializationRepository.findById(id);

    if (!specialization) {
      throw new NotFoundError('specialization');
    }

    return specialization;
  }

  async findAll() {
    return await this.specializationRepository.findAll();
  }

  async createSpecialization(data: CreateSpecializationDto) {
    const { title } = data;

    const isTitleTaken = await this.specializationRepository.findByTitle(title);

    if (isTitleTaken) {
      throw new AlreadyExistsError('specialization');
    }

    return await this.specializationRepository.create(data);
  }

  async updateSpecialization(id: number, data: UpdateSpecializationDto) {
    await this.findById(id);
    return await this.specializationRepository.update(id, data);
  }

  async deleteSpecialization(id: number) {
    await this.findById(id);
    await this.specializationRepository.delete(id);
  }
}
