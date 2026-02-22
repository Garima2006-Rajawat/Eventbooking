import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blurValue = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(20px)"]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="relative h-[120vh]">
      <motion.section
        style={{ scale, opacity, filter: blurValue, y }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#8c52ff] text-white flex flex-col items-center justify-center"
      >

        {/* Background Blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Original top-left blob */}
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -50, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#a375ff] rounded-full blur-[120px] opacity-60"
          />
          {/* Bottom-right blob for depth */}
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-[#6b2fff] rounded-full blur-[130px] opacity-40"
          />
          {/* Yellow glow behind headline */}
          <motion.div
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[40%] h-[30%] bg-[#fdf67b] rounded-full blur-[120px]"
          />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">

          {/* Event badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-white/80 mb-8"
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#fdf67b]"
            />
            Largest IT Conference · Aug 13–15, 2025
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-[110px] font-bold tracking-tight leading-[1] text-[#fdf67b]"
          >
            Code. Connect. Create.<br />
            <span className="text-white">One Epic Conference</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Explore our lineup of keynote speakers and industry leaders who will inspire and enlighten.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              onClick={() => navigate("/events")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group px-10 py-5 rounded-full bg-white text-black font-bold flex items-center gap-2 shadow-[0_8px_40px_rgba(0,0,0,0.25)] transition-all"
            >
              Buy Ticket
              <div className="bg-[#8c52ff] text-white rounded-full p-1 group-hover:translate-x-1 transition-transform duration-200">
                <ArrowRight size={20} />
              </div>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 bg-[#fdf67b]/20 backdrop-blur-md px-6 py-4 rounded-full border border-white/20"
            >
              <MapPin size={18} className="text-[#fdf67b]" />
              <span className="font-semibold text-sm">Elgin Celina, Delaware</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Scroll to explore</span>
          <motion.div
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent origin-top"
          />
        </motion.div>

      </motion.section>
    </div>
  );
}