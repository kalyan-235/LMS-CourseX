// -------------------- AUTH --------------------

export const getAuthUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${AUTH_API_URL}/login`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};