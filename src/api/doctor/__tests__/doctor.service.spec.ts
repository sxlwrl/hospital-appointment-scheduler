import { DoctorService } from '../doctor.service';
import { IDoctorRepository } from '../interfaces/IDoctorRepository';
import { ISpecializationRepository } from '../../specialization/interfaces/ISpecializationRepository';
import { NotFoundError } from '../../../errors/NotFound.error';
import { CreateDoctorDto, UpdateDoctorDto } from '../doctor.dto';
import { Doctor } from '../doctor.model';
import { Specialization } from '../../specialization/specialization.model';

const mockDoctorRepository = {
  findById: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as unknown as IDoctorRepository;

const mockSpecializationRepository = {
  findById: jest.fn(),
} as unknown as ISpecializationRepository;

describe('DoctorService', () => {
  let service: DoctorService;

  beforeEach(() => {
    service = new DoctorService(
      mockDoctorRepository,
      mockSpecializationRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('FindById', () => {
    it('Should return a doctor if found', async () => {
      const doctor = new Doctor(1, 'Smith', 'Watson', 1);
      (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce(
        doctor,
      );

      const result = await service.findById(1);

      expect(result).toEqual(doctor);
      expect(mockDoctorRepository.findById).toHaveBeenCalledWith(1);
    });

    it('Should throw NotFoundError if doctor is not found', async () => {
      (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.findById(1)).rejects.toThrow(NotFoundError);
      expect(mockDoctorRepository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('FindAll', () => {
    it('Should return all doctors', async () => {
      const doctors = [
        new Doctor(1, 'Smith', 'Watson', 1),
        new Doctor(2, 'Alex', 'Nowman', 2),
      ];
      (mockDoctorRepository.findAll as jest.Mock).mockResolvedValueOnce(
        doctors,
      );

      const result = await service.findAll();

      expect(result).toEqual(doctors);
      expect(mockDoctorRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('CreateDoctor', () => {
    it('Should create a new doctor if specialization exists', async () => {
      const createDto: CreateDoctorDto = {
        firstName: 'Smith',
        lastName: 'Watson',
        specialization_id: 1,
      };
      const doctor = new Doctor(1, 'Smith', 'Watson', 1);
      const specialization = new Specialization(1, 'Surgery');

      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce(specialization);
      (mockDoctorRepository.create as jest.Mock).mockResolvedValueOnce(doctor);

      const result = await service.createDoctor(createDto);

      expect(result).toEqual(doctor);
      expect(mockSpecializationRepository.findById).toHaveBeenCalledWith(1);
      expect(mockDoctorRepository.create).toHaveBeenCalledWith(createDto);
    });

    it('Should throw NotFoundError if specialization does not exist', async () => {
      const createDto: CreateDoctorDto = {
        firstName: 'Smith',
        lastName: 'Watson',
        specialization_id: 2,
      };

      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce(null);

      await expect(service.createDoctor(createDto)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockSpecializationRepository.findById).toHaveBeenCalledWith(2);
    });
  });

  describe('UpdateDoctor', () => {
    it('Should update and return the doctor if it and its specialization exist', async () => {
      const updateDto: UpdateDoctorDto = {
        firstName: 'Smith',
        lastName: 'Watson',
        specialization_id: 3,
      };
      const doctor = new Doctor(1, 'Smith', 'Watson', 3);
      const specialization = new Specialization(3, 'Surgery');

      (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce(
        doctor,
      );
      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce(specialization);
      (mockDoctorRepository.update as jest.Mock).mockResolvedValueOnce(doctor);

      const result = await service.updateDoctor(1, updateDto);

      expect(result).toEqual(doctor);
      expect(mockDoctorRepository.findById).toHaveBeenCalledWith(1);
      expect(mockSpecializationRepository.findById).toHaveBeenCalledWith(3);
      expect(mockDoctorRepository.update).toHaveBeenCalledWith(1, updateDto);
    });

    it('Should throw NotFoundError if doctor does not exist', async () => {
      const updateDto: UpdateDoctorDto = {
        firstName: 'Smith',
        lastName: 'Watson',
        specialization_id: 3,
      };

      (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.updateDoctor(1, updateDto)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockDoctorRepository.findById).toHaveBeenCalledWith(1);
    });

    it('Should throw NotFoundError if specialization does not exist', async () => {
      const updateDto: UpdateDoctorDto = {
        firstName: 'Smith',
        lastName: 'Watson',
        specialization_id: 3,
      };
      const doctor = new Doctor(1, 'Smith', 'Watson', 3);

      (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce(
        doctor,
      );
      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce(null);

      await expect(service.updateDoctor(1, updateDto)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockSpecializationRepository.findById).toHaveBeenCalledWith(3);
    });
  });

  describe('deleteDoctor', () => {
    it('Should delete the doctor if it exists', async () => {
      const doctor = new Doctor(1, 'Smith', 'Watson', 3);

      (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce(
        doctor,
      );
      (mockDoctorRepository.delete as jest.Mock).mockResolvedValueOnce(
        undefined,
      );

      await service.deleteDoctor(1);

      expect(mockDoctorRepository.findById).toHaveBeenCalledWith(1);
      expect(mockDoctorRepository.delete).toHaveBeenCalledWith(1);
    });

    it('Should throw NotFoundError if doctor does not exist', async () => {
      (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.deleteDoctor(1)).rejects.toThrow(NotFoundError);
      expect(mockDoctorRepository.findById).toHaveBeenCalledWith(1);
    });
  });
});
