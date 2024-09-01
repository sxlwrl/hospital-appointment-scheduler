import {
  DateValidation,
  NumberValidation,
  TimeValidation,
} from '../../utils/validationDecorators';
import { IsOptional } from 'class-validator';

/**
 * Base appointment DTO
 */

interface BaseAppointmentDto {
  patient_id: number;
  doctor_id: number;
  specialization_id: number;
  appointment_date: string;
  appointment_time: string;
  duration: number;
}

/**
 * DTO for appointment creation
 */

export class CreateAppointmentDto implements Required<BaseAppointmentDto> {
  @NumberValidation() patient_id: number;
  @NumberValidation() doctor_id: number;
  @NumberValidation() specialization_id: number;
  @DateValidation() appointment_date: string;
  @TimeValidation() appointment_time: string;
  @NumberValidation() duration: number;

  constructor(data: {
    patient_id: number;
    doctor_id: number;
    specialization_id: number;
    appointment_date: string;
    appointment_time: string;
    duration: number;
  }) {
    this.patient_id = data.patient_id;
    this.doctor_id = data.doctor_id;
    this.specialization_id = data.specialization_id;
    this.appointment_date = data.appointment_date;
    this.appointment_time = data.appointment_time;
    this.duration = data.duration;
  }
}

/**
 * DTO for updating appointment data
 */

export class UpdateAppointmentDto implements Partial<BaseAppointmentDto> {
  @NumberValidation()
  @IsOptional()
  patient_id: number;

  @NumberValidation()
  @IsOptional()
  doctor_id: number;

  @NumberValidation()
  @IsOptional()
  specialization_id: number;

  @DateValidation()
  @IsOptional()
  appointment_date: string;

  @TimeValidation()
  @IsOptional()
  appointment_time: string;

  @NumberValidation()
  @IsOptional()
  duration: number;

  constructor(data: {
    patient_id: number;
    doctor_id: number;
    specialization_id: number;
    appointment_date: string;
    appointment_time: string;
    duration: number;
  }) {
    this.patient_id = data.patient_id;
    this.doctor_id = data.doctor_id;
    this.specialization_id = data.specialization_id;
    this.appointment_date = data.appointment_date;
    this.appointment_time = data.appointment_time;
    this.duration = data.duration;
  }
}
