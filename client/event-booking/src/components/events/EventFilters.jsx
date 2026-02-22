import { motion } from "framer-motion";

export default function EventFilters({ setFilters }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 flex flex-wrap gap-4"
    >
      <input
        placeholder="Search location..."
        className="flex-1 bg-transparent border border-white/10 px-4 py-3 rounded-lg outline-none focus:border-pink-500 transition"
        onChange={e =>
          setFilters(f => ({ ...f, location: e.target.value }))
        }
      />

      <input
        type="date"
        className="bg-transparent border border-white/10 px-4 py-3 rounded-lg outline-none focus:border-pink-500 transition"
        onChange={e =>
          setFilters(f => ({ ...f, date: e.target.value }))
        }
      />
    </motion.div>
  );
}