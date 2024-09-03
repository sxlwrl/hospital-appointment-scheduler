import { Request, Response } from 'express';
import { DoctorController } from '../doctor.controller';
import { IDoctorService } from '../interfaces/IDoctorService';
import { handleError } from '../../../utils/handleError';
import { validate } from 'class-validator';
import { CreateDoctorDto, UpdateDoctorDto } from '../doctor.dto';

jest.mock('../../../utils/handleError', () => ({
  handleError: jest.fn(),
}));

jest.mock('class-validator', () => ({
  validate: jest.fn(),
  IsNotEmpty: jest
    .fn()
    .mockImplementation(
      () => (target: any, propertyKey: string | symbol) => {},
    ),
  IsString: jest
    .fn()
    .mockImplementation(
      () => (target: any, propertyKey: string | symbol) => {},
    ),
  IsNumber: jest
    .fn()
    .mockImplementation(
      () => (target: any, propertyKey: string | symbol) => {},
    ),
  MinLength: jest
    .fn()
    .mockImplementation(
      () => (target: any, propertyKey: string | symbol) => {},
    ),
  MaxLength: jest
    .fn()
    .mockImplementation(
      () => (target: any, propertyKey: string | symbol) => {},
    ),
  IsOptional: jest
    .fn()
    .mockImplementation(
      () => (target: any, propertyKey: string | symbol) => {},
    ),
}));

const mockDoctorService = () => ({
  findById: jest.fn(),
  findAll: jest.fn(),
  createDoctor: jest.fn(),
  updateDoctor: jest.fn(),
  deleteDoctor: jest.fn(),
});

const mockRequest = (overrides = {}) =>
  ({
    body: {},
    params: {},
    query: {},
    ...overrides,
  }) as Request;

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('DoctorController', () => {
  let controller: DoctorController;
  let service: jest.Mocked<IDoctorService>;

  beforeEach(() => {
    service = mockDoctorService() as jest.Mocked<IDoctorService>;
    controller = new DoctorController(service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GetById', () => {
    it('Should return doctor if it is found', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      const doctor = {
        id: 1,
        first_name: 'Smith',
        last_name: 'Watson',
        specialization_id: 1,
      };
      (service.findById as jest.Mock).mockResolvedValue(doctor);

      await controller.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ doctor });
    });

    it('Should handle errors', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      const error = new Error('Not found');
      (service.findById as jest.Mock).mockRejectedValue(error);

      await controller.getById(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('GetAll', () => {
    it('Should return all doctors', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const doctors = [
        {
          id: 1,
          first_name: 'Smith',
          last_name: 'Watson',
          specialization_id: 1,
        },
        {
          id: 2,
          first_name: 'Alex',
          last_name: 'Nowman',
          specialization_id: 1,
        },
      ];
      (service.findAll as jest.Mock).mockResolvedValue(doctors);

      await controller.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ doctors });
    });

    it('Should handle errors', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const error = new Error('Failed to get doctors');
      (service.findAll as jest.Mock).mockRejectedValue(error);

      await controller.getAll(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('Create', () => {
    it('Should create a doctor if validation passes', async () => {
      const req = mockRequest({
        body: {
          first_name: 'Smith',
          last_name: 'Watson',
          specialization_id: 1,
        },
      });
      const res = mockResponse();

      const createDto = new CreateDoctorDto(req.body);
      const createdDoctor = {
        id: 1,
        first_name: 'Smith',
        last_name: 'Watson',
        specialization_id: 1,
      };

      (validate as jest.Mock).mockResolvedValue([]);
      (service.createDoctor as jest.Mock).mockResolvedValue(createdDoctor);

      await controller.create(req, res);

      expect(validate).toHaveBeenCalledWith(createDto);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdDoctor);
    });

    it('Should return 400 if validation fails', async () => {
      const req = mockRequest({
        body: { first_name: '', last_name: 'Watson', specialization_id: 1 },
      });
      const res = mockResponse();

      const validationErrors = [
        {
          property: 'first_name',
          constraints: { isNotEmpty: 'First name should not be empty' },
        },
      ];
      (validate as jest.Mock).mockResolvedValue(validationErrors);

      await controller.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(validationErrors);
    });

    it('Should handle errors', async () => {
      const req = mockRequest({
        body: {
          first_name: 'Smith',
          last_name: 'Watson',
          specialization_id: 1,
        },
      });
      const res = mockResponse();

      (validate as jest.Mock).mockResolvedValue([]);
      const error = new Error('Creation failed');
      (service.createDoctor as jest.Mock).mockRejectedValue(error);

      await controller.create(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('Update', () => {
    it('Should update a doctor if validation passes', async () => {
      const req = mockRequest({
        params: { id: '1' },
        body: {
          first_name: 'Smith',
          last_name: 'Watson',
          specialization_id: 1,
        },
      });
      const res = mockResponse();

      const updateDto = new UpdateDoctorDto(req.body);
      const updatedDoctor = {
        id: 1,
        first_name: 'Smith',
        last_name: 'Watson',
        specialization_id: 1,
      };

      (validate as jest.Mock).mockResolvedValue([]);
      (service.updateDoctor as jest.Mock).mockResolvedValue(updatedDoctor);

      await controller.update(req, res);

      expect(validate).toHaveBeenCalledWith(updateDto);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedDoctor);
    });

    it('Should return 400 if validation fails', async () => {
      const req = mockRequest({
        params: { id: '1' },
        body: { first_name: '' },
      });
      const res = mockResponse();

      const validationErrors = [
        {
          property: 'first_name',
          constraints: { isNotEmpty: 'First name cannot be empty' },
        },
      ];
      (validate as jest.Mock).mockResolvedValue(validationErrors);

      await controller.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(validationErrors);
    });

    it('Should handle errors', async () => {
      const req = mockRequest({
        params: { id: '1' },
        body: {
          first_name: 'Smith',
          last_name: 'Watson',
          specialization_id: 1,
        },
      });
      const res = mockResponse();

      (validate as jest.Mock).mockResolvedValue([]);
      const error = new Error('Update failed');
      (service.updateDoctor as jest.Mock).mockRejectedValue(error);

      await controller.update(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('Delete', () => {
    it('Should delete a doctor', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      (service.deleteDoctor as jest.Mock).mockResolvedValue(undefined);

      await controller.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Doctor deleted',
      });
    });

    it('Should handle errors', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      const error = new Error('Delete failed');
      (service.deleteDoctor as jest.Mock).mockRejectedValue(error);

      await controller.delete(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });
});
