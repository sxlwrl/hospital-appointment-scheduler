import {
  IsOptional,
} from 'class-validator';

import {
  EmailValidation,
  FirstNameValidation,
  LastNameValidation,
  PasswordValidation,
  UsernameValidation,
} from '../../utils/validationDecorators';

/**
 * Base patient DTO
 */

interface BasePatientDto {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * DTO for patient creation
 */

export class CreatePatientDto implements Required<BasePatientDto> {
  @UsernameValidation() username: string;
  @FirstNameValidation() firstName: string;
  @LastNameValidation() lastName: string;
  @EmailValidation() email: string;
  @PasswordValidation() password: string;

  constructor({
    username,
    firstName,
    lastName,
    email,
    password,
  }: Record<string, string>) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

/**
 * DTO for updating patient data
 */

export class UpdatePatientDto implements Partial<BasePatientDto> {
  @UsernameValidation()
  @IsOptional()
  username: string;

  @FirstNameValidation()
  @IsOptional()
  firstName: string;

  @LastNameValidation()
  @IsOptional()
  lastName: string;

  @EmailValidation()
  @IsOptional()
  email: string;

  @PasswordValidation()
  @IsOptional()
  password: string;

  constructor({
    username,
    firstName,
    lastName,
    email,
    password,
  }: Record<string, string>) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
