import { LoginDto, RegisterDto } from '../auth.dto';
import { Patient } from '../../patient/patient.model';

/**
 * An interface of auth service
 */

export interface IAuthService {
  register(data: RegisterDto): Promise<Patient>;
  login(data: LoginDto): Promise<Record<string, string>>;
  refreshToken(refreshToken: string): Promise<string>;
}
