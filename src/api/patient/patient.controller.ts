import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { IPatientService } from './interfaces/IPatientService';
import { UpdatePatientDto } from './patient.dto';
import { handleError } from '../../utils/handleError';

/**
 * Patient controller
 */

export class PatientController {
  constructor(private readonly patientService: IPatientService) {}

  /**
   * Get by ID implementation
   * @param req - request
   * @param res - response
   */

  async getById(req: Request, res: Response): Promise<Response> {
    const patientId = parseInt(req.params.id, 10);

    try {
      const patient = await this.patientService.findById(patientId);
      return res.status(200).json({ patient: patient });
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
      const patients = await this.patientService.findAll();
      return res.status(200).json({ patients: patients });
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
    const patientId = parseInt(req.params.id, 10);

    const updatePatientDto = new UpdatePatientDto(req.body);

    const errors = await validate(updatePatientDto);

    if (errors.length > 0) return res.status(400).json(errors);

    try {
      const updatedPatient = await this.patientService.updatePatient(
        patientId,
        req.body,
      );
      return res.status(200).json(updatedPatient);
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
    const patientId = parseInt(req.params.id, 10);

    try {
      await this.patientService.deletePatient(patientId);
      return res.status(204).json({ message: 'Patient deleted' });
    } catch (error) {
      return handleError(res, error);
    }
  }
}
