const validateBooking = (req, res, next) => {
  const { event_id, name, email, mobile, quantity } = req.body;

  if (!event_id || !name || !email || !quantity) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Mobile is optional, but if provided, validate it
  if (mobile && !/^\d{10,15}$/.test(mobile.replace(/\D/g, ''))) {
    return res.status(400).json({ error: 'Invalid mobile number' });
  }

  if (quantity < 1 || quantity > 10) {
    return res.status(400).json({ error: 'Quantity must be between 1 and 10' });
  }

  next();
};

const validateEvent = (req, res, next) => {
  const { title, date, price, total_seats } = req.body;

  if (!title || !date || !price || !total_seats) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  if (price < 0 || total_seats < 1) {
    return res.status(400).json({ error: 'Invalid price or seats' });
  }

  next();
};

module.exports = { validateBooking, validateEvent };
