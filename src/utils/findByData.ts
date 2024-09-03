import { Pool } from 'pg';
import { executeQuery } from './executeQuery';

export const findByData = async <T>(
  pool: Pool,
  selectField: string[],
  table: string,
  field: string,
  value: any,
  mapFn: any,
): Promise<T | null> => {
  const selected = selectField.join(',');
  const query = `SELECT ${selected} FROM ${table} WHERE ${field} = $1`;
  const result = await executeQuery(pool, query, [value]);
  return result.rowCount ? mapFn(result.rows[0]) : null;
};
