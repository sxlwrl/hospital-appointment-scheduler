import {
  UsernameValidation,
  PasswordValidation,
} from '../../utils/validationDecorators';
import { CreatePatientDto } from '../patient/patient.dto';

/**
 * DTO for patient registration
 */

export class RegisterDto extends CreatePatientDto {}

/**
 * DTO for patient login
 */

export class LoginDto {
  @UsernameValidation() username: string;
  @PasswordValidation() password: string;

  constructor({ username, password }: Record<string, string>) {
    this.username = username;
    this.password = password;
  }
}
