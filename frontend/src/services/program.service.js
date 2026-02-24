import api from "./api";

export const getPrograms = async () => {
  const { data } = await api.get("/programs");
  return data;
};

export const createProgram = async (payload) => {
  const { data } = await api.post("/programs", payload);
  return data;
};
