<template>
  <div class="min-h-screen bg-gray-100">
    
    <nav class="p-4 mb-4 bg-white shadow-md">
      <h1 class="text-2xl font-bold">Dashboard</h1>
    </nav>

    <div class="container mx-auto">
      <div class="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
        
        <h2 class="mb-4 text-xl">Adicionar Apuração</h2>

        <form @submit.prevent="createApuracao" class="mb-4">
          <label for="secaoSelect" class="block mb-2 text-sm font-medium text-gray-900">
            Selecionar Seção
          </label>
          
          <select id="secaoSelect" v-model="selectedSecao" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
            <option value="" disabled>Escolha uma seção</option>
            <option v-for="secao in secoes" :key="secao.id" :value="secao.id">
              Seção: {{ secao.secao }} - Local: {{ secao.local_votacao }} - Aptos: {{ secao.aptos }}
            </option>
          </select>

          <div v-if="selectedSecao" class="mt-6">

            <hr class="mt-10 mb-10">
            
            <h3 class="mb-2 text-lg">Adicionar Apuração para Seção {{ selectedSecao }}</h3>

            <div class="grid gap-6 mb-6 md:grid-cols-3">
              <div class="mb-6">
                <label for="jan" class="block mb-2 text-sm font-medium text-gray-900">Total de Votos em Janeiro</label>
                <input v-model.number="apuracao.jan" min="0" id="jan" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0" type="number" required>
              </div>

              <div class="mb-6">
                <label for="jun" class="block mb-2 text-sm font-medium text-gray-900">Total de Votos em Junho</label>
                <input v-model.number="apuracao.junio" min="0" id="jun" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0" type="number" required>
              </div>

              <div class="mb-6">
                <label for="nego" class="block mb-2 text-sm font-medium text-gray-900">Total de Votos Negativos</label>
                <input v-model.number="apuracao.nego" min="0" id="nego" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0" type="number" required>
              </div>

              <div class="mb-6">
                <label for="brancos" class="block mb-2 text-sm font-medium text-gray-900">Total de Votos Brancos</label>
                <input v-model.number="apuracao.brancos" min="0" id="brancos" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0" type="number" required>
              </div>

              <div class="mb-6">
                <label for="nulos" class="block mb-2 text-sm font-medium text-gray-900">Total de Votos Nulos</label>
                <input v-model.number="apuracao.nulos" min="0" id="nulos" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0" type="number" required>
              </div>

              <div class="mb-6">
                <label for="abstencao" class="block mb-2 text-sm font-medium text-gray-900">Total de Abstenções</label>
                <input v-model.number="apuracao.abstencao" min="0" id="abstencao" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0" type="number" required>
              </div>
            </div>
            
            <button class="p-2 text-white bg-green-500 rounded-md">Salvar Apuração</button>
            
          </div>
        </form>

      </div>

      <div class="max-w-full p-6 mt-10 bg-white border border-gray-200 rounded-lg shadow">
        
        <h2 class="mb-4 text-xl">Apurações de Votos</h2>

        <div class="flex flex-wrap items-center justify-start pt-4 pb-4 space-y-4 pe-4 flex-column sm:flex-row sm:space-y-0">

          <label for="table-search" class="sr-only">Pesquisa da sessão</label>

          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none rtl:inset-r-0 rtl:right-0 ps-3">
              <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
              </svg>
            </div>

            <input type="text" id="table-search" v-model="searchTerm" class="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Pesquisa da sessão">
          </div>
          
        </div>

        <table class="w-full text-sm text-left text-gray-500 rtl:text-right">

          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                Sessão
              </th>
              <th scope="col" class="px-6 py-3">
                Votos Jan
              </th>
              <th scope="col" class="px-6 py-3">
                Votos Junio
              </th>
              <th scope="col" class="px-6 py-3">
                Votos Nego
              </th>
              <th scope="col" class="px-6 py-3">
                Ação
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="apuracao in filteredApuracoes" :key="apuracao.id"
              class="bg-white border-b hover:bg-gray-50">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ apuracao.id }}
              </th>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ apuracao.secao_id }}
              </th>
              <td class="px-6 py-4">
                {{ apuracao.jan }}
              </td>
              <td class="px-6 py-4">
                {{ apuracao.junio }}
              </td>
              <td class="px-6 py-4">
                {{ apuracao.nego }}
              </td>
              <td class="px-6 py-4">
                <button @click="confirmDelete(apuracao.secao_id)" class="flex p-2 text-white bg-red-500 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import { onMounted } from 'vue'
  import { initFlowbite } from 'flowbite'

  onMounted(() => {
    initFlowbite();
  })

  export default {
    data() {
      return {
        secoes: [],
        apuracoes: [],
        selectedSecao: null,
        apuracao: {
          jan: 0,
          junio: 0,
          nego: 0,
          brancos: 0,
          nulos: 0,
          abstencao: 0
        },
        searchTerm: '',
      };
    },
    
    computed: {
      filteredApuracoes() {
        return this.apuracoes.filter(apuracao => {
          return (
            apuracao.secao_id && apuracao.secao_id.toString().includes(this.searchTerm)

            // apuracao.secao_id.toString().includes(this.searchTerm) ||
            // apuracao.secao_id.toString().includes(this.searchTerm) ||
            // apuracao.jan.toString().includes(this.searchTerm) ||
            // apuracao.junio.toString().includes(this.searchTerm) ||
            // apuracao.nego.toString().includes(this.searchTerm)
          );
        });
      },
    },

    async created() {
      await this.fetchSecoes();
      await this.fetchApuracoes();
    },

    methods: {
      async fetchSecoes() {
        const response = await fetch(import.meta.env.VITE_API_SECOES);
        this.secoes = await response.json();
      },

      async fetchApuracoes() {
        const response = await fetch(import.meta.env.VITE_API_APURACAO_VOTOS);
        this.apuracoes = await response.json();
      },

      async createApuracao() {
        const response = await fetch(import.meta.env.VITE_API_APURACAO_VOTOS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...this.apuracao, secao_id: this.selectedSecao }),
        });

        if (response.ok) {
          const newApuracao = await response.json();
          this.apuracoes.push(newApuracao);
          this.resetForm();
        } else {
          console.error('Erro ao criar apuração');
        }
      },

      async confirmDelete(secao_id) {
        if (confirm('Tem certeza que deseja excluir esta apuração?')) {
          await this.deleteApuracao(secao_id);
        }
      },

      async deleteApuracao(secao_id) {
        await fetch(`${import.meta.env.VITE_API_APURACAO_VOTOS}/${secao_id}`, {
          method: 'DELETE',
        });
        this.apuracoes = this.apuracoes.filter(apuracao => apuracao.secao_id !== secao_id);
      },

      resetForm() {
        this.apuracao = { jan: 0, junio: 0, nego: 0, brancos: 0, nulos: 0, abstencao: 0 };
        this.selectedSecao = null;
        this.fetchApuracoes();
      }
    }
  }
</script>

<style scoped>
  /* Estilos personalizados se necessário */
</style>