<template>
  <main id="app" class="container flex items-center justify-center w-full h-auto px-4 py-10 mx-auto sm:py-0 sm:h-screen">
    
    <celebration v-if="celebration">
      <div v-for="(candidate, index) in candidates" :key="index">

        <candidate v-if="candidate.elected" class="flex items-center justify-center mt-5">
          <img class="rounded-full h-50 w-50" :src="candidate.image" alt="image description" />

          <div class="flex-grow ml-4">
            <div class="flex justify-between">
              <div class="flex flex-col items-start">
                <group>
                  <span class="text-6xl font-bold">{{ candidate.name }}</span>
                  <span
                    class="bg-green-100 text-green-800 text-6xl font-bold mx-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Eleito</span>
                </group>

                <group class="flex justify-between w-full mt-10 items">
                  <span class="mb-1 text-3xl font-extrabold">{{ candidate.party }}</span>
                  <group class="flex flex-col">
                    <span class="mb-1 text-4xl font-bold">{{ candidate.percent }}%</span>
                    <span class="mb-1 text-4xl font-medium text-gray-400">{{ candidate.votes }} votos</span>
                  </group>
                </group>
              </div>
            </div>
          </div>
        </candidate>
      </div>
    </celebration>

    <voteSection v-else="celebration" class="w-full">
      <blockSection class="flex flex-col items-center justify-center w-full">
        <section>
          <p class="text-lg font-normal text-gray-400">
            última atualização em {{ updateTime }} (horário de brasília)
          </p>
  
          <div class="flex items-end justify-between mt-5">
            <p class="mb-5 text-5xl font-bold text-gray-900">{{ location }}</p>
            <p class="mb-5 text-2xl text-gray-900"><span ref="percentApuradoRef">{{ percentApurado }}</span>%</p>
          </div>
  
          <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
            <div ref="progressBar" class="h-1 bg-blue-600 rounded-full dark:bg-blue-500" :style="{ width: `${percentApurado}%` }"></div>
          </div>
  
          <p class="text-lg text-gray-600">seções apuradas: <span ref="secoesApuradasRef">{{ secoesApuradas }}</span></p>
        </section>
  
        <section class="mt-20">
          <p class="text-2xl font-bold text-gray-900">Prefeito</p>
  
          <!-- Renderiza a lista de candidatos -->
          <div v-for="(candidate, index) in candidates" :key="index">
  
            <candidate class="flex items-center mt-5">
              <img class="w-20 h-20 rounded-full" :src="candidate.image" alt="image description" />
  
              <div class="flex-grow ml-4">
                <div class="flex justify-between">
                  <div class="flex flex-col items-start">
                    <span class="text-lg font-bold">{{ candidate.name }}</span>
  
                    <group>
                      <span class="mb-1 text-sm font-lg">{{ candidate.party }}</span>
                    </group>
                  </div>
  
                  <div class="text-right">
                    <div class="mb-1 text-lg font-bold">
                      <span id="'percentCadidate' + index" :ref="'percentRef' + index">{{ candidate.percent }}</span>%
                    </div>
                    <div class="mb-1 text-sm font-medium text-gray-400">
                      <span :ref="'votesRef' + index">{{ candidate.votes }}</span> votos
                    </div>
                  </div>
                </div>
  
                <div v-if="candidate.meeeeuPrefeito" class="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div :ref="'percentRefBar' + index" class="h-3 bg-blue-600 rounded-full dark:bg-blue-500" :style="{ width: `${candidate.percent}%` }">
                  </div>
                </div>
                <div v-else class="w-full h-1 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div :ref="'percentRefBar' + index" class="h-1 bg-blue-600 rounded-full dark:bg-blue-500" :style="{ width: `${candidate.percent}%` }">
                  </div>
                </div>
              </div>
            </candidate>
  
          </div>
        </section>
      </blockSection>

      <blockSection class="flex flex-col items-center justify-center w-full">
        <section class="grid grid-cols-1 gap-4 mt-20 text-center md:w-3/5 sm:grid-cols-2 lg:grid-cols-5">
      
          <div class="flex flex-col items-center p-4 text-center bg-white border border-gray-200 rounded-lg shadow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span class="font-bold">VÁLIDOS</span>
            <div class="flex">
              <span ref="validosRef">{{ validos }}</span>
              (<span ref="validosPercentRef">{{ validosPercent }}</span>%)
            </div>
          </div>
      
          <div class="flex flex-col items-center p-4 text-center bg-white border border-gray-200 rounded-lg shadow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span class="font-bold">BRANCOS</span>
            <div class="flex">
              <span ref="brancosRef">{{ brancos }}</span>
              (<span ref="brancosPercentRef">{{ brancosPercent }}</span>%)
            </div>
          </div>
      
          <div class="flex flex-col items-center justify-center p-4 text-center bg-white border border-gray-200 rounded-lg shadow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span class="font-bold">NULOS</span>
            <div class="flex">
              <span ref="nulosRef">{{ nulos }}</span>
              (<span ref="nulosPercentRef">{{ nulosPercent }}</span>%)
            </div>
          </div>
      
          <div class="flex flex-col items-center p-4 text-center bg-white border border-gray-200 rounded-lg shadow lg:items-end">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            </span>
            <span class="font-bold">ABSTENÇÕES</span>
            <div class="flex">
              <span ref="abstencoesRef">{{ abstencoes }}</span>
              (<span ref="abstencoesPercentRef">{{ abstencoesPercent }}</span>%)
            </div>
          </div>

          <div class="flex flex-col items-center col-span-2 p-4 bg-white border border-gray-200 rounded-lg shadow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
            <span class="font-bold">TOTAL</span>
            <div class="flex">
              <span ref="totalRef">{{ total }}</span>
            </div>
          </div>
        </section>
      </blockSection>
      
    </voteSection>

  </main>
</template>

<script>
  import anime from 'animejs/lib/anime.es.js'; // Importa o anime.js
  import WebSocketService from '@/services/websocket';
  import confetti from 'canvas-confetti'; // Importa o canvas-confetti

  export default {
    data() {
      return {
        updateTime: '',
        location: 'Ingá, PB',
        percentApurado: 0,
        secoesApuradas: '',
        candidates: [],  // Lista de candidatos
        total: 0,
        validos: 0,
        validosPercent: 0,
        brancos: 0,
        brancosPercent: 0,
        nulos: 0,
        nulosPercent: 0,
        abstencoes: 0,
        abstencoesPercent: 0,
        celebration: false, // Nova propriedade para celebração
      };
    },

    watch: {
      celebration(newVal) {
        if (newVal) {
          this.launchConfetti(); // Solta os confetes quando celebration é true
        }
      }
    },

    mounted() {
      this.setupWebSocket();
    },

    methods: {
      setupWebSocket() {
        const ws = new WebSocketService('ws://localhost:8080');
        ws.connect();

        ws.onMessage((data) => {

          this.candidates = data.candidates.map((candidate, index) => {
            // Anima o percentual de votos
            this.animateNumber(this.candidates[index]?.percent || 0, candidate.percent, `percentRef${index}`, true);
            // Anima o número de votos
            this.animateNumber(this.candidates[index]?.votes || 0, candidate.votes, `votesRef${index}`);
            
            // Anima a barra de progresso individual do candidato
            this.animateProgressBar(candidate.percent, `percentRefBar${index}`);

            return candidate; // Retorna o candidato atualizado
          });

          // Atualiza o estado com os dados recebidos
          this.animateNumber(this.percentApurado, data.percentApurado, 'percentApuradoRef');
          this.animateNumber(this.secoesApuradas, data.secoesApuradas, 'secoesApuradasRef');
          this.animateNumber(this.candidates, data.candidates, 'candidatesRef');
          this.animateNumber(this.total, data.total, 'totalRef');
          this.animateNumber(this.validos, data.validos, 'validosRef');
          this.animateNumber(this.validosPercent, data.validosPercent, 'validosPercentRef');
          this.animateNumber(this.brancos, data.brancos, 'brancosRef');
          this.animateNumber(this.brancosPercent, data.brancosPercent, 'brancosPercentRef');
          this.animateNumber(this.nulos, data.nulos, 'nulosRef');
          this.animateNumber(this.nulosPercent, data.nulosPercent, 'nulosPercentRef');
          this.animateNumber(this.abstencoes, data.abstencoes, 'abstencoesRef');
          this.animateNumber(this.abstencoesPercent, data.abstencoesPercent, 'abstencoesPercentRef');
          
          this.animateProgressBar(data.percentApurado, 'progressBar'); // Anima a barra de progresso

          // Atualiza o estado com os dados recebidos
          this.updateTime = data.updateTime;
          this.percentApurado = data.percentApurado;
          this.secoesApuradas = data.secoesApuradas;
          this.candidates = data.candidates; // Atualiza a lista de candidatos
          this.total = data.total;
          this.validos = data.validos;
          this.validosPercent = data.validosPercent;
          this.brancos = data.brancos;
          this.brancosPercent = data.brancosPercent;
          this.nulos = data.nulos;
          this.nulosPercent = data.nulosPercent;
          this.abstencoes = data.abstencoes;
          this.abstencoesPercent = data.abstencoesPercent;

          // Verifica se é hora de celebrar
          this.celebration = data.celebration;

        });
      },

      animateNumber(oldValue, newValue, refName, decimal = false) {
        anime({
          targets: this.$refs[refName],
          innerHTML: [oldValue, newValue],
          round: 10, // Arredonda o valor para inteiros
          easing: 'easeInOutQuad',
          duration: 4000,
          translateX: [0, 0]
        });
      },

      animateProgressBar(newPercent, refName) {
        anime({
          targets: this.$refs[refName],
          width: `${newPercent}%`,
          easing: 'easeInOutQuad',
          duration: 4000,
          translateX: [0, 0]
        });
      },

      launchConfetti() {
        // Primeira animação de confete (continua por 15 segundos)
        var end = Date.now() + (100 * 1000);
        var colors = ['#bb0000', '#ffffff'];

        (function frame() {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());

        // Segunda animação de confete (diminui ao longo de 15 segundos)
        var duration = 100 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, size: 90 };

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
          var timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          var particleCount = 50 * (timeLeft / duration);
          // Lança os confetes
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
      },
    },
  };
</script>