
import { api } from 'src/boot/axios';

export default function useApiVagas(url) {

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
  
  const listarCandidaturasByUsuaio = async (cpf) => { 
    const errors = [];
    let body = {};

    try {
      const response = await api.get(`${url}/${cpf}`, {
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

  const vagasPublicadas = async (cnpj) => { 
    const errors = [];
    let body = {};

    try {
      const response = await api.get(`${url}/${cnpj}`, {
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


  const listarVagas = async () => { 
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

  const buscarVagas = async (form) => {

    try {
      const { data } = await api.post(url, form);
      return data
    } catch (error) {
      return error
    }
  };

  const cadastrarVagas = async (form) => {

    try {
      const { data } = await api.post(url,form);
      return data
    } catch (error) {
      throw new Error(error);
    }
  };
  
  const editarVagas = async (form) => {

    try {
      const { data } = await api.put(url,form);
      return data
    } catch (error) {
      throw new Error(error);
    }
  };

  const deletarCandidatura = async (form) => {

    try {
      const { data } = await api.put(url, form);
      return data
    } catch (error) {
      throw new Error(error);
    }
  };

  return {

    listarVagas,
    buscarVagas,
    cadastrarVagas,
    editarVagas,
    listarCandidaturasByUsuaio,
    deletarCandidatura,
    vagasPublicadas
  };

}

