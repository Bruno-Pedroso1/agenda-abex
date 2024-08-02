<template>
  <LineChartGenerator 
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
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement } from 'chart.js';

ChartJS.register( Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement );

export default {
  components: { LineChartGenerator },

  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      totalPorMes: {},
      valoresPorMes: { '01': [], '02': [], '03': [], '04': [], '05': [], '06': [], '07': [], '08': [], '09': [], '10': [], '11': [], '12': [],
      },
      user: {
        id: null,
        name: null,
        email: null,
        role: null,
      },
      ganhosMensais: [],
      meusag: [],
      schedulings: [],
      chartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },

  async mounted () {
    await this.gerarGrafico();

    this.chartData = {
      
      labels: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho','Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
      ],
      datasets: [
        { 
          label: 'Ganhos',
          backgroundColor: ['#008000'],
          data: [ this.ganhosMensais[0], this.ganhosMensais[1], this.ganhosMensais[2], this.ganhosMensais[3], this.ganhosMensais[4], this.ganhosMensais[5], this.ganhosMensais[6], this.ganhosMensais[7], this.ganhosMensais[8], this.ganhosMensais[9], this.ganhosMensais[10], this.ganhosMensais[11],
          ]
        },
      ]
    }
  },

  methods: {
    async gerarGrafico() {
      await this.getUserByToken();
      const meusag = await this.$api.get("/api/agendamentos");
      this.meusag = meusag;
      let userId = this.user.id;
      let agendasDoUsuario;
      const scheduleResponse = await this.$api.get("/api/schedule");
      this.agendasDoUsuario = scheduleResponse.filter(
        (item) => item.idUser === userId
      );
      const response = await this.$api.get("/api/agendamentos");
      if (this.user.role === "superadmin") {
        agendasDoUsuario = this.meusag.map((agenda) => agenda.id_schedule);
      } else {
        agendasDoUsuario = this.agendasDoUsuario.map((agenda) => agenda.id);
      }
      const meusAgendamentos = response.filter((item) => {
        return (
          agendasDoUsuario.includes(item.id_schedule || item.id) &&
          item.status !== "Cancelado"
        );
      });
      const anoAtual = new Date().getFullYear();      
      const pagamentos = meusAgendamentos.map((ma) => {
        const ano = ma.createdag.split("-")[0]
        const mes = ma.createdag.split("-")[1];
        const valorServico = ma.service_price
        return {ano, mes, valorServico};
      });
      const pagamentosPorAno = pagamentos.filter(ppa => ppa.ano == anoAtual);

      pagamentosPorAno.forEach((ppm) => {
        this.valoresPorMes[ppm.mes].push(parseFloat(ppm.valorServico));
        return this.valoresPorMes;
      });

      for (const mes in this.valoresPorMes) {
        if (this.valoresPorMes.hasOwnProperty(mes)) {
          this.totalPorMes[mes] = this.valoresPorMes[mes].reduce((total, valor) => total + valor, 0);
        }  
      }

      this.ganhosMensais = [this.totalPorMes['01'], this.totalPorMes['02'], this.totalPorMes['03'], this.totalPorMes['04'], this.totalPorMes['05'], this.totalPorMes['06'], this.totalPorMes['07'], this.totalPorMes['08'], this.totalPorMes['09'], this.totalPorMes['10'], this.totalPorMes['11'], this.totalPorMes['12'],
      ];
    },

    async getUserByToken() {
      const { data } = await this.$api.get("/api/users/by-token");
      if (data) {
        this.user = {
          email: data.email,
          role: data.role,
          name: data.name,
          id: data.id,
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