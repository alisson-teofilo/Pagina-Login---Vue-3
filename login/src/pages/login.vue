<template>
 <q-page>

  <div class="container">

    <q-card style="height: 600px; width: 470px;">
      <q-card-section class="q-pb-none">
        <div class="column" id="titulo">
            <div id="login"><h4 class="q-mb-md">LOGIN</h4></div>
            <div>Não tem cadastro? <span class="btnCadastro" v-on:click="btnCadastro">Clique Aqui</span>
            </div>
        </div>
      </q-card-section>
      <q-form @submit="logarConta()">
        <div class="column" id="input">
          <q-input dense  style="width: 250px ;" v-model="usuario.id" class="q-mx-sm q-mb-sm" label="ID" outlined>
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
          <div> <span class="btnCadastro" v-on:click="btnSolicitaToken">Esqueceu sua senha?</span></div>
       </div>
      </q-form>
    </q-card>
    </div>

       <!-- Card popUp cadastro -->

      <q-dialog persistent v-model="popUpcadastro">
        <q-card style="height: 606px; width: 470px;">
          <q-card-section class="q-mr-auto">
            <q-btn label="x" type="reset" v-close-popup ></q-btn>
          </q-card-section>
        <q-card-section class="q-pb-none">
          <div class="text-h6 q-ml-xl">Cadastro de Usuário</div>
        </q-card-section>

          <q-separator class="q-mb-md q-mt-sm q-mx-xl"/>

          <q-form @submit="btnCadastraUsuario()" @reset="cancelarCadastro()">
                      <div class="row inputCadastro">
                        <q-input dense outlined class="q-mt-xm q-pl-xl q-pr-sm col-4" label="ID" v-model="usuario.id"></q-input>
                        <q-input dense outlined class=" q-mt-xm q-pr-xl col-8" label="NOME" v-model="usuario.nome"></q-input>
                        <q-input dense outlined class=" q-mt-sm q-pl-xl q-pr-sm col-6" label="SENHA" v-model="usuario.senha"></q-input>
                        <q-input dense outlined class=" q-mt-sm q-pr-xl col-6" label="CONFIRMAR SENHA" v-model="usuario.senha2"></q-input>
                      </div>


                      <q-separator class="q-my-md q-mx-xl"/>
                      <div class="q-mx-xl row">
                        <q-btn color="blue" class="q-mr-sm col-12" label="Cadastrar" type="submit" v-close-popup ></q-btn>
                      </div>
           </q-form>
      </q-card>

      </q-dialog>

 </q-page>
</template>
<script setup>
import { ref } from 'vue'
import usuarioService from 'src/services/usuarioService'
import { useQuasar } from 'quasar'


const popUpcadastro = ref(false)
const $q = useQuasar()
const usuServi = usuarioService()
const isPwd = ref(true)


const usuario = ref({
  id: '',
  nome: '',
  email: '',
  senha:'',
  senha2: ''
})

  const btnCadastro = () => {
    popUpcadastro.value = true

  }

const btnSolicitaToken = async () =>{
  if(usuario.value.id === null || usuario.value.id === ''){
    $q.notify({message: 'Informe o ID' , color: 'negative'})
  }else{
    const retorno = await usuServi.enviaEmail(usuario.value).then(response =>{
    if (!response.sucesso){
      $q.notify({message: response.mensagem , color: 'negative'})
    }
    else{
      $q.notify({message: response.mensagem , color: 'positive'})
    }
  })
  }

}

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

const btnCadastraUsuario = async () => {
  console.log(usuario.value)
 await usuServi.cadastrarUsuario(usuario.value)
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

const cancelarCadastro = () =>{
  usuario.value.id = '',
  usuario.value.nome = '',
  usuario.value.senha = '',
  usuario.value.senha2
}

</script>
<style>
.btnFooter {

  margin-top: 300px;
}
.footer{
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.inputCadastro{
  display: flex;
  align-items: center;
  justify-content: center;
}
.container{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
.cardCadastro{
  margin-top: 70px;
}
#titulo{
  display: flex;
  align-items: center;
  justify-content: center;
}

#input{
  align-items: center;
}

.btnCadastro{
  cursor: pointer;
}

#backCard{
  display: flex;
  justify-content: center;
}

</style>
