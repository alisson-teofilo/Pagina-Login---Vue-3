<template>
  <q-layout view="hHh lpR fFf">

    <q-header height-hint="98">
      <q-toolbar  :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-grey-2'">
        
        <div class="row items-center col-12">

          <div class="col-auto text-h6 text-black q-ml-sm">
            Link Vagas
          </div>
        
          <div class="row class_buscar_header items-center col-10 q-ml-md q-my-md">

            <q-select class="q-mx-md col-2" dense outlined v-model="buscarVagas.plataforma" :options="options" label="VAGAS" />
            <q-input class="col-4 q-pr-sm " v-model="buscarVagas.descricao" dense placeholder="Buscar vagas" outlined />

            <q-btn  class="col-1" outlined color="primary" icon="search"  @click="btnBuscarVaga()"
            />
          </div>

        </div>

      </q-toolbar>
  </q-header>

    <q-page-container>
      <q-page>
       
        <!-- DIVISÃO EM DOIS CARDS -->
        <div class="row ">

          <!-- CARD DA ESQUERDA -->
          <div class="col-5" style="overflow-y: auto;">
            <q-card class="q-px-md" flat bordered style="max-height: 780px; overflow-y: auto;">
              <h6 class="q-my-md">Resumo de Vagas</h6>
              <div class="infinite-scroll">
           
                <div
                  v-for="(vaga, index) in listaVagas"
                  :key="vaga.idVaga"
                  class="vaga-resumo q-mb-md cursor-pointer"
                  @click="selecionarVaga(vaga.idVaga)"
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

                  <q-separator v-show="index < listaVagas.length -1"/>

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

                    <q-item-label v-if="vagaSelecionada.jobLevel">
                      <strong>Nível do Cargo:</strong> {{ vagaSelecionada.jobLevel }}
                    </q-item-label>
                  </div>
                  <div v-else>
                    <p>Selecione uma vaga para ver os detalhes</p>
                  </div>
                </div>
              </q-card-section>

              <q-card-actions class="q-ma-sm" align="right">

                <q-btn v-if="vagaSelecionada.url" color="primary" outline label="Candidatar-se" :href="vagaSelecionada.url" target="_blank" />

                <q-btn v-else outlined label="Candidatar-se" @click="aplicarVaga(vagaSelecionada.idVaga)" />
                
              </q-card-actions>
            </q-card>
          </div>

        </div>

      </q-page>
    </q-page-container>

    <!-- CARD DE CANDIDATURAS -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div class="q-px-md">
        <h6 v-if="isCandidato" class="text-subtitle1 q-mt-md">Minhas Candidaturas</h6>
        <h6 v-else class="text-subtitle1 q-mt-md">Vagas Publicadas</h6>
        <div v-if="isCandidato">
          <div v-for="(vaga, index) in vagasCadastradas" :key="vaga.idVaga" class="q-mb-md">

            <q-item dense class="q-mb-none">
              <q-item-section avatar>
                <img :src="vaga.companyLogo || logoDefault" alt="Logo" style="width: 40px; height: 40px;">
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-subtitle2">{{ vaga.titulo }}</q-item-label>
                <q-item-label caption>{{ vaga.companyName }}</q-item-label>
              </q-item-section>
            </q-item>
            
            <div class="row q-mb-sm">
              <q-btn class="q-ml-auto" flat round dense icon="delete" color="red" @click="deletarCandidatura(vaga.rowid)" />
            </div>

            <q-separator v-if="index < vagasCadastradas.length - 1" />
          </div>
        </div>
        
        <div v-else>
          <div v-for="(vaga, index) in vagasPublicadas" :key="vaga.idVaga" class="q-mb-md">

            <q-item clickable @click="btnDialogEditarVaga(vaga.idVaga)">
              <q-item-section avatar>
                <img :src="vaga.companyLogo || logoDefault" alt="Logo" style="width: 40px; height: 40px;">
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle2">{{ vaga.titulo }}</q-item-label>
                <q-item-label caption>{{ vaga.dataPublicacao }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator v-if="index < vagasPublicadas.length - 1" />
          </div>
        </div>
        
        <div>
          <q-btn
            v-if="!isCandidato"
            class="q-mt-md"
            color="primary"
            label="Cadastrar Vaga"
            @click="btnDialogVagas()"
          />
        </div> 
      </div>
    </q-drawer>
  
    <!-- CARDS DE PERFIL  -->
     <div v-if="isCandidato">
      <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
        <div class="q-pa-md">

          <div class="q-mt-md" style="display: flex; flex-direction: column; align-items: center;">
            <img :src="fotoPerfilUsuario" alt="Logo" style="width: 80px; height: 80px; border-radius: 50%;">
            <q-item-label class="q-mt-lg text-h6">{{ userProfile.nome }}</q-item-label>
            <q-item-label caption>{{ userProfile.email }}</q-item-label>
            <q-item-label caption>{{ userProfile.cargoAtual }}</q-item-label>
            <q-btn class="q-mt-md" color="primary" outline label="Ver Perfil" @click="verPerfil" />
          </div>
          
        </div>
      </q-drawer>
    </div>

    <div v-else>
      <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
        <div class="q-pa-md">
          <div class="q-mt-md" style="display: flex; flex-direction: column; align-items: center;">
            <img :src="fotoPerfilEmpresa" alt="Logo" style="width: 80px; height: 80px; border-radius: 50%;">
            <q-item-label class="q-mt-lg text-h6">{{ empresaProfile.nomeFantasia }}</q-item-label>
            <q-item-label caption>{{ empresaProfile.email }}</q-item-label>
            <q-btn class="q-mt-md" color="primary" outline label="Ver Perfil" @click="verPerfilEmpresa" />
          </div>
          
        </div>
      </q-drawer>
    </div>

    <!-- DIALOG DE PERFIL DO USUÁRIO -->
    <q-dialog v-model="dialogPerfil">
      <q-card>
        <q-card-section>
            <div class="q-ml-md text-h6">Editar Cadastro</div>
          </q-card-section>

          <q-separator />
        <div>
          <q-form @submit.prevent="btnAtualizarCadastroUsuario">
            <q-card-section style="max-height: 50vh; min-width: 50vh;" class="q-mx-md q-mb-md row col-12">
              <div class="q-ml-auto">
                <q-btn class="q-mb-sm" flat dense icon="edit" title="Editar" color="grey" @click="editPerfil = !editPerfil"/>
              </div>

              <q-input class="col-12" :disable="editPerfil" v-model="usuario.nome" :rules="[val => !!val || 'Informe um nome válido']" lazy-rules="ondemand" dense placeholder="Nome" outlined />
              <q-input class="col-12" :disable="editPerfil" v-model="usuario.cargoAtual" :rules="[val => !!val || 'Informe um cargo válido']" lazy-rules="ondemand" dense placeholder="Cargo Atual" outlined />
              <q-input class="col-12" :disable="editPerfil" v-model="usuario.email" type="email" lazy-rules="ondemand" dense placeholder="Email" outlined />
              
              <div class="row q-mt-lg col-12">
            
                <div class="col-6">
                  <q-input :rules="[val => val.length > 7 || 'Mínimo 8 caracteres']" lazy-rules="ondemand" dense v-model="usuario.senha" filled :type="isPwd ? 'password' : 'text'" hint="Min. 8 caracteres">
                    <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                          />
                    </template>
                  </q-input>
                </div>

                <div class="col-6 q-pl-md">
                  <q-input :rules="[ val => val.length > 7 || 'Mínimo 8 caracteres']" lazy-rules="ondemand" class="col-6" dense v-model="usuario.confiSenha" filled :type="isPwd2 ? 'password' : 'text'" hint="Min. 8 caracteres">
                    <template v-slot:append>
                      <q-icon
                          :name="isPwd2 ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd2 = !isPwd2"
                        />
                        </template>
                    </q-input>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="left" class="q-ml-md">
              <q-btn flat label="Salvar" color="primary" type="submit"/>
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
            </q-card-actions>
          </q-form>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogPerfilEmpresa">
      <q-card>
        <q-card-section>
            <div class="q-ml-md text-h6">EDITAR PERFIL EMPRESA </div>
          </q-card-section>

          <q-separator />
        <div>
          <q-form @submit.prevent="btnAtualizarCadastroEmpresa">
            <q-card-section style="max-height: 50vh; min-width: 50vh;" class="q-mx-md q-mb-md row col-12">
              <div class="q-ml-auto">
                <q-btn class="q-mb-sm" flat dense icon="edit" title="Editar" color="grey" @click="editPerfil = !editPerfil"/>
              </div>

              <q-input class="col-12" :disable="editPerfil" v-model="empresaProfile.nomeFantasia" :rules="[val => !!val || 'Informe um nome válido']" lazy-rules="ondemand" dense placeholder="Nome" outlined />
              
              <div class="row q-mt-lg col-12">
            
                <div class="col-6">
                  <q-input :rules="[val => val.length > 7 || 'Mínimo 8 caracteres']" lazy-rules="ondemand" dense v-model="empresaProfile.senha" filled :type="isPwd ? 'password' : 'text'" hint="Min. 8 caracteres">
                    <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                          />
                    </template>
                  </q-input>
                </div>

                <div class="col-6 q-pl-md">
                  <q-input :rules="[ val => val.length > 7 || 'Mínimo 8 caracteres']" lazy-rules="ondemand" class="col-6" dense v-model="empresaProfile.confSenha" filled :type="isPwd2 ? 'password' : 'text'" hint="Min. 8 caracteres">
                    <template v-slot:append>
                      <q-icon
                          :name="isPwd2 ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd2 = !isPwd2"
                        />
                        </template>
                    </q-input>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="left" class="q-ml-md">
              <q-btn flat label="Salvar" color="primary" type="submit"/>
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
            </q-card-actions>
          </q-form>
        </div>
      </q-card>
    </q-dialog>


     <!-- CADASTRAR VAGA -->
    <q-dialog v-model="dialogCadastrarVaga">
      <q-card>
        <q-card-section>
            <div class="q-ml-md text-h6">Cadastrar Vagas</div>
          </q-card-section>

          <q-separator />
        <div>
          <q-form @submit.prevent="btnCadastrarVaga">
            <q-card-section style="max-height: 50vh; min-width: 50vh;" class="q-mx-md q-mb-md row col-12">

              <div class="q-mt-sm col-12">
                <q-input class="col-12" readonly v-model="empresaProfile.nomeFantasia" :rules="[val => !!val || 'Informe um nome válido']" lazy-rules="ondemand" dense placeholder="Nome da Empresa" outlined />
                <q-input class="col-12" v-model="cadastro.titulo" :rules="[val => !!val || 'Informe um cargo válido']" lazy-rules="ondemand" dense placeholder="Titulo" outlined />
                <q-input class="col-12" v-model="cadastro.descricao" type="textarea" :rules="[val => !!val || 'Informe um cargo válido']" lazy-rules="ondemand" dense placeholder="Descrição" outlined />
                <q-input class="col-12" v-model="cadastro.jobLevel"  :rules="[val => !!val || 'Informe um cargo válido']" lazy-rules="ondemand" dense placeholder="Senioridade" outlined />
                <q-input class="col-12" v-model="cadastro.valorMensal"  :rules="[val => !!val || 'Informe um cargo válido']" lazy-rules="ondemand" dense placeholder="Salário" outlined />
              </div>

            </q-card-section>

            <q-separator />

            <q-card-actions align="left" class="q-ml-md">
              <q-btn flat label="Salvar" color="primary" type="submit"/>
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
            </q-card-actions>
          </q-form>
        </div>
    </q-card>
  </q-dialog>

  <!-- EDITAR VAGA -->
  <q-dialog v-model="dialogEditarVaga">
      <q-card>
        <q-card-section class="q-m row">
            <div class="q-ml-md text-h6">Edita Vagas</div>
            <div class="q-ml-auto q-mr-md">
                <q-btn class="q-mb-sm" flat dense icon="edit" title="Detalhes" color="grey" @click="editVaga = !editVaga"/>
            </div>
          </q-card-section>

          <q-separator />
        <div>
          <q-form @submit.prevent="btnEditarVaga">
            <q-card-section style="max-height: 50vh; min-width: 50vh;" class="q-mx-md q-mb-md row col-12">

              <div class="q-mt-sm col-12">
                <q-input  class="col-12" readonly v-model="empresaProfile.nomeFantasia" :rules="[val => !!val || 'Informe um nome válido']" lazy-rules="ondemand" dense placeholder="Nome da Empresa" outlined />
                <q-input :disable="editVaga" class="col-12" v-model="cadastro.titulo" :rules="[val => !!val || 'Informe um cargo válido']" lazy-rules="ondemand" dense placeholder="Titulo" outlined />
                <q-input :disable="editVaga" class="col-12" v-model="cadastro.descricao" type="textarea" :rules="[val => !!val || 'Informe um cargo válido']" lazy-rules="ondemand" dense placeholder="Descrição" outlined />
                <q-input :disable="editVaga" class="col-12" v-model="cadastro.jobLevel"  :rules="[val => !!val || 'Informe um cargo válido']" lazy-rules="ondemand" dense placeholder="Senioridade" outlined />
                <q-input :disable="editVaga" class="col-12" v-model="cadastro.valorMensal"  :rules="[val => !!val || 'Informe um cargo válido']" lazy-rules="ondemand" dense placeholder="Salário" outlined />
              </div>

            </q-card-section>

            <q-separator />

            <q-card-actions align="left" class="q-ml-md">
              <q-btn flat label="Salvar" color="primary" type="submit"/>
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
            </q-card-actions>
          </q-form>
        </div>
    </q-card>
  </q-dialog>

  </q-layout>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import axios from 'axios';
import vagasService from 'src/services/vagasService'
import useApiUsuario from 'src/services/userService'
import logoDefault from 'src/img/logo.png' 
import fotoPerfilUsuario from 'src/img/Alisson.jpeg'
import fotoPerfilEmpresa from 'src/img/google.png'
import { useQuasar } from 'quasar'

const isPwd = ref(true)
const isPwd2 = ref(true)
const $q = useQuasar() 
const dialogPerfil = ref(false)
const dialogPerfilEmpresa = ref(false)
const dialogCadastrarVaga = ref(false)
const vagasServi = vagasService();
const usuarioServi = useApiUsuario();
const listaVagas = ref([]);
const loginId = ref(localStorage.getItem('loginId'));
const isCandidato = ref (localStorage.getItem('loginId').length != 14 ? true : false);
const vagasCadastradas = ref([])
const editPerfil = ref(true);
const editVaga = ref(true);
const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const vagasPublicadas = ref([]);
const dialogEditarVaga = ref(false)

const userProfile = ref({
  nome: '',
  email: '',
  cargoAtual: '',
  senha: '',
  confiSenha: '',
  cpf: ''
});

const empresaProfile = ref({
  nomeFantasiaome: '',
  cnpj: '',
  email: '',
  senha: '',
  confSenha: ''
})

const cadastro = ref ({
  titulo: '',
  descricao: '',
  valorMensal:'',
  companyName:'',
  jobLevel: '',
  cnpjEmpresa: ''
})

const usuario = ref({
  id: '',
  nome: '',
  email: '',
  cargoAtual: '',
  senha: '',
  confiSenha: '',
  cpf: ''
})

onBeforeMount(async () => {
  await carregarDadosUsuarioLogado();
  buscarVagasInternas();
})

const options = ref ([
  'Interno', 'Externo'
])

const buscarVagas = ref ({
  descricao: '',
  plataforma: 'Interno'
})

const vagaSelecionada = ref ({
  idVaga : '',
  titulo: '',
  descricao: '',
  dataPublicacao: '',
  valorMensal:'',
  companyName:'',
  companyLogo: '',
  jobLevel: ''
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

// Funções PRE-CARREGAMENTO
const carregarDadosUsuarioLogado = async () => {

  if(isCandidato.value) {

    userProfile.value = await usuarioServi.buscarUsuaio(loginId.value) 
    candidaturasByUsuario();
    return;
  }
  empresaProfile.value = await usuarioServi.buscarEmpresa(loginId.value)
  buscarVagasPublicadas()
}

const buscarVagasInternas = async () => {
  listaVagas.value = await vagasServi.buscarVagas(buscarVagas.value);
  vagaSelecionada.value = listaVagas.value[0];
}

const btnBuscarVaga = async () => { 

  const response = await vagasServi.buscarVagas(buscarVagas.value)
  if(trataErro(response)){
    return;
  }

  listaVagas.value = response;
  vagaSelecionada.value = listaVagas.value[0]
}

// Funções dos cards de vagas
const selecionarVaga = (idVagaSelecionada) => {

  for (let i = 0; i < listaVagas.value.length; i++) {
    if (listaVagas.value[i].idVaga === idVagaSelecionada) {
      vagaSelecionada.value = listaVagas.value[i];
      break;
    }
  }
};

const aplicarVaga = async (vagaId) => {

  const vaga = listaVagas.value.find(vaga => vaga.idVaga === vagaId);

  const response = usuarioServi.candidatarVaga({ 
    cpfUsuario: userProfile.value.cpf,
    idVaga: vagaId 
  })

  if (trataErro(response)) {
    console.error('Erro ao atualizar o cadastro');
    return;
  }

  if (vaga && !vagasCadastradas.value.some(cadVaga => cadVaga.idVaga === vagaId)) {
    vagasCadastradas.value.push(vaga);
  } 

  candidaturasByUsuario();
}

const candidaturasByUsuario = async () => {
  const response = await vagasServi.listarCandidaturasByUsuaio(userProfile.value.cpf)
  if (trataErro(response)) {
    console.error('Erro ao atualizar o cadastro');
    return;
  }
  vagasCadastradas.value = response
}

const deletarCandidatura = async (rowid) => {
  const response = await vagasServi.deletarCandidatura({ rowid: rowid})
  if (trataErro(response)) {
    console.error('Erro ao atualizar o cadastro');
    return;
  }
  candidaturasByUsuario()
}

// Perfil de usuário
const verPerfil = () => {
  usuario.value = userProfile.value
  dialogPerfil.value = true
}

const verPerfilEmpresa = () => {
  dialogPerfilEmpresa.value = true
}

const btnAtualizarCadastroUsuario = async () => { 

  const response = await usuarioServi.atualizarCadastro(usuario.value);
  if (trataErro(response)) {
    console.error('Erro ao atualizar o cadastro');
    return;
  }
  $q.notify({message : response, color: 'positive'})
  dialogPerfil.value = false
};

const btnAtualizarCadastroEmpresa = async () => { 

const response = await usuarioServi.editarCadastroEmpresa(empresaProfile.value);
if (trataErro(response)) {
  console.error('Erro ao atualizar o cadastro');
  return;
}
$q.notify({message : response, color: 'positive'})
dialogPerfilEmpresa.value = false
};


// Cadastrar Vagas
const btnEditarVaga = async () => {

  const response = await vagasServi.editarVagas({
    cnpjEmpresa: empresaProfile.value.cnpj,
    companyName: empresaProfile.value.nomeFantasia,
    descricao: cadastro.value.descricao,
    jobLevel: cadastro.value.jobLevel,
    titulo: cadastro.value.titulo,
    valorMensal: cadastro.value.valorMensal,
    idVaga: cadastro.value.idVaga
  })

  if (trataErro(response)) {
    console.error('Erro ao cadastrar vaga');
    return;
  }
  $q.notify({message : "Alteração realizada com sucesso!", color: 'positive'})
  dialogEditarVaga.value = false
}

const btnDialogEditarVaga = (idVaga) => {
 
  for (let i = 0; i < listaVagas.value.length; i++) {
    if (listaVagas.value[i].idVaga === idVaga) {
      cadastro.value = listaVagas.value[i];
      break;
    }
  }
  dialogEditarVaga.value = true
}

const btnDialogVagas = () => {
  dialogCadastrarVaga.value = true
}

const btnCadastrarVaga = async () => {
  
  const response = await vagasServi.cadastrarVagas({
    cnpjEmpresa: empresaProfile.value.cnpj,
    companyName: empresaProfile.value.nomeFantasia,
    descricao: cadastro.value.descricao,
    jobLevel: cadastro.value.jobLevel,
    titulo: cadastro.value.titulo,
    valorMensal: cadastro.value.valorMensal
  })
  
  if (trataErro(response)) {
    console.error('Erro ao cadastrar vaga');
    return;
  }

  vagasPublicadas.value = response;

  $q.notify({message : "Vaga cadastrada com sucesso!", color: 'positive'})
  dialogCadastrarVaga.value = false
}

const buscarVagasPublicadas = async () => {

  const response = await vagasServi.vagasPublicadas(empresaProfile.value.cnpj)
  if (trataErro(response)) {
    console.error('Erro ao buscar vagas poublicadas');
    return;
  }

  vagasPublicadas.value = response;
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

.class_buscar_header{
  margin-left: 174px;
}
</style>
