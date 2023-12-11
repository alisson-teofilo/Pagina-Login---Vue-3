<template>
  <q-page>

    <div class="container">

      <q-card style="height: 600px; width: 470px;">

        <div v-if="!ehCadastroUsuario">
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
            <q-form @submit="logarConta()">
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
        <div v-if="ehCadastroUsuario">
          <div>

            <q-card-section class="q-pb-none">

              <div class="column" id="titulo">
                <div id="login">
                  <h6 class="q-mb-md">NOVO USUÁRIO</h6>
                </div>
              </div>

            </q-card-section>

            <q-form @submit="btnCadastraUsuario()" @reset="cancelarCadastro()">

              <div class="row inputCadastro">

                <div class="col-8">
                  <q-input dense outlined class="q-mt-sm " label="ID" v-model="usuario.id"></q-input>
                  <q-input dense outlined class="q-mt-sm " label="NOME" v-model="usuario.nome"></q-input>
                  <q-input dense outlined class="q-pt-sm" label="EMAIL" v-model="usuario.email"></q-input>

                  <div class="row">
                    <div class="col-6">
                      <q-input dense outlined class="q-mt-sm q-mr-sm" label="SENHA" v-model="usuario.senha"></q-input>
                    </div>
                    <div class="col-6">
                      <q-input dense outlined class="q-mt-sm " label="CONFIRMAR SENHA" v-model="usuario.senha2"></q-input>
                    </div>
                  </div>

                </div>

                <q-separator style="width: 300px;" class="q-mb-md q-mt-md q-mx-xl" />

                <div class="q-mt-xm row">

                  <div class="col-12">
                    <q-btn style="width: 210px;" color="blue" class="q-mr-sm" label="Cadastrar" type="submit"></q-btn>
                    <q-btn color="orange" class="q-mr-sm" label="VOLTAR" type="reset"></q-btn>
                  </div>

                </div>  
              </div>

            </q-form>
          </div>
        </div>
      </q-card>
    </div>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import userService from 'src/services/userService'
import { useQuasar } from 'quasar'


const popUpcadastro = ref(false)
const $q = useQuasar()
const usuServi = userService()
const isPwd = ref(true)
const ehCadastroUsuario = ref(false)

const usuario = ref({
  id: '',
  nome: '',
  email: '',
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
const trataErro = (error) => {

  if (error?.response?.data || error?.response) {
    $q.notify({
      message: error.response.data || 'erro na solicitação',
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

  }

}

const btnCadastraUsuario = async () => {

  try {
    const response = await usuServi.cadastrarUsuario(usuario.value)

    if (trataErro(response)) {
      return
    }

  } catch (error) {
    console.log(error)
  }

};

// Cadastro

const salvarCadastro = async () => {
  novoUsuario.value = true

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

      $q.notify.show({ dealay: 40 })
      const response = await usuServi.cadastrarUsuario(usuario.value)
      $q.notify.hide()

      if (trataErro(response)) {
        return
      }

      novoUsuario.value = false

    }
  }
  else {
    $q.notify({ message: 'As senhas não conferem', icon: 'done', color: 'negative' })
  }
}



const cancelarCadastro = () => {
  ehCadastroUsuario.value = false
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
