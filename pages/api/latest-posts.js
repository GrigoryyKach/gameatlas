import { query } from '../../lib/db';

export default async function handler(req, res) {
  try {
    const result = await query('SELECT * FROM post ORDER BY created_at DESC LIMIT 12');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}
