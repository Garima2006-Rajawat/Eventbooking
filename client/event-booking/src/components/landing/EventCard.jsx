import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function EventCard({ event, translateY = 0 }) {
  return (
    <Link to={`/events/${event.id}`} className="block group h-full">
      {/*
        Each card slides UP from a different starting Y on scroll.
        translateY prop controls how far below it starts (stagger effect).
        Card 1 starts lowest (most offset), card 3 starts highest.
      */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: translateY },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className="h-full"
      >
        {/*
          ── CARD ──
          - rounded-t-[40px] top corners only, flat bottom (bleeds off screen)
          - full height, image fills card
          - hover: lifts slightly
        */}
        <div
          className="relative overflow-hidden rounded-t-[40px] h-full bg-[#1a1232]
                     group-hover:-translate-y-4 transition-transform duration-500 ease-out"
        >
          {/* Event image fills entire card */}
          {(event.image || event.img) ? (
            <img
              src={event.image || event.img}
              alt={event.title}
              className="w-full h-full object-cover
                         scale-100 group-hover:scale-105
                         transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-black flex items-center justify-center">
              <span className="text-6xl opacity-30">🎫</span>
            </div>
          )}

          {/* Bottom gradient for text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-1/2
                          bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Arrow — top right, appears on hover */}
          <div
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white
                        flex items-center justify-center
                        opacity-0 group-hover:opacity-100
                        -translate-y-2 group-hover:translate-y-0
                        transition-all duration-300 z-10"
          >
            <ArrowRight size={17} className="text-black" />
          </div>

          {/* Info overlay at bottom of card */}
          <div className="absolute bottom-0 inset-x-0 p-6 z-10">
            <h3
              className="text-white font-bold text-lg leading-snug mb-2
                         group-hover:text-[#fdf67b] transition-colors duration-300"
            >
              {event.title}
            </h3>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
              <div className="flex items-center gap-1.5 text-white/60 text-sm">
                <Calendar size={13} />
                <span>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-white/60 text-sm">
                <MapPin size={13} />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="px-4 py-1.5 rounded-full bg-[#fdf67b] text-black text-sm font-bold">
                ₹{event.price}
              </span>
              <span className="text-white/40 text-xs">{event.available_seats} seats left</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}