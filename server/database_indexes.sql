-- Performance Indexes for Event Booking System
-- Run these queries on your production database for faster queries

-- Index on events table for date filtering
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

-- Index on bookings table for event lookups
CREATE INDEX IF NOT EXISTS idx_bookings_event_id ON bookings(event_id);

-- Index on bookings table for email searches
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);

-- Composite index for common queries
CREATE INDEX IF NOT EXISTS idx_bookings_event_email ON bookings(event_id, email);
