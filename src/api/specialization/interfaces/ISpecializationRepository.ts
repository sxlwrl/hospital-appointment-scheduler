import {
  CreateSpecializationDto,
  UpdateSpecializationDto,
} from '../specialization.dto';
import { Specialization } from '../specialization.model';

/**
 * An interface of specialization repository
 */

export interface ISpecializationRepository {
  findById(id: number): Promise<Specialization | null>;
  findByTitle(title: string): Promise<Specialization | null>;
  findAll(): Promise<Specialization[]>;
  create(data: CreateSpecializationDto): Promise<Specialization>;
  update(id: number, data: UpdateSpecializationDto): Promise<Specialization>;
  delete(id: number): Promise<void>;
}
