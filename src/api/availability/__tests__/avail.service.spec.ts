import { AvailService } from '../avail.service';
import {IAvailRepository} from "../interfaces/IAvailRepository";
import {IDoctorRepository} from "../../doctor/interfaces/IDoctorRepository";
import {NotFoundError} from "../../../errors/NotFound.error";
import { CreateAvailDto, UpdateAvailDto } from '../avail.dto';


const mockAvailabilityRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
} as unknown as IAvailRepository;

const mockDoctorRepository = {
    findById: jest.fn(),
} as unknown as IDoctorRepository;

describe('AvailService', () => {
    let service: AvailService;

    beforeEach(() => {
        service = new AvailService(
            mockAvailabilityRepository,
            mockDoctorRepository
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findById', () => {
        it('Should return availability if it exists', async () => {
            const availability = { id: 1, doctor_id: 1, available_date: '2024-09-09', available_time: '14:30', duration: 30 };
            (mockAvailabilityRepository.findById as jest.Mock).mockResolvedValueOnce(availability);

            const result = await service.findById(1);

            expect(mockAvailabilityRepository.findById).toHaveBeenCalledWith(1);
            expect(result).toEqual(availability);
        });

        it('Should throw NotFoundError if availability does not exist', async () => {
            (mockAvailabilityRepository.findById as jest.Mock).mockResolvedValueOnce(null);

            await expect(service.findById(1)).rejects.toThrow(NotFoundError);
            expect(mockAvailabilityRepository.findById).toHaveBeenCalledWith(1);
        });
    });

    describe('findAll', () => {
        it('Should return all availabilities', async () => {
            const availabilities = [{ id: 1, doctor_id: 1, available_date: '2024-09-09', available_time: '14:30', duration: 30 },
                { id: 2, doctor_id: 1, available_date: '2024-09-10', available_time: '16:30', duration: 25 }];
            (mockAvailabilityRepository.findAll as jest.Mock).mockResolvedValueOnce(availabilities);

            const result = await service.findAll();

            expect(mockAvailabilityRepository.findAll).toHaveBeenCalled();
            expect(result).toEqual(availabilities);
        });
    });

    describe('createAvail', () => {
        it('Should create a new availability if the doctor exists', async () => {
            const createDto: CreateAvailDto = {
                doctor_id: 1, available_date: '2024-09-09', available_time: '14:30', duration: 30
            };
            const createdAvail = { id: 1, doctor_id: 1, available_date: '2024-09-09', available_time: '14:30', duration: 30 };

            (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce({ id: 1 });
            (mockAvailabilityRepository.create as jest.Mock).mockResolvedValueOnce(createdAvail);

            const result = await service.createAvail(createDto);

            expect(mockDoctorRepository.findById).toHaveBeenCalledWith(1);
            expect(mockAvailabilityRepository.create).toHaveBeenCalledWith(createDto);
            expect(result).toEqual(createdAvail);
        });

        it('Should throw NotFoundError if doctor does not exist', async () => {
            const createDto: CreateAvailDto = {
                doctor_id: 2, available_date: '2024-09-09', available_time: '14:30', duration: 30
            };

            (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce(null);

            await expect(service.createAvail(createDto)).rejects.toThrow(NotFoundError);
            expect(mockDoctorRepository.findById).toHaveBeenCalledWith(2);
        });
    });

    describe('updateAvail', () => {
        it('Should update an existing availability if the doctor exists', async () => {
            const updateDto: UpdateAvailDto = {
                doctor_id: 1, available_date: '2024-09-09', available_time: '15:30', duration: 30
            };

            const updatedAvail = { id: 1, ...updateDto };

            (mockAvailabilityRepository.findById as jest.Mock).mockResolvedValueOnce({ id: 1 });
            (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce({ id: 1 });
            (mockAvailabilityRepository.update as jest.Mock).mockResolvedValueOnce(updatedAvail);

            const result = await service.updateAvail(1, updateDto);

            expect(mockAvailabilityRepository.findById).toHaveBeenCalledWith(1);
            expect(mockDoctorRepository.findById).toHaveBeenCalledWith(1);
            expect(mockAvailabilityRepository.update).toHaveBeenCalledWith(1, updateDto);
            expect(result).toEqual(updatedAvail);
        });

        it('Should throw NotFoundError if availability does not exist', async () => {
            const updateDto: UpdateAvailDto = {
                doctor_id: 1, available_date: '2024-09-09', available_time: '15:30', duration: 30
            };

            (mockAvailabilityRepository.findById as jest.Mock).mockResolvedValueOnce(null);

            await expect(service.updateAvail(1, updateDto)).rejects.toThrow(NotFoundError);
            expect(mockAvailabilityRepository.findById).toHaveBeenCalledWith(1);
        });

        it('Should throw NotFoundError if doctor does not exist', async () => {
            const updateDto: UpdateAvailDto = {
                doctor_id: 1, available_date: '2024-09-09', available_time: '15:30', duration: 30
            };

            (mockAvailabilityRepository.findById as jest.Mock).mockResolvedValueOnce({ id: 1 });
            (mockDoctorRepository.findById as jest.Mock).mockResolvedValueOnce(null);

            await expect(service.updateAvail(1, updateDto)).rejects.toThrow(NotFoundError);
            expect(mockDoctorRepository.findById).toHaveBeenCalledWith(1);
        });
    });

    describe('deleteAvail', () => {
        it('Should delete an existing availability', async () => {
            (mockAvailabilityRepository.findById as jest.Mock).mockResolvedValueOnce({ id: 1 });
            (mockAvailabilityRepository.delete as jest.Mock).mockResolvedValueOnce(undefined);

            await service.deleteAvail(1);

            expect(mockAvailabilityRepository.findById).toHaveBeenCalledWith(1);
            expect(mockAvailabilityRepository.delete).toHaveBeenCalledWith(1);
        });

        it('Should throw NotFoundError if availability does not exist', async () => {
            (mockAvailabilityRepository.findById as jest.Mock).mockResolvedValueOnce(null);

            await expect(service.deleteAvail(1)).rejects.toThrow(NotFoundError);
            expect(mockAvailabilityRepository.findById).toHaveBeenCalledWith(1);
        });
    });
});
