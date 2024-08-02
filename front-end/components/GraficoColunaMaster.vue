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
import { Bar } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },

  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 369,
    },
    cssClasses: {
      default: "",
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
      totalPorMes: {},
      valoresPorMes: {
        "01": [],
        "02": [],
        "03": [],
        "04": [],
        "05": [],
        "06": [],
        "07": [],
        "08": [],
        "09": [],
        10: [],
        11: [],
        12: [],
      },
      user: {
        id: null,
        name: null,
        email: null,
        role: null,
        idCompany: null,
      },
      meusag: [],
      schedulings: [],
      ganhosMensais: [],
      chartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  async mounted() {
    await this.getUserByToken();
    await this.gerarGrafico();

    this.chartData = {
      labels: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      datasets: [
        {
          label: "Ganhos",
          backgroundColor: ["#036DCF"],
          data: this.ganhosMensais,
        },
      ],
    };
  },

  methods: {
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

    async gerarGrafico() {
      const idEmpresa = this.user.idCompany;
      console.log(idEmpresa);
      const vouchersDaEmpresa = await this.$api.get(
        `/api/voucher-company/empresa=${idEmpresa}`
      );
      console.log(vouchersDaEmpresa);
      const response = await this.$api.get("/api/all-payments");
      const filtroResponse = response.filter(
        (f) => f.id_company == idEmpresa || f.voucher_company_id == idEmpresa
      );
      console.log(filtroResponse);
      const anoAtual = new Date().getFullYear();
      const mesAtual = new Date().getMonth() + 1;

      const pagamentosMesAno = filtroResponse.map((fr) => {
        const data = fr.created_at.split("T")[0];
        const ano = data.split("-")[0];
        const mes = data.split("-")[1];
        const valor = fr.total_value;
        console.log("Ano:", ano, "Mês:", mes);
        return { ano, mes, valor };
      });

      const pagamentosMes = pagamentosMesAno.filter(
        (pma) => pma.ano == anoAtual && pma.mes == mesAtual
      );
      console.log("Valores por Mês antes do Loop:", this.valoresPorMes);
      pagamentosMes.forEach((ppm) => {
        this.valoresPorMes[ppm.mes].push(parseFloat(ppm.valor));
      });
      console.log("Valores por Mês após o Loop:", this.valoresPorMes);
      console.log("PagamentosMesAno:", pagamentosMesAno);

      for (const mes in this.valoresPorMes) {
        if (this.valoresPorMes.hasOwnProperty(mes)) {
          this.totalPorMes[mes] = this.valoresPorMes[mes].reduce(
            (total, valor) => total + valor,
            0
          );
        }
      }

      this.ganhosMensais = [
        this.totalPorMes["01"],
        this.totalPorMes["02"],
        this.totalPorMes["03"],
        this.totalPorMes["04"],
        this.totalPorMes["05"],
        this.totalPorMes["06"],
        this.totalPorMes["07"],
        this.totalPorMes["08"],
        this.totalPorMes["09"],
        this.totalPorMes["10"],
        this.totalPorMes["11"],
        this.totalPorMes["12"],
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
  },
};
</script>
