import { CreateAvailDto, UpdateAvailDto } from '../avail.dto';
import { Availability } from '../avail.model';

/**
 * An interface of availability service
 */

export interface IAvailService {
  findById(id: number): Promise<Availability>;
  findAll(): Promise<Availability[]>;
  createAvail(data: CreateAvailDto): Promise<Availability>;
  updateAvail(id: number, data: UpdateAvailDto): Promise<Availability>;
  deleteAvail(id: number): Promise<void>;
}
