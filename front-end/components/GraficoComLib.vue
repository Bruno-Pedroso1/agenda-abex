<template>
  <div class="grafico-lib-container">
    <h2>Volume de Serviços (usando Chart.js)</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { ref } from 'vue';

// Registra os componentes do Chart.js que vamos usar
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Nossos dados falsos, agora separados em legendas e valores
const chartData = ref({
  labels: [
    'Manicure', 
    'Pedicure', 
    'Corte de Cabelo', 
    'Escova', 
    'Limpeza de Pele', 
    'Massagem'
  ],
  datasets: [
    {
      label: 'Nº de Agendamentos',
      backgroundColor: '#f87979',
      data: [45, 70, 55, 110, 30, 85]
    }
  ]
})

// Opções de configuração do gráfico
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total de Agendamentos por Tipo de Serviço'
    }
  }
})

</script>

<style scoped>
.grafico-lib-container {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 800px;
  height: 450px; /* É importante definir uma altura para o container */
  margin: 2rem auto;
}
</style>