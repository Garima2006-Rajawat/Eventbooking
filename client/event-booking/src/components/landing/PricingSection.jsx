import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    badge: "Basic",
    price: "$99",
    features: [
      "Full event access",
      "Access to keynote & breakout sessions",
      "Networking opportunities",
      "Access to post-event session recordings",
      "Conference materials and swag bag",
    ],
  },
  {
    badge: "Premium",
    price: "$399",
    features: [
      "Full event access",
      "Access to keynote & breakout sessions",
      "Networking opportunities",
      "Access to post-event session recordings",
      "Conference materials and swag bag",
    ],
  },
];

export default function PricingSection() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-[#8c52ff] py-24 overflow-hidden">

      {/* ── Decorative blob shape — left side, matches site ── */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[500px]
                      bg-[#7340e8] rounded-r-full opacity-50 blur-[2px] pointer-events-none" />
      <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-[200px] h-[350px]
                      bg-[#6b30e0] rounded-r-full opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* ── Section header — center aligned ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#fdf67b] mb-4">
            Pricing For Tickets
          </h2>
          <p className="text-white/80 max-w-sm mx-auto text-sm leading-relaxed">
            <span className="text-white font-semibold">
              Explore our lineup of keynote speakers and industry{" "}
            </span>
            leaders who will inspire and enlighten at the conference.
          </p>
        </motion.div>

        {/* ── Pricing cards — 2 col, centered ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              /*
                Card style from screenshot:
                - white/semi-transparent bg
                - rounded-[24px]
                - inner padding
                - no heavy shadow — floats on the purple bg
              */
              className="bg-white/15 backdrop-blur-sm rounded-[24px] p-8
                         border border-white/20
                         hover:bg-white/20 transition-colors duration-300"
            >
              {/* Badge — "Basic" / "Premium" */}
              <div className="inline-flex px-3 py-1 rounded-full bg-white/15 border border-white/20
                              text-white text-xs font-semibold mb-6">
                {plan.badge}
              </div>

              {/* Price row — big yellow price left, "Get a seat" right */}
              <div className="flex items-end justify-between mb-6">
                <span className="text-[#fdf67b] text-5xl font-black leading-none">
                  {plan.price}
                </span>
                <button
                  onClick={() => navigate("/events")}
                  className="text-white/70 text-sm font-medium
                             hover:text-white transition-colors duration-200
                             underline underline-offset-4"
                >
                  Get a seat
                </button>
              </div>

              {/* Subtext */}
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                <span className="text-white font-semibold">
                  Explore our lineup of keynote speakers and industry{" "}
                </span>
                leaders who will inspire and enlighten at the conference.
              </p>

              {/* Divider */}
              <div className="border-t border-white/15 mb-6" />

              {/* Features list — + icon, matches site */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white text-sm">
                    <span className="text-[#fdf67b] font-bold text-base leading-none">+</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Buy Ticket button — white pill, purple circle arrow */}
              <motion.button
                onClick={() => navigate("/events")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group w-full flex items-center justify-between
                           pl-6 pr-2 py-2 rounded-full
                           bg-white text-black font-bold text-sm
                           transition-all duration-200"
              >
                Buy Ticket
                <div
                  className="w-9 h-9 rounded-full bg-[#8c52ff]
                              flex items-center justify-center
                              group-hover:translate-x-0.5
                              transition-transform duration-200"
                >
                  <ArrowRight size={17} className="text-white" />
                </div>
              </motion.button>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}