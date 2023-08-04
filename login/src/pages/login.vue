<template>
 <q-page>

  <div class="container">

    <q-card style="height: 600px; width: 470px;">
      <q-card-section>
        <div class="column" id="titulo">
            <div><h4>LOGIN</h4></div>
            <div>Não tem cadastro? Clique aqui!</div>
        </div>
      </q-card-section>
      <q-form @submit="logarConta()">
        <div class="column" id="input">
          <q-input dense  style="width: 250px ;" v-model="usuario.email" class="q-mx-sm q-mb-sm" label="E-mail" outlined>
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input filled :type="isPwd ? 'password' : 'text'" dense style="width: 250px ;" v-model="usuario.senha"  class="" label="Senha" outlined>
           <template v-slot:prepend>
              <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"/>
            </template>
          </q-input>
          <q-btn style="width: 250px ;" class="q-ma-xs" label="LOGIN" color="blue-4" type="submit"></q-btn>
          <div>Esqueceu sua senha?</div>
       </div>
      </q-form>
    </q-card>
    </div>

 </q-page>
</template>
<script setup>
import { ref } from 'vue'
import usuarioService from 'src/services/usuarioService'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const usuServi = usuarioService()
const isPwd = ref(true)

const usuario = ref({
  id: '',
  nome: '',
  email: '',
  senha:''
})

const logarConta = () => {
  usuServi.efetuarLogin(usuario.value)
    .then(response => {
      if (response.sucesso){
        $q.notify({message: response.mensagem , color: 'positive'})

      }else{
        $q.notify({message: response.mensagem , color: 'negative'})
      }
    })
}

</script>
<style>
.container{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
#titulo{
  display: flex;
  align-items: center;
  justify-content: center;
}
#input{
  align-items: center;
}
</style>
