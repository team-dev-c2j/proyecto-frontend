import axios from "./axios.jsx"


export const contactoRequest = async (data) => {
    try {
      const response = await axios.post("/contacto", data);
      return response.data; // Devuelve los datos de la respuesta si la solicitud se completa con éxito
    } catch (error) {
      throw error; // Lanza el error si ocurre una excepción durante la solicitud
    }
  };

export const seeContactosRquest = async (req, res) => {
  try {
    const response = await axios.get("/contacto")
    return response 
  } catch (error) {
    throw error; // Lanza el error si ocurre una excepción durante la solicitud
  }
}

export const deleteContactoRequest = async (id) => {
  try {
    const response = await axios.delete(`/contacto/${id}`)
    return response 
  } catch (error) {
    throw error; // Lanza el error si ocurre una excepción durante la solicitud
  }
}