const db = require('../config/db');

exports.createEvent = async (data) => {
  const [result] = await db.query('INSERT INTO events SET ?', data);
  return result;
};

exports.getAllEvents = async (filters) => {
  let query = 'SELECT * FROM events WHERE 1=1';
  const params = [];

  if (filters.location) {
    query += ' AND location LIKE ?';
    params.push(`%${filters.location}%`);
  }

  if (filters.date) {
    query += ' AND DATE(date) = ?';
    params.push(filters.date);
  }

  query += ' ORDER BY date ASC';

  const [rows] = await db.query(query, params);
  return rows;
};

exports.getEventById = async (id) => {
  const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
  return rows[0];
};

exports.updateEvent = async (id, data) => {
  const [result] = await db.query('UPDATE events SET ? WHERE id = ?', [data, id]);
  return result;
};

exports.deleteEvent = async (id) => {
  const [result] = await db.query('DELETE FROM events WHERE id = ?', [id]);
  return result;
};