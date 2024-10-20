import useApiUsuario from 'src/composable/useApiUsuario'

export default function usuarioService () {
  const { atualizaCadastro } = useApiUsuario('atualizaCadastro')
  const { efetuarLogin } = useApiUsuario('efetuarLogin')
  const { enviaEmail } = useApiUsuario('enviaEmail')
  const { cadastrarUsuario } = useApiUsuario('cadastrarUsuario')
  const { listaUsurios } = useApiUsuario('listaUsuarios')

  return {
    atualizaCadastro,
    efetuarLogin,
    enviaEmail,
    cadastrarUsuario,
    listaUsurios
  };
}

