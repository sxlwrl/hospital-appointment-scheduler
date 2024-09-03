import { PatientService } from '../patient.service';
import { IPatientRepository } from '../interfaces/IPatientRepository';
import { NotFoundError } from '../../../errors/NotFound.error';
import { UpdatePatientDto } from '../patient.dto';
import { Patient } from '../patient.model';
import bcrypt from 'bcrypt';

const mockPatientRepository = {
  findById: jest.fn(),
  findByUsername: jest.fn(),
  findByEmail: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as unknown as IPatientRepository;

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(() => {
    service = new PatientService(mockPatientRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('FindById', () => {
    it('Should return a patient if it is found', async () => {
      const patient = new Patient(
        1,
        'test',
        'Alex',
        'Bread',
        'test@gmail.com',
        'q1q2q3q4',
      );
      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce(
        patient,
      );

      const result = await service.findById(1);

      expect(result).toEqual(patient);
      expect(mockPatientRepository.findById).toHaveBeenCalledWith(1);
    });

    it('Should throw NotFoundError if patient is not found', async () => {
      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.findById(1)).rejects.toThrow(NotFoundError);
      expect(mockPatientRepository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('FindAll', () => {
    it('Should return all patients', async () => {
      const patients = [
        new Patient(1, 'test', 'Alex', 'Bread', 'test@gmail.com', 'q1q2q3q4'),
        new Patient(
          2,
          'test2',
          'Nick',
          'Watson',
          'test2@gmail.com',
          'g1g2g3g4',
        ),
      ];
      (mockPatientRepository.findAll as jest.Mock).mockResolvedValueOnce(
        patients,
      );

      const result = await service.findAll();

      expect(result).toEqual(patients);
      expect(mockPatientRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('UpdatePatient', () => {
    it('Should update and return the patient if it exists', async () => {
      const updateDto: UpdatePatientDto = {
        username: 'new_test',
        firstName: 'test_name',
        lastName: 'test_last_name',
        email: 'test_email@gmail.com',
        password: 'q1q2q3q4',
      };

      const patient = new Patient(
        1,
        updateDto.username,
        updateDto.firstName,
        updateDto.lastName,
        updateDto.email,
        'hashed_password',
      );

      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce(
        patient,
      );

      (mockPatientRepository.update as jest.Mock).mockImplementationOnce(
        async (id, data) => ({
          ...patient,
          ...data,
          password: await bcrypt.hash(data.password, 10),
        }),
      );

      const result = await service.updatePatient(1, updateDto);

      expect(mockPatientRepository.update).toHaveBeenCalledWith(1, {
        ...updateDto,
        password: expect.any(String),
      });

      expect(result).toEqual({
        ...patient,
        ...updateDto,
        password: expect.any(String),
      });
    });

    it('Should throw NotFoundError if patient does not exist', async () => {
      const updateDto: UpdatePatientDto = {
        username: 'new_test',
        firstName: 'test_name',
        lastName: 'test_last_name',
        email: 'test_email@gmail.com',
        password: 'q1q2q3q4',
      };

      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.updatePatient(1, updateDto)).rejects.toThrow(
        NotFoundError,
      );

      expect(mockPatientRepository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('DeletePatient', () => {
    it('Should delete the patient after confirming it exists', async () => {
      const patient = new Patient(
        1,
        'test',
        'Alex',
        'Bread',
        'test@gmail.com',
        'q1q2q3q4',
      );

      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce(
        patient,
      );
      (mockPatientRepository.delete as jest.Mock).mockResolvedValueOnce(
        undefined,
      );

      await service.deletePatient(1);

      expect(mockPatientRepository.findById).toHaveBeenCalledWith(1);
      expect(mockPatientRepository.delete).toHaveBeenCalledWith(1);
    });

    it('Should throw NotFoundError if patient does not exist', async () => {
      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.deletePatient(1)).rejects.toThrow(NotFoundError);
      expect(mockPatientRepository.findById).toHaveBeenCalledWith(1);
    });
  });
});
