<template>
    <q-page>
        <div class="q-pa-md" style="max-width: 350px">
            <q-btn label="listar" @click="buscaUsuario()"/>
            <q-btn label="Limpar" @click="limparLista()"/>
            <q-list>
                <q-item v-for="usuario in listaUsuarios" clickable v-ripple>
                    <q-item-section>
                        {{ usuario.id }} {{ usuario.nome }}
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </q-page>
</template>

<script setup>
import { ref } from 'vue'
import  userService  from 'src/services/userService'

const useService = userService()

const listaUsuarios = ref()

const buscaUsuario = async () => {
    listaUsuarios.value = await useService.listaUsurios()
    if(listaUsuarios.value.length){
        console.log("Tem dado")
    }else{
        console.log("Não tem dado")
    }
}

function limparLista(){
    listaUsuarios.value = []
    console.log(!listaUsuarios.value.length)
}

</script>