import { query } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const result = await query(`
      SELECT p.*, u.name AS author_name 
      FROM "News" p 
      LEFT JOIN "User" u ON p.author = u.id 
      WHERE p.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Новость не найдена' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}