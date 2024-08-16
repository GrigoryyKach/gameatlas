import { query } from '../../lib/db';

export default async function handler(req, res) {
  try {
    const result = await query('SELECT * FROM genre');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}