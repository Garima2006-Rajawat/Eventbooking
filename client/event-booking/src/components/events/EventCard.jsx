import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function EventCard({ event, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="relative group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-pink-500/20 transition-all"
    >
      {/* Image */}
      <div className="h-52 overflow-hidden">
        <img
          src={event.img}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>

        <p className="text-sm text-gray-400">
          📍 {event.location}
        </p>

        <p className="text-sm text-gray-400">
          🗓 {new Date(event.date).toLocaleDateString()}
        </p>

        {/* Seat indicator */}
        <div className="flex justify-between items-center mt-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              event.available_seats > 10
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {event.available_seats} seats left
          </span>

          <Link
            to={`/events/${event.id}`}
            className="text-sm font-semibold text-pink-400 hover:text-pink-300"
          >
            View →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}