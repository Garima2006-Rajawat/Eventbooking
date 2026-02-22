import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CountdownItem = ({ value, label, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="relative"
  >
    <div className="bg-[#0a0a0a] border border-purple-500/30 rounded-2xl p-6 min-w-[120px] text-center backdrop-blur-xl">
      <motion.div 
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`text-5xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${color}`}
      >
        {value}
      </motion.div>
      <div className="text-gray-400 text-xs uppercase tracking-widest font-mono">{label}</div>
    </div>
    {/* Glow effect */}
    <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20 blur-xl rounded-2xl -z-10`} />
  </motion.div>
);

export default function AboutSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date (May 13, 2026)
    const targetDate = new Date('2026-05-13T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#0a0a0a] text-white py-32 overflow-hidden relative">
      {/* Animated background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px]" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Event Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-purple-400 mb-6 block">
              About The Event
            </span>
            
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight mb-8">
              Tech Conference <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400">2026</span>
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Join us for an immersive 3-day IT conference from <span className="text-purple-400 font-bold">May 13-15, 2026</span>. 
              Connect with industry leaders, explore cutting-edge technologies, and shape the future of tech.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 bg-purple-500/20 border border-purple-500/30 rounded-full backdrop-blur-xl">
                <span className="text-purple-400 font-bold">3 Days</span>
              </div>
              <div className="px-6 py-3 bg-blue-500/20 border border-blue-500/30 rounded-full backdrop-blur-xl">
                <span className="text-blue-400 font-bold">50+ Speakers</span>
              </div>
              <div className="px-6 py-3 bg-cyan-500/20 border border-cyan-500/30 rounded-full backdrop-blur-xl">
                <span className="text-cyan-400 font-bold">1000+ Attendees</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="grid grid-cols-2 gap-4">
              <CountdownItem 
                value={String(timeLeft.days).padStart(2, '0')} 
                label="Days" 
                color="from-purple-400 to-purple-600"
              />
              <CountdownItem 
                value={String(timeLeft.hours).padStart(2, '0')} 
                label="Hours" 
                color="from-blue-400 to-blue-600"
              />
              <CountdownItem 
                value={String(timeLeft.minutes).padStart(2, '0')} 
                label="Minutes" 
                color="from-cyan-400 to-cyan-600"
              />
              <CountdownItem 
                value={String(timeLeft.seconds).padStart(2, '0')} 
                label="Seconds" 
                color="from-purple-400 to-pink-600"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}