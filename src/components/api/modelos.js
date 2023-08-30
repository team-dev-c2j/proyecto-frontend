import axios from "axios"

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/`,
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