<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Meus Pagamentos</h1>
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
        <h3 class="ml-3">Total: R${{ Number(total).toFixed(2) }}</h3>
        <v-data-table :headers="headers" :items="items" :search="search">
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Index",
  layout: "customer",
  data() {
    return {
      search: null,
      total: 0,
      items: [],
      paymethod: [],
      paymentMethods: [],
      user: {
        email: null,
        role: null,
        name: null,
        id: null,
      },
      users: [],
      headers: [
        {
          text: "Valor Pago",
          value: "total_value",
          align: "center",
        },
        {
          text: "Método de Pagamento",
          value: "type",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await this.getUserByToken();
    await Promise.all([
      this.getPayCust(),
      this.getAllPaymentM(),
      this.getAllUsers(),
    ]);
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
        };
      }
    },
    async getPayCust() {
      try {
        const responsePayCust = await this.$api.get("/api/payment-customer");
        const payments = responsePayCust.filter(
          (payment) => payment.userid === this.user.id
        );
        for (const payment of payments) {
          const paymentMethodId = payment.paymethodid;
          const paymentMethod = this.paymethod.find(
            (method) => method.id === paymentMethodId
          );
          if (paymentMethod) {
            this.total += parseFloat(payment.total_value);
            payment.paymethodid = paymentMethod.type;
          }
        }
        this.items = payments;
        const pagamentos = this.items.map((c) => c.total_value);
        pagamentos.forEach((total) => {
          return (this.total += parseFloat(total));
        });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllPaymentM() {
      try {
        const response = await this.$api.get("/api/payment-methods");
        this.paymethod = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllUsers() {
      try {
        const response = await this.$api.get("/api/users");
        this.users = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<style></style>
