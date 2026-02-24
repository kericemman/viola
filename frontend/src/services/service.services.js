import api from "./api";

export const getServices = async () => {
  const { data } = await api.get("/services");
  return data;
};

export const createService = async (payload) => {
  const { data } = await api.post("/services", payload);
  return data;
};

export const updateService = async (id, payload) => {
  const { data } = await api.put(`/services/${id}`, payload);
  return data;
};

export const deleteService = async (id) => {
  const { data } = await api.delete(`/services/${id}`);
  return data;
};
