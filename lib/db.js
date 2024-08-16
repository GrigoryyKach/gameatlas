import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_API_URL,
});

export const query = (text, params) => pool.query(text, params);