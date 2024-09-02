import {
  CreateSpecializationDto,
  UpdateSpecializationDto,
} from '../specialization.dto';
import { Specialization } from '../specialization.model';

/**
 * An interface of specialization service
 */

export interface ISpecializationService {
  findById(id: number): Promise<Specialization>;
  findAll(): Promise<Specialization[]>;
  createSpecialization(data: CreateSpecializationDto): Promise<Specialization>;
  updateSpecialization(
    id: number,
    data: UpdateSpecializationDto,
  ): Promise<Specialization>;
  deleteSpecialization(id: number): Promise<void>;
}
