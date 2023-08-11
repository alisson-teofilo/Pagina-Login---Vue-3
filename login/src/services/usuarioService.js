import useApiUsuario from 'src/composable/useApiUsuario'

export default function usuarioService () {
  const { atualizaCadastro } = useApiUsuario('atualizaCadastro')
  const { efetuarLogin } = useApiUsuario('login')
  const { enviaEmail } = useApiUsuario('enviaEmail')

  return {
    atualizaCadastro,
    efetuarLogin,
    enviaEmail
  };
}

