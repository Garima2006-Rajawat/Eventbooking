import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Ticket, Shield } from "lucide-react";

const features = [
  { icon: Zap, text: "Real-Time Booking" },
  { icon: Ticket, text: "Instant QR Tickets" },
  { icon: Shield, text: "Secure Payments" },
];

export default function CTA() {
  return (
    <section className="bg-black py-32 relative overflow-hidden">
      {/* Animated background glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[150px]" 
      />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-indigo-500 mb-6 block"
          >
            Ready to Experience
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-tight"
          >
            Book Your
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500"
            >
              Next Event
            </motion.span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto"
          >
            Discover amazing events and secure your spot with instant booking and real-time seat updates.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/events">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-bold transition shadow-lg shadow-indigo-500/50"
              >
                Browse Events
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature cards */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl text-center"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 mb-4"
              >
                <feature.icon size={24} />
              </motion.div>
              <p className="text-white font-semibold">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
