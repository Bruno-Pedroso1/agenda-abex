<template>
  <Pie
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Pie } from 'vue-chartjs/legacy';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: 'PieChart',
  components: { Pie },

  props: {
    chartId: {
      type: String,
      default: 'pie-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 368,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      totalAtendidos: [],
      agendamentosFiltrados: [],
      realizados: [],
      reagendados: [],
      cancelados: [],
      user: {
        id: null,
        name: null,
        email: null,
        role: null,
        idCompany: null,
      },
      chartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },

  async mounted () {
    await this.gerarGrafico();
    this.chartData = {
      labels: ['Confirmados', 'Cancelados', 'Realizados'],
      datasets: [
        { 
          backgroundColor: [ '#3f37c9', '#bf0603', '#16db65'],
          data: [this.confirmados, this.cancelados, this.realizados ]
        },
      ],
    }
  },

  methods: {
    async gerarGrafico() {
      await this.getUserByToken();
      const response = await this.$api.get("/api/agendamentos");
      const anoAtual = new Date().getFullYear()
      let mesAtual = new Date().getMonth() + 1

      const meusAgendamentos = response.filter((r) => r.companyid == this.user.idCompany && r.status !== "Cancelado" && r.data_scheduling.split("-")[0] == anoAtual && r.data_scheduling.split("-")[1] == mesAtual);
      const meusAgendamentosCancelados = response.filter((item) => {
        return (item.status == "Cancelado" && item.data_scheduling.split("-")[0] == anoAtual && item.data_scheduling.split("-")[1] == mesAtual);
      });
      this.agendamentosFiltrados = meusAgendamentos.map((ma) => {
        const data = new Date(ma.data_scheduling + "T" + ma.start_time);
        const status = ma.status;
        return { data, status };
      });
      const dataAtual = new Date();
      this.agendamentosFiltrados.map((af) => {
        if (af.data < dataAtual && af.status !== "Cancelado") {
          this.totalAtendidos.push(af);
          return this.totalAtendidos;
        }
      });
      this.confirmados = meusAgendamentos.length
      this.cancelados = meusAgendamentosCancelados.length
      this.realizados = this.totalAtendidos.length
    },

    async getUserByToken() {
      const { data } = await this.$api.get("/api/users/by-token");
      if (data) {
        this.user = {
          email: data.email,
          role: data.role,
          name: data.name,
          id: data.id,
          idCompany: data.idCompany,
        };
      } else {
        this.$toast.error("Faça o login");
        return this.$router.push("/");
      }
    },

    async validateLogin() {
      try {
        let token = localStorage.getItem("toksen");
        if (!token) {
          this.$toast.warning("Por favor efetue o login");
          return this.$router.push("/login");
        }
        let response = await this.$axios.post(
          "http://localhost:3333/api/users/verify",
          { authorization: `Bearer ${token}` }
        );
        if (response.status === 200) {
          if (
            response.data.type === "unauthorized" ||
            response.data.type === "forbidden"
          ) {
            this.$toast.error(
              "Você não tem permissão para acessar esse recurso"
            );
            return this.$router.push("/customer/home");
          }
        } else {
          this.$toast.error(
            "Ocorreu um erro inesperado durante a validação do token"
          );
          return this.$router.push("/customer/home");
        }
      } catch (error) {
        return this.$router.push("/customer/home");
      }
    },
  }
}
</script>
