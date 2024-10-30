import useApiUsuario from 'src/composable/useApiUsuario'

export default function usuarioService () {
  
  const { atualizarCadastro } = useApiUsuario('usuarioPF/atualizarCadastro')
  const { efetuarLogin } = useApiUsuario('login/efetuarLogin')
  const { enviaEmail } = useApiUsuario('eusuarioPF/nviaEmail')
  const { cadastrarUsuario } = useApiUsuario('usuarioPF/cadastrarUsuario')
  const { candidatarVaga } = useApiUsuario('vagas/candidatarVaga')
  const { listaUsurios } = useApiUsuario('usuarioPF/listaUsuarios')
  const { buscarUsuarioPF } = useApiUsuario('usuarioPF/buscarUsuario')
  const { buscarUsuarioPJ } = useApiUsuario('usuarioPJ/buscarUsuario')
  

  return {
    atualizarCadastro,
    efetuarLogin,
    enviaEmail,
    cadastrarUsuario,
    candidatarVaga,
    listaUsurios,
    buscarUsuarioPF,
    buscarUsuarioPJ,
  };
}

