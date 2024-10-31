import useApiUsuario from 'src/composable/useApiUsuario'

export default function usuarioService () {
  
  const { atualizarCadastro } = useApiUsuario('usuario/atualizarCadastro')
  const { efetuarLogin } = useApiUsuario('login/efetuarLogin')
  const { enviaEmail } = useApiUsuario('usuario/nviaEmail')
  const { cadastrarUsuario } = useApiUsuario('usuario/cadastrarUsuario')
  const { candidatarVaga } = useApiUsuario('vagas/candidatarVaga')
  const { listaUsurios } = useApiUsuario('usuario/listaUsuarios')
  const { buscarUsuaio } = useApiUsuario('usuario/buscarUsuario')
  const { buscarEmpresa } = useApiUsuario('empresa/buscarEmpresa')
  const { editarCadastroEmpresa } = useApiUsuario('empresa/editarCadastroEmpresa')
  

  return {
    atualizarCadastro,
    efetuarLogin,
    enviaEmail,
    cadastrarUsuario,
    candidatarVaga,
    listaUsurios,
    buscarUsuaio,
    buscarEmpresa,
    editarCadastroEmpresa
  };
}

