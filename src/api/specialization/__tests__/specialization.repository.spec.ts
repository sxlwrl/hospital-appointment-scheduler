import { FieldDef, Pool, QueryResult } from 'pg';
import { SpecializationRepository } from '../specialization.repository';
import { Specialization } from '../specialization.model';
import {
  CreateSpecializationDto,
  UpdateSpecializationDto,
} from '../specialization.dto';

jest.mock('pg', () => {
  const mockedPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mockedPool) };
});

describe('SpecializationRepository', () => {
  let repository: SpecializationRepository;
  let pool: jest.Mocked<Pool>;

  beforeEach(() => {
    pool = new Pool() as jest.Mocked<Pool>;
    repository = new SpecializationRepository(pool);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('FindById', () => {
    it('Should return a specialization if it is found', async () => {
      const specialization = new Specialization(1, 'Surgery');
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rowCount: 1,
        rows: [specialization],
      } as QueryResult);

      const result = await repository.findById(1);

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM specializations WHERE id = $1',
        [1],
      );
      expect(result).toEqual(specialization);
    });

    it('Should return null if no specialization is found', async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rowCount: 0,
        rows: [],
        command: '',
        oid: 0,
        fields: [] as FieldDef[],
      } as QueryResult);

      const result = await repository.findById(1);

      expect(result).toBeNull();
    });
  });

  describe('FindByTitle', () => {
    it('Should return a specialization if it is found', async () => {
      const specialization = new Specialization(1, 'Surgery');
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rowCount: 1,
        rows: [specialization],
        command: '',
        oid: 0,
        fields: [] as FieldDef[],
      } as QueryResult);

      const result = await repository.findByTitle('Surgery');

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM specializations WHERE title = $1',
        ['Surgery'],
      );
      expect(result).toEqual(specialization);
    });

    it('Should return null if no specialization is found', async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rowCount: 0,
        rows: [],
        command: '',
        oid: 0,
        fields: [] as FieldDef[],
      } as QueryResult);

      const result = await repository.findByTitle('Surgery');

      expect(result).toBeNull();
    });
  });

  describe('FindAll', () => {
    it('Should return an array of specializations', async () => {
      const specializations = [
        new Specialization(1, 'Surgery'),
        new Specialization(2, 'Neurology'),
      ];
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rowCount: 2,
        rows: specializations,
        command: '',
        oid: 0,
        fields: [] as FieldDef[],
      } as QueryResult);

      const result = await repository.findAll();

      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM specializations');
      expect(result).toEqual(specializations);
    });
  });

  describe('Create', () => {
    it('Should create and return a specialization', async () => {
      const createDto: CreateSpecializationDto = { title: 'Surgery' };
      const specialization = new Specialization(1, createDto.title);
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rowCount: 1,
        rows: [specialization],
        command: '',
        oid: 0,
        fields: [] as FieldDef[],
      } as QueryResult);

      const result = await repository.create(createDto);

      expect(pool.query).toHaveBeenCalledWith(
        'INSERT INTO specializations (title) VALUES ($1) RETURNING *',
        [createDto.title],
      );
      expect(result).toEqual(specialization);
    });
  });

  describe('Update', () => {
    it('Should update and return the specialization', async () => {
      const updateDto: UpdateSpecializationDto = {
        title: 'Neurology',
      };
      const specialization = new Specialization(1, updateDto.title);
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rowCount: 1,
        rows: [specialization],
      } as QueryResult);

      const result = await repository.update(1, updateDto);

      expect(pool.query).toHaveBeenCalledWith(
        'UPDATE specializations SET title = $1 WHERE id = 1 RETURNING *',
        [updateDto.title],
      );
      expect(result).toEqual(specialization);
    });
  });

  describe('Delete', () => {
    it('Should delete the specialization', async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({
        rowCount: 1,
      } as QueryResult);

      await repository.delete(1);

      expect(pool.query).toHaveBeenCalledWith(
        'DELETE FROM specializations WHERE id = $1',
        [1],
      );
    });
  });
});
