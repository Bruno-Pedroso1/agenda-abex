<template>
  <v-container>
    <h1 class="mb-2 text-center">Dashboard</h1>
    <v-row>
      <v-col>
        <v-card outlined rounded="xl" elevation="8">
          <v-card-title>
            <h2>Detalhes gerais</h2>
          </v-card-title>
          <v-card-text>
            <v-row class="text-center">
              <v-col>
                <v-card outlined rounded="xl">
                  <v-card-text class="black--text">
                    <h3>Ganhos totais</h3>
                    <h3 class="green--text">R$ {{ valorFinal }}</h3>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col md="3">
                <v-card outlined rounded="xl">
                  <v-card-text class="black--text">
                    <h3>Total de agendamentos</h3>
                    <h3 class="green--text">{{ totalAgendamentos }}</h3>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-card outlined rounded="xl">
                  <v-card-text class="black--text">
                    <h3>Confirmados</h3>
                    <h3 class="green--text">{{ totalConfiramdos }}</h3>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-card outlined rounded="xl">
                  <v-card-text class="black--text">
                    <h3>Realizados</h3>
                    <h3 class="green--text">{{ totalRealizados }}</h3>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col md="3">
                <v-card outlined rounded="xl">
                  <v-card-text class="black--text">
                    <h3>Vouchers vendidos</h3>
                    <h3 class="green--text">{{ vouchersVendidos }}</h3>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="6">
        <v-card outlined rounded="xl" elevation="8">
          <v-card-title class="justify-center">
            <h2>Ganhos por mês em {{ anoAtual }}</h2>
          </v-card-title>
          <v-card-text>
            <GraficoColunaMaster />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card outlined rounded="xl" elevation="8">
          <v-card-title class="justify-center">
            <h2>Agendamentos em {{ meses[mesAtual] }}</h2>
          </v-card-title>
          <v-card-text>
            <GraficoTortaMaster />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GraficoColunaMaster from "~/components/GraficoColunaMaster.vue";
import GraficoTortaMaster from "~/components/GraficoTortaMaster.vue";

export default {
  name: "masterDashboard",
  layout: "master",
  data() {
    return {
      mesAtual: new Date().getMonth(),
      meses: [
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
      anoAtual: new Date().getFullYear(),
      vouchersVendidos: 0,
      totalRealizados: [],
      totalConfiramdos: 0,
      totalAgendamentos: 0,
      ganhosTotais: 0,
      user: {
        id: null,
        name: null,
        email: null,
        role: null,
        idCompany: null,
      },
    };
  },

  async created() {
    await this.getUserByToken();
    await this.validateLogin();
    await this.total();
    await this.getAllDataCompany();
  },

  methods: {
    async total() {
      const minhaEmpresa = this.user.idCompany;
      const pagVoucher = await this.$api.get(
        `/api/voucher-company/empresa=${minhaEmpresa}`
      );
      console.log(pagVoucher);
      const agendamentos = await this.$api.get("/api/agendamentos");
      const agendamentosEmpresa = agendamentos.filter((f) => {
        return f.companyid == minhaEmpresa && f.status !== "Cancelado";
      });
      agendamentosEmpresa.map((mapa) => {
        const valorS = mapa.service_price;
        const total = agendamentosEmpresa.length * valorS;
        pagVoucher.map((t) => {
          const voucherPrice = t.price * pagVoucher.length;
          console.log(voucherPrice);
          this.valorFinal = voucherPrice + total;
          console.log(this.valorFinal);
        });
      });
    },

    async getAllDataCompany() {
      await this.getUserByToken();

      const agendamentos = await this.$api.get("/api/agendamentos");
      const pagamentos = await this.$api.get("/api/all-payments");

      const filtroPagamentos = pagamentos.filter(
        (f) =>
          f.id_company == this.user.idCompany ||
          f.voucher_company_id == this.user.idCompany
      );

      filtroPagamentos.forEach((fp) => {
        fp.service_name = fp.service_name || "Voucher";
        const data = fp.created_at.split("T")[0];
        const ano = data.split("-")[0];
        const mes = data.split("-")[1];
        const dia = data.split("-")[2];
        const dataFormatada = dia + "/" + mes + "/" + ano;
        fp.created_at = dataFormatada;
        fp.schedule_branch_id = fp.schedule_branch_id || fp.voucher_branch_id;
        fp.branch_name = fp.branch_name || fp.branch_voucher_name;
        fp.employee_name = fp.employee_name || "VOUCHER";
      });

      const vouchers = filtroPagamentos.filter(
        (fp) => fp.employee_name == "VOUCHER"
      );

      const pagamentosNormais = filtroPagamentos.map((fp) => fp.total_value);

      const agendamentosMinhaEmpresa = agendamentos.filter(
        (r) => r.companyid == this.user.idCompany
      );

      const confirmados = agendamentosMinhaEmpresa.filter(
        (amp) => amp.status !== "Cancelado"
      );

      const realizados = confirmados.map((ma) => {
        const data = new Date(ma.data_scheduling + "T" + ma.start_time);
        const status = ma.status;
        return { data, status };
      });

      const dataAtual = new Date();
      const agendamentosRealizados = realizados.filter(
        (af) => af.data < dataAtual
      );

      const ganhosVouchers = vouchers.reduce(
        (total, fp) => total + parseFloat(fp.total_value),
        0
      );
      agendamentosMinhaEmpresa.map((age) => {
        const mapa = age.service_price;
        const ganhosAgendamentos = agendamentosRealizados.length * mapa;

        this.ganhosTotais = (ganhosVouchers + ganhosAgendamentos).toFixed(2);

        this.totalAgendamentos = agendamentosMinhaEmpresa.length;
        this.totalConfiramdos = confirmados.length;
        this.totalRealizados = agendamentosRealizados.length;
        this.vouchersVendidos = vouchers.length;
      });
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
