import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const speakers = [
  { name: "Dr. Marcus Elwood",  role: "AI Scientist, NeuroCore Labs",     bgColor: "#fbc16a", img: "https://cdn.prod.website-files.com/687f5648b07a8b67bf809294/68807fe3fa2c3b7e74f497a7_f32842e72824373ee91071fc214bd16b_team-1-p-500.png" },
  { name: "Jonathan Reyes",     role: "Head of Cloud Engineering",         bgColor: "#61a0ff", img: "https://cdn.prod.website-files.com/687f5648b07a8b67bf809294/6891abdd656a3e0a19ab960e_688b4fcf7eec039af9714996_team-1%20(1).png" },
  { name: "Daniel Kim",         role: "Founder & CTO, DevSync",            bgColor: "#a375ff", img: "https://cdn.prod.website-files.com/687f5648b07a8b67bf809294/6891ad17e238089228940c0b_688b4fcf7eec039af9714996_team-1%20(2).png" },
  { name: "Ahmed Faizal",       role: "Lead Cybersecurity Architect",       bgColor: "#ff7b7b", img: "https://cdn.prod.website-files.com/687f5648b07a8b67bf809294/6891acc20a821d240d8c73f9_sd.png" },
];

export default function SpeakersSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Staggered Grid Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              // Key: odd columns pushed DOWN to create the staggered look from the site
              className={`flex flex-col group ${index % 2 !== 0 ? "lg:mt-16" : ""}`}
            >
              {/* ── Pill Card — exactly like the site ── */}
              {/* Tall pill shape, colored bg, image sits at bottom overflowing upward */}
              <div
                style={{ backgroundColor: speaker.bgColor, height: "340px" }}
                className="relative rounded-[48px] overflow-hidden flex items-end justify-center transition-transform duration-500 ease-out group-hover:-translate-y-2"
              >
                {/* Subtle top shine — site cards have a slight highlight at top */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                {/* Speaker image — anchored to bottom, slightly overflowing */}
                <img
                  src={speaker.img}
                  alt={speaker.name}
                  className="relative w-[85%] h-auto object-contain object-bottom translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Speaker Metadata — below card, matches site exactly */}
              <div className="mt-5 px-1">
                <h3 className="text-[17px] font-bold text-white leading-snug">{speaker.name}</h3>
                <p className="text-gray-400 text-sm mt-1 leading-snug">{speaker.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}