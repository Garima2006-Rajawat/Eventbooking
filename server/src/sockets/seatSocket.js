const seatLocks = {}; // { eventId: lockedSeats }

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 Client connected:', socket.id);

    socket.on('lockSeats', ({ eventId, quantity }) => {
      if (!seatLocks[eventId]) seatLocks[eventId] = 0;

      seatLocks[eventId] += quantity;

      io.emit('seatUpdate', {
        eventId,
        lockedSeats: seatLocks[eventId]
      });

      console.log(`🔒 Locked ${quantity} seats for event ${eventId}`);
    });

    socket.on('unlockSeats', ({ eventId, quantity }) => {
      if (seatLocks[eventId]) {
        seatLocks[eventId] -= quantity;

        if (seatLocks[eventId] <= 0) delete seatLocks[eventId];

        io.emit('seatUpdate', {
          eventId,
          lockedSeats: seatLocks[eventId] || 0
        });

        console.log(`🔓 Unlocked ${quantity} seats for event ${eventId}`);
      }
    });

    socket.on('disconnect', () => {
      console.log('🔴 Client disconnected:', socket.id);
    });
  });
};