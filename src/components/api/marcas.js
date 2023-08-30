import axios from "axios"

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/`,
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