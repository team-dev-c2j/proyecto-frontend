import axios from "./axios"


export const contactoRequest = async (data) => {
    try {
      const response = await axios.post("/contacto", data);
      return response.data; // Devuelve los datos de la respuesta si la solicitud se completa con éxito
    } catch (error) {
      throw error; // Lanza el error si ocurre una excepción durante la solicitud
    }
  };