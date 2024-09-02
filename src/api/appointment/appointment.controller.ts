import { IAppointService } from './interfaces/IAppointService';
import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';
import { validate } from 'class-validator';

export class AppointmentController {
  constructor(private readonly appointmentService: IAppointService) {}

  /**
   * Get by ID implementation
   * @param req - request
   * @param res - response
   */

  async getById(req: Request, res: Response): Promise<Response> {
    const appointmentId = parseInt(req.params.id, 10);

    try {
      const appointment = await this.appointmentService.findById(appointmentId);
      return res.status(200).json({ appointment: appointment });
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
      const appointments = await this.appointmentService.findAll();
      return res.status(200).json({ appointments: appointments });
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
    const createAppointmentDto = new CreateAppointmentDto(req.body);

    const errors = await validate(createAppointmentDto);

    if (errors.length > 0) return res.status(400).json(errors);

    try {
      const createdAppointment =
        await this.appointmentService.createAppointment(req.body);

      return res.status(201).json(createdAppointment);
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
    const appointmentId = parseInt(req.params.id, 10);

    const updateAppointmentDto = new UpdateAppointmentDto(req.body);

    const errors = await validate(updateAppointmentDto);

    if (errors.length > 0) return res.status(400).json(errors);

    try {
      const updatedAppointment =
        await this.appointmentService.updateAppointment(
          appointmentId,
          req.body,
        );

      return res.status(200).json(updatedAppointment);
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
    const appointmentId = parseInt(req.params.id, 10);

    try {
      await this.appointmentService.deleteAppointment(appointmentId);
      return res.status(204).json({ message: 'Appointment deleted' });
    } catch (error) {
      return handleError(res, error);
    }
  }
}
