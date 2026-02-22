import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function ScrollVideo() {
  const containerRef = useRef(null);

  // 1. Track scroll progress through the parent container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 2. Smooth spring wrapper — makes the expansion feel fluid, not mechanical
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // 3. Map scroll progress to size and rounding — same range as original
  const scale = useTransform(smoothProgress, [0.3, 0.65], [0.55, 1]);
  const width = useTransform(smoothProgress, [0.3, 0.65], ["58%", "100%"]);
  const borderRadius = useTransform(smoothProgress, [0.3, 0.65], ["40px", "0px"]);

  // 4. Overlay dims as video expands (cinematic reveal)
  const overlayOpacity = useTransform(smoothProgress, [0.3, 0.65], [0.55, 0.15]);

  // 5. Subtle label fades out as video goes fullscreen
  const labelOpacity = useTransform(smoothProgress, [0.3, 0.5], [1, 0]);
  const labelY = useTransform(smoothProgress, [0.3, 0.5], [0, -16]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Expanding video card */}
        <motion.div
          style={{
            width,
            scale,
            borderRadius,
          }}
          className="relative aspect-video bg-[#111] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
        >
          {/* Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://cdn.prod.website-files.com/687f5648b07a8b67bf809294/6880aabae19d4ca559dd4bc0_5369831_Coll_wavebreak_Businessman_1280x720-transcode.mp4"
              type="video/mp4"
            />
            {/* Fallback to original src if above fails */}
            <source
              src="https://www.pexels.com/download/video/7647809/"
              type="video/mp4"
            />
          </video>

          {/* Cinematic dark overlay — fades as video expands */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black"
          />

          {/* Purple tint overlay — matches site's purple brand feel */}
          <div className="absolute inset-0 bg-[#8c52ff]/10 mix-blend-multiply pointer-events-none" />

          {/* Vignette edges */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)"
            }}
          />
        </motion.div>

        {/* Scroll hint label — fades out as video expands */}
        <motion.div
          style={{ opacity: labelOpacity, y: labelY }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-white/40">
            Scroll to reveal
          </span>
          <motion.div
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent origin-top"
          />
        </motion.div>

      </div>
    </section>
  );
}