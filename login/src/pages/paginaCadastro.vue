<template>
  <q-page>

  <div class="row q-pa-md q-ma-md justify-center">
    <q-card class="col-6 ">
      <div >
      <q-form @submit="submeteFormulario" @reset="limparCadastro">
        <div class="text-h6 q-pt-md q-px-md text-center"> Atualização de casdastro </div>
        <q-input
          dense
          outlined
          class="q-ma-md"
          label="ID"
          col-12
          v-model="usuario.id"
         ></q-input>

        <q-input
          dense
          outlined
          class="q-ma-md"
          label="nome"
          col-6
          v-model="usuario.nome"
         ></q-input>
        <div class="row">

          <q-input
            v-model.trim="usuario.senha"
            outlined
            class="q-pa-md col-6"
            label="NOVA SENHA"
            dense >
          </q-input>

          <q-input
            dense
            outlined
            class="q-pa-md col-6"
            label="CONFIRMAR NOVA SENHA"
            v-model.trim="usuario.senha2">
           </q-input>
        </div>
        <div>
          <q-btn class="q-ma-sm" label="Cadastrar" type="submit"></q-btn>
          <q-btn class="" label="Limpar" type="reset"></q-btn>
        </div>
      </q-form>
      </div>
    </q-card>
  </div>
</q-page>
</template>

<script setup>
import { ref} from 'vue'
import userService from 'src/services/userService'
import { useQuasar } from 'quasar'

const userServi = userService()
const $q = useQuasar();

const usuario = ref({
  id: '',
  nome: '',
  senha: '',
  senha2: ''
})

  const contemMaiusculas = (value) => {
      return /[A-Z]/.test(value)
    }

  const contemMinusculas = (value) => {
      return /[a-z]/.test(value)
    }

  const contemNumeros = (value) => {
      return /[0-9]/.test(value)
    }

  const contemEspeciais = (value) => {
      return /[#?!@$%^&*-]/.test(value)
    }

const submeteFormulario = async () =>{

    if (usuario.value.senha === usuario.value.senha2){

      const reMaiusculas = contemMaiusculas(usuario.value.senha)
      if (!reMaiusculas)
      $q.notify({ message: 'É necessário no mínimo 1 letra maiúscula', icon:'warning', color: 'deep-orange'})

      const reMinusculas = contemMinusculas(usuario.value.senha)
      if (!reMinusculas)
      $q.notify({ message: 'É necessário no mínimo 1 letra minúscula', icon:'warning', color: 'deep-orange'})

      const reNumereos = contemNumeros(usuario.value.senha)
      if (!reNumereos)
      $q.notify({ message: 'É necessário no mínimo 1 número', icon:'warning', color: 'deep-orange'})

      const reEspeciais = contemEspeciais(usuario.value.senha)
      if (!reEspeciais)
      $q.notify({ message: 'É necessário no mínimo 1 caractere especial', icon:'warning', color: 'deep-orange'})

      if(reMaiusculas && reMinusculas && reNumereos && reEspeciais){
        
        $q.notify.show({dealay: 40})
        const response = await userServi.cadastrarUsuario(usuario.value)
        $q.notify.hide()
       
      }
    }
    else{
      $q.notify({message: 'As senhas não conferem', icon:'done', color: 'negative'})
    }
}

const limparCadastro = ()=>{
  usuariovalue.id = '',
  usuariovalue.nome ='',
  usuariovalue.novaSenha = '',
  usuariovalue.confiNovaSenha = ''
}

</script>
