<template>
  <Bar
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
import { Bar } from 'vue-chartjs/legacy';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: { Bar },
  
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
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
      default: 369
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
      agendamentosPorMes: {},
      valoresPorMes: { '01': [], '02': [], '03': [], '04': [], '05': [], '06': [], '07': [], '08': [], '09': [], '10': [], '11': [], '12': [],
      },
      user: {
        id: null,
        name: null,
        email: null,
        role: null,
      },
      meusag: [],
      schedulings: [],
      agendamentosMensais: [],
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
          label: 'Agendamentos',
          backgroundColor: ['#036DCF'],
          data: this.agendamentosMensais
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
      const agendamentos = meusAgendamentos.map((ma) => {
        const ano = ma.data_scheduling.split("-")[0]
        const mes = ma.data_scheduling.split("-")[1];
        return {ano, mes};
      });
      const agendamentosPorAno = agendamentos.filter(apm => apm.ano == anoAtual);
      
      agendamentosPorAno.forEach((apm) => {
        this.valoresPorMes[apm.mes].push(apm);
        return this.valoresPorMes;
      });

      for (const mes in this.valoresPorMes) {
        if (this.valoresPorMes.hasOwnProperty(mes)) {
          this.agendamentosPorMes[mes] = this.valoresPorMes[mes]
        }  
      }
      
      this.agendamentosMensais = [this.agendamentosPorMes['01'].length, this.agendamentosPorMes['02'].length, this.agendamentosPorMes['03'].length, this.agendamentosPorMes['04'].length, this.agendamentosPorMes['05'].length, this.agendamentosPorMes['06'].length, this.agendamentosPorMes['07'].length, this.agendamentosPorMes['08'].length, this.agendamentosPorMes['09'].length, this.agendamentosPorMes['10'].length, this.agendamentosPorMes['11'].length, this.agendamentosPorMes['12'].length,
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
    }
  },
}
</script>
