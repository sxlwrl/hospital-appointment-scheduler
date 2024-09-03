import { Request, Response } from 'express';
import { AuthController } from '../auth.controller';
import { IAuthService } from '../interfaces/IAuthService';
import { handleError } from '../../../utils/handleError';
import { validate } from 'class-validator';
import { LoginDto, RegisterDto } from '../auth.dto';

jest.mock('../../../utils/handleError', () => ({
    handleError: jest.fn(),
}));

jest.mock('class-validator', () => ({
    validate: jest.fn(),
    IsNotEmpty: jest.fn().mockImplementation(() => () => {}),
    IsEmail: jest.fn().mockImplementation(() => () => {}),
    IsString: jest.fn().mockImplementation(() => () => {}),
    IsOptional: jest.fn().mockImplementation(() => () => {}),
    MinLength: jest.fn().mockImplementation(() => () => {}),
    MaxLength: jest.fn().mockImplementation(() => () => {}),
}));

const mockAuthService = () => ({
    register: jest.fn(),
    login: jest.fn(),
    refreshToken: jest.fn(),
});

const mockRequest = (overrides = {}) =>
    ({
        body: {},
        cookies: {},
        ...overrides,
    }) as Request;

const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn();
    return res;
};

describe('AuthController', () => {
    let controller: AuthController;
    let service: jest.Mocked<IAuthService>;

    beforeEach(() => {
        service = mockAuthService() as jest.Mocked<IAuthService>;
        controller = new AuthController(service);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Register', () => {
        it('Should register a new patient if validation passes', async () => {
            const req = mockRequest({ body: { username: 'test', firstName: 'test', lastName: 'test', email: 'test@example.com', password: '123456' } });
            const res = mockResponse();

            const registerDto = new RegisterDto(req.body);
            const createdPatient = { id: 1, username: 'test', firstName: 'test', lastName: 'test', email: 'test@example.com', password: 'hashedPassword' };

            (validate as jest.Mock).mockResolvedValue([]);
            (service.register as jest.Mock).mockResolvedValue(createdPatient);

            await controller.register(req, res);

            expect(validate).toHaveBeenCalledWith(registerDto);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdPatient);
        });

        it('Should return 400 if validation fails', async () => {
            const req = mockRequest({ body: { username: '', firstName: 'test', lastName: 'test', email: 'test@example.com', password: '123456' } });
            const res = mockResponse();

            const validationErrors = [{ property: 'username', constraints: { isNotEmpty: 'Username should not be empty' } }];
            (validate as jest.Mock).mockResolvedValue(validationErrors);

            await controller.register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ errors: validationErrors });
        });

        it('Should handle errors', async () => {
            const req = mockRequest({ body: { email: 'test@example.com', password: 'password123' } });
            const res = mockResponse();

            (validate as jest.Mock).mockResolvedValue([]);
            const error = new Error('Registration failed');
            (service.register as jest.Mock).mockRejectedValue(error);

            await controller.register(req, res);

            expect(handleError).toHaveBeenCalledWith(res, error);
        });
    });

    describe('Login', () => {
        it('Should login a patient if validation passes', async () => {
            const req = mockRequest({ body: { username: 'test', password: '123456' } });
            const res = mockResponse();

            const loginDto = new LoginDto(req.body);
            const tokens = { accessToken: 'access-token', refreshToken: 'refresh-token' };

            (validate as jest.Mock).mockResolvedValue([]);
            (service.login as jest.Mock).mockResolvedValue(tokens);

            await controller.login(req, res);

            expect(validate).toHaveBeenCalledWith(loginDto);
            expect(res.cookie).toHaveBeenCalledWith('accessToken', tokens.accessToken, expect.any(Object));
            expect(res.cookie).toHaveBeenCalledWith('refreshToken', tokens.refreshToken, expect.any(Object));
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Patient logged in', token: tokens.accessToken });
        });

        it('Should return 400 if validation fails', async () => {
            const req = mockRequest({ body: { username: '', password: '123456' } });
            const res = mockResponse();

            const validationErrors = [{ property: 'username', constraints: { isNotEmpty: 'Username should not be empty' } }];
            (validate as jest.Mock).mockResolvedValue(validationErrors);

            await controller.login(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ errors: validationErrors });
        });

        it('Should handle errors', async () => {
            const req = mockRequest({ body: { username: 'test', password: '123456' } });
            const res = mockResponse();

            (validate as jest.Mock).mockResolvedValue([]);
            const error = new Error('Login failed');
            (service.login as jest.Mock).mockRejectedValue(error);

            await controller.login(req, res);

            expect(handleError).toHaveBeenCalledWith(res, error);
        });
    });

    describe('RefreshToken', () => {
        it('Should refresh the token if the request is valid', async () => {
            const req = mockRequest({ cookies: { refreshToken: 'refresh-token' } });
            const res = mockResponse();

            const newRefreshToken = 'new-refresh-token';

            (service.refreshToken as jest.Mock).mockResolvedValue(newRefreshToken);

            await controller.refreshToken(req, res);

            expect(res.cookie).toHaveBeenCalledWith('refreshToken', newRefreshToken, expect.any(Object));
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(newRefreshToken);
        });

        it('Should handle errors during token refresh', async () => {
            const req = mockRequest({ cookies: { refreshToken: 'invalid-token' } });
            const res = mockResponse();

            const error = new Error('Token refresh failed');
            (service.refreshToken as jest.Mock).mockRejectedValue(error);

            await controller.refreshToken(req, res);

            expect(handleError).toHaveBeenCalledWith(res, error);
        });
    });
});
