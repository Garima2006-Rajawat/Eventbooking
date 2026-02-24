const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
  try {
    const eventData = { ...req.body };

    if (!eventData.title || !eventData.date || !eventData.total_seats) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Format date to YYYY-MM-DD
    if (eventData.date) {
      eventData.date = new Date(eventData.date).toISOString().split('T')[0];
    }

    eventData.available_seats = eventData.total_seats;

    const result = await Event.createEvent(eventData);
    res.status(201).json({ message: 'Event created successfully', id: result.insertId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.getAllEvents(req.query);
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.getEventById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Format date to YYYY-MM-DD if it exists
    if (data.date) {
      data.date = new Date(data.date).toISOString().split('T')[0];
    }
    
    // Remove fields that shouldn't be updated
    delete data.id;
    delete data.created_at;
    
    const result = await Event.updateEvent(req.params.id, data);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const result = await Event.deleteEvent(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};