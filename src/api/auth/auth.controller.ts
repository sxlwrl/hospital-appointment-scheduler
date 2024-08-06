import { Request, Response } from 'express';
import { LoginDto, RegisterDto } from './auth.dto';
import { validate } from 'class-validator';
import { IAuthService } from './interfaces/IAuthService';

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

  async register(req: Request, res: Response): Promise<Response | undefined> {
    const registerDto = new RegisterDto(req.body);
    Object.assign(registerDto, req.body);

    const errors = await validate(registerDto);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      const patient = await this.authService.register(req.body);
      return res.status(201).json(patient);
    } catch (error) {
      // TODO refactor this part
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<Response | undefined> {
    const loginDto = new LoginDto(req.body);
    Object.assign(loginDto, req.body);

    const errors = await validate(loginDto);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      const { accessToken, refreshToken } = await this.authService.login(
        req.body,
      );

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 36000,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 432000000,
      });

      return res.status(200).json({ message: 'User logged in' });
    } catch (error) {
      // TODO refactor this part
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<Response | undefined> {
    const { refreshToken } = req.cookies;

    try {
      const newRefreshToken = await this.authService.refreshToken(refreshToken);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 432000000,
      });

      return res.status(200).json(newRefreshToken);
    } catch (error) {
      // TODO refactor this part
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  }
}
