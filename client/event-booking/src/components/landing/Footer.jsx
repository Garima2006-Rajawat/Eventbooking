import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black pt-20">
      {/* Main Purple Container with Rounded Top Corners */}
      <div className="bg-[#8c52ff] rounded-t-[50px] md:rounded-t-[100px] px-6 py-16 md:py-24 text-white">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Row: Brand & Large Heading */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-md">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Summitra</h2>
              <p className="text-white/80 leading-relaxed text-lg">
                Thank you for exploring our world through the lens. 
                From capturing cherished memories to unveiling the beauty of the everyday.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 w-full lg:w-auto">
              {/* Date Badge */}
              <div className="border border-white/40 rounded-full px-12 py-6 text-2xl md:text-3xl font-medium">
                August 20
              </div>
              
              {/* Massive Slogan */}
              <h3 className="text-4xl md:text-6xl font-bold text-yellow-300 text-center lg:text-right leading-tight">
                Largest 2025 IT <br /> Conference.
              </h3>
            </div>
          </div>

          {/* Bottom Row: Minimalist Navigation & Credits */}
          <div className="pt-12 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-medium">
            <nav className="flex flex-wrap justify-center gap-8 md:gap-12">
              <Link to="/style-guide" className="hover:opacity-70 transition">Style guide</Link>
              <Link to="/instructions" className="hover:opacity-70 transition">Instructions</Link>
              <Link to="/license" className="hover:opacity-70 transition">License</Link>
              <Link to="/changelog" className="hover:opacity-70 transition">Changelog</Link>
              <Link to="/404" className="hover:opacity-70 transition">404</Link>
            </nav>

            <div className="text-center md:text-right opacity-80">
              <p>Design by Summitra - Powered by EventFlow</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}