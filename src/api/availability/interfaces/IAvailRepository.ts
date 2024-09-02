import { Availability } from '../avail.model';
import { CreateAvailDto, UpdateAvailDto } from '../avail.dto';

/**
 * An interface of availability repository
 */

export interface IAvailRepository {
  findById(id: number): Promise<Availability | null>;
  findAll(): Promise<Availability[]>;
  create(data: CreateAvailDto): Promise<Availability>;
  update(id: number, data: UpdateAvailDto): Promise<Availability>;
  delete(id: number): Promise<void>;
}
