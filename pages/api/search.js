import { query } from '../../lib/db';

export default async function handler(req, res) {
  const { term } = req.query;

  if (!term) {
    return res.status(400).json({ error: 'No search term provided' });
  }

  try {
    const postResults = await query('SELECT title, slug, "post" AS source FROM post WHERE title ILIKE $1', [`%${term}%`]);
    const terminResults = await query('SELECT name AS title, slug, "termin" AS source FROM termin WHERE name ILIKE $1', [`%${term}%`]);
    const genreResults = await query('SELECT name AS title, slug, "genre" AS source FROM genre WHERE name ILIKE $1', [`%${term}%`]);

    const results = [...postResults.rows, ...terminResults.rows, ...genreResults.rows];

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
