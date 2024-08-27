import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { join } from 'path';

import { LoginDto, RegisterDto } from './auth.dto';
import { IPatientRepository } from '../patient/interfaces/IPatientRepository';
import { generateToken, verifyToken } from '../../utils/jwt';

import { AlreadyExistsError } from '../../errors/AlreadyExists.error';
import { NotFoundError } from '../../errors/NotFound.error';
import { InvalidCredentialsError } from '../../errors/InvalidCredentials.error';

dotenv.config({ path: join(__dirname, '../../../.env') });

/**
 * Auth service
 */

export class AuthService {
  constructor(private readonly patientRepository: IPatientRepository) {}

  /**
   * Register method
   */

  async register(data: RegisterDto) {
    const { username, firstName, lastName, email, password } = data;

    const isUsernameTaken =
      await this.patientRepository.findByUsername(username);

    const isEmailTaken = await this.patientRepository.findByEmail(email);

    if (isUsernameTaken) {
      throw new AlreadyExistsError('user');
    }

    if (isEmailTaken) {
      throw new AlreadyExistsError('user');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.patientRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  /**
   * Login method
   */

  async login(data: LoginDto) {
    const { username, password } = data;
    const user = await this.patientRepository.findByUsername(username);

    if (!user) {
      throw new NotFoundError('user');
    }

    const comparedPassword = await bcrypt.compare(password, user.passwordHash);

    if (!comparedPassword) {
      throw new InvalidCredentialsError('password');
    }

    const accessToken = generateToken(
      { userId: user.id, role: 'patient' },
      Number(process.env.ACCESS_TOKEN_EXPIRESIN),
      'HS384',
    );

    const refreshToken = generateToken(
      { userId: user.id },
      Number(process.env.REFRESH_TOKEN_EXPIRESIN),
      'HS384',
    );

    return { accessToken, refreshToken };
  }

  /**
   * Refresh token method
   */

  async refreshToken(refreshToken: string) {
    if (!verifyToken(refreshToken)) {
      throw new InvalidCredentialsError('token');
    }

    const payload = JSON.parse(
      Buffer.from(refreshToken.split('.')[1], 'base64').toString(),
    );

    return generateToken(
      { userId: payload.userId },
      Number(process.env.REFRESH_TOKEN_EXPIRESIN),
      'HS384',
    );
  }
}
