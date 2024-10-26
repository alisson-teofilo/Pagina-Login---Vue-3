<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated color="white" height-hint="98">
      
      <q-toolbar>
        
        <div class="row">
          <q-toolbar-title>
            Link Vagas
          </q-toolbar-title>

          <div class="q-ml-auto">
              <q-btn flat class="q-mr-sm" icon="home" title="Início"/>
              <q-btn flat  icon="person" title="perfil" />
          </div>
        </div>

      </q-toolbar>

    </q-header>

    <q-page-container>
      <q-page>

        <!-- CARD DE BUSCA -->
        <q-card class="q-ma-md">

          <div class="row q-px-md q-py-sm justify-between items-center">
          
            <div class="col-auto">

              <q-form @submit="btnBuscar">
                  
                <div class="row">
                  <q-input  v-model="vagas.descricao" dense placeholder="Buscar vagas" outlined />
                  <q-btn class="q-ml-sm" outlined color="primary" icon="search" type="submit"/>
                </div>

              </q-form>

            </div>
            
          </div> 
        </q-card>

        <!-- CARD DE EXIBIÇÃO DE VAGAS -->

        <div class="q-ma-md">
          <h6>Vagas de Emprego</h6>
          <div v-for="vaga in listaVagas" :key="vaga.id" class="q-mb-md">
            <q-card bordered class="q-mt-sm">
              <q-card-section>
                <div class="q-pa-md">
                  <q-item-label class="text-h6">{{ vaga.titulo }}</q-item-label>
                  <q-item-label v-html="vaga.descricao" class="description-content"></q-item-label>
                  
                  <q-item-label>
                    <strong>Data de Publicação:</strong>
                    {{ formatarData(vaga.dataPublicacao) }}
                  </q-item-label>
                  
                  <q-item-label>
                    <strong>Valor Mensal:</strong>
                    {{ formatarValor(vaga.valorMensal) }}
                  </q-item-label>
                  
                  <q-item-label v-if="vaga.url">
                    <strong>Website:</strong> 
                    <a :href="vaga.url" target="_blank">{{ vaga.url }}</a>
                  </q-item-label>
                  
                  <q-item-label v-if="vaga.companyName">
                    <strong>Empresa:</strong> {{ vaga.companyName }}
                  </q-item-label>
                  
                  <q-item-label v-if="vaga.jobLevel">
                    <strong>Nível do Cargo:</strong> {{ vaga.jobLevel }}
                  </q-item-label>
                </div>
              </q-card-section>

              <q-card-actions align="right">
                  <q-btn flat label="Candidatar-se" @click="applyToJob(vaga.id)" />
              </q-card-actions>

            </q-card>
          </div>
        </div>
          
      </q-page>
    </q-page-container>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
//import useApiUsuario from 'src/composable/useApiUsuario'
import vagasService from 'src/services/vagasService'

const vagasServi = vagasService();

const listaVagas = ref([]);

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)

const vagas = ref({
  titulo: '',
  descricao: '',
  dataPublicacao: '',
  valorMensal:'',
  companyName:'',
  companyLogo: '',
  jobLevel: ''

})

const usuario = ref({
  nome: ''
})

const btnBuscar = async () => {
  listaVagas.value = await vagasServi.buscarVagas(vagas.value.descricao)

}

function formatarData(data) {
  const dataObj = new Date(data)
  return dataObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

function formatarValor(valor) {
  return valor > 0
    ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : 'Salário a combinar'
}

const applyToJob = async (vagaId) => {
  await useServiceVagas.candidatarSe(vagaId)
  alert('Você se candidatou à vaga!')
}

</script>

<style>
.description-content h1, .description-content h2, .description-content h3 {
  font-size: 1.2em; /* Ajuste para deixar menos desproporcional */
  font-weight: bold;
}

.description-content p, .description-content li {
  font-size: 1em;
  line-height: 1.4em;
}
</style>
