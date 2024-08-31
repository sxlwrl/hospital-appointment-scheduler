import {
  FirstNameValidation,
  LastNameValidation,
  IdValidation,
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
  @IdValidation() specialization_id: number;

  constructor({
    firstName,
    lastName,
    specialization_id,
  }: {
    firstName: string;
    lastName: string;
    specialization_id: number;
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.specialization_id = specialization_id;
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

  @IdValidation()
  @IsOptional()
  specialization_id: number;

  constructor({
    firstName,
    lastName,
    specialization_id,
  }: {
    firstName: string;
    lastName: string;
    specialization_id: number;
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.specialization_id = specialization_id;
  }
}
