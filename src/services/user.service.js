import api from "./api";

const API_URL = "/user";

const signJwt = async (email) => {
  return await api.post(`${API_URL}/sign`, { email });
};

const addUser = async (email) => {
  return await api.post(`${API_URL}`, { email });
};

const getAllUser = async () => {
  return await api.get(`${API_URL}/`);
};

const getRoleByEmail = async (email) => {
  return await api.get(`${API_URL}/role/${email}`);
};

const makeAdmin = async (email) => {
  return await api.patch(`${API_URL}/admin/${email}`);
};

const makeUser = async (email) => {
  return await api.patch(`${API_URL}/user/${email}`);
};

const UserService = {
  getAllUser,
  signJwt,
  addUser,
  getRoleByEmail,
  makeAdmin,
  makeUser,
};

export default UserService;
