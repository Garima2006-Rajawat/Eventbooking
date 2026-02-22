CREATE DATABASE IF NOT EXISTS event_booking;
USE event_booking;

-- ========================
-- EVENTS TABLE
-- ========================
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  venue VARCHAR(255),
  price DECIMAL(10,2) NOT NULL,
  total_seats INT NOT NULL,
  available_seats INT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- BOOKINGS TABLE
-- ========================
CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  user_name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  quantity INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  booking_code VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- ========================
-- SAMPLE EVENTS DATA
-- ========================
INSERT INTO events 
(title, description, date, time, venue, price, total_seats, available_seats, image_url)
VALUES
('Tech Conference 2026', 'Annual tech meetup for developers', '2026-03-10', '10:00:00', 'Indore Convention Center', 499.00, 200, 200,
'https://images.unsplash.com/photo-1503428593586-e225b39bddfe'),

('Music Fest Night', 'Live music festival with DJs & bands', '2026-04-05', '18:00:00', 'Bhopal Stadium', 799.00, 300, 300,
'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'),

('Startup Meetup', 'Networking event for founders & investors', '2026-03-25', '15:00:00', 'Co-working Hub, Indore', 299.00, 100, 100,
'https://images.unsplash.com/photo-1511578314322-379afb476865');