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
          label="NOME"
          col-6
          v-model="usuario.name"
         ></q-input>
        <div class="row">

          <q-input
            v-model.trim="usuario.password"
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
            v-model.trim="usuario.password2">
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
import { ref, reactive } from 'vue'
import  useVuelidate  from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import usuarioService from 'src/services/usuarioService'

const usuarioServi = usuarioService()

const usuario = reactive({
  id: '',
  name: '',
  password: '',
  password2: ''
})

const rules = {
  id: {required},
  name: {required},
  password: {},
  password2: {required},
  contemMaiusculas: function(password) {
      return /[A-Z]/.test(password)
    },
    contemMinusculas: function(password) {
      return /[a-z]/.test(password)
    },
    contemNumeros: function(password) {
      return /[0-9]/.test(password)
    },
    contemEspeciais: function(password) {
      return /[#?!@$%^&*-]/.test(password)
    }
}

const v$ = useVuelidate(rules, usuario);

const submeteFormulario = async () =>{
  console.log(v$.contemEspeciais)
    if (v$.contemEspeciais){
    alert("A senha deve conter pelo menos um caractere especial.");
  } else {
    alert("Sucesso");
  }

}

const limparCadastro = ()=>{
  usuario.value.id = '',
  usuario.value.nome ='',
  usuario.value.novaSenha = '',
  usuario.value.confiNovaSenha = ''
  console.log("Opa")
}

</script>
