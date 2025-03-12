<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Pagamentos Recebidos</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center flex-column">
      <v-card width="1100">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="payments"
          :search="search"
        ></v-data-table>
        <v-row>
          <v-col>
            <v-divider class="black"></v-divider>
            <v-card-text>
              <v-row>
                <v-col>
                  <h2>Total deste mês: R$ {{ totalMes.toFixed(2) }}</h2>
                </v-col>
                <v-col class="text-end">
                  <h2>Total: R$ {{ total }}</h2>
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      search: null,
      total: 0,
      totalMes: 0,
      ganhosMes: 0,
      teste: [],
      payments: [],
      items: [],
      headers: [
        {
          text: "Serviço Prestado",
          value: "service_name",
          align: "center",
        },
        {
          text: "Nome do Cliente",
          value: "client_name",
          align: "center",
        },
        {
          text: "Valor do Pagamento",
          value: "total_value",
          align: "center",
        },
        {
          text: "Método de Pagamento",
          value: "payment_method",
          align: "center",
        },
        {
          text: "Filial",
          value: "branch_name",
          align: "center",
        },
        {
          text: "Funcionário",
          value: "employee_name",
          align: "center",
        },
        {
          text: "Data do Pagamento",
          value: "created_at",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
      user: {
        id: null,
        email: null,
        role: null,
        name: null,
        permission: null,
        idCompany: null,
      },
    };
  },

  async created() {
    await this.getUserByToken();
    // await this.total();
    await this.getPayments();
  },

  methods: {
    // async total() {
    //   const minhaEmpresa = this.user.idCompany;
    //   const pagVoucher = await this.$api.get(
    //     `/api/voucher-company/empresa=${minhaEmpresa}`
    //   );
    //   console.log(pagVoucher);
    //   const agendamentos = await this.$api.get("/api/agendamentos");
    //   const agendamentosEmpresa = agendamentos.filter((f) => {
    //     return f.companyid == minhaEmpresa && f.status !== "Cancelado";
    //   });
    //   agendamentosEmpresa.map((mapa) => {
    //     const valorS = mapa.service_price;
    //     const total = agendamentosEmpresa.length * valorS;
    //     pagVoucher.map((t) => {
    //       const voucherPrice = t.price * pagVoucher.length;
    //       console.log(voucherPrice);
    //       this.valorFinal = voucherPrice + total;
    //       console.log(this.valorFinal);
    //     });
    //   });
    // },
    async getUserByToken() {
      const { data } = await this.$api.get("/api/users/by-token");
      if (data) {
        this.user = {
          email: data.email,
          role: data.role,
          name: data.name,
          id: data.id,
          permission: data.permission,
          idCompany: data.idCompany,
        };
        const empresa = await this.$api.get(
          `/api/companies/${this.user.idCompany}`
        );
        this.companies = empresa.businessName;
      } else {
        this.$toast.error("Faça o login");
        return this.$router.push("/");
      }
    },

    formatDate(dateString) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR", options);
    },

    async getPayments() {
      await this.getUserByToken();
      const idEmpresa = this.user.idCompany;
      const response = await this.$api.get("/api/all-payments");
      const filtroResponse = response.filter((f) => {
        const condicao1 =
          !f.id_company ||
          (f.id_company === idEmpresa && f.statusag !== "Cancelado");
        const condicao2 =
          !f.voucher_company_id ||
          (f.voucher_company_id === idEmpresa && f.statusag === null);
        return condicao1 && condicao2;
      });
      console.log(filtroResponse);
      const pagamentos = filtroResponse.map((g) => g.total_value);
      pagamentos.forEach((pay) => {
        return (this.total += parseFloat(pay));
      });
      this.total = this.total.toFixed(2);

      const anoAtual = new Date().getFullYear();
      const mesAtual = new Date().getMonth() + 1;

      const pagamentosMesAno = filtroResponse.map((fr) => {
        const data = fr.created_at.split("T")[0];
        const ano = data.split("-")[0];
        const mes = data.split("-")[1];
        const valor = fr.total_value;

        return { ano, mes, valor };
      });

      const pagamentosMes = pagamentosMesAno.filter(
        (pma) => pma.ano == anoAtual && pma.mes == mesAtual
      );

      pagamentosMes.forEach((pm) => {
        this.totalMes += parseFloat(pm.valor);
        return this.totalMes;
      });

      filtroResponse.forEach((fr) => {
        fr.service_name = fr.service_name || "Voucher";
        const data = fr.created_at.split("T")[0];
        const ano = data.split("-")[0];
        const mes = data.split("-")[1];
        const dia = data.split("-")[2];
        const dataFormatada = dia + "/" + mes + "/" + ano;

        fr.created_at = dataFormatada;
        fr.schedule_branch_id = fr.schedule_branch_id || fr.voucher_branch_id;
        fr.branch_name = fr.branch_name || fr.branch_voucher_name;
        fr.employee_name = fr.employee_name || "VOUCHER";
      });

      this.payments = filtroResponse;
    },
  },
};
</script>

<style></style>
