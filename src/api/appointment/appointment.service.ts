import dotenv from 'dotenv';
import { join } from 'path';
import { IDoctorRepository } from '../doctor/interfaces/IDoctorRepository';
import { IPatientRepository } from '../patient/interfaces/IPatientRepository';
import { ISpecializationRepository } from '../specialization/interfaces/ISpecializationRepository';
import { IAppointRepository } from './interfaces/IAppointRepository';
import { NotFoundError } from '../../errors/NotFound.error';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';

dotenv.config({ path: join(__dirname, '../../../.env') });

/**
 * Appointment service
 */

export class AppointmentService {
  constructor(
    private readonly appointmentRepository: IAppointRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly doctorRepository: IDoctorRepository,
    private readonly specializationRepository: ISpecializationRepository,
  ) {}

  async findById(id: number) {
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment)
      throw new NotFoundError('Appointment with described id doesnt exist');

    return appointment;
  }

  async findAll() {
    return this.appointmentRepository.findAll();
  }

  async createAppointment(data: CreateAppointmentDto) {
    const patient = await this.patientRepository.findById(data.patient_id);

    if (!patient)
      throw new NotFoundError('Patient with described id doesnt exist');

    const doctor = await this.doctorRepository.findById(data.doctor_id);

    if (!doctor)
      throw new NotFoundError('Doctor with described id doesnt exist');

    const specialization = await this.specializationRepository.findById(
      data.specialization_id,
    );

    if (!specialization)
      throw new NotFoundError('Specialization with described id doesnt exist');

    return await this.appointmentRepository.create(data);
  }

  async updateAppointment(id: number, data: UpdateAppointmentDto) {
    await this.findById(id);

    const patient = await this.patientRepository.findById(data.patient_id);

    if (!patient)
      throw new NotFoundError('Patient with described id doesnt exist');

    const doctor = await this.doctorRepository.findById(data.doctor_id);

    if (!doctor)
      throw new NotFoundError('Doctor with described id doesnt exist');

    const specialization = await this.specializationRepository.findById(
      data.specialization_id,
    );

    if (!specialization)
      throw new NotFoundError('Specialization with described id doesnt exist');

    return await this.appointmentRepository.update(id, data);
  }

  async deleteAppointment(id: number) {
    await this.findById(id);
    await this.appointmentRepository.delete(id);
  }
}
