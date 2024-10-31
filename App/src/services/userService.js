import useApiUsuario from 'src/composable/useApiUsuario'

export default function usuarioService () {
  
  const { atualizarCadastro } = useApiUsuario('usuario/atualizarCadastro')
  const { efetuarLogin } = useApiUsuario('login/efetuarLogin')
  const { validarToken } = useApiUsuario('login/validarToken')
  const { enviaEmail } = useApiUsuario('login/enviaEmail')
  const { cadastrarUsuario } = useApiUsuario('usuario/cadastrarUsuario')
  const { candidatarVaga } = useApiUsuario('vagas/candidatarVaga')
  const { listaUsurios } = useApiUsuario('usuario/listaUsuarios')
  const { buscarUsuaio } = useApiUsuario('usuario/buscarUsuario')
  const { buscarEmpresa } = useApiUsuario('empresa/buscarEmpresa')
  const { editarCadastroEmpresa } = useApiUsuario('empresa/editarCadastroEmpresa')
  const { recuperarSenhaUsuario } = useApiUsuario('login/recuperarSenhaUsuario')
  const { recuperarSenhaEmpresa } = useApiUsuario('login/recuperarSenhaEmpresa')

  return {
    atualizarCadastro,
    efetuarLogin,
    validarToken,
    enviaEmail,
    cadastrarUsuario,
    candidatarVaga,
    listaUsurios,
    buscarUsuaio,
    buscarEmpresa,
    editarCadastroEmpresa,
    recuperarSenhaUsuario,
    recuperarSenhaEmpresa
  };
}

