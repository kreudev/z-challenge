import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'x-api-key': API_KEY },
});

// Obtener productos con límite de 20 por defecto
export const getProducts = async (limit = 20) => {
  try {
    const response = await apiClient.get(`/products?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error en getProducts:', error);
    throw error;
  }
};

// Buscar productos
export const searchProducts = async (term) => {
  try {
    const response = await apiClient.get(`/products?search=${term}`);
    return response.data;
  } catch (error) {
    console.error('Error en searchProducts:', error);
    throw error;
  }
};

// Obtener producto por ID
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en getProductById:', error);
    throw error;
  }
};
