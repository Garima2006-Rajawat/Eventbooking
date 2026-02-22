import { motion } from "framer-motion";
import { useState } from "react";
import { User, Mail, Phone } from "lucide-react";

export default function BookingForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6 mt-6"
    >
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          name="name" 
          placeholder="Full Name" 
          onChange={handleChange} 
          required 
          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-purple-500/30 rounded-xl backdrop-blur-xl focus:border-purple-500 focus:outline-none transition text-white placeholder-gray-400"
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          name="email" 
          type="email"
          placeholder="Email Address" 
          onChange={handleChange} 
          required 
          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-purple-500/30 rounded-xl backdrop-blur-xl focus:border-purple-500 focus:outline-none transition text-white placeholder-gray-400"
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          name="mobile" 
          type="tel"
          placeholder="Mobile Number" 
          onChange={handleChange} 
          required 
          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-purple-500/30 rounded-xl backdrop-blur-xl focus:border-purple-500 focus:outline-none transition text-white placeholder-gray-400"
        />
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(139, 92, 246, 0.5)" }}
        className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-500/50 transition"
        type="submit"
      >
        Confirm Booking
      </motion.button>
    </motion.form>
  );
}