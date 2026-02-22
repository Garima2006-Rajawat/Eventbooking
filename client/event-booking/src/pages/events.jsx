import { useEffect, useState } from "react";
import { getEvents } from "../api/eventApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Search, Filter } from "lucide-react";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ location: "", date: "" });
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const res = await getEvents(filters);
      setEvents(res.data);
      console.log("Events loaded:", res.data);
    } catch (err) {
      console.error("Error loading events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [filters]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated background */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px]" 
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-purple-400 mb-6 block">
              Browse All Events
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400">Events</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover amazing events, book instantly, and get your QR tickets in seconds.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by location..."
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-purple-500/30 rounded-xl backdrop-blur-xl focus:border-purple-500 focus:outline-none transition"
              />
            </div>
            <div className="flex-1 relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-purple-500/30 rounded-xl backdrop-blur-xl focus:border-purple-500 focus:outline-none transition"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            <p className="mt-4 text-gray-400">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No events found. Try adjusting your filters.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
          {events.map((event, i) => (
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
                    {/* Hover overlay */}
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
        )}
      </section>
    </div>
  );
}