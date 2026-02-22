import { useLocation, Link } from "react-router-dom";
import Confetti from "react-confetti";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { motion } from "framer-motion";
import { Download, CheckCircle, Calendar, MapPin, Users, DollarSign } from "lucide-react";

export default function Success() {
  const { state } = useLocation();
  const ticketRef = useRef();

  if (!state) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">No booking data found</p>
      </div>
    );
  }

  const { booking, event, quantity } = state;

  const downloadQR = async () => {
    const dataUrl = await toPng(ticketRef.current);
    const link = document.createElement("a");
    link.download = `ticket-${event.title}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Confetti numberOfPieces={200} recycle={false} />

      {/* Animated background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[150px]" 
      />

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Booking <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400">Confirmed!</span>
          </h1>
          <p className="text-gray-400 text-lg">Your tickets are ready. See you at the event!</p>
        </motion.div>

        {/* Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          ref={ticketRef}
          className="bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-black border border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl mb-8"
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* QR Code */}
            <div className="flex-shrink-0 bg-white p-6 rounded-2xl">
              <QRCodeSVG value={JSON.stringify(booking)} size={200} />
            </div>

            {/* Event Details */}
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold mb-6">{event.title}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-purple-400" />
                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="font-semibold">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="font-semibold">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users size={20} className="text-cyan-400" />
                  <div>
                    <p className="text-xs text-gray-400">Seats</p>
                    <p className="font-semibold">{quantity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign size={20} className="text-green-400" />
                  <div>
                    <p className="text-xs text-gray-400">Total Paid</p>
                    <p className="font-semibold">₹{quantity * event.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={downloadQR}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(139, 92, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-xl font-bold shadow-lg shadow-purple-500/50 transition"
          >
            <Download size={20} />
            Download Ticket
          </motion.button>

          <Link to="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 border border-purple-500/30 rounded-xl font-bold hover:bg-purple-500/10 transition"
            >
              Browse More Events
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
