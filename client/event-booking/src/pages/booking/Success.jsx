import Confetti from "react-confetti";
import { useLocation, Link } from "react-router-dom";
import TicketQR from "../../components/booking/TicketQR";

export default function Success() {
  const { state } = useLocation();
  const { event, quantity, name } = state;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6">
      <Confetti />

      <h1 className="text-5xl font-extrabold mb-6">
        Booking Confirmed 🎉
      </h1>

      <p className="text-gray-300 mb-10">
        Enjoy your event, {name}!
      </p>

      <TicketQR data={{ event, quantity, name }} />

      <Link
        to="/events"
        className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
      >
        Book More Events
      </Link>
    </div>
  );
}