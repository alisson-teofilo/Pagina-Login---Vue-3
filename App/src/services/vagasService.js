import useApiVagas from 'src/composable/useApiVagas'

export default function vagasService () {

  const { listarVagas } = useApiVagas('vagas/listarVagas')
  const { cadastrarVagas } = useApiVagas('vagas/cadastrarVagas')
  const { buscarVagas } = useApiVagas('vagas/buscarVagas')
  const { editarVagas } = useApiVagas('vagas/editarVagas')
  const { listarCandidaturasByUsuaio } = useApiVagas('vagas/listarCandidaturasByUsuaio')
  const { deletarCandidatura } = useApiVagas('vagas/deletarCandidatura')

  return {
    listarVagas,
    cadastrarVagas,
    buscarVagas,
    editarVagas,
    listarCandidaturasByUsuaio,
    deletarCandidatura
  };
}

