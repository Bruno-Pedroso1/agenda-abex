<template>
  <v-container class="pa-5">
    <v-card class="pa-4 mb-6">
      <v-btn
        href="/"
        class="d-inline-flex justify-content"
        style="position: relative; left: 50%; transform: translate(-50%)"
      >
        Voltar ao login
      </v-btn>

      <v-card-title class="text-h5">Como posso me cadastrar?</v-card-title>
      <v-card-text>
        <p>
          Para se cadastrar, primeiro você precisa entrar em contato conosco pelo seguinte email:
        </p>
        <a href="https://workspace.google.com/intl/pt-BR/gmail/"> suporte@timelyapp.com.br </a>

        <h3 class="d-flex justify-center mt-5">
          Abaixo você encontra o serviço mais agendado por região
        </h3>
      </v-card-text>
<img src="../components/0d734735-b658-4b70-87b6-730f1212d13b.jpg">
<img src="../components/56ec34bd-d1fb-4ed3-bab5-e65cbd8fdc09.jpg">
<img src="../components/462ea37f-f797-4489-991d-0ee35b97589a.jpg">

      <div v-for="(dados, cidade) in filtradoPorCidade" :key="cidade" class="mb-10">
        <h2 class="text-h6 mb-2">{{ cidade }}</h2>

        <GraficoServiceCity
          v-if="chartDataPorCidade[cidade]"
          :chart-data="chartDataPorCidade[cidade]"
          :chart-options="chartOptions"
          :width="600"
          :height="300"
        />

        <v-data-table
          :headers="headers"
          :items="dados"
          :search="search"
          class="elevation-1"
          item-value="name"
          no-data-text="Nenhum dado disponível"
        />
      </div>
    </v-card>
  </v-container>
</template>

<script>
import GraficoServiceCity from "@/components/GraficoServiceCity.vue";

export default {
  name: "ss",
  components: {
    GraficoServiceCity,
  },
  data() {
    return {
      search: "",
      items: [],
      headers: [
        { text: "Serviços Mais Agendados", value: "servico", align: "center" },
        { text: "Quantidade de Agendamentos", value: "quantidade_agendamentos", align: "center" },
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Serviços",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Quantidade de Agendamentos",
            },
          },
        },
      },
      chartDataPorCidade: {},
    };
  },
  async created() {
    await this.carregarDados();
  },
  computed: {
    filtradoPorCidade() {
      const grupos = {};
      this.items.forEach((item) => {
        if (!grupos[item.cidade]) {
          grupos[item.cidade] = [];
        }
        grupos[item.cidade].push(item);
      });
      return grupos;
    },
  },
  methods: {
    async carregarDados() {
      try {
        const response = await this.$api.get("/api/services-city");
        this.items = response;
        this.gerarTodosChartData();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    gerarTodosChartData() {
      const grupos = {};
      this.items.forEach((item) => {
        if (!grupos[item.cidade]) {
          grupos[item.cidade] = [];
        }
        grupos[item.cidade].push(item);
      });

      const dadosChart = {};
      for (const cidade in grupos) {
        const dados = grupos[cidade];
        dadosChart[cidade] = {
          labels: dados.map((d) => d.servico),
          datasets: [
            {
              label: "Agendamentos",
              backgroundColor: "#1976d2",
              data: dados.map((d) => d.quantidade_agendamentos),
            },
          ],
        };
      }

      this.chartDataPorCidade = dadosChart;
    },
  },
};
</script>

<style>
#bar-chart {
  height: 500px !important;
  margin-bottom: 30px;
}

.text-h6.mb-2 {
  display: flex;
  justify-content: center;
  text-align: center;
}
.v-data-footer {
  display: none;
}
.email {
  font-weight: bold;
  color: #1976d2;
  font-size: 18px;
  margin-top: 10px;
}
.v-data-table.elevation-1.v-data-table--has-bottom.theme--light {
  width: 50%;
  justify-content: center;
  display: flex;
  align-items: center;
  justify-items: center;
  position: relative;
  right: -280px;
}
#igm {
  max-height: 200px;
  max-width: 200px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: relative;
  right: -470px;
  margin-bottom: 40px;
}
p {
  width: 50%;
  justify-content: center;
  display: flex;
  align-items: center;
  justify-items: center;
  position: relative;
  right: -280px;
}
.v-application p {
  margin-bottom: 16px;
  white-space: nowrap;
}
.v-card__title {
  display: flex;
  justify-content: center;
}
a {
  display: flex;
  justify-content: center;
}
</style>
