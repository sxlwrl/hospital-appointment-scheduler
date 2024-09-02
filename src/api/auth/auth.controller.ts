import { Request, Response } from 'express';
import { LoginDto, RegisterDto } from './auth.dto';
import { validate } from 'class-validator';
import { IAuthService } from './interfaces/IAuthService';
import { handleError } from '../../utils/handleError';

/**
 * Auth controller
 */

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  /**
   * Register implementation
   * @param req - request
   * @param res - response
   */

  async register(req: Request, res: Response): Promise<Response> {
    const registerDto = new RegisterDto(req.body);

    const errors = await validate(registerDto);

    if (errors.length > 0) return res.status(400).json({ errors });

    try {
      const patient = await this.authService.register(req.body);
      return res.status(201).json(patient);
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * Login implementation
   * @param req - request
   * @param res - response
   */

  async login(req: Request, res: Response): Promise<Response> {
    const loginDto = new LoginDto(req.body);
    const errors = await validate(loginDto);

    if (errors.length > 0) return res.status(400).json({ errors });

    try {
      const { accessToken, refreshToken } = await this.authService.login(
        req.body,
      );

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 604800000,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 86000000,
      });

      return res.status(200).json({ message: 'Patient logged in' });
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * Refresh token implementation
   * @param req - request
   * @param res - response
   */

  async refreshToken(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.cookies;

    try {
      const newRefreshToken = await this.authService.refreshToken(refreshToken);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 86000000,
      });

      return res.status(200).json(newRefreshToken);
    } catch (error) {
      return handleError(res, error);
    }
  }
}
