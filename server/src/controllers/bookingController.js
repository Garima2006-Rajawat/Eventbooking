const Booking = require('../models/bookingModel');

exports.createBooking = async (req, res) => {
  try {
    let { event_id, name, email, mobile, quantity, price, total_amount } = req.body;

    // Convert to numbers safely
    event_id = Number(event_id);
    quantity = Number(quantity);

    // If frontend sends total_amount → trust it
    if (total_amount !== undefined) {
      total_amount = Number(total_amount);
    }
    // Else calculate using price
    else {
      price = Number(price);
      total_amount = quantity * price;
    }

    console.log("REQ BODY:", req.body);
    console.log("FINAL PAYLOAD:", { event_id, quantity, total_amount });

    // Validation
    if (!event_id || !name || !email || !quantity || !total_amount) {
      return res.status(400).json({ message: 'Missing or invalid booking data' });
    }

    const result = await Booking.createBooking({
      event_id,
      name,
      email,
      mobile,
      quantity,
      total_amount
    });

    res.status(201).json({
      message: 'Booking confirmed 🎉',
      bookingId: result.insertId
    });

  } catch (err) {
    console.error("BOOKING ERROR:", err.message);

    if (err.message.includes('Not enough seats')) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    res.status(500).json({ message: 'Booking failed' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.getAllBookings();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};