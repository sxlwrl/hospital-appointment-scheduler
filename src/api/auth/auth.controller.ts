import { Request, Response } from 'express';
import { RegisterDto } from './auth.dto';
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
}
