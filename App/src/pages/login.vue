<template>
  <q-layout>

    <div class="container">

      <q-card style="height: 600px; width: 470px;">

        <div v-if="ehCadastroUsuario === ehCadastroEmpresa ? true : false">
          <q-card-section class="q-pb-none">

            <div class="column" id="titulo">
              <div id="login">
                <h4 class="q-mb-md">LOGIN</h4>
              </div>
              <div>Não tem cadastro? <span class="btnCadastro" v-on:click="btnCadastro">Clique Aqui</span>
              </div>
            </div>

          </q-card-section>
          <div>
            <q-form @submit.prevent="logarConta()">
              <div class="column" id="input">
                <q-input dense style="width: 250px ;" v-model="usuario.id" class="q-mx-sm q-mb-sm" label="ID" outlined>
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>

                <q-input filled :type="isPwd ? 'password' : 'text'" dense style="width: 250px ;" v-model="usuario.senha"
                  class="" label="Senha" outlined>
                  <template v-slot:prepend>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                      @click="isPwd = !isPwd" />
                  </template>
                </q-input>
                <q-btn style="width: 250px ;" class="q-ma-xs" label="LOGIN" color="blue-4" type="submit"></q-btn>
                <div> <span class="btnCadastro" v-on:click="btnSolicitaToken">Esqueceu sua senha?</span></div>
              </div>
            </q-form>
          </div>
        </div>

        <!-- CADASTRO USUÁRIO -->
        <div v-show="ehCadastroUsuario">
          <div>

            <q-card-section class="q-pb-none">

              <div class="column" id="titulo">
                <div id="login">
                  <h6 class="q-mb-md">CADASTRAR USUÁRIO</h6>
                </div>
              </div>

            </q-card-section>

            <q-form @submit="salvarCadastroUsuario()" @reset="cancelarCadastroUsuario()">

              <div class="row inputCadastro">

                <div class="col-8">
                  <q-input dense outlined class="q-mt-sm " label="NOME" v-model="usuario.nome"></q-input>
                  <q-input dense outlined class="q-pt-sm" label="EMAIL" v-model="usuario.email"></q-input>
                  <q-input dense outlined class="q-pt-sm" label="CARGO" v-model="usuario.cargoAtual"></q-input>
                  <q-input dense outlined class="q-pt-sm" label="CPF" v-model="usuario.cpf"></q-input>

                  <div class="row">
                    <div class="col-6">

                      <q-input :type="isPwdUsu ? 'password' : 'text'" dense outlined class="q-mt-sm q-mr-sm" label="SENHA" v-model="usuario.senha" >
                        <template v-slot:prepend>
                          <q-icon :name="isPwdUsu ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="isPwdUsu = !isPwdUsu" />
                        </template>
                      </q-input>

                    </div>
                    <div class="col-6">
                      <q-input  :type="isPwd2Usu ? 'password' : 'text'" dense outlined class="q-mt-sm " label="CONFIRMAR SENHA" v-model="usuario.senha2">
                        <template v-slot:prepend>
                                <q-icon :name="isPwd2Usu ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwd2Usu = !isPwd2Usu" />
                        </template>
                      </q-input>
                    </div>
                  </div>

                </div>

                <q-separator style="width: 300px;" class="q-mb-md q-mt-md q-mx-xl" />

                <div class="q-mt-xm row">
                  <q-btn style="width: 210px;" color="blue" class="q-mr-sm" label="Cadastrar" type="submit"></q-btn>
                  <q-btn color="orange" class="q-mr-sm" label="VOLTAR" type="reset"></q-btn>
                </div>

                <div class="q-mt-sm">
                  <q-btn flat style="width: 300px;" color="secondary" class="q-mr-sm" label="Cadastrar empresa" @click="btnCadastrarEmpresa"></q-btn>
                </div>

              </div>

            </q-form>
          </div>
        </div>

        <div v-show="ehCadastroEmpresa">
          <div>

            <q-card-section class="q-pb-none">

              <div class="column" id="titulo">
                <div id="login">
                  <h6 class="q-mb-md">CADASTRAR EMPRESA</h6>
                </div>
              </div>

            </q-card-section>

            <q-form @submit="salvarCadastroEmpresa()" @reset="cancelarCadastroEmpresa()">

              <div class="row inputCadastro">

                <div class="col-8">

                  <q-input dense outlined label="RAZÃO SOCIAL" :rules="[val => !!val || 'Informe a razão social']" lazy-rules="ondemand" v-model="empresa.razaoSocial"></q-input>
                  <q-input dense outlined label="NOME FANTASIA" :rules="[val => !!val || 'Informe o nome fatasia']" lazy-rules="ondemand" v-model="empresa.nomeFantasia"></q-input>
                  <q-input dense outlined label="EMAIL" :rules="[val => !!val || 'Informe o email']" lazy-rules="ondemand" v-model="empresa.email"></q-input>
                  <q-input dense outlined label="CNPJ" :rules="[val => val.length > 13 || 'Informe um cnpj válido']" lazy-rules="ondemand" v-model="empresa.cnpj"></q-input>
                  <q-input dense outlined label="SEGMENTO" :rules="[val => !!val || 'Informe o segmento']" lazy-rules="ondemand" v-model="empresa.segmento"></q-input>

                  <div class="row">

                    <div class="col-6">
                      <q-input :type="isPwdEmp ? 'password' : 'text'" dense outlined class="q-mt-sm q-mr-sm" label="SENHA" v-model="empresa.senha" >
                        <template v-slot:prepend>
                                <q-icon :name="isPwdEmp ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwdEmp = !isPwdEmp" />
                        </template>
                      </q-input>
                    </div>

                    <div class="col-6">
                      <q-input :type="isPwd2Emp ? 'password' : 'text'" dense outlined class="q-mt-sm " label="CONFIRMAR SENHA" v-model="empresa.senha2" >
                        <template v-slot:prepend>
                                <q-icon :name="isPwd2Emp ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwd2Emp = !isPwd2Emp" />
                        </template>
                      </q-input>
                    </div>

                  </div>

                </div>

                <q-separator style="width: 300px;" class="q-mb-md q-mt-md q-mx-xl" />

                <div class="q-mt-xm row">
                  <q-btn style="width: 210px;" color="blue" class="q-mr-sm" label="Cadastrar" type="submit"></q-btn>
                  <q-btn color="orange" class="q-mr-sm" label="VOLTAR" type="reset"></q-btn>
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
import { ref } from 'vue'
import userService from 'src/services/userService'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import axios from 'axios';

const router = useRouter();
const popUpcadastro = ref(false)
const $q = useQuasar() 
const usuServi = userService()
const isPwd = ref(true)
const isPwdUsu = ref(true)
const isPwd2Usu = ref(true)
const isPwdEmp = ref(true)
const isPwd2Emp = ref(true)
const ehCadastroUsuario = ref(false)    
const ehCadastroEmpresa = ref(false)

const usuario = ref({
  id: '',
  nome: '',
  email: '',
  cargoAtual: '',
  cpf: '',
  senha: '',
  senha2: ''
})

const empresa = ref({
  razaoSocial: '',
  nomeFantasia: '',
  cnpj: '',
  email: '',
  segmento: '',
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

// Função para tratar erros 
const trataErro = (response) => {

  console.log(response)

  if (typeof response === 'object' && axios.isAxiosError(response)) {
    $q.notify({
      message: response.response.data || 'erro na solicitação',
      color: "negative"
    });
    return true
    
  } else {
    return false
  }

};

// Login
const logarConta = async () => {

  try {
    const response = await usuServi.efetuarLogin(usuario.value)

    if (trataErro(response)) {
      return
    }

    localStorage.setItem('loginId', usuario.value.id.toString())
    router.push({ path: '/home' });

  } catch (error) {
    console.error(error)
  }

}

const btnCadastro = () => {
  ehCadastroUsuario.value = true
  popUpcadastro.value = true

}

const btnSolicitaToken = async () => {

  if (usuario.value.id === null || usuario.value.id === '') {
    $q.notify({ message: 'Informe o ID', color: 'negative' })

  } else {

    const response = await usuServi.enviaEmail(usuario.value)

    if (trataErro(response)) {
       return
    }
    $q.notify({message : response, color: 'positive'})
    
    limparID()
  }

}

// Cadastro
const salvarCadastroUsuario = async () => {

  if (usuario.value.senha === usuario.value.senha2) {

    const reMaiusculas = contemMaiusculas(usuario.value.senha)
    if (!reMaiusculas)
      $q.notify({ message: 'É necessário no mínimo 1 letra maiúscula', icon: 'warning', color: 'deep-orange' })

    const reMinusculas = contemMinusculas(usuario.value.senha)
    if (!reMinusculas)
      $q.notify({ message: 'É necessário no mínimo 1 letra minúscula', icon: 'warning', color: 'deep-orange' })

    const reNumereos = contemNumeros(usuario.value.senha)
    if (!reNumereos)
      $q.notify({ message: 'É necessário no mínimo 1 número', icon: 'warning', color: 'deep-orange' })

    const reEspeciais = contemEspeciais(usuario.value.senha)
    if (!reEspeciais)
      $q.notify({ message: 'É necessário no mínimo 1 caractere especial', icon: 'warning', color: 'deep-orange' })

    if (reMaiusculas && reMinusculas && reNumereos && reEspeciais) {

      const response = await usuServi.cadastrarUsuario(usuario.value)

      if (trataErro(response)) {
        return
      }

      limparCadastroUsuario()
      $q.notify({ message: response, icon: 'done', color: 'positive' })
      fecharJanelasCadastro()
    }
    return;
  }
  
  $q.notify({ message: 'As senhas não conferem', icon: 'error', color: 'negative' })
  
} 

const salvarCadastroEmpresa = async () => {

  if (empresa.value.senha === empresa.value.senha2) {

    const reMaiusculas = contemMaiusculas(empresa.value.senha)
    if (!reMaiusculas)
      $q.notify({ message: 'É necessário no mínimo 1 letra maiúscula', icon: 'warning', color: 'deep-orange' })

    const reMinusculas = contemMinusculas(empresa.value.senha)
    if (!reMinusculas)
      $q.notify({ message: 'É necessário no mínimo 1 letra minúscula', icon: 'warning', color: 'deep-orange' })

    const reNumereos = contemNumeros(empresa.value.senha)
    if (!reNumereos)
      $q.notify({ message: 'É necessário no mínimo 1 número', icon: 'warning', color: 'deep-orange' })

    const reEspeciais = contemEspeciais(empresa.value.senha)
    if (!reEspeciais)
      $q.notify({ message: 'É necessário no mínimo 1 caractere especial', icon: 'warning', color: 'deep-orange' })

    if (reMaiusculas && reMinusculas && reNumereos && reEspeciais) {

      const response = await usuServi.cadastrarEmpresa(empresa.value)

      if (trataErro(response)) {
        return
      }

      limparCadastroEmpresa()
      $q.notify({ message: response, icon: 'done', color: 'positive' })
      fecharJanelasCadastro()
    }
    return;
  }
 
  $q.notify({ message: 'As senhas não conferem', icon: 'error', color: 'negative' })
  
} 

const btnCadastrarEmpresa = () => {  
  ehCadastroUsuario.value = false
  ehCadastroEmpresa.value = true  
}

const cancelarCadastroUsuario = () => { 
  fecharJanelasCadastro()
  limparCadastroUsuario()
}

const cancelarCadastroEmpresa = () => { 
  fecharJanelasCadastro()
  limparCadastroEmpresa()
}

const fecharJanelasCadastro = () => {
  ehCadastroUsuario.value = false
  ehCadastroEmpresa.value = false
}

const limparID = () => {
  usuario.value.id = ''
}

const limparCadastroUsuario = () => {

  usuario.value.id = '',
  usuario.value.nome = '',
  usuario.value.email = '',
  usuario.value.cargoAtual = '',
  usuario.value.cpf = '',
  usuario.value.senha = '',
  usuario.value.senha2 = ''
}

const limparCadastroEmpresa = () => {

  empresa.value.razaoSocial= '',
  empresa.value.nomeFantasia = '',
  empresa.value.cnpj = '',
  empresa.value.email= '',
  empresa.value.segmento = '',
  empresa.value.senha = '',
  empresa.value.senha2 = ''
}

</script>

<style>
.btnFooter {

  margin-top: 300px;
}

.footer {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.inputCadastro {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.cardCadastro {
  margin-top: 70px;
}

#titulo {
  display: flex;
  align-items: center;
  justify-content: center;
}

#input {
  align-items: center;
}

.btnCadastro {
  cursor: pointer;
}

#backCard {
  display: flex;
  justify-content: center;
}
</style>
