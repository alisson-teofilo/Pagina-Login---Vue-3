
import { api } from 'src/boot/axios';

export default function useApi(url) {

  const atualizaCadastro = async (form) => {
    try {
      const { data } = await api.post(url,form);
      return data
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    atualizaCadastro,
  };

}

