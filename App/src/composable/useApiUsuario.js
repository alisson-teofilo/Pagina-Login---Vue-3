
import { api } from 'src/boot/axios';

export default function useApiUsuario(url) {

  const exemplo = async () => { 
    const errors = [];
    let body = {};

    try {

      const response = await api.get(url, {
      headers : { Authorization: `Bearer ${localStorage.getItem("tkn")}`,
      withCredentials: false,
      timeout: 10000,
        }
      });
      body = response.data;
      return body;

    } catch (error) {
      errors.values = error;
      return errors;
    }
  };

  const listaUsurios = async () => { 
    const errors = [];
    let body = {};

    try {
      const response = await api.get(url, {
        headers : { Authorization: `Bearer ${localStorage.getItem("tkn")}`,
        withCredentials: false,
        timeout: 10000,
          }
        });
        body = response.data;
        return body;
    } catch (error) {
      errors.values = error;
      return errors;
    }
  };

  const candidatarVaga = async (form) => {

    try {
      const { data } = await api.post(url,form);
      return data
    } catch (error) {
      return error
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
      return error
    }
  };

  const atualizarCadastro = async (form) => {

    try {
      const { data } = await api.put(url,form);
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

  const buscarUsuarioPF = async (id) => {

    try {
      const { data } = await api.get(`${url}/${id}`);
      return data
    } catch (error) {
      return error
    }

  };

  const buscarUsuarioPJ = async (cnpj) => {

    try {
      const { data } = await api.get(`${url}/${cnpj}`);
      return data
    } catch (error) {
      return error
    }

  };

  return {

    atualizarCadastro,
    efetuarLogin,
    enviaEmail,
    candidatarVaga,
    cadastrarUsuario,
    listaUsurios,
    buscarUsuarioPF,
    buscarUsuarioPJ

  };

}

