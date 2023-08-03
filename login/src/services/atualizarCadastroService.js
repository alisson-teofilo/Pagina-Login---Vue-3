import useApi from 'src/composable/useApiUsuario'

export default function usuarioService () {
  const { atualizaCadastro } = useApi('atualizaCadastro')

  return {
    atualizaCadastro
  };
}

