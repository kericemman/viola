import api from "./api";

export const initializePayment = async (payload) => {
  const { data } = await api.post("/payments/initialize", payload);
  return data;
};
