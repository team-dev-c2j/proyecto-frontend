import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true // envío de cookies
  });
  
  export const getColoresRequest = async (marca, modelo) => {
    try {
      const response = await instance.get(`unidades/modelo/${modelo}/marca/${marca}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener las unidades:', error);
    }
  };

  export const getStockRequest = async (marca, modelo, color) => {
    try {
      const response = await instance.get(`unidades/modelo/${modelo}/marca/${marca}/color/${color}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener las unidades:', error);
    }
  };


  export const deleteStockRequest = async (marca, modeloUnidad, color, talle, unidadesDelete) => {
    console.log('debug')
    try {
      const response = await instance.put('unidades/unidadStock', {
        marca,
        modeloUnidad,
        color,
        talle,
        unidadesDelete
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al eliminar unidades de stock:', error);
    }
  };
  

  