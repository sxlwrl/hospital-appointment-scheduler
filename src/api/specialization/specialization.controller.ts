import { Request, Response } from 'express';
import { ISpecializationService } from './interfaces/ISpecializationService';
import { handleError } from '../../utils/handleError';
import {
  CreateSpecializationDto,
  UpdateSpecializationDto,
} from './specialization.dto';
import { validate } from 'class-validator';

export class SpecializationController {
  constructor(private readonly specializationService: ISpecializationService) {}

  async getById(req: Request, res: Response): Promise<Response> {
    const specId = parseInt(req.params.id, 10);

    try {
      const specialization = await this.specializationService.findById(specId);
      return res.status(200).json({ specialization: specialization });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const specializations = await this.specializationService.findAll();
      return res.status(200).json({ specializations: specializations });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    const createSpecializationDto = new CreateSpecializationDto(req.body);

    const errors = await validate(createSpecializationDto);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      const createdSpecialization =
        await this.specializationService.createSpecialization(req.body);

      return res.status(201).json(createdSpecialization);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const specId = parseInt(req.params.id, 10);

    const updateSpecializationDto = new UpdateSpecializationDto(req.body);

    const errors = await validate(updateSpecializationDto);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      const updatedSpecialization =
        await this.specializationService.updateSpecialization(specId, req.body);

      return res.status(200).json(updatedSpecialization);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const specId = parseInt(req.params.id, 10);

    try {
      await this.specializationService.deleteSpecialization(specId);
      return res.status(204).json({ message: 'Specialization deleted' });
    } catch (error) {
      return handleError(res, error);
    }
  }
}
