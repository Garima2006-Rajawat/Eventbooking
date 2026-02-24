import api from "./axios";

export const createBooking = (data) => api.post("/api/bookings", data);