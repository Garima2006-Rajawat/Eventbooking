import { motion } from "framer-motion";
import { useState } from "react";
import { createBooking } from "../../services/bookingApi";
import { useNavigate, useLocation } from "react-router-dom";

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { event, quantity } = state;

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: ""
  });

  const handleSubmit = async e => {
    e.preventDefault();

    await createBooking({
      event_id: event.id,
      ...form,
      quantity,
      total_amount: quantity * event.price
    });

    navigate("/success", { state: { event, quantity, ...form } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">
        Secure Checkout
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {["name", "email", "mobile"].map(field => (
          <input
            key={field}
            required
            placeholder={field.toUpperCase()}
            className="w-full bg-transparent border border-white/10 px-5 py-4 rounded-xl outline-none focus:border-pink-500 transition"
            onChange={e =>
              setForm({ ...form, [field]: e.target.value })
            }
          />
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-lg shadow-xl"
        >
          Pay ₹{quantity * event.price}
        </motion.button>

      </form>
    </motion.div>
  );
}