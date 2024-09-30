<template>
  <main id="app" class="container flex items-center justify-center w-full h-screen px-4 mx-auto">
    
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

    <voteSection v-else="celebration">
      <section>
        <p class="text-lg font-normal text-gray-400">
          última atualização em {{ updateTime }} (horário de brasília)
        </p>

        <div class="flex items-end justify-between mt-5">
          <p class="mb-5 text-5xl font-bold text-gray-900">{{ location }}</p>
          <p class="mb-5 text-2xl text-gray-900">{{ percentApurado }}%</p>
        </div>

        <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
          <div class="h-1 bg-blue-600 rounded-full dark:bg-blue-500" :style="{ width: `${percentApurado}%` }"></div>
        </div>

        <p class="text-lg text-gray-600">seções apuradas: {{ secoesApuradas }}</p>
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
                  <div class="mb-1 text-lg font-bold">{{ candidate.percent }}%</div>
                  <div class="mb-1 text-sm font-medium text-gray-400">{{ candidate.votes }} votos</div>
                </div>
              </div>

              <div v-if="candidate.meeeeuPrefeito" class="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                <div class="h-3 bg-blue-600 rounded-full dark:bg-blue-500" :style="{ width: `${candidate.percent}%` }">
                </div>
              </div>
              <div v-else class="w-full h-1 bg-gray-200 rounded-full dark:bg-gray-700">
                <div class="h-1 bg-blue-600 rounded-full dark:bg-blue-500" :style="{ width: `${candidate.percent}%` }">
                </div>
              </div>
            </div>
          </candidate>

        </div>
      </section>

      <section class="grid grid-cols-5 gap-4 mt-20 text-center">
        <div class="flex flex-col items-start">
          <span class="font-bold">TOTAL</span>
          <span>{{ total }}</span>
        </div>

        <div class="flex flex-col items-center">
          <span class="font-bold">VÁLIDOS</span>
          <span>{{ validos }} ({{ validosPercent }}%)</span>
        </div>

        <div class="flex flex-col items-center">
          <span class="font-bold">BRANCOS</span>
          <span>{{ brancos }} ({{ brancosPercent }}%)</span>
        </div>

        <div class="flex flex-col items-center">
          <span class="font-bold">NULOS</span>
          <span>{{ nulos }} ({{ nulosPercent }}%)</span>
        </div>

        <div class="flex flex-col items-end">
          <span class="font-bold">ABSTENÇÕES</span>
          <span>{{ abstencoes }} ({{ abstencoesPercent }}%)</span>
        </div>
      </section>
    </voteSection>

  </main>
</template>

<script>
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
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, size: 90};

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