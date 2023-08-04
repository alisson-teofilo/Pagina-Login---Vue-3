<template>
  <q-page>
  <div class="row q-pa-md q-ma-md justify-center">
    <q-card class="col-6 ">
      <div >
      <q-form @submit="submeteFormulario" @reset="limparCadastro">
        <div class="text-h6 q-pt-md q-px-md text-center"> Atualização de casdastro </div>
        <q-input class="q-ma-md" label="ID" col-12 v-model="usuario.id"></q-input>
        <q-input class="q-ma-md" label="NOME" col-6 v-model="usuario.nome"></q-input>
        <div class="row">
          <q-input class="q-pa-md col-6" label="NOVA SENHA" v-model="usuario.senha"></q-input>
          <q-input class="q-pa-md col-6" label="CONFIRMAR NOVA SENHA" v-model="usuario.senha2"></q-input>
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
import { ref } from 'vue'
import usuarioService from 'src/services/usuarioService'

const usuarioServi = usuarioService()

const usuario = ref({
  id: '',
  nome: '',
  senha: '',
  senha2: ''
})

const submeteFormulario = () => {
  console.log(usuario.value)
  usuarioServi.atualizaCadastro(usuario.value)
    .then(response => {
      if (response.sucesso) {
        console.log("Atualização bem-sucedida.");
      } else {
        console.log("Erro: " + response.mensagem);
      }
    })
    .catch(error => {
      console.log("Erro na requisição: " + error.mensagem);
    });
};

const limparCadastro = ()=>{
  usuario.value.id = '',
  usuario.value.nome ='',
  usuario.value.novaSenha = '',
  usuario.value.confiNovaSenha = ''
  console.log("Opa")
}

</script>
