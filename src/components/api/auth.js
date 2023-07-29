import axios from "./axios"


export const registerRequest = async (user) => {
    try {
      const response = await axios.post("/register", user);
      return response.data; // Devuelve los datos de la respuesta si la solicitud se completa con éxito
    } catch (error) {
      throw error; // Lanza el error si ocurre una excepción durante la solicitud
    }
  };

  export const loginRequest = async (user) => {
    try {
      const response = await axios.post("/login", user);
      return response.data; // Devuelve los datos de la respuesta si la solicitud se completa con éxito
    } catch (error) {
      throw error; // Lanza el error si ocurre una excepción durante la solicitud
    }
  };

export const verifyTokenRequest = () => axios.get(`/verify`)