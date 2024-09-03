import { Request, Response } from 'express';
import { PatientController } from '../patient.controller';
import { IPatientService } from '../interfaces/IPatientService';
import { handleError } from '../../../utils/handleError';
import { validate } from 'class-validator';
import { UpdatePatientDto } from '../patient.dto';

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
  IsEmail: jest
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

const mockPatientService = () => ({
  findById: jest.fn(),
  findAll: jest.fn(),
  updatePatient: jest.fn(),
  deletePatient: jest.fn(),
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

describe('PatientController', () => {
  let controller: PatientController;
  let service: jest.Mocked<IPatientService>;

  beforeEach(() => {
    service = mockPatientService() as jest.Mocked<IPatientService>;
    controller = new PatientController(service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GetById', () => {
    it('Should return patient if it is found', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      const patient = {
        id: 1,
        username: 'test',
        firstName: 'Alex',
        lastName: 'Bread',
        email: 'test@gmail.com',
        password: 'q1q2q3q4',
      };

      (service.findById as jest.Mock).mockResolvedValue(patient);

      await controller.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ patient });
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
    it('Should return all patients', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const patients = [
        {
          id: 1,
          username: 'test',
          firstName: 'Alex',
          lastName: 'Bread',
          email: 'test@gmail.com',
          password: 'q1q2q3q4',
        },
        {
          id: 2,
          username: 'test2',
          firstName: 'Alex2',
          lastName: 'Bread2',
          email: 'test2@gmail.com',
          password: 'q1q2q3q4',
        },
      ];

      (service.findAll as jest.Mock).mockResolvedValue(patients);

      await controller.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ patients });
    });

    it('Should handle errors', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const error = new Error('Failed to get patients');
      (service.findAll as jest.Mock).mockRejectedValue(error);

      await controller.getAll(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('Update', () => {
    it('Should update a patient if validation passes', async () => {
      const req = mockRequest({
        params: { id: '1' },
        body: {
          username: 'test5',
        },
      });

      const res = mockResponse();

      const updateDto = new UpdatePatientDto(req.body);
      const updatedPatient = {
        id: 1,
        username: 'test5',
        firstName: 'Alex',
        lastName: 'Bread',
        email: 'test@gmail.com',
        password: 'q1q2q3q4',
      };

      (validate as jest.Mock).mockResolvedValue([]);
      (service.updatePatient as jest.Mock).mockResolvedValue(updatedPatient);

      await controller.update(req, res);

      expect(validate).toHaveBeenCalledWith(updateDto);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedPatient);
    });

    it('Should return 400 if validation fails', async () => {
      const req = mockRequest({ params: { id: '1' }, body: { username: '' } });
      const res = mockResponse();

      const validationErrors = [
        {
          property: 'username',
          constraints: { isNotEmpty: 'Username cannot be empty' },
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
        body: { username: 'test5' },
      });

      const res = mockResponse();

      (validate as jest.Mock).mockResolvedValue([]);
      const error = new Error('Update failed');
      (service.updatePatient as jest.Mock).mockRejectedValue(error);

      await controller.update(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('Delete', () => {
    it('Should delete a patient', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      (service.deletePatient as jest.Mock).mockResolvedValue(undefined);

      await controller.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Patient deleted',
      });
    });

    it('Should handle errors', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      const error = new Error('Delete failed');
      (service.deletePatient as jest.Mock).mockRejectedValue(error);

      await controller.delete(req, res);

      expect(handleError).toHaveBeenCalledWith(res, error);
    });
  });
});
