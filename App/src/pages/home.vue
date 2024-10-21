<template>

  <q-layout view="lHh Lpr lFf" >

    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
         Vagas Remotas
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <!-- Centralizar o conteúdo -->
      <q-page class="q-px-md q-py-sm">
        <div >

          <q-card class="justify-between">

            <q-card class="q-pa-md">

              <div class="row q-px-md q-py-sm justify-between items-center">
                
                <div class="col-auto">

                  <q-form @submit="btnBuscar">
                      
                    <div class="row" v-if="ehBuscaVagas">
                      <q-input  v-model="vagas.descricao" dense placeholder="Buscar vagas" outlined />
                      <q-btn class="q-ml-sm" outlined color="primary" icon="search" type="submit"/>
                    </div>

                    <div class="row" v-else>
                      <q-input v-model="usuario.nome" dense placeholder="Buscar usuários ou empresas" outlined />
                      <q-btn class="q-ml-sm" outlined color="primary" icon="search" type="submit"/>
                    </div>

                  </q-form>

                </div>

                <div class="col-auto">
                  <q-btn flat class="q-mr-sm" color="blue-grey" icon="home" title="Início"/>
                  <q-btn :flat="!ehBuscaVagas" icon="work" @click="btnIconTrabalho()" :color="ehBuscaVagas ? 'primary' : 'blue-grey'" title="Vagas de emprego"/>
                </div>

                <div class="col-auto">
                  <q-btn flat color="blue-grey" icon="person" title="perfil" />
                </div>

              </div>
            </q-card>

          </q-card>

          <q-card class="q-mt-sm">
            <q-card-section>

            <div v-if="listaVagas.value && listaVagas.value.length">

              <h6>Vagas de Emprego</h6>
              <q-list bordered>

                <q-item v-for="vaga in listaVagas" :key="vaga.id" clickable @click="applyToJob(vaga.id)">
                  <q-item-section>
                    <q-item-label>{{ vaga.titulo }}</q-item-label>
                    <q-item-label caption>{{ vaga.empresa }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat label="Candidatar-se" @click="applyToJob(vaga.id)" />
                  </q-item-section>
                </q-item>

              </q-list>
            </div>

            <div v-if="listaVagas.value && listaVagas.value.length">

              <h6>Usuários</h6>
              <q-list bordered>

                <q-item v-for="usuario in listaUsuarios" :key="usuario.id" clickable>
                  <q-item-section>
                    <q-item-label>{{ usuario.nome }}</q-item-label>
                    <q-item-label caption>{{ usuario.tipo }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div> 

            </q-card-section>
          </q-card>

        </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import useApiUsuario from 'src/composable/useApiUsuario'
import useApiVagas from 'src/composable/useApiVagas'

const useServiceUsuario = useApiUsuario()
const useServiceVagas = useApiVagas()

const ehBuscaVagas = ref(false);

const listaVagas = ref([]);
const listaUsuarios = ref([]);

const vagas = ref({
  descricao: ''
})

const usuario = ref({
  nome: ''
})

const btnBuscar = async () => {

  console.log('vagas.value ', vagas.value)
  console.log('usuario.value ', usuario.value)
  
  if(ehBuscaVagas){
    listaVagas.value = await useServiceVagas.buscarVagas(vagas.value)
    return;
  }

  listaUsuarios.value = await useServiceUsuario.buscarUsuarios(usuario.value)
}

const btnIconTrabalho = () =>{
  ehBuscaVagas.value = !ehBuscaVagas.value
}

const applyToJob = async (vagaId) => {
  await useServiceVagas.candidatarSe(vagaId)
  alert('Você se candidatou à vaga!')
}

</script>

