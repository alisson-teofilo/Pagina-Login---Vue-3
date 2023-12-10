
import { api } from 'src/boot/axios';

export default function useApiUsuario(url) {

  const listaUsurios = async () => {
    try {
      const result = await api.get(`${url}`);
    } catch (error) {
      throw new Error(error);
    }
  };

  const cadastrarUsuario = async (form) => {
    try {
      const { data } = await api.post(url,form);
      return data
    } catch (error) {
      return error
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
      return error
    }

  };

  return {

    atualizaCadastro,
    efetuarLogin,
    enviaEmail,
    cadastrarUsuario,
    listaUsurios

  };

}

