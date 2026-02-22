import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img6.png";

const minds = [
  {
    name: "John Anderson",
    role: "Head of Community Design",
    color: "#fdf67b",
    img: img1,
  },
  {
    name: "Carlos Mendes",
    role: "Senior DevOps Engineer",
    color: "#61a0ff",
    img: img2,
  },
  {
    name: "Ethan Zhao",
    role: "AI Ethics Researcher",
    color: "#a375ff",
    img: img3,
  },
  {
    name: "Tomislav Petrovic",
    role: "Blockchain Solutions Architect",
    color: "#ff7b7b",
    img: img4,
  },
  {
    name: "David Kim",
    role: "VP of Product, TechNova",
    color: "#6ee7b7",
    img: img5,
  },
];

export default function MeetMinds() {
  const navigate = useNavigate();

  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header: title left | button right — exact site layout ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Meet all the top <br />
              <span className="text-[#fdf67b]">IT minds</span>
            </h2>
            <p className="text-gray-400 max-w-sm mt-4 text-base leading-relaxed">
              Explore our lineup of keynote speakers and industry leaders who
              will inspire and enlighten at the conference.
            </p>
          </div>

          <motion.button
            onClick={() => navigate("/events")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-sm shadow-lg"
          >
            Buy Ticket
            <div className="bg-[#8c52ff] text-white rounded-full p-1 group-hover:translate-x-1 transition-transform duration-200">
              <ArrowRight size={16} />
            </div>
          </motion.button>
        </motion.div>

        {/* ── Speaker Cards — 5 col horizontal, BIG image cards ── */}
        {/*
          The Summitra site layout:
          - 5 cards in a row (scroll on mobile)
          - Each card: tall rounded rect, colored bg, 
            large portrait image sitting at the BOTTOM overflowing slightly
          - Cards 2 & 4 are pushed DOWN (staggered offset)
          - Name + role text BELOW the card
        */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          {minds.map((mind, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              /* ── KEY SITE DETAIL: even-indexed cards pushed down ── */
              className={`flex flex-col group ${index % 2 !== 0 ? "lg:mt-14" : ""}`}
            >
              {/*
                ── THE CARD ──
                Site style: tall pill/rounded rect
                - solid colored background
                - image anchored to bottom, slightly overflowing
                - hover: whole card lifts up
              */}
              <div
                className="relative overflow-hidden flex items-end justify-center
                            cursor-pointer
                            transition-transform duration-500 ease-out
                            group-hover:-translate-y-3
                            rounded-[36px]"
                style={{
                  backgroundColor: mind.color,
                  height: "280px",
                }}
              >
                {/* Top white shine — matches site's card highlight */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-10" />

                {/* Speaker image — sits at bottom, overflows slightly, slides on hover */}
                <img
                  src={mind.img}
                  alt={mind.name}
                  className="relative z-0 w-[88%] h-auto object-contain object-bottom
                             translate-y-5 group-hover:translate-y-1
                             transition-transform duration-500 ease-out"
                />
              </div>

              {/* ── Speaker info below card — exact site style ── */}
              <div className="mt-4 px-1">
                <h3 className="text-base font-bold text-white leading-snug">
                  {mind.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1 leading-snug">
                  {mind.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}