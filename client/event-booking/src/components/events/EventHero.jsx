import { motion } from "framer-motion";
import { Calendar, MapPin, Users, DollarSign } from "lucide-react";

export default function EventHero({ event }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-black"
      />

      {event.image && (
        <>
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-purple-400 mb-6 block"
        >
          Event Details
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400">
            {event.title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12"
        >
          {event.description}
        </motion.p>

        {/* Quick Info Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <div className="flex items-center gap-2 px-6 py-3 bg-purple-500/20 border border-purple-500/30 rounded-full backdrop-blur-xl">
            <Calendar size={18} className="text-purple-400" />
            <span className="font-semibold">{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 border border-blue-500/30 rounded-full backdrop-blur-xl">
            <MapPin size={18} className="text-blue-400" />
            <span className="font-semibold">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-500/30 rounded-full backdrop-blur-xl">
            <DollarSign size={18} className="text-cyan-400" />
            <span className="font-semibold">₹{event.price}</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-full backdrop-blur-xl">
            <Users size={18} className="text-green-400" />
            <span className="font-semibold">{event.available_seats} seats left</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}