import { IAvailService } from './interfaces/IAvailService';
import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { CreateAvailDto, UpdateAvailDto } from './avail.dto';
import { validate } from 'class-validator';

/**
 * Availability controller
 */

export class AvailController {
  constructor(private readonly availabilityService: IAvailService) {}

  /**
   * Get by ID implementation
   * @param req - request
   * @param res - response
   */

  async getById(req: Request, res: Response): Promise<Response> {
    const availId = parseInt(req.params.id, 10);

    try {
      const availability = await this.availabilityService.findById(availId);
      return res.status(200).json({ availability: availability });
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * Get All implementation
   * @param req - request
   * @param res - response
   */

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const availabilities = await this.availabilityService.findAll();
      return res.status(200).json({ availabilities: availabilities });
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * Create implementation
   * @param req - request
   * @param res - response
   */

  async create(req: Request, res: Response): Promise<Response> {
    const createAvailabilityDto = new CreateAvailDto(req.body);

    const errors = await validate(createAvailabilityDto);

    if (errors.length > 0) return res.status(400).json(errors);

    try {
      const createdAvailability = await this.availabilityService.createAvail(
        req.body,
      );

      return res.status(201).json(createdAvailability);
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * Update implementation
   * @param req - request
   * @param res - response
   */

  async update(req: Request, res: Response): Promise<Response> {
    const availId = parseInt(req.params.id, 10);

    const updateAvailabilityDto = new UpdateAvailDto(req.body);

    const errors = await validate(updateAvailabilityDto);

    if (errors.length > 0) return res.status(400).json(errors);

    try {
      const updatedAvail = await this.availabilityService.updateAvail(
        availId,
        req.body,
      );

      return res.status(200).json(updatedAvail);
    } catch (error) {
      return handleError(res, error);
    }
  }

  /**
   * Delete implementation
   * @param req - request
   * @param res - response
   */

  async delete(req: Request, res: Response): Promise<Response> {
    const availId = parseInt(req.params.id, 10);

    try {
      await this.availabilityService.deleteAvail(availId);
      return res.status(204).json({ message: 'Availability deleted' });
    } catch (error) {
      return handleError(res, error);
    }
  }
}
