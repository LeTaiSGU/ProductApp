import axios from "axios";

const API_URL = "http://localhost:8000";

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/token`, credentials, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
};

export const getProducts = async (token) => {
  const response = await axios.get(`${API_URL}/products/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getProductById = async (id, token) => {
  const response = await axios.get(`${API_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createProduct = async (product, token) => {
  const response = await axios.post(`${API_URL}/products/`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProduct = async (id, product, token) => {
  const response = await axios.put(`${API_URL}/products/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteProduct = async (id, token) => {
  await axios.delete(`${API_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
