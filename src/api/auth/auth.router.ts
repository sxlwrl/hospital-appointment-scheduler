import { Router } from 'express';
import { Pool } from 'pg';
import { AuthService } from './auth.service';
import { PatientRepository } from '../patient/patient.repository';
import { AuthController } from './auth.controller';

export class AuthRouter {
  public router: Router;
  private readonly authService;
  private readonly authController;

  constructor(private readonly pool: Pool) {
    this.router = Router();
    this.authService = new AuthService(new PatientRepository(this.pool));
    this.authController = new AuthController(this.authService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/auth/register',
      this.authController.register.bind(this.authController),
    );
    this.router.post(
      '/auth/login',
      this.authController.login.bind(this.authController),
    );
    this.router.post(
      '/auth/refresh',
      this.authController.refreshToken.bind(this.authController),
    );
  }
}
