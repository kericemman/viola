import api from "./api";

export const getBookings = async () => {
  const { data } = await api.get("/bookings");
  return data;
};

export const createBooking = async (payload) => {
    const { data } = await api.post("/bookings", payload);
    return data;
  };
  