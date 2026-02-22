import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    question: "Will the talks be recorded?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
  },
  {
    question: "Is this event just for designers?",
    answer:
      "With your ticket, you'll receive entry to the event and access to all included features. These may range from general admission to VIP perks. Every tier offers something a little different.",
  },
  {
    question: "Does my ticket cover everything?",
    answer:
      "Most tickets include access to the main attractions, but some areas, services, or merchandise might require an upgrade. It's important to verify what's included to avoid surprises on event day.",
  },
  {
    question: "Can I refund or transfer my ticket?",
    answer:
      "Yes! Every ticket includes base-level access to the event. Higher-tier tickets may also include special perks like lounge access, priority entry, or complimentary items.",
  },
  {
    question: "What is the conference about?",
    answer:
      "Depending on the level of your ticket, you may receive early access, reserved seating, or bonus gifts. Benefits are designed to enhance your experience and are clearly listed when you book.",
  },
  {
    question: "Are there any perks with my ticket?",
    answer:
      "Ticket packages vary but often include entry, merchandise, and access to special areas or experiences. Premium packages may also feature food, drink, or exclusive meet-and-greets.",
  },
  {
    question: "What does my ticket include?",
    answer:
      "Of course! Each ticket includes a specific set of features like entry, activities, and sometimes extras. Your confirmation email or event page has all the details you need.",
  },
  {
    question: "How to become a speaker?",
    answer:
      "Your ticket purchase covers the base cost of entry and any listed amenities. In some cases, it may also include food, drinks, or access to additional activities and spaces.",
  },
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      /*
        Card style from screenshot:
        - dark border rounded-[16px]
        - open item has answer visible, × icon
        - closed item shows + icon
      */
      className="border border-white/10 rounded-[16px] bg-[#0d0d0d]
                 hover:border-white/20 transition-colors duration-300 overflow-hidden"
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between
                   px-6 py-5 text-left gap-4"
      >
        <span className="text-white font-semibold text-[15px] leading-snug">
          {faq.question}
        </span>
        {/* × when open, + when closed — matches site exactly */}
        <span className="flex-shrink-0 w-7 h-7 rounded-full border border-white/20
                         flex items-center justify-center
                         text-white/60 hover:text-white
                         transition-colors duration-200">
          {isOpen ? <X size={14} /> : <Plus size={14} />}
        </span>
      </button>

      {/* Answer — animates open/close */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  // First item open by default — matches screenshot
  const [openIndex, setOpenIndex] = useState(0);

  const leftFaqs  = faqs.slice(0, 4);
  const rightFaqs = faqs.slice(4, 8);

  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Heading — centered, large bold white ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Frequently Asked<br />Questions
          </h2>
        </motion.div>

        {/* ── 2-column FAQ grid — matches site exactly ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Left column */}
          <div className="flex flex-col gap-3">
            {leftFaqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-3">
            {rightFaqs.map((faq, i) => (
              <FAQItem
                key={i + 4}
                faq={faq}
                index={i + 4}
                isOpen={openIndex === i + 4}
                onToggle={() => setOpenIndex(openIndex === i + 4 ? null : i + 4)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}