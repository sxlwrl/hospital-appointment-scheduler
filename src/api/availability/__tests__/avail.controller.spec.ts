import { Request, Response } from 'express';
import { AvailController } from '../avail.controller';
import { IAvailService } from '../interfaces/IAvailService';
import { handleError } from '../../../utils/handleError';
import { validate } from 'class-validator';
import { CreateAvailDto, UpdateAvailDto } from '../avail.dto';

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
  IsMilitaryTime: jest
    .fn()
    .mockImplementation(
      () => (target: any, propertyKey: string | symbol) => {},
    ),
}));

const mockAvailService = () => ({
  findById: jest.fn(),
  findAll: jest.fn(),
  createAvail: jest.fn(),
  updateAvail: jest.fn(),
  deleteAvail: jest.fn(),
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

describe('AvailController', () => {
  let controller: AvailController;
  let service: jest.Mocked<IAvailService>;

  beforeEach(() => {
    service = mockAvailService() as jest.Mocked<IAvailService>;
    controller = new AvailController(service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GetById', () => {
    it('Should return availability if it is found', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      const availability = {
        id: 1,
        doctor_id: 1,
        available_date: '2024-09-08',
        available_time: '14:30:00',
        duration: 30,
      };
      (service.findById as jest.Mock).mockResolvedValue(availability);

      await controller.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ availability });
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
    it('Should return all availabilities', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const availabilities = [
        {
          id: 1,
          doctor_id: 1,
          available_date: '2024-09-08',
          available_time: '14:30:00',
          duration: 30,
        },
        {
          id: 2,
          doctor_id: 1,
          available_date: '2024-09-08',
          available_time: '15:30:00',
          duration: 25,
        },
      ];
      (service.findAll as jest.Mock).mockResolvedValue(availabilities);

      await controller.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ availabilities });
    });

    it('Should handle errors', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const error = new Error('Failed to get availabilities');
      (service.findAll as jest.Mock).mockRejectedValue(error);

      await controller.getAll(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('Create', () => {
    it('Should create availability if validation passes', async () => {
      const req = mockRequest({
        body: {
          doctor_id: 1,
          available_date: '2024-09-08',
          available_time: '14:30:00',
          duration: 30,
        },
      });
      const res = mockResponse();

      const createDto = new CreateAvailDto(req.body);
      const createdAvailability = {
        id: 1,
        doctor_id: 1,
        available_date: '2024-09-08',
        available_time: '14:30:00',
        duration: 30,
      };

      (validate as jest.Mock).mockResolvedValue([]);
      (service.createAvail as jest.Mock).mockResolvedValue(createdAvailability);

      await controller.create(req, res);

      expect(validate).toHaveBeenCalledWith(createDto);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdAvailability);
    });

    it('Should return 400 if validation fails', async () => {
      const req = mockRequest({
        body: {
          doctor_id: '1',
          available_date: '2024-09-08',
          available_time: '14:30:00',
          duration: 30,
        },
      });
      const res = mockResponse();

      const validationErrors = [
        {
          property: 'doctor_id',
          constraints: {
            isNotEmpty: 'Date should not be empty',
            isNumber: 'ID should be a number',
          },
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
          doctor_id: 1,
          available_date: '2024-09-08',
          available_time: '14:30:00',
          duration: 30,
        },
      });
      const res = mockResponse();

      (validate as jest.Mock).mockResolvedValue([]);
      const error = new Error('Creation failed');
      (service.createAvail as jest.Mock).mockRejectedValue(error);

      await controller.create(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('Update', () => {
    it('Should update availability if validation passes', async () => {
      const req = mockRequest({
        params: { id: '1' },
        body: { time: '15:00' },
      });
      const res = mockResponse();

      const updateDto = new UpdateAvailDto(req.body);
      const updatedAvailability = {
        id: 1,
        doctor_id: 1,
        available_date: '2024-09-08',
        available_time: '15:00:00',
        duration: 30,
      };

      (validate as jest.Mock).mockResolvedValue([]);
      (service.updateAvail as jest.Mock).mockResolvedValue(updatedAvailability);

      await controller.update(req, res);

      expect(validate).toHaveBeenCalledWith(updateDto);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedAvailability);
    });

    it('Should return 400 if validation fails', async () => {
      const req = mockRequest({
        params: { id: '1' },
        body: { duration: '40' },
      });
      const res = mockResponse();

      const validationErrors = [
        {
          property: 'duration',
          constraints: { isNumber: 'Duration should be a number' },
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
          doctor_id: 1,
          available_date: '2024-09-08',
          available_time: '15:00:00',
          duration: 30,
        },
      });
      const res = mockResponse();

      (validate as jest.Mock).mockResolvedValue([]);
      const error = new Error('Update failed');
      (service.updateAvail as jest.Mock).mockRejectedValue(error);

      await controller.update(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('Delete', () => {
    it('Should delete availability', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      (service.deleteAvail as jest.Mock).mockResolvedValue(undefined);

      await controller.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Availability deleted',
      });
    });

    it('Should handle errors', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      const error = new Error('Delete failed');
      (service.deleteAvail as jest.Mock).mockRejectedValue(error);

      await controller.delete(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });
});
