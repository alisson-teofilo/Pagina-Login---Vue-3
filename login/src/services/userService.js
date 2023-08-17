import useApiUsuario from 'src/composable/useApiUsuario'

export default function usuarioService () {
  const { atualizaCadastro } = useApiUsuario('atualizaCadastro')
  const { efetuarLogin } = useApiUsuario('login')
  const { enviaEmail } = useApiUsuario('enviaEmail')
  const { cadastrarUsuario } = useApiUsuario('cadastrarUsuario')

  return {
    atualizaCadastro,
    efetuarLogin,
    enviaEmail,
    cadastrarUsuario
  };
}

