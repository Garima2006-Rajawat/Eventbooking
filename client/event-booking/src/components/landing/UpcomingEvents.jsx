import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import { Calendar, MapPin } from "lucide-react";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events?limit=6")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="bg-[#0a0a0a] text-white py-24 relative overflow-hidden">
      {/* Background glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px]" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-purple-400 mb-4 block">
            Discover Events
          </span>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400">Events</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Discover concerts, workshops, conferences and exclusive experiences.
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.12 }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6 }}
            >
              <Link to={`/events/${event.id}`} className="block group">
                <div className="relative overflow-hidden rounded-2xl bg-black border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden relative">
                    {(event.image || event.img) ? (
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={event.image || event.img}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-black flex items-center justify-center">
                        <span className="text-6xl opacity-30">🎫</span>
                      </div>
                    )}
                    {/* Hover overlay with purple gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 via-purple-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar size={16} className="text-purple-400" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin size={16} className="text-purple-400" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                        ₹{event.price}
                      </span>
                      <span className="text-sm text-gray-500">{event.available_seats} seats</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/events">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-full backdrop-blur-xl transition shadow-lg shadow-purple-500/50 font-bold"
            >
              View All Events
              <span className="text-xl">→</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}