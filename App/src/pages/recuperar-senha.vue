<template>
    <q-layout>
  
      <div class="container">
  
        <q-card style="height: 600px; width: 470px;">
  
          <!-- RECUPERAR SENHA -->
          <div>
            <div>
  
              <q-card-section class="q-pb-none">
  
                <div class="column" id="titulo">
                  <div id="login">
                    <h6 class="q-mb-md"> RECUPERAR SENHA</h6>
                  </div>
                </div>
              </q-card-section>
  
              <q-form @submit="btnAtualizarSenhaUsuario()" @reset="cancelarCadastro()">
  
                <div class="row inputCadastro">
  
                  <div class="col-8">
                    <div v-if="isCandidato">
                        <q-input readonly dense outlined class="q-mt-sm " label="ID" v-model="userProfile.id"></q-input>
                        <q-input readonly dense outlined class="q-mt-sm " label="NOME" v-model="userProfile.nome"></q-input>
                        <q-input readonly dense outlined class="q-pt-sm" label="EMAIL" v-model="userProfile.email"></q-input>
                    </div>

                    <div v-else>
                        <q-input readonly dense outlined class="q-mt-sm " label="CNPJ" v-model="empresaProfile.cnpj"></q-input>
                        <q-input readonly dense outlined class="q-mt-sm " label="NOME FANTASIA" v-model="empresaProfile.nomeFantasia"></q-input>
                        <q-input readonly dense outlined class="q-pt-sm" label="EMAIL" v-model="empresaProfile.email"></q-input>
                    </div>

                    <div class="row">
                      <div class="col-6">
                        <q-input dense outlined class="q-mt-sm q-mr-sm" label="NOVA SENHA" v-model="senha.senha">
                            <template v-slot:prepend>
                                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwd = !isPwd" />
                            </template>
                        </q-input>
                      </div>
                      <div class="col-6">
                        <q-input dense outlined class="q-mt-sm " label="CONFIRMAR SENHA" v-model="senha.confSenha">
                            <template v-slot:prepend>
                                <q-icon :name="isPwd2 ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwd2 = !isPwd2" />
                            </template>
                        </q-input>
                      </div>
                    </div>
  
                  </div>
  
                  <q-separator style="width: 300px;" class="q-mb-md q-mt-md q-mx-xl" />
  
                  <div class="q-mt-xm row">
  
                    <div class="col-12">
                      <q-btn style="width: 210px;" color="blue" class="q-mr-sm" label="Salvar" type="submit"></q-btn>
                      <q-btn color="orange" class="q-mr-sm" label="limpar" @click="limparSenha()"></q-btn>
                    </div>
  
                  </div>  
                </div>
  
              </q-form>
            </div>
          </div>
        </q-card>
      </div>
  
  </q-layout>
  </template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import userService from 'src/services/userService'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import axios from 'axios';

const router = useRouter();
const $q = useQuasar() 
const usuServi = userService()
const isPwd = ref(true)
const isPwd2 = ref(true)

// Recupera primeiro parâmetro da URL
const urlParam = new URLSearchParams(window.location.search);
const tokenAcesso = urlParam.get('params');

// Recupera segundo parâmetro da URL
const idParam = new URLSearchParams(window.location.search);
const tokenID = idParam.get('paramID');

const isCandidato = ref(tokenID.length != 14 ? true : false);

onBeforeMount(async () =>{
    await carregarDadosUsuarioLogado(tokenID)
    await validarToken(tokenAcesso)
})

const senha = ref({
  senha: '',
  confSenha: ''
})

const userProfile = ref({
    id : '',
    nome : '',
    email : ''
})

const empresaProfile = ref({
  nomeFantasiaome: '',
  cnpj: '',
  email: ''
})

// Função para tratar erros 
const trataErro = (response) => {

if (typeof response === 'object' && axios.isAxiosError(response)) {
    console.log("caiu aqui")
  $q.notify({
    message: response.response.data || 'erro na solicitação',
    color: "negative"
  });
  return true
  
} else {
  return false
}

};

const validarToken = async (tokenAcesso) => {

    if(isCandidato) {

        const userProfileResponse = await usuServi.validarToken({
            id: userProfile.value.id,
            token: tokenAcesso
                
        })
        if(trataErro(userProfileResponse)){
            return;
        }
    }

    const empresaResponse = await usuServi.validarToken({
        cnpj: empresaProfile.value.cnpj,
        token: tokenAcesso
            
    })

    if(trataErro(empresaResponse)) {
        return;
    }

}

const carregarDadosUsuarioLogado = async () => {
    
    if(isCandidato.value) {

        userProfile.value = await usuServi.buscarUsuaio(tokenID) 
        return;
    }
    empresaProfile.value = await usuServi.buscarEmpresa(tokenID)
}


const btnAtualizarSenhaUsuario = async () => {

    if(isCandidato) {

        const userProfileResponse = await usuServi.recuperarSenhaUsuario({
            id: userProfile.value.id,
            senha: senha.value.senha,
        })
        if(trataErro(userProfileResponse)){
            return;
        }

        $q.notify({message : userProfileResponse, color: 'positive'})
        limparSenha()
        router.push({ path: '/' });
        return;
    }

    const empresaResponse = await usuServi.recuperarSenhaEmpresa({
        cnpj: empresaProfile.value.cnpj,
        senha: senha.value.senha,
    })

    if(trataErro(empresaResponse)) {
        return;
    }

    $q.notify({message : empresaResponse, color: 'positive'})
    limparSenha()
    router.push({ path: '/' });
}

const limparSenha = () => {
    senha.value.senha = '',
    senha.value.confSenha = ''
}

</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.inputCadastro {
  display: flex;
  align-items: center;
  justify-content: center;
}

#titulo {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>