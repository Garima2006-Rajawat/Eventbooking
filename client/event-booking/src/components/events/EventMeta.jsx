import { motion } from "framer-motion";
import { Calendar, MapPin, DollarSign, Users } from "lucide-react";

export default function EventMeta({ event }) {
  const meta = [
    { icon: Calendar, label: "Date & Time", value: new Date(event.date).toLocaleString(), color: "purple" },
    { icon: MapPin, label: "Location", value: event.location, color: "blue" },
    { icon: DollarSign, label: "Price", value: `₹${event.price}`, color: "cyan" },
    { icon: Users, label: "Seats Available", value: event.available_seats, color: "green" }
  ];

  const colorClasses = {
    purple: "border-purple-500/30 hover:border-purple-500/60 bg-purple-500/10 hover:bg-purple-500/20",
    blue: "border-blue-500/30 hover:border-blue-500/60 bg-blue-500/10 hover:bg-blue-500/20",
    cyan: "border-cyan-500/30 hover:border-cyan-500/60 bg-cyan-500/10 hover:bg-cyan-500/20",
    green: "border-green-500/30 hover:border-green-500/60 bg-green-500/10 hover:bg-green-500/20"
  };

  const iconColorClasses = {
    purple: "text-purple-400",
    blue: "text-blue-400",
    cyan: "text-cyan-400",
    green: "text-green-400"
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {meta.map((item, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`border backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 ${colorClasses[item.color]}`}
          >
            <item.icon size={32} className={`mb-4 ${iconColorClasses[item.color]}`} />
            <p className="text-sm text-gray-400 mb-2 font-mono uppercase tracking-wider">{item.label}</p>
            <h3 className="text-2xl font-bold">{item.value}</h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}