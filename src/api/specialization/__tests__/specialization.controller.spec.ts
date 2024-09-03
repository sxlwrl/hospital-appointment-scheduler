import { Request, Response } from 'express';
import { SpecializationController } from '../specialization.controller';
import { ISpecializationService } from '../interfaces/ISpecializationService';
import { handleError } from '../../../utils/handleError';
import { validate } from 'class-validator';
import {
  CreateSpecializationDto,
  UpdateSpecializationDto,
} from '../specialization.dto';

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

const mockSpecializationService = () => ({
  findById: jest.fn(),
  findAll: jest.fn(),
  createSpecialization: jest.fn(),
  updateSpecialization: jest.fn(),
  deleteSpecialization: jest.fn(),
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

describe('SpecializationController', () => {
  let controller: SpecializationController;
  let service: jest.Mocked<ISpecializationService>;

  beforeEach(() => {
    service =
      mockSpecializationService() as jest.Mocked<ISpecializationService>;
    controller = new SpecializationController(service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GetById', () => {
    it('Should return specialization if it is found', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      const specialization = { id: 1, title: 'Surgery' };
      (service.findById as jest.Mock).mockResolvedValue(specialization);

      await controller.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ specialization });
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
    it('Should return all specializations', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const specializations = [
        { id: 1, title: 'Surgery' },
        { id: 2, title: 'Neurology' },
      ];
      (service.findAll as jest.Mock).mockResolvedValue(specializations);

      await controller.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ specializations });
    });

    it('Should handle errors', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const error = new Error('Failed to get specializations');
      (service.findAll as jest.Mock).mockRejectedValue(error);

      await controller.getAll(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('Create', () => {
    it('Should create a specialization if validation passes', async () => {
      const req = mockRequest({ body: { title: 'Surgery' } });
      const res = mockResponse();

      const createDto = new CreateSpecializationDto(req.body);
      const createdSpecialization = { id: 1, title: 'Surgery' };

      (validate as jest.Mock).mockResolvedValue([]);
      (service.createSpecialization as jest.Mock).mockResolvedValue(
        createdSpecialization,
      );

      await controller.create(req, res);

      expect(validate).toHaveBeenCalledWith(createDto);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdSpecialization);
    });

    it('Should return 400 if validation fails', async () => {
      const req = mockRequest({ body: { title: '' } });
      const res = mockResponse();

      const validationErrors = [
        {
          property: 'title',
          constraints: { isNotEmpty: 'Title should not be empty' },
        },
      ];
      (validate as jest.Mock).mockResolvedValue(validationErrors);

      await controller.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(validationErrors);
    });

    it('Should handle errors', async () => {
      const req = mockRequest({ body: { title: 'Surgery' } });
      const res = mockResponse();

      (validate as jest.Mock).mockResolvedValue([]);
      const error = new Error('Creation failed');
      (service.createSpecialization as jest.Mock).mockRejectedValue(error);

      await controller.create(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('Update', () => {
    it('Should update a specialization if validation passes', async () => {
      const req = mockRequest({
        params: { id: '1' },
        body: { title: 'Neurology' },
      });
      const res = mockResponse();

      const updateDto = new UpdateSpecializationDto(req.body);
      const updatedSpecialization = { id: 1, title: 'Neurology' };

      (validate as jest.Mock).mockResolvedValue([]);
      (service.updateSpecialization as jest.Mock).mockResolvedValue(
        updatedSpecialization,
      );

      await controller.update(req, res);

      expect(validate).toHaveBeenCalledWith(updateDto);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedSpecialization);
    });

    it('Should return 400 if validation fails', async () => {
      const req = mockRequest({ params: { id: '1' }, body: { title: '' } });
      const res = mockResponse();

      const validationErrors = [
        {
          property: 'title',
          constraints: { isNotEmpty: 'Title should not be empty' },
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
        body: { title: 'Neurology' },
      });
      const res = mockResponse();

      (validate as jest.Mock).mockResolvedValue([]);
      const error = new Error('Update failed');
      (service.updateSpecialization as jest.Mock).mockRejectedValue(error);

      await controller.update(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('Delete', () => {
    it('Should delete a specialization', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      (service.deleteSpecialization as jest.Mock).mockResolvedValue(undefined);

      await controller.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Specialization deleted',
      });
    });

    it('Should handle errors', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      const error = new Error('Delete failed');
      (service.deleteSpecialization as jest.Mock).mockRejectedValue(error);

      await controller.delete(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });
});
