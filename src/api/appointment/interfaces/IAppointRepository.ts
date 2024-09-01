import { Appointment } from '../appointment.model';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../appointment.dto';

/**
 * An interface of appointment repository
 */

export interface IAppointRepository {
  findById(id: number): Promise<Appointment | null>;
  findAll(): Promise<Appointment[]>;
  create(data: CreateAppointmentDto): Promise<Appointment>;
  update(id: number, data: UpdateAppointmentDto): Promise<Appointment>;
  delete(id: number): Promise<void>;
}
