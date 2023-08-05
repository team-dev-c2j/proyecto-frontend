import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true // envío de cookies
  });
  
  export const getModelosRequest = async (marca) => {
    try {
      const response = await instance.get(`products/marca/${marca}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener las modelos:', error);
    }
  };