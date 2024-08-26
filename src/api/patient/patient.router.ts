import { Router } from 'express';
import { Pool } from 'pg';
import { PatientService } from './patient.service';
import { PatientRepository } from './patient.repository';
import { PatientController } from './patient.controller';

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
    this.router.get(
      '/:id',
      this.patientController.getById.bind(this.patientController),
    );
    this.router.get(
      '/',
      this.patientController.getAll.bind(this.patientController),
    );
    this.router.patch(
      '/:id',
      this.patientController.update.bind(this.patientController),
    );
    this.router.delete(
      '/:id',
      this.patientController.delete.bind(this.patientController),
    );
  }
}
