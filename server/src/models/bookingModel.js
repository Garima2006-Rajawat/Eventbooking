const db = require('../config/db');

exports.createBooking = async (bookingData) => {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    let {
      event_id,
      name,
      email,
      mobile,
      quantity,
      total_amount
    } = bookingData;

    event_id = Number(event_id);
    quantity = Number(quantity);
    total_amount = Number(total_amount);

    // 1. Check seat availability (LOCK ROW)
    const [eventRows] = await conn.query(
      'SELECT available_seats FROM events WHERE id = ? FOR UPDATE',
      [event_id]
    );

    if (eventRows.length === 0) {
      throw new Error('Event not found');
    }

    if (eventRows[0].available_seats < quantity) {
      throw new Error('Not enough seats available');
    }

    // 2. Reduce seats
    await conn.query(
      'UPDATE events SET available_seats = available_seats - ? WHERE id = ?',
      [quantity, event_id]
    );

    // 3. Create booking
    const [result] = await conn.query(
      `INSERT INTO bookings 
       (event_id, user_name, email, phone, quantity, total_amount) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [event_id, name, email, mobile, quantity, total_amount]
    );

    await conn.commit();

    return result;

  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

exports.getAllBookings = async () => {
  const [rows] = await db.query(`
    SELECT b.*, e.title, e.location, e.date 
    FROM bookings b
    JOIN events e ON b.event_id = e.id
    ORDER BY b.booking_date DESC
  `);

  return rows;
};