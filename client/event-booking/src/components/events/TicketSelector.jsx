import { motion } from "framer-motion";
import { useState } from "react";
import Booking from "../../pages/Booking";

export default function TicketSelector({ event }) {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          Select Your Tickets
        </h2>

        <Booking event={event} />
      </motion.div>
    </section>
  );
}