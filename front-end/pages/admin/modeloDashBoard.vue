<template>
  <v-container>
    <h1 class="mb-5 text-center text-break">Dashboard</h1>

    <v-row class="mb-5">
      <v-col cols="12" md="4">
        <v-card outlined elevation="8">
          <v-card-title>
            <v-icon color="green">mdi-cash</v-icon>
          </v-card-title>
          <v-card-text class="black--text">
            <h4 class="mb-3">Saldo</h4>
            <h2>R$: <span class="green--text">ARRUMAR</span></h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined elevation="8">
          <v-card-title>
            <v-icon color="blue">mdi-timer-star-outline</v-icon>
          </v-card-title>
          <v-card-text class="black--text">
            <h4 class="mb-3">Tempo total de atendimento</h4>
            <h2>
              <span class="green--text">{{ tempoTotalHora }}</span>
            </h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined elevation="8">
          <v-card-title>
            <v-icon color="green">mdi-currency-usd</v-icon>
          </v-card-title>
          <v-card-text class="black--text">
            <v-row class="align-center">
              <v-col cols="8" md="8">
                <h4 class="mb-3">
                  Ganhos {{ mostrarGanhosHoje ? "Hoje" : "Totais" }}
                </h4>
                <h2>
                  Total R$: <span class="green--text">{{ earnings }}</span>
                </h2>
              </v-col>
              <v-col class="text-center" cols="4" md="4">
                <v-btn color="primary" @click="toggleEarningsView">
                  {{ mostrarGanhosHoje ? "Total" : "Hoje" }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="black mb-3"></v-divider>

    <h1 class="mb-5 text-center">Clientes</h1>
    <v-row class="mb-5">
      <v-col cols="12" md="4">
        <v-card outlined elevation="8">
          <v-card-title>
            <v-icon color="black">mdi-account-group</v-icon>
          </v-card-title>
          <v-card-text class="black--text">
            <h4 class="mb-3">Total de usuários</h4>
            <h2 class="green--text">{{ contarUsers }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined elevation="8">
          <v-card-title>
            <v-icon color="green">mdi-account-check</v-icon>
          </v-card-title>
          <v-card-text class="black--text">
            <h4 class="mb-3">Clientes atendidos</h4>
            <h2 class="green--text">{{ clientesAtendidos }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined elevation="8">
          <v-card-title>
            <v-icon color="red">mdi-account-star</v-icon>
          </v-card-title>
          <v-card-text class="black--text">
            <v-row class="align-center">
              <v-col cols="7" md="8">
                <h4 class="mb-3">Clientes registrados</h4>
                <h2 v-if="!mostrarSemana">
                  No mês:
                  <strong class="green--text">{{ contarNewUsers }}</strong>
                </h2>
                <h2 v-if="mostrarSemana">
                  Na Semana:
                  <strong class="green--text">{{ contarNewUsersWeek }}</strong>
                </h2>
              </v-col>
              <v-col class="text-center" cols="5" md="4">
                <v-btn color="primary" @click="alternarClientesSemana">{{
                  mostrarSemana ? "Mês" : "Semana"
                }}</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="black mb-3"></v-divider>

    <v-row class="justify-center mt-5 mb-5">
      <v-card outlined elevation="8">
        <v-card-title>
          <v-row class="align-center text-center">
            <v-col>
              <h4 class="text-start">Horários Hoje</h4>
            </v-col>
            <v-col class="text-end">
              <v-btn
                class="white--text"
                :color="showCancelled ? 'green' : 'red'"
                @click="toggleAppointments"
                >{{
                  showCancelled ? "Ver Confirmados" : "Ver Cancelados"
                }}</v-btn
              >
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            no-data-text="Nenhum horário marcado para hoje"
            :items="
              schedulings.map((scheduling) => ({
                ...scheduling,
                dataScheduling: formatDateForDisplay(scheduling.dataScheduling),
              }))
            "
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-row>

    <v-divider class="black mb-3"></v-divider>

    <h1 class="mt-5 mb-5 text-center">Gráficos</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-card outlined elevation="8">
          <v-card-title class="mt-3 mb-3 justify-center">
            <h3 class="text-break">Clientes atendidos mensalmente</h3>
          </v-card-title>
          <v-card-text> 
            <GraphicLine/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined elevation="8">
          <v-card-title class="mt-3 mb-3 justify-center">
            <h3 class="text-break">Ganhos mensais</h3>
          </v-card-title>
          <v-card-text>
            <GraphicPizza/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  layout: "admin",

  data() {
    return {
      contarUsers: null,
      minhasAgendas: [],
      contarNewUsersWeek: null,
      agendasDoUsuario: [],
      tempoTotalHora: null,
      contarNewUsers: null,
      clientesAtendidos: null,
      mostrarSemana: false,
      earnings: null,
      tempoFormatado: null,
      mostrarGanhosHoje: false,
      showCancelled: false,
      user: {
        email: null,
        role: null,
        name: null,
        id: null,
      },
      schedulings: [],
      headers: [
        { text: "ID", value: "id", align: "center" },
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
        { text: "ID da Agenda", value: "idSchedule", align: "center" },
        { text: "ID do Pagamento", value: "idPayment", align: "center" },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },

  async created() {
    await this.getUserByToken();
    await this.getAgendamentos();
    await this.validateLogin();
    await this.getUsers();
    await this.getNewUsers();
    await this.getNewUsersWeek();
    await this.getTotalEarnings();
    await this.tempoTotal();
    await this.atendimentoUnico();
    await this.getMinhasAgendas();
    await this.totalEarn();
  },

  methods: {
    formatDateForDisplay(dateString) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      return date.toLocaleDateString("pt-BR", options);
    },

    async toggleAppointments() {
      if (this.showCancelled) {
        this.showCancelled = false;
      } else {
        this.showCancelled = true;
      }

      if (this.showCancelled) {
        this.showCancelledAppointments();
        this.showCancelled = false;
      } else {
        this.getAgendamentos();
      }
    },

    async getAgendamentos() {
      try {
        await this.getUserByToken();
        const currentDate = new Date().toISOString().slice(0, 10);
        const [meusag] = await Promise.all([
          this.$api.get("/api/agendamentos"),
        ]);
        this.meusag = meusag;
        let userId = this.user.id;
        let agendasDoUsuario;
        const scheduleResponse = await this.$api.get("/api/schedule");
        this.agendasDoUsuario = scheduleResponse.filter(
          (item) => item.idUser === userId
        );
        if (this.user.role === "superadmin") {
          agendasDoUsuario = this.meusag.map((agenda) => agenda.id_schedule);
        } else {
          agendasDoUsuario = this.agendasDoUsuario.map((agenda) => agenda.id);
        }
        const response = await this.$api.get("/api/schedulings");
        console.log(agendasDoUsuario);
        this.schedulings = response.filter((scheduling) => {
          return (
            agendasDoUsuario.includes(scheduling.idSchedule) &&
            scheduling.dataScheduling === currentDate &&
            scheduling.status === "Confirmado"
          );
        });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async showCancelledAppointments() {
      await this.getUserByToken();
      let userId = this.user.id;
      const [meusag] = await Promise.all([this.$api.get("/api/agendamentos")]);
      this.meusag = meusag;
      const currentDate = new Date().toISOString().slice(0, 10);
      const response = await this.$api.get("/api/schedulings");
      let agendasDoUsuario;
      const scheduleResponse = await this.$api.get("/api/schedule");
      this.agendasDoUsuario = scheduleResponse.filter(
        (item) => item.idUser === userId
      );
      if (this.user.role === "superadmin") {
        agendasDoUsuario = this.meusag.map((agenda) => agenda.id_schedule);
      } else {
        agendasDoUsuario = this.agendasDoUsuario.map((agenda) => agenda.id);
      }
      this.showCancelled = !this.showCancelled;
      this.schedulings = response.filter((scheduling) => {
        return (
          agendasDoUsuario.includes(scheduling.idSchedule) &&
          scheduling.dataScheduling === currentDate &&
          scheduling.status === "Cancelado"

          );
        });
        console.log(agendasDoUsuario);
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

    async getUsers() {
      try {
        const response = await this.$api.get("/api/admin/user");
        this.users = response.filter((user) => user.role === "customer");
        this.contarUsers = this.users.length;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async alternarClientesSemana() {
      if (this.mostrarSemana) {
        await this.getNewUsers();
      } else {
        await this.getNewUsersWeek();
      }
      this.mostrarSemana = !this.mostrarSemana;
    },

    async getNewUsers() {
      try {
        const response = await this.$api.get("/api/admin/newuser");
        this.newUsers = response;
        this.contarNewUsers = this.newUsers.length;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getNewUsersWeek() {
      try {
        const response = await this.$api.get("/api/admin/new-user-week");
        this.newUsersWeek = response;
        this.contarNewUsersWeek = this.newUsersWeek.length;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async atendimentoUnico() {
      try {
        let idAgendas = [];

        if (this.user.role === "superadmin") {
          const scheduleResponse = await this.$api.get("/api/schedule");
          idAgendas = scheduleResponse.map((schedule) => schedule.id);
        } else {
          const scheduleResponse = await this.$api.get("/api/schedule");
          const agendasFiltradas = scheduleResponse.filter(
            (item) => item.idUser === this.user.id
          );
          idAgendas = agendasFiltradas.map((schedule) => schedule.id);
        }
        const responseAgendamentos = await this.$api.get("/api/agendamentos");
        const agendamentosFiltrados = responseAgendamentos.filter(
          (agendamento) => idAgendas.includes(agendamento.id_schedule)
        );
        const clientesUnicos = new Set();
        agendamentosFiltrados.forEach((agendamento) => {
          clientesUnicos.add(agendamento.idcliente);
        });
        const quantidadeClientesUnicos = clientesUnicos.size;
        this.clientesAtendidos = quantidadeClientesUnicos;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getMinhasAgendas() {
      try {
        const response = await this.$api.get(`/api/schedule/`);
        if (this.user.role === "admin") {
          this.minhasAgendas = response
            .filter((schedule) => schedule.idUser === this.user.id)
            .map((schedule) => schedule.id);
        } else {
          this.minhasAgendas = response.map((schedule) => schedule.id);
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async toggleEarningsView() {
      if (this.mostrarGanhosHoje) {
        await this.getTotalEarnings();
      } else {
        await this.getTotalEarningsToday();
      }
      this.mostrarGanhosHoje = !this.mostrarGanhosHoje;
    },

    async getTotalEarningsToday() {
      try {
        await this.getUserByToken();
        const response = await this.$api.get("/api/agendamentos");

        const today = new Date();
        const formattedToday = today.toISOString().split("T")[0];
        const confirmadosHoje = response.filter((item) => {
          const scheduleDate = new Date(item.createdag)
            .toISOString()
            .split("T")[0];
          return (
            item.status === "Confirmado" &&
            scheduleDate === formattedToday &&
            this.minhasAgendas.includes(item.id_schedule)
          );
        });

        const totalEarningsToday = confirmadosHoje.reduce((total, item) => {
          return confirmadosHoje.length * item.service_price;
        }, 0);
        this.earnings = parseFloat(totalEarningsToday).toFixed(2);
      } catch (error) {
        return this.$toast.error(error.message);
      }
    },

    async totalEarn() {
      const response = await this.$api.get(`/api/payments-admin/`);
      this.payments = response;
      this.payments = this.payments.filter((payment) => {
        return (
          this.minhasAgendas.includes(payment.id_schedule) &&
          payment.status !== "Cancelado"
        );
      });
      this.valorTotal = this.payments
        .reduce((total, payment) => {
          return total + parseFloat(payment.total_value);
        }, 0)
        .toFixed(2);
    },

    async getTotalEarnings() {
      try {
        await this.getUserByToken();
        const [meusag] = await Promise.all([
          this.$api.get("/api/agendamentos"),
        ]);
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
        const confirmados = response.filter((item) => {
          return (
            agendasDoUsuario.includes(item.id_schedule || item.id) &&
            item.status !== "Cancelado"
          );
        });
        const totalEarnings = confirmados.reduce(
          (total, item) => total + parseFloat(item.service_price),
          0
        );
        this.earnings = parseFloat(totalEarnings).toFixed(2);
      } catch (error) {
        return this.$toast.error(error.message);
      }
    },

    async tempoTotal() {
      try {
        await this.getUserByToken();
        const agendamentos = await this.$api.get("/api/agendamentos");
        const userId = this.user.id;
        const dataAtual = new Date();
        const agendas = await this.$api.get("/api/schedule");
        this.agendasDoUsuario = agendas.filter(
          (item) => item.idUser === userId
        );
        let filtrarAgendamentos;
        if (this.user.role === "superadmin") {
          filtrarAgendamentos = agendamentos.filter((agendamento) => {
            const agendamentoDataHora = new Date(
              agendamento.data_scheduling + " " + agendamento.start_time
            );
            return (
              agendamento.status !== "Cancelado" &&
              dataAtual > agendamentoDataHora
            );
          });
        } else {
          filtrarAgendamentos = agendamentos.filter((agendamento) => {
            const agendamentoDataHora = new Date(
              agendamento.data_scheduling + " " + agendamento.start_time
            );
            return (
              agendamento.idfuncionario === userId &&
              agendamento.status !== "Cancelado" &&
              dataAtual > agendamentoDataHora
            );
          });
        }
        const totalEmSegundos = filtrarAgendamentos.reduce(
          (total, agendamento) => {
            const startTime = new Date(
              agendamento.data_scheduling + " " + agendamento.start_time
            );
            const endTime = new Date(
              agendamento.data_scheduling + " " + agendamento.end_time
            );
            const diferencaEmMilissegundos = endTime - startTime;
            const diferencaEmSegundos = diferencaEmMilissegundos / 1000;
            return total + diferencaEmSegundos;
          },
          0
        );
        const horas = Math.floor(totalEmSegundos / 3600);
        const minutos = Math.floor((totalEmSegundos % 3600) / 60);
        const segundos = Math.floor(totalEmSegundos % 60);
        const tempoTotalH = `${horas.toString().padStart(2, "0")}:${minutos
          .toString()
          .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
        this.tempoTotalHora = tempoTotalH;
      } catch (error) {
        return this.$toast.error(error.message);
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
<style></style>
