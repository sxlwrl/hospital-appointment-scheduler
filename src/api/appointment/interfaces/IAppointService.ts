import { Appointment } from '../appointment.model';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../appointment.dto';

/**
 * An interface of appointment service
 */

export interface IAppointService {
  findById(id: number): Promise<Appointment>;
  findAll(): Promise<Appointment[]>;
  createAppointment(data: CreateAppointmentDto): Promise<Appointment>;
  updateAppointment(
    id: number,
    data: UpdateAppointmentDto,
  ): Promise<Appointment>;
  deleteAppointment(id: number): Promise<void>;
}
