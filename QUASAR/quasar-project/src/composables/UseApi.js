import { api } from "src/boot/axios";

export default function useApi(url) {
  
  const listarDatos = async () => {
    try {
      const { data }  = await api.get(url);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const obtenerDatosId = async (id) => {
    try {
      const { data }  = await api.get(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const enviarDatos = async (formData) => {
    try {
      const { data }  = await api.post(url, formData);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const actualizarDatos = async (formData) => {
    try {
      const { data }  = await api.put(`${url}/${formData.id}`, formData);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const eliminarDatos = async (id) => {
    try {
      const { data }  = await api.delete(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    listarDatos,
    obtenerDatosId,
    enviarDatos,
    actualizarDatos,
    eliminarDatos
  };
}
