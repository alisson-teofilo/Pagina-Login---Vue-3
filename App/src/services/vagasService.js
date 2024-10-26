import useApiVagas from 'src/composable/useApiVagas'

export default function vagasService () {

  const { listarVagas } = useApiVagas('vagas/listarVagas')
  const { cadastrarVagas } = useApiVagas('vagas/cadastrarVagas')
  const { buscarVagas } = useApiVagas('vagas/buscarVagas')
  const { editarVagas } = useApiVagas('vagas/editarVagas')

  return {
    listarVagas,
    cadastrarVagas,
    buscarVagas,
    editarVagas
  };
}

