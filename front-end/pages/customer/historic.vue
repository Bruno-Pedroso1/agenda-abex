<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Meus Agendamentos</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center flex-column">
      <v-card width="900">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="schedulings" :search="search">
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "historico",
  layout: "customer",
  data() {
    return {
      headers: [
        {
          text: "Data do Agendamento",
          value: "dataScheduling",
          align: "center",
        },
        {
          text: "Horário de Agendamento",
          value: "timeScheduling",
          align: "center",
        },
        { text: "Status", value: "status", align: "center" },
        { text: "Serviço", value: "idSchedule", align: "center" },
        { text: "Valor do Serviço", value: "idPayment", align: "center" },
        { text: "", value: "actions", filterable: false },
      ],
      items: [],
      schedulings: [],
      serviceMap: {},
      user: {
        email: null,
        role: null,
        name: null,
        id: null,
      },
      search: null,
    };
  },
  async created() {
    await this.getUserByToken();
    await this.getAllSchedulings();
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

    formatDate(dateString) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      return date.toLocaleDateString("pt-BR", options);
    },
    async fetchServiceName(idServices) {
      try {
        const response = await this.$api.get(`/api/services/${idServices}`);
        if (response) {
          return response.name;
        }
        return "Serviço não encontrado";
      } catch (error) {
        this.$toast.error(error.message);
        return "Erro";
      }
    },
    async getAllSchedulings() {
      try {
        const userId = this.user.id;
        const responseScheduling = await this.$api.get("/api/schedulings");
        this.schedulings = responseScheduling;
        const responsePayment = await this.$api.get("/api/payments");
        this.payments = responsePayment.filter(
          (payment) => payment.idUser === userId
        );
        const agendamentosDoUsuario = this.schedulings.filter((agendamento) => {
          return this.payments.some(
            (payment) => payment.id === agendamento.idPayment
          );
        });
        for (const agendamento of agendamentosDoUsuario) {
          if (agendamento.idSchedule) {
            const responseSchedule = await this.$api.get(
              `/api/schedule/${agendamento.idSchedule}`
            );
            if (responseSchedule && responseSchedule.idServices) {
              const idServices = responseSchedule.idServices;
              const responseService = await this.$api.get(
                `/api/services/${idServices}`
              );
              if (responseService) {
                agendamento.idSchedule = responseService.name;
              } else {
                agendamento.idSchedule = "Nome de Serviço não encontrado";
              }
            }
            if (agendamento.idPayment) {
              if (responseSchedule && responseSchedule.servicePrice) {
                agendamento.idPayment = responseSchedule.servicePrice;
              } else {
                agendamento.idPayment = "Preço de Serviço não encontrado";
              }
            }
            agendamento.dataScheduling = this.formatDate(
              agendamento.dataScheduling,
              "dd/MM/yyyy"
            );
          }
        }
        this.schedulings = agendamentosDoUsuario;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<style></style>
