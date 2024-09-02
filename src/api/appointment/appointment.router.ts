import { Router } from 'express';
import { Pool } from 'pg';
import { isAuthenticated } from '../../middlewares/auth.middleware';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from './appointment.repository';
import { PatientRepository } from '../patient/patient.repository';
import { DoctorRepository } from '../doctor/doctor.repository';
import { SpecializationRepository } from '../specialization/specialization.repository';

export class AppointmentRouter {
  public router: Router;
  private readonly appointmentService;
  private readonly appointmentController;

  constructor(private readonly pool: Pool) {
    this.router = Router();
    this.appointmentService = new AppointmentService(
      new AppointmentRepository(this.pool),
      new PatientRepository(this.pool),
      new DoctorRepository(this.pool),
      new SpecializationRepository(this.pool),
    );
    this.appointmentController = new AppointmentController(
      this.appointmentService,
    );
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * Get By ID
     */

    this.router.get(
      '/:id',
      isAuthenticated,
      this.appointmentController.getById.bind(this.appointmentController),
    );

    /**
     * Get All
     */

    this.router.get(
      '/',
      isAuthenticated,
      this.appointmentController.getAll.bind(this.appointmentController),
    );

    /**
     * Create
     */

    this.router.post(
      '/',
      isAuthenticated,
      this.appointmentController.create.bind(this.appointmentController),
    );

    /**
     * Update
     */

    this.router.patch(
      '/:id',
      isAuthenticated,
      this.appointmentController.update.bind(this.appointmentController),
    );

    /**
     * Delete
     */

    this.router.delete(
      '/:id',
      isAuthenticated,
      this.appointmentController.delete.bind(this.appointmentController),
    );
  }
}
