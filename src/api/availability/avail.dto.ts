import {
  DateValidation,
  NumberValidation,
  TimeValidation,
} from '../../utils/validationDecorators';
import { IsOptional } from 'class-validator';

/**
 * Base availability DTO
 */

interface BaseAvailabilityDto {
  doctor_id: number;
  available_date: string;
  available_time: string;
  duration: number;
}

/**
 * DTO for availability creation
 */

export class CreateAvailDto implements Required<BaseAvailabilityDto> {
  @NumberValidation() doctor_id: number;
  @DateValidation() available_date: string;
  @TimeValidation() available_time: string;
  @NumberValidation() duration: number;

  constructor({
    doctor_id,
    available_date,
    available_time,
    duration,
  }: {
    doctor_id: number;
    available_date: string;
    available_time: string;
    duration: number;
  }) {
    this.doctor_id = doctor_id;
    this.available_date = available_date;
    this.available_time = available_time;
    this.duration = duration;
  }
}

/**
 * DTO for updating availability data
 */

export class UpdateAvailDto implements Partial<BaseAvailabilityDto> {
  @NumberValidation()
  @IsOptional()
  doctor_id: number;

  @DateValidation()
  @IsOptional()
  available_date: string;

  @TimeValidation()
  @IsOptional()
  available_time: string;

  @NumberValidation()
  @IsOptional()
  duration: number;

  constructor({
    doctor_id,
    available_date,
    available_time,
    duration,
  }: {
    doctor_id: number;
    available_date: string;
    available_time: string;
    duration: number;
  }) {
    this.doctor_id = doctor_id;
    this.available_date = available_date;
    this.available_time = available_time;
    this.duration = duration;
  }
}
