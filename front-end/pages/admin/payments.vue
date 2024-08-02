<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Pagamentos Recebidos</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center flex-column">
      <v-card width="900">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="payments" :search="search">
        </v-data-table>
        <v-row>
          <v-col>
            <v-divider></v-divider>
            <v-card-text class="text-h6">
              Total: R$: {{ valorTotal }}
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "pagamentosadm",
  layout: "admin",
  data() {
    return {
      valorTotal: 0,
      search: null,
      items: [],
      dialog: false,
      payments: [],
      user: {
        email: null,
        role: null,
        name: null,
        id: null,
      },
      headers: [
        {
          text: "Serviço Prestado",
          value: "nomeservico",
          align: "center",
        },
        {
          text: "Nome do Cliente",
          value: "nomecliente",
          align: "center",
        },
        {
          text: "Valor do Pagamento",
          value: "total_value",
          align: "center",
        },
        {
          text: "Método de Pagamento",
          value: "type",
          align: "center",
        },
        {
          text: "Data do Pagamento",
          value: "datapagamento",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await this.getUserByToken();
    await this.getMinhasAgendas();
    await this.paymentAdmin();
  },
  methods: {
    formatarData(data) {
      const dataObj = new Date(data);
      const dia = String(dataObj.getDate()).padStart(2, "0");
      const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
      const ano = dataObj.getFullYear();
      return `${dia}/${mes}/${ano}`;
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
      }
    },

    async paymentAdmin() {
      try {
        const response = await this.$api.get(`/api/payments-admin/`);
        this.payments = response;
        console.log("dslfkhgsdfkhg", response);
        this.payments = this.payments.filter((payment) => {
          return (
            this.minhasAgendas.includes(payment.id_schedule) &&
            payment.status === "Confirmado"
          );
        });
        console.log(this.payments);
        this.payments.forEach((payment) => {
          payment.datapagamento = this.formatarData(payment.datapagamento);
          payment.total_value = Number(payment.total_value).toFixed(2);
        });

        this.valorTotal = this.payments
          .reduce((total, payment) => {
            return total + parseFloat(payment.total_value);
          }, 0)
          .toFixed(2);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getMinhasAgendas() {
      try {
        const response = await this.$api.get(`/api/schedule/`);
        this.minhasAgendas = response
          .filter((schedule) => schedule.idUser === this.user.id)
          .map((schedule) => schedule.id);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<style></style>
