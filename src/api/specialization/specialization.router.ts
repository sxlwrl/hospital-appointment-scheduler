import { Router } from 'express';
import { Pool } from 'pg';
import { isAuthenticated } from '../../middlewares/auth.middleware';
import { SpecializationService } from './specialization.service';
import { SpecializationController } from './specialization.controller';
import { SpecializationRepository } from './specialization.repository';

export class SpecializationRouter {
  public router: Router;
  private readonly specializationService;
  private readonly specializationController;

  constructor(private readonly pool: Pool) {
    this.router = Router();
    this.specializationService = new SpecializationService(
      new SpecializationRepository(this.pool),
    );
    this.specializationController = new SpecializationController(
      this.specializationService,
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
      this.specializationController.getById.bind(this.specializationController),
    );

    /**
     * Get All
     */

    this.router.get(
      '/',
      isAuthenticated,
      this.specializationController.getAll.bind(this.specializationController),
    );

    /**
     * Create
     */

    this.router.post(
      '/',
      isAuthenticated,
      this.specializationController.create.bind(this.specializationController),
    );

    /**
     * Update
     */

    this.router.patch(
      '/:id',
      isAuthenticated,
      this.specializationController.update.bind(this.specializationController),
    );

    /**
     * Delete
     */

    this.router.delete(
      '/:id',
      isAuthenticated,
      this.specializationController.delete.bind(this.specializationController),
    );
  }
}
