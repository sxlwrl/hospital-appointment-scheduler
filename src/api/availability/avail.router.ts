import { Router } from 'express';
import { Pool } from 'pg';
import { isAuthenticated } from '../../middlewares/auth.middleware';
import { AvailService } from './avail.service';
import { AvailRepository } from './avail.repository';
import { AvailController } from './avail.controller';
import { DoctorRepository } from '../doctor/doctor.repository';

export class AvailRouter {
  public router: Router;
  private readonly availabilityService;
  private readonly availabilityController;

  constructor(private readonly pool: Pool) {
    this.router = Router();
    this.availabilityService = new AvailService(
      new AvailRepository(this.pool),
      new DoctorRepository(this.pool),
    );
    this.availabilityController = new AvailController(this.availabilityService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * Get By ID
     */

    this.router.get(
      '/:id',
      isAuthenticated,
      this.availabilityController.getById.bind(this.availabilityController),
    );

    /**
     * Get All
     */

    this.router.get(
      '/',
      isAuthenticated,
      this.availabilityController.getAll.bind(this.availabilityController),
    );

    /**
     * Create
     */

    this.router.post(
      '/',
      isAuthenticated,
      this.availabilityController.create.bind(this.availabilityController),
    );

    /**
     * Update
     */

    this.router.patch(
      '/:id',
      isAuthenticated,
      this.availabilityController.update.bind(this.availabilityController),
    );

    /**
     * Delete
     */

    this.router.delete(
      '/:id',
      isAuthenticated,
      this.availabilityController.delete.bind(this.availabilityController),
    );
  }
}
