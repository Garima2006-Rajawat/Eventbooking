import { useEffect, useState } from 'react';
import socket from '../services/socket';
import BookingForm from '../components/BookingForm';
import { createBooking } from '../api/bookingApi';
import { useNavigate } from 'react-router-dom';

export default function Booking({ event }) {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [availableSeats, setAvailableSeats] = useState(0);

  // Set initial available seats
  useEffect(() => {
    if (event) {
      setAvailableSeats(event.available_seats);
    }
  }, [event]);

  // Listen for real-time seat updates
  useEffect(() => {
    if (!event) return;

    const handleSeatUpdate = ({ eventId, availableSeats }) => {
      if (eventId === event.id) {
        setAvailableSeats(availableSeats);
      }
    };

    socket.on('seatUpdate', handleSeatUpdate);

    return () => {
      socket.off('seatUpdate', handleSeatUpdate);
    };
  }, [event]);

  // Cleanup seat locks on unmount
  useEffect(() => {
    return () => {
      if (event && quantity > 1) {
        socket.emit('unlockSeats', {
          eventId: event.id,
          quantity: quantity - 1
        });
      }
    };
  }, [event, quantity]);

  const increase = () => {
    if (quantity < availableSeats) {
      setQuantity(q => q + 1);
      socket.emit('lockSeats', { eventId: event.id, quantity: 1 });
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
      socket.emit('unlockSeats', { eventId: event.id, quantity: 1 });
    }
  };

  const handleBooking = async (userData) => {
    try {
      const payload = {
        event_id: event.id,
        ...userData,
        quantity,
        total_amount: quantity * event.price
      };
console.log("FINAL PAYLOAD:", payload);
      const res = await createBooking(payload);

      navigate('/success', {
        state: {
          booking: res.data,
          event,
          quantity
        }
      });

    } catch (err) {
      console.error("BOOKING ERROR:", err);
      alert(err.response?.data?.message || "Booking failed. Try again.");
    }
  };

  if (!event) return null;

  return (
  <div className="w-full max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl text-white">

    <h3 className="text-2xl font-bold text-center mb-6">
      Select Your Tickets
    </h3>

    <p className="text-center text-gray-300 mb-8">
      Live Seats: <span className="text-white font-bold">{availableSeats}</span>
    </p>

    <div className="flex items-center justify-center gap-6 mb-10">
      <button
        onClick={decrease}
        className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition text-xl"
      >
        −
      </button>

      <span className="text-4xl font-extrabold">
        {quantity}
      </span>

      <button
        onClick={increase}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-110 transition-transform text-xl"
      >
        +
      </button>
    </div>

    <BookingForm onSubmit={handleBooking} />

  </div>
);
}