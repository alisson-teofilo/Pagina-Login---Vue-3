<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated color="white" height-hint="98">
      <q-toolbar>
        <div class="row">
          <q-toolbar-title>
            Link Vagas
          </q-toolbar-title>
          <div class="q-ml-auto">
            <q-btn flat class="q-mr-sm" icon="home" title="Início" />
            <q-btn flat icon="person" title="Perfil" />
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>

        <!-- CARD DE BUSCA -->
       
        <div class="q-px-md q-pt-lg col-5">
          <q-form @submit="btnBuscar" >
            <div class="row items-center">
              <q-input class="col-4 q-pr-sm" v-model="buscarVagas.descricao" :rules="[val => !!val || 'Infome dados sobre a vaga']" lazy-rules="ondemand" dense placeholder="Buscar vagas" outlined />
              <q-btn class="btnSubmitClass col-1" outlined color="primary" icon="search" type="submit" />
            </div>
          </q-form>
        </div>

        <div class="row">
          <q-select class="q-ml-md col-2" icon="filter_list" dense outlined v-model="buscarVagas.plataforma" :options="options" label="VAGAS" />
        </div>

        <!-- DIVISÃO EM DOIS CARDS -->
        <div class="q-ma-md row ">

          <!-- CARD DA ESQUERDA -->
          <div class="col-5" style="overflow-y: auto;">
            <q-card class="q-px-md" flat bordered style="max-height: 780px; overflow-y: auto;">
              <h6 class="q-my-md">Resumo de Vagas</h6>
              <div class="infinite-scroll">
                <div
                  v-for="vaga in listaVagas"
                  :key="vaga.id"
                  class="vaga-resumo q-mb-md cursor-pointer"
                  @click="selecionarVaga(vaga.id)"
                >
                <q-card-section>
                  <div class="row items-center">
                    
                    <div class="col-auto q-mr-md">
                      <q-item-label>
                        <img :src="vaga.companyLogo || logoDefault" alt="Logo da Empresa" style="width: 60px; height: 60px;" />
                      </q-item-label>
                    </div>

                    <!-- Detalhes da Vaga -->
                    <div class="col">
                      <q-item-label class="text-h6">{{ vaga.titulo }}</q-item-label>
                      <q-item-label>
                        <strong>Empresa:</strong> {{ vaga.companyName }}
                      </q-item-label>
                      <q-item-label>
                        <strong>Data de Publicação:</strong> {{ formatarData(vaga.dataPublicacao) }}
                      </q-item-label>
                      <q-item-label>
                        <strong>Valor Mensal:</strong> {{ formatarValor(vaga.valorMensal) }}
                      </q-item-label>
                    </div>
                  </div>
                </q-card-section>
                
                  <q-separator/>

                </div>
              </div>
            </q-card>
          </div>

          <!-- CARD DA DIREITA  -->
          <div class="col-7">
            <q-card flat bordered style="max-height: 780px; overflow-y: auto;">
              <q-card-section>
                <div class="q-pa-md">
                  
                  <div v-if="vagaSelecionada" >

                    <div class="row items-center q-mb-md">
                      <q-item-label class="col-auto q-mr-sm">
                        <img :src="vagaSelecionada.companyLogo || logoDefault" alt="Logo da Empresa" style="width: 40px; height: 40px;" />
                      </q-item-label>

                      <q-item-label class="text-h6 col q-ml-sm">
                        {{ vagaSelecionada.companyName }}
                      </q-item-label>
                    </div>

                    <q-item-label class="text-h6">{{ vagaSelecionada.titulo }}</q-item-label>
                    <q-item-label v-html="vagaSelecionada.descricao" class="description-content"></q-item-label>

                    <q-item-label>
                      <strong>Data de Publicação:</strong> {{ formatarData(vagaSelecionada.dataPublicacao) }}
                    </q-item-label>

                    <q-item-label>
                      <strong>Valor Mensal:</strong> {{ formatarValor(vagaSelecionada.valorMensal) }}
                    </q-item-label>

                    <q-item-label v-if="vagaSelecionada.companyName">
                      <strong>Empresa:</strong> {{ vagaSelecionada.companyName }}
                    </q-item-label>

                    <q-item-label v-if="vagaSelecionada.jobLevel">
                      <strong>Nível do Cargo:</strong> {{ vagaSelecionada.jobLevel }}
                    </q-item-label>
                  </div>
                  <div v-else>
                    <p>Selecione uma vaga para ver os detalhes</p>
                  </div>
                </div>
              </q-card-section>

              <q-card-actions align="right">

                <q-btn v-if="vagaSelecionada.url" color="primary" outline label="Candidatar-se" :href="vagaSelecionada.url" target="_blank" />

                <q-btn v-else outlined label="Candidatar-se" @click="applyToJob(vagaSelecionada.url)" />
                
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
import { ref, onBeforeMount } from 'vue'
import axios from 'axios';
import vagasService from 'src/services/vagasService'
import logoDefault from 'src/img/logo.png' 

const vagasServi = vagasService();
const listaVagas = ref([]);

onBeforeMount(async () => {
  listaVagas.value = await vagasServi.buscarVagas(buscarVagas.value);
  vagaSelecionada.value = listaVagas.value[0];
})

const options = ref ([
  'Interno', 'Externo'
])

const buscarVagas = ref ({
  descricao: '',
  plataforma: 'Interno'
})

const vagaSelecionada = ref ({
  id : '',
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

// Função para tratar erros 
const trataErro = (response) => {

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

const btnBuscar = async () => { 

  const response = await vagasServi.buscarVagas(buscarVagas.value)
  if(trataErro(response)){
    return;
  }

  listaVagas.value = response;
  vagaSelecionada.value = listaVagas.value[0]
}

// Funções dos cards
const selecionarVaga = (idVagaSelecionada) => {
  console.log(idVagaSelecionada)

  for (let i = 0; i < listaVagas.value.length; i++) {
    if (listaVagas.value[i].id === idVagaSelecionada) {
      vagaSelecionada.value = listaVagas.value[i];
      break;
    }
  }
};

const applyToJob = async (vagaUrl) => {
  //await useServiceVagas.candidatarSe(vagaUrl)

  alert('Você se candidatou à vaga!')
}

// Funções úteis
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

</script>

<style>
.description-content h1, .description-content h2, .description-content h3 {
  font-size: 1.2em;
  font-weight: bold;
}

.description-content p, .description-content li {
  font-size: 1em;
  line-height: 1.4em;
}
.btnSubmitClass{
  margin-bottom: 24px;
}
</style>
