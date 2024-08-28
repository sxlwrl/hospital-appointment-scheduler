import { SpecializationService } from '../specialization.service';
import { ISpecializationRepository } from '../interfaces/ISpecializationRepository';
import { NotFoundError } from '../../../errors/NotFound.error';
import { AlreadyExistsError } from '../../../errors/AlreadyExists.error';
import {
  CreateSpecializationDto,
  UpdateSpecializationDto,
} from '../specialization.dto';
import { Specialization } from '../specialization.model';

const mockSpecializationRepository = {
  findById: jest.fn(),
  findAll: jest.fn(),
  findByTitle: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as unknown as ISpecializationRepository;

describe('SpecializationService', () => {
  let service: SpecializationService;

  beforeEach(() => {
    service = new SpecializationService(mockSpecializationRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('FindById', () => {
    it('Should return a specialization if it is found', async () => {
      const specialization = new Specialization(1, 'Surgery');
      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce(specialization);

      const result = await service.findById(1);

      expect(result).toEqual(specialization);
      expect(mockSpecializationRepository.findById).toHaveBeenCalledWith(1);
    });

    it('Should throw NotFoundError if specialization is not found', async () => {
      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce(null);

      await expect(service.findById(1)).rejects.toThrow(NotFoundError);
      expect(mockSpecializationRepository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('FindAll', () => {
    it('Should return all specializations', async () => {
      const specializations = [
        new Specialization(1, 'Surgery'),
        new Specialization(2, 'Neurology'),
      ];
      (mockSpecializationRepository.findAll as jest.Mock).mockResolvedValueOnce(
        specializations,
      );

      const result = await service.findAll();

      expect(result).toEqual(specializations);
      expect(mockSpecializationRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('CreateSpecialization', () => {
    it('Should create a new specialization if title is not taken', async () => {
      const createDto: CreateSpecializationDto = { title: 'Surgery' };
      const specialization = new Specialization(1, 'Surgery');
      (
        mockSpecializationRepository.findByTitle as jest.Mock
      ).mockResolvedValueOnce(null);
      (mockSpecializationRepository.create as jest.Mock).mockResolvedValueOnce(
        specialization,
      );

      const result = await service.createSpecialization(createDto);

      expect(result).toEqual(specialization);
      expect(mockSpecializationRepository.findByTitle).toHaveBeenCalledWith(
        'Surgery',
      );
      expect(mockSpecializationRepository.create).toHaveBeenCalledWith(
        createDto,
      );
    });

    it('Should throw AlreadyExistsError if title is already taken', async () => {
      const createDto: CreateSpecializationDto = { title: 'Surgery' };
      (
        mockSpecializationRepository.findByTitle as jest.Mock
      ).mockResolvedValueOnce(new Specialization(1, 'Surgery'));

      await expect(service.createSpecialization(createDto)).rejects.toThrow(
        AlreadyExistsError,
      );
      expect(mockSpecializationRepository.findByTitle).toHaveBeenCalledWith(
        'Surgery',
      );
    });
  });

  describe('updateSpecialization', () => {
    it('Should update and return the specialization if it exists', async () => {
      const updateDto: UpdateSpecializationDto = {
        title: 'Neurology',
      };
      const specialization = new Specialization(1, 'Neurology');
      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce(specialization);
      (mockSpecializationRepository.update as jest.Mock).mockResolvedValueOnce(
        specialization,
      );

      const result = await service.updateSpecialization(1, updateDto);

      expect(result).toEqual(specialization);
      expect(mockSpecializationRepository.update).toHaveBeenCalledWith(
        1,
        updateDto,
      );
    });

    it('Should throw NotFoundError if specialization does not exist', async () => {
      const updateDto: UpdateSpecializationDto = {
        title: 'Neurology',
      };

      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce(null);

      await expect(service.updateSpecialization(1, updateDto)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockSpecializationRepository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('DeleteSpecialization', () => {
    it('Should delete the specialization after confirming it exists', async () => {
      const specialization = new Specialization(1, 'Surgery');
      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce(specialization);
      (mockSpecializationRepository.delete as jest.Mock).mockResolvedValueOnce(
        undefined,
      );

      await service.deleteSpecialization(1);

      expect(mockSpecializationRepository.findById).toHaveBeenCalledWith(1);
      expect(mockSpecializationRepository.delete).toHaveBeenCalledWith(1);
    });

    it('Should throw NotFoundError if specialization does not exist', async () => {
      (
        mockSpecializationRepository.findById as jest.Mock
      ).mockResolvedValueOnce(null);

      await expect(service.deleteSpecialization(1)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockSpecializationRepository.findById).toHaveBeenCalledWith(1);
    });
  });
});
