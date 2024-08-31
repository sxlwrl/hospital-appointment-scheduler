import { IDoctorService } from './interfaces/IDoctorService';
import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { CreateDoctorDto, UpdateDoctorDto } from './doctor.dto';
import { validate } from 'class-validator';

export class DoctorController {
  constructor(private readonly doctorService: IDoctorService) {}

  async getById(req: Request, res: Response): Promise<Response> {
    const doctorId = parseInt(req.params.id, 10);

    try {
      const doctor = await this.doctorService.findById(doctorId);
      return res.status(200).json({ doctor: doctor });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const doctors = await this.doctorService.findAll();
      return res.status(200).json({ doctors: doctors });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    const createDoctorDto = new CreateDoctorDto(req.body);

    const errors = await validate(createDoctorDto);

    if (errors.length > 0) return res.status(400).json(errors);

    try {
      const createdDoctor = await this.doctorService.createDoctor(req.body);

      return res.status(201).json(createdDoctor);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const doctorId = parseInt(req.params.id, 10);

    const updateDoctorDto = new UpdateDoctorDto(req.body);

    const errors = await validate(updateDoctorDto);

    if (errors.length > 0) return res.status(400).json(errors);

    try {
      const updatedDoctor = await this.doctorService.updateDoctor(
        doctorId,
        req.body,
      );

      return res.status(200).json(updatedDoctor);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const doctorId = parseInt(req.params.id, 10);

    try {
      await this.doctorService.deleteDoctor(doctorId);
      return res.status(204).json({ message: 'Doctor deleted' });
    } catch (error) {
      return handleError(res, error);
    }
  }
}
