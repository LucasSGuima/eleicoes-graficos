<template>
    <div class="max-w-4xl w-full bg-white rounded-lg shadow-xl dark:bg-gray-800 p-4 md:p-6">
        <div class="flex justify-between items-center border-gray-200 border-b dark:border-gray-700 pb-3">
            <dl>
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Campanha Eleitoral</dt>
                <dd id="totalVotes" class="leading-none font-bold text-gray-900 dark:text-white">
                    <span class="text-base">Votos Computados: </span>
                    <span class="text-xl">{{ totalVotes }}</span>
                </dd>
            </dl>
            <div class="flex items-center space-x-4">
                <span
                    class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
                    <svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 10 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 13V1m0 0L1 5m4-4 4 4" />
                    </svg>
                    Candidato A
                </span>
            </div>
        </div>

        <div id="bar-chart" class="mt-4"></div>

        <div id="lastUpdate" class="text-center my-2 text-lg">{{ lastUpdate }}</div>
    </div>
</template>

<script>
    import ApexCharts from 'apexcharts';
    import VueApexCharts from 'vue3-apexcharts'; // Certifique-se de que este pacote está instalado

    export default {
        name: 'VoteRace',
        data() {
            return {
                totalVotes: 0,
                candidates: ['Candidato A', 'Candidato B', 'Candidato C', 'Candidato D'],
                chart: null,
                lastUpdate: '',
                biggestIncrease: 'Candidato A',
                ws: null,
            };
        },
        methods: {
            getRandomVotes(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            generateSimulatedVoteData() {
                return {
                    candidates: this.candidates,
                    votes: this.candidates.map(() => this.getRandomVotes(0, 100)), // Gera votos aleatórios entre 0 e 100
                };
            },
            updateChart(data) {
                if (this.chart) {
                    this.chart.updateOptions({
                        series: [{
                            name: "Votos",
                            data: data.votes // Atualiza os votos com os dados recebidos
                        }],
                        xaxis: {
                            categories: data.candidates // Atualiza as categorias com os candidatos
                        }
                    });
                    this.totalVotes = data.votes.reduce((a, b) => a + b, 0); // Atualiza o total de votos
                    this.updateLastUpdate();
                }
            },
            updateLastUpdate() {
                const now = new Date();
                this.lastUpdate = `Última atualização: ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
            },
            setupWebSocket() {
                this.ws = new WebSocket('ws://seu-websocket-endpoint');

                this.ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    this.updateChart(data); // Atualiza o gráfico com dados recebidos do WebSocket
                };

                this.ws.onerror = (error) => {
                    console.error('WebSocket Error: ', error);
                };

                this.ws.onclose = () => {
                    console.log('WebSocket connection closed.');
                };
            },
        },
        mounted() {
            // Configurações iniciais do gráfico
            const options = {
                series: [{
                    name: "Votos",
                    data: this.generateSimulatedVoteData().votes, // Quantidade inicial de votos
                }],
                chart: {
                    type: "bar",
                    height: 400,
                    toolbar: {
                        show: false,
                    },
                    events: {
                        mounted: () => {
                            this.chart.updateOptions({
                                xaxis: {
                                    categories: this.candidates // Inicializa categorias com os candidatos
                                }
                            }, false);
                        }
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        borderRadius: 20,
                        borderRadiusApplication: 'end',
                    },
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    title: {
                        text: 'Quantidade de Votos',
                    },
                    labels: {
                        formatter: (value) => value, // Exibe diretamente a quantidade de votos
                    },
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    formatter: (val) => `${val.seriesName}: ${val.value} votos`,
                },
                fill: {
                    opacity: 0.87,
                },
            };

            this.chart = new ApexCharts(document.getElementById("bar-chart"), options); // Atribua o gráfico à variável
            this.chart.render();

            // Configura o WebSocket
            this.setupWebSocket();
        },
        beforeDestroy() {
            // Destrói o gráfico antes de remover o componente
            if (this.chart) {
                this.chart.destroy();
            }

            // Fecha a conexão WebSocket
            if (this.ws) {
                this.ws.close();
            }
        },
    };
</script>

<style scoped>
    /* Adicione estilos adicionais aqui, se necessário */
</style>