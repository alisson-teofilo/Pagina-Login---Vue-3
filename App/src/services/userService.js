import useApiUsuario from 'src/composable/useApiUsuario'

export default function usuarioService () {
  const { atualizaCadastro } = useApiUsuario('atualizaCadastro')
  const { efetuarLogin } = useApiUsuario('login/efetuarLogin')
  const { enviaEmail } = useApiUsuario('enviaEmail')
  const { cadastrarUsuario } = useApiUsuario('cadastrarUsuario')
  const { listaUsurios } = useApiUsuario('listaUsuarios')
  const { buscarUsuarios } = useApiUsuario('buscarUsuarios')

  return {
    atualizaCadastro,
    efetuarLogin,
    enviaEmail,
    cadastrarUsuario,
    listaUsurios,
    buscarUsuarios
  };
}

