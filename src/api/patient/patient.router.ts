import { Router } from 'express';
import { Pool } from 'pg';
import { PatientService } from './patient.service';
import { PatientRepository } from './patient.repository';
import { PatientController } from './patient.controller';
import { canModify, isAuthenticated } from '../../middlewares/auth.middleware';

export class PatientRouter {
  public router: Router;
  private readonly patientService;
  private readonly patientController;

  constructor(private readonly pool: Pool) {
    this.router = Router();
    this.patientService = new PatientService(new PatientRepository(this.pool));
    this.patientController = new PatientController(this.patientService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * Get By ID
     */

    this.router.get(
      '/:id',
      isAuthenticated,
      this.patientController.getById.bind(this.patientController),
    );

    /**
     * Get All
     */

    this.router.get(
      '/',
      isAuthenticated,
      this.patientController.getAll.bind(this.patientController),
    );

    /**
     * Update
     */

    this.router.patch(
      '/:id',
      isAuthenticated,
      canModify,
      this.patientController.update.bind(this.patientController),
    );

    /**
     * Delete
     */

    this.router.delete(
      '/:id',
      isAuthenticated,
      canModify,
      this.patientController.delete.bind(this.patientController),
    );
  }
}
