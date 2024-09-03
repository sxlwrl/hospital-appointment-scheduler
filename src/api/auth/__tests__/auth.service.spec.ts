import bcrypt from 'bcrypt';
import { AuthService } from '../auth.service';
import { IPatientRepository } from '../../patient/interfaces/IPatientRepository';
import { LoginDto, RegisterDto } from '../auth.dto';
import { generateToken, verifyToken } from '../../../utils/jwt';
import { AlreadyExistsError } from '../../../errors/AlreadyExists.error';
import { NotFoundError } from '../../../errors/NotFound.error';
import { InvalidCredentialsError } from '../../../errors/InvalidCredentials.error';

jest.mock('bcrypt');
jest.mock('../../../utils/jwt');

const mockPatientRepository = {
    findByUsername: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
} as unknown as IPatientRepository;

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService(mockPatientRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Register', () => {
        it('Should create a new user if username and email are not taken', async () => {
            const registerDto: RegisterDto = {
                username: 'test',
                firstName: 'test',
                lastName: 'test',
                email: 'test@example.com',
                password: '123456',
            };

            (mockPatientRepository.findByUsername as jest.Mock).mockResolvedValueOnce(null);
            (mockPatientRepository.findByEmail as jest.Mock).mockResolvedValueOnce(null);
            (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashed_password');
            (mockPatientRepository.create as jest.Mock).mockResolvedValueOnce(registerDto);

            const result = await authService.register(registerDto);

            expect(mockPatientRepository.findByUsername).toHaveBeenCalledWith('test');
            expect(mockPatientRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
            expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
            expect(mockPatientRepository.create).toHaveBeenCalledWith({
                ...registerDto,
                password: expect.any(String),
            });
            expect(result).toEqual(registerDto);
        });

        it('Should throw AlreadyExistsError if username is taken', async () => {
            const registerDto: RegisterDto = {
                username: 'test',
                firstName: 'test',
                lastName: 'test',
                email: 'test@example.com',
                password: '123456',
            };

            (mockPatientRepository.findByUsername as jest.Mock).mockResolvedValueOnce(registerDto);

            await expect(authService.register(registerDto)).rejects.toThrow(AlreadyExistsError);
            expect(mockPatientRepository.findByUsername).toHaveBeenCalledWith('test');
        });

        it('Should throw AlreadyExistsError if email is taken', async () => {
            const registerDto: RegisterDto = {
                username: 'test',
                firstName: 'test',
                lastName: 'test',
                email: 'test@example.com',
                password: '123456',
            };

            (mockPatientRepository.findByUsername as jest.Mock).mockResolvedValueOnce(null);
            (mockPatientRepository.findByEmail as jest.Mock).mockResolvedValueOnce(registerDto);

            await expect(authService.register(registerDto)).rejects.toThrow(AlreadyExistsError);
            expect(mockPatientRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
        });
    });

    describe('login', () => {
        it('Should return tokens if credentials are valid', async () => {
            const loginDto: LoginDto = {
                username: 'test',
                password: '123456',
            };

            const user = {
                id: 1,
                username: 'test',
                password_hash: 'hashed_password',
            };

            (mockPatientRepository.findByUsername as jest.Mock).mockResolvedValueOnce(user);
            (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
            (generateToken as jest.Mock).mockReturnValueOnce('access_token');
            (generateToken as jest.Mock).mockReturnValueOnce('refresh_token');

            const result = await authService.login(loginDto);

            expect(mockPatientRepository.findByUsername).toHaveBeenCalledWith('test');
            expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashed_password');
            expect(generateToken).toHaveBeenCalledTimes(2);
            expect(result).toEqual({
                accessToken: 'access_token',
                refreshToken: 'refresh_token',
            });
        });

        it('Should throw NotFoundError if user is not found', async () => {
            const loginDto: LoginDto = {
                username: 'test',
                password: '123456',
            };

            (mockPatientRepository.findByUsername as jest.Mock).mockResolvedValueOnce(null);

            await expect(authService.login(loginDto)).rejects.toThrow(NotFoundError);
            expect(mockPatientRepository.findByUsername).toHaveBeenCalledWith('test');
        });

        it('Should throw InvalidCredentialsError if password is incorrect', async () => {
            const loginDto: LoginDto = {
                username: 'test',
                password: '123456',
            };

            const user = {
                id: 1,
                username: 'test',
                password_hash: 'hashed_password',
            };

            (mockPatientRepository.findByUsername as jest.Mock).mockResolvedValueOnce(user);
            (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

            await expect(authService.login(loginDto)).rejects.toThrow(InvalidCredentialsError);
            expect(mockPatientRepository.findByUsername).toHaveBeenCalledWith('test');
            expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashed_password');
        });
    });

    describe('refreshToken', () => {
        it('Should return a new access token if the refresh token is valid', async () => {
            const refreshToken = 'valid_refresh_token';
            const payload = { userId: 1 };

            (verifyToken as jest.Mock).mockReturnValueOnce(true);
            (generateToken as jest.Mock).mockReturnValueOnce('new_access_token');
            jest.spyOn(Buffer, 'from').mockReturnValueOnce({
                toString: jest.fn().mockReturnValueOnce(JSON.stringify(payload)),
            } as any);

            const result = await authService.refreshToken(refreshToken);

            expect(verifyToken).toHaveBeenCalledWith(refreshToken);
            expect(generateToken).toHaveBeenCalledWith(
                { userId: 1 },
                expect.any(Number),
                'HS384',
            );
            expect(result).toEqual('new_access_token');
        });

        it('Should throw InvalidCredentialsError if the refresh token is invalid', async () => {
            const refreshToken = 'invalid_refresh_token';

            (verifyToken as jest.Mock).mockReturnValueOnce(false);

            await expect(authService.refreshToken(refreshToken)).rejects.toThrow(InvalidCredentialsError);
            expect(verifyToken).toHaveBeenCalledWith(refreshToken);
        });
    });
});
