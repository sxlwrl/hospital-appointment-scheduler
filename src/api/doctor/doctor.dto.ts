import {
  FirstNameValidation,
  LastNameValidation,
  NumberValidation,
} from '../../utils/validationDecorators';
import { IsOptional } from 'class-validator';

/**
 * Base doctor DTO
 */

interface BaseDoctorDto {
  firstName: string;
  lastName: string;
  specialization_id: number;
}

/**
 * DTO for doctor creation
 */

export class CreateDoctorDto implements Required<BaseDoctorDto> {
  @FirstNameValidation() firstName: string;
  @LastNameValidation() lastName: string;
  @NumberValidation() specialization_id: number;

  constructor(data: {
    firstName: string;
    lastName: string;
    specialization_id: number;
  }) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.specialization_id = data.specialization_id;
  }
}

/**
 * DTO for updating doctors data
 */

export class UpdateDoctorDto implements Partial<BaseDoctorDto> {
  @FirstNameValidation()
  @IsOptional()
  firstName: string;

  @LastNameValidation()
  @IsOptional()
  lastName: string;

  @NumberValidation()
  @IsOptional()
  specialization_id: number;

  constructor(data: {
    firstName: string;
    lastName: string;
    specialization_id: number;
  }) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.specialization_id = data.specialization_id;
  }
}
