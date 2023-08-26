import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true // envío de cookies
  });
  
  export const getMarcasRequest = async () => {
    try {
      const response = await instance.get('marcas');
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener las marcas:', error);
    }
  };