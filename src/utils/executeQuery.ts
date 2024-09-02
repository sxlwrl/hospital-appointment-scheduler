import { Pool, QueryResult } from 'pg';

export const executeQuery = async (
  pool: Pool,
  query: string,
  values?: any[],
): Promise<QueryResult> => {
  try {
    return values ? await pool.query(query, values) : await pool.query(query);
  } catch (error) {
    throw new Error('Cannot execute query');
  }
};
