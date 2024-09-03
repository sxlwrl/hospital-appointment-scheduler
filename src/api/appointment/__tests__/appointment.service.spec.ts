import { AppointmentService } from '../appointment.service';
import { IAppointRepository } from '../interfaces/IAppointRepository';
import { IPatientRepository } from '../../patient/interfaces/IPatientRepository';
import { IDoctorRepository } from '../../doctor/interfaces/IDoctorRepository';
import { ISpecializationRepository } from '../../specialization/interfaces/ISpecializationRepository';
import { NotFoundError } from '../../../errors/NotFound.error';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../appointment.dto';

jest.mock('../interfaces/IAppointRepository');
jest.mock('../../patient/interfaces/IPatientRepository');
jest.mock('../../doctor/interfaces/IDoctorRepository');
jest.mock('../../specialization/interfaces/ISpecializationRepository');

const mockAppointmentRepository = {
  findById: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as unknown as IAppointRepository;

const mockPatientRepository = {
  findById: jest.fn(),
} as unknown as IPatientRepository;

const mockDoctorRepository = {
  findById: jest.fn(),
} as unknown as IDoctorRepository;

const mockSpecializationRepository = {
  findById: jest.fn(),
} as unknown as ISpecializationRepository;

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(() => {
    service = new AppointmentService(
      mockAppointmentRepository,
      mockPatientRepository,
      mockDoctorRepository,
      mockSpecializationRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('FindById', () => {
    it('Should return an appointment if it exists', async () => {
      const appointment = {
        id: 1,
        patient_id: 1,
        doctor_id: 1,
        specialization_id: 1,
        appointment_date: '2024-09-09',
        appointment_time: '10:00',
        duration: 30,
      };
      (mockAppointmentRepository.findById as jest.Mock).mockResolvedValueOnce(
        appointment,
      );

      const result = await service.findById(1);

      expect(mockAppointmentRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(appointment);
    });

    it('Should throw NotFoundError if appointment does not exist', async () => {
      (mockAppointmentRepository.findById as jest.Mock).mockResolvedValueOnce(
        null,
      );

      await expect(service.findById(1)).rejects.toThrow(NotFoundError);
      expect(mockAppointmentRepository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('FindAll', () => {
    it('Should return all appointments', async () => {
      const appointments = [
        {
          id: 1,
          patient_id: 1,
          doctor_id: 1,
          specialization_id: 1,
          appointment_date: '2024-09-09',
          appointment_time: '10:00',
          duration: 30,
        },
        {
          id: 2,
          patient_id: 2,
          doctor_id: 1,
          specialization_id: 1,
          appointment_date: '2024-09-09',
          appointment_time: '15:00',
          duration: 30,
        },
      ];
      (mockAppointmentRepository.findAll as jest.Mock).mockResolvedValueOnce(
        appointments,
      );

      const result = await service.findAll();

      expect(mockAppointmentRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(appointments);
    });
  });

  describe('CreateAppointment', () => {
    it('Should create a new appointment if all entities exist', async () => {
      const createDto: CreateAppointmentDto = {
        patient_id: 1,
        doctor_id: 1,
        specialization_id: 1,
        appointment_date: '2024-09-09',
        appointment_time: '10:00',
        duration: 30,
      };
      const createdAppointment = {
        id: 1,
        patient_id: 1,
        doctor_id: 1,
        specialization_id: 1,
        appointment_date: '2024-09-09',
        appointment_time: '10:00',
        duration: 30,
      };

      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce({ id: 1 });
      (mockAppointmentRepository.create as jest.Mock).mockResolvedValueOnce(
        createdAppointment,
      );

      const result = await service.createAppointment(createDto);

      expect(mockPatientRepository.findById).toHaveBeenCalledWith(1);
      expect(mockDoctorRepository.findById).toHaveBeenCalledWith(1);
      expect(mockSpecializationRepository.findById).toHaveBeenCalledWith(1);
      expect(mockAppointmentRepository.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(createdAppointment);
    });

    it('Should throw NotFoundError if patient does not exist', async () => {
      const createDto: CreateAppointmentDto = {
        patient_id: 1,
        doctor_id: 1,
        specialization_id: 1,
        appointment_date: '2024-09-09',
        appointment_time: '10:00',
        duration: 30,
      };

      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.createAppointment(createDto)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockPatientRepository.findById).toHaveBeenCalledWith(1);
    });

    it('Should throw NotFoundError if doctor does not exist', async () => {
      const createDto: CreateAppointmentDto = {
        patient_id: 1,
        doctor_id: 1,
        specialization_id: 1,
        appointment_date: '2024-09-09',
        appointment_time: '10:00',
        duration: 30,
      };

      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.createAppointment(createDto)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockDoctorRepository.findById).toHaveBeenCalledWith(1);
    });

    it('Should throw NotFoundError if specialization does not exist', async () => {
      const createDto: CreateAppointmentDto = {
        patient_id: 1,
        doctor_id: 1,
        specialization_id: 1,
        appointment_date: '2024-09-09',
        appointment_time: '10:00',
        duration: 30,
      };

      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce(null);

      await expect(service.createAppointment(createDto)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockSpecializationRepository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('UpdateAppointment', () => {
    it('Should update an existing appointment if all entities exist', async () => {
      const updateDto: UpdateAppointmentDto = {
        patient_id: 1,
        doctor_id: 1,
        specialization_id: 1,
        appointment_date: '2024-09-09',
        appointment_time: '15:00',
        duration: 30,
      };
      const updatedAppointment = { id: 1, ...updateDto };

      (mockAppointmentRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce({ id: 1 });
      (mockAppointmentRepository.update as jest.Mock).mockResolvedValueOnce(
        updatedAppointment,
      );

      const result = await service.updateAppointment(1, updateDto);

      expect(mockAppointmentRepository.findById).toHaveBeenCalledWith(1);
      expect(mockPatientRepository.findById).toHaveBeenCalledWith(1);
      expect(mockDoctorRepository.findById).toHaveBeenCalledWith(1);
      expect(mockSpecializationRepository.findById).toHaveBeenCalledWith(1);
      expect(mockAppointmentRepository.update).toHaveBeenCalledWith(
        1,
        updateDto,
      );
      expect(result).toEqual(updatedAppointment);
    });

    it('Should throw NotFoundError if appointment does not exist', async () => {
      const updateDto: UpdateAppointmentDto = {
        patient_id: 1,
        doctor_id: 1,
        specialization_id: 1,
        appointment_date: '2024-09-09',
        appointment_time: '15:00',
        duration: 30,
      };

      (mockAppointmentRepository.findById as jest.Mock).mockResolvedValueOnce(
        null,
      );

      await expect(service.updateAppointment(1, updateDto)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockAppointmentRepository.findById).toHaveBeenCalledWith(1);
    });

    it('Should throw NotFoundError if patient does not exist', async () => {
      const updateDto: UpdateAppointmentDto = {
        patient_id: 2,
        doctor_id: 1,
        specialization_id: 1,
        appointment_date: '2024-09-09',
        appointment_time: '15:00',
        duration: 30,
      };

      (mockAppointmentRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.updateAppointment(1, updateDto)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockPatientRepository.findById).toHaveBeenCalledWith(2);
    });

    it('Should throw NotFoundError if doctor does not exist', async () => {
      const updateDto: UpdateAppointmentDto = {
        patient_id: 1,
        doctor_id: 2,
        specialization_id: 1,
        appointment_date: '2024-09-09',
        appointment_time: '15:00',
        duration: 30,
      };

      (mockAppointmentRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce(null);

      await expect(service.updateAppointment(1, updateDto)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockDoctorRepository.findById).toHaveBeenCalledWith(2);
    });

    it('Should throw NotFoundError if specialization does not exist', async () => {
      const updateDto: UpdateAppointmentDto = {
        patient_id: 1,
        doctor_id: 1,
        specialization_id: 2,
        appointment_date: '2024-09-09',
        appointment_time: '15:00',
        duration: 30,
      };

      (mockAppointmentRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (mockPatientRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce(null);

      await expect(service.updateAppointment(1, updateDto)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockSpecializationRepository.findById).toHaveBeenCalledWith(2);
    });
  });

  describe('DeleteAppointment', () => {
    it('Should delete an existing appointment', async () => {
      (mockAppointmentRepository.findById as jest.Mock).mockResolvedValueOnce({
        id: 1,
      });
      (mockAppointmentRepository.delete as jest.Mock).mockResolvedValueOnce(
        undefined,
      );

      await service.deleteAppointment(1);

      expect(mockAppointmentRepository.findById).toHaveBeenCalledWith(1);
      expect(mockAppointmentRepository.delete).toHaveBeenCalledWith(1);
    });

    it('Should throw NotFoundError if appointment does not exist', async () => {
      (mockAppointmentRepository.findById as jest.Mock).mockResolvedValueOnce(
        null,
      );

      await expect(service.deleteAppointment(1)).rejects.toThrow(NotFoundError);
      expect(mockAppointmentRepository.findById).toHaveBeenCalledWith(1);
    });
  });
});
