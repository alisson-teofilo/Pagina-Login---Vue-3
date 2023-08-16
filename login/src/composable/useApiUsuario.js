
import { api } from 'src/boot/axios';

export default function useApiUsuario(url) {

  const cadastrarUsuario = async (form) => {
    try {
      const { data } = await api.post(url,form);
      return data
    } catch (error) {
      throw new Error(error);
    }
  };

  const enviaEmail = async (form) => {
    try {
      const { data } = await api.post(url,form);
      return data
    } catch (error) {
      throw new Error(error);
    }
  };

  const atualizaCadastro = async (form) => {
    try {
      const { data } = await api.post(url,form);
      return data
    } catch (error) {
      throw new Error(error);
    }
  };

  const efetuarLogin = async (form) => {
    try {
      const { data } = await api.post(url,form);
      return data
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    atualizaCadastro,
    efetuarLogin,
    enviaEmail,
    cadastrarUsuario
  };

}

