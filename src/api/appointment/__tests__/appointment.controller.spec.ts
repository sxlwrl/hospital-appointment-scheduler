import { Request, Response } from 'express';
import { AppointmentController } from '../appointment.controller';
import { IAppointService } from '../interfaces/IAppointService';
import { handleError } from '../../../utils/handleError';
import { validate } from 'class-validator';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../appointment.dto';

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
const mockAppointmentService = () => ({
    findById: jest.fn(),
    findAll: jest.fn(),
    createAppointment: jest.fn(),
    updateAppointment: jest.fn(),
    deleteAppointment: jest.fn(),
});

const mockRequest = (overrides = {}) =>
    ({
        params: {},
        body: {},
        ...overrides,
    }) as Request;

const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('AppointmentController', () => {
    let controller: AppointmentController;
    let service: jest.Mocked<IAppointService>;

    beforeEach(() => {
        service = mockAppointmentService() as jest.Mocked<IAppointService>;
        controller = new AppointmentController(service);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GetById', () => {
        it('Should return an appointment if found', async () => {
            const req = mockRequest({ params: { id: '1' } });
            const res = mockResponse();

            const appointment = { id: 1, patient_id: 1, doctor_id: 1, specialization_id: 2, appointment_date: '2024-09-01', appointment_time: '10:00', duration: 30 };

            (service.findById as jest.Mock).mockResolvedValue(appointment);

            await controller.getById(req, res);

            expect(service.findById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ appointment });
        });

        it('Should handle errors if appointment is not found', async () => {
            const req = mockRequest({ params: { id: '1' } });
            const res = mockResponse();

            const error = new Error('Appointment not found');
            (service.findById as jest.Mock).mockRejectedValue(error);

            await controller.getById(req, res);

            expect(handleError).toHaveBeenCalledWith(res, error);
        });
    });

    describe('GetAll', () => {
        it('Should return all appointments', async () => {
            const req = mockRequest();
            const res = mockResponse();

            const appointments = [
                { id: 1, patient_id: 1, doctor_id: 1, specialization_id: 2, appointment_date: '2024-09-01', appointment_time: '10:00', duration: 30 },
                { id: 2, patient_id: 2, doctor_id: 2, specialization_id: 3, appointment_date: '2024-09-02', appointment_time: '11:00', duration: 45 },
            ];

            (service.findAll as jest.Mock).mockResolvedValue(appointments);

            await controller.getAll(req, res);

            expect(service.findAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ appointments });
        });

        it('Should handle errors when fetching appointments', async () => {
            const req = mockRequest();
            const res = mockResponse();

            const error = new Error('Failed to get appointments');
            (service.findAll as jest.Mock).mockRejectedValue(error);

            await controller.getAll(req, res);

            expect(handleError).toHaveBeenCalledWith(res, error);
        });
    });

    describe('Create', () => {
        it('Should create a new appointment if validation passes', async () => {
            const req = mockRequest({
                body: {
                    patient_id: 1,
                    doctor_id: 1,
                    specialization_id: 2,
                    appointment_date: '2024-09-01',
                    appointment_time: '10:00',
                    duration: 30,
                },
            });
            const res = mockResponse();

            const createAppointmentDto = new CreateAppointmentDto(req.body);
            const createdAppointment = { id: 1, ...req.body };

            (validate as jest.Mock).mockResolvedValue([]);
            (service.createAppointment as jest.Mock).mockResolvedValue(createdAppointment);

            await controller.create(req, res);

            expect(validate).toHaveBeenCalledWith(createAppointmentDto);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdAppointment);
        });

        it('Should return 400 if validation fails', async () => {
            const req = mockRequest({
                body: {
                    patient_id: '5',
                    doctor_id: 1,
                    specialization_id: 2,
                    appointment_date: 'invalid-date',
                    appointment_time: '10:00',
                    duration: 30,
                },
            });
            const res = mockResponse();

            const validationErrors = [{ property: 'patient_id', constraints: { isNumber: 'Patient ID should a number' } }];
            (validate as jest.Mock).mockResolvedValue(validationErrors);

            await controller.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(validationErrors);
        });

        it('Should handle errors during appointment creation', async () => {
            const req = mockRequest({
                body: {
                    patient_id: 1,
                    doctor_id: 1,
                    specialization_id: 2,
                    appointment_date: '2024-09-01',
                    appointment_time: '10:00',
                    duration: 30,
                },
            });
            const res = mockResponse();

            (validate as jest.Mock).mockResolvedValue([]);
            const error = new Error('Failed to create appointment');
            (service.createAppointment as jest.Mock).mockRejectedValue(error);

            await controller.create(req, res);

            expect(handleError).toHaveBeenCalledWith(res, error);
        });
    });

    describe('Update', () => {
        it('Should update an appointment if validation passes', async () => {
            const req = mockRequest({
                params: { id: '1' },
                body: {
                    duration: 45,
                },
            });
            const res = mockResponse();

            const updateAppointmentDto = new UpdateAppointmentDto(req.body);
            const updatedAppointment = {
                id: 1,
                patient_id: 1,
                doctor_id: 1,
                specialization_id: 2,
                appointment_date: '2024-09-01',
                appointment_time: '10:00',
                duration: 30
            };

            (validate as jest.Mock).mockResolvedValue([]);
            (service.updateAppointment as jest.Mock).mockResolvedValue(updatedAppointment);

            await controller.update(req, res);

            expect(validate).toHaveBeenCalledWith(updateAppointmentDto);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedAppointment);
        });

        it('Should return 400 if validation fails', async () => {
            const req = mockRequest({
                params: { id: '1' },
                body: {
                    duration: '45',
                },
            });
            const res = mockResponse();

            const validationErrors = [{ property: 'duration', constraints: { isNumber: 'Duration should be a number' } }];
            (validate as jest.Mock).mockResolvedValue(validationErrors);

            await controller.update(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(validationErrors);
        });

        it('Should handle errors during appointment update', async () => {
            const req = mockRequest({
                params: { id: '1' },
                body: {
                    duration: 45,
                },
            });
            const res = mockResponse();

            (validate as jest.Mock).mockResolvedValue([]);
            const error = new Error('Failed to update appointment');
            (service.updateAppointment as jest.Mock).mockRejectedValue(error);

            await controller.update(req, res);

            expect(handleError).toHaveBeenCalledWith(res, error);
        });
    });

    describe('Delete', () => {
        it('Should delete an appointment if found', async () => {
            const req = mockRequest({ params: { id: '1' } });
            const res = mockResponse();

            (service.deleteAppointment as jest.Mock).mockResolvedValue(undefined);

            await controller.delete(req, res);

            expect(service.deleteAppointment).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({ message: 'Appointment deleted' });
        });

        it('Should handle errors during appointment deletion', async () => {
            const req = mockRequest({ params: { id: '1' } });
            const res = mockResponse();

            const error = new Error('Failed to delete appointment');
            (service.deleteAppointment as jest.Mock).mockRejectedValue(error);

            await controller.delete(req, res);

            expect(handleError).toHaveBeenCalledWith(res, error);
        });
    });
});
