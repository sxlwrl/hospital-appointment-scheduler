import { Router } from 'express';
import { Pool } from 'pg';
import { isAuthenticated } from '../../middlewares/auth.middleware';
import { DoctorService } from './doctor.service';
import { DoctorRepository } from './doctor.repository';
import { DoctorController } from './doctor.controller';

export class DoctorRouter {
  public router: Router;
  private readonly doctorService;
  private readonly doctorController;

  constructor(private readonly pool: Pool) {
    this.router = Router();
    this.doctorService = new DoctorService(new DoctorRepository(this.pool));
    this.doctorController = new DoctorController(this.doctorService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * Get By ID
     */

    this.router.get(
      '/:id',
      isAuthenticated,
      this.doctorController.getById.bind(this.doctorController),
    );

    /**
     * Get All
     */

    this.router.get(
      '/',
      isAuthenticated,
      this.doctorController.getAll.bind(this.doctorController),
    );

    /**
     * Create
     */

    this.router.post(
      '/',
      isAuthenticated,
      this.doctorController.create.bind(this.doctorController),
    );

    /**
     * Update
     */

    this.router.patch(
      '/:id',
      isAuthenticated,
      this.doctorController.update.bind(this.doctorController),
    );

    /**
     * Delete
     */

    this.router.delete(
      '/:id',
      isAuthenticated,
      this.doctorController.delete.bind(this.doctorController),
    );
  }
}
