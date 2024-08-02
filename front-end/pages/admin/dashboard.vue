<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h1>Dashboard</h1>
        <h3>Detalhes gerais</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="5" cols="12">
        <v-row>
          <v-col md="5" cols="12">
            <v-card rounded="xl">
              <v-card-text class="black--text">
                <v-row>
                  <v-col class="text-center">
                    <h4 class="mb-2">Ganhos totais</h4>
                    <h4>
                      R$ <b class="green--text">{{ ganhosTotaisN }}</b>
                    </h4>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="7" cols="12">
            <v-card rounded="xl">
              <v-card-text class="black--text">
                <v-row>
                  <v-col class="text-center">
                    <h4 class="mb-2">Top 1 Serviço</h4>
                    <h4 v-if="topServicos.length > 0">{{ topServicos }}</h4>
                    <h4 v-else>
                      <h4>Nenhum registro de serviços!</h4>
                    </h4>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col md="7" cols="12">
        <v-row>
          <v-col md="5" cols="12">
            <v-card rounded="xl">
              <v-card-text class="black--text">
                <v-row>
                  <v-col class="text-center">
                    <h4 class="mb-2">Total de Agendamentos</h4>
                    <h4>
                      <b class="green--text">{{ totalAgendamentos }}</b>
                    </h4>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="3" cols="12">
            <v-card rounded="xl">
              <v-card-text class="black--text">
                <v-row>
                  <v-col class="text-center">
                    <h4 class="mb-2">Confirmados</h4>
                    <h4>
                      <b class="green--text">{{ totalConfirmados }}</b>
                    </h4>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="4" cols="12">
            <v-card rounded="xl">
              <v-card-text class="black--text">
                <v-row>
                  <v-col class="text-center">
                    <h4 class="mb-2">Atendimentos</h4>
                    <h4>
                      <b class="green--text">{{ totalAtendidos }}</b>
                    </h4>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="black mt-5 mb-5"></v-divider>

    <v-row class="justify-center mt-5 mb-5">
      <v-card outlined elevation="8" width="98%">
        <v-card-title>
          <v-row class="text-center">
            <v-col md="6" cols="12">
              <h4>Agendamentos para Hoje</h4>
            </v-col>
            <v-col md="6" cols="12">
              <v-btn
                class="white--text"
                :color="showCancelled ? 'green' : 'red'"
                @click="toggleAppointments"
              >
                {{ showCancelled ? "Ver Confirmados" : "Ver Cancelados" }}
              </v-btn>
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
                dataScheduling: scheduling.dataScheduling,
              }))
            "
          ></v-data-table>
        </v-card-text>
      </v-card>
    </v-row>

    <v-divider class="black mt-5 mb-5"></v-divider>

    <v-row>
      <v-col md="5" cols="12">
        <v-row>
          <v-col>
            <v-card>
              <v-card-title class="text-center justify-center text-break">
                <h2>Ganhos por mês em {{ anoAtual }}</h2>
              </v-card-title>
              <v-card-text>
                <GraphicLine />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="7" cols="12">
        <v-row>
          <v-col md="5" cols="12">
            <v-card>
              <v-card-title class="text-center">
                <h2>Agendamentos de {{ meses[mesAtual] }}</h2>
              </v-card-title>
              <v-card-text>
                <GraphicPie />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="7" cols="12">
            <v-card>
              <v-card-title class="text-center text-break">
                <h2>Agendamentos por mês em {{ anoAtual }}</h2>
              </v-card-title>
              <v-card-text>
                <GraphicBar />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "IxcSchedulerDashboard",
  layout: "admin",

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
      agendamentosFiltrados: [],
      topServicos: [],
      totalAgendamentos: 0,
      ganhosTotaisN: 0,
      totalConfirmados: 0,
      ganhosTotais: 0,
      totalAtendidos: [],
      meusag: [],
      agendasDoUsuario: [],
      showCancelled: false,
      user: {
        id: null,
        name: null,
        email: null,
        role: null,
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
    await this.validateLogin();
    await this.ganhosTotaisNew();
    await Promise.all([
      this.getAllDataSchedulings(),
      this.findTopService(),
      this.getAgendamentos(),
      this.paymentAdmin(),
    ]);
  },

  methods: {
    async ganhosTotaisNew() {
      try {
        await this.getUserByToken();
        console.log(this.user.id);

        const agendamentos = await this.$api.get("/api/agendamentos");
        console.log(agendamentos);

        const agendamentosDoUsuario = agendamentos.filter(
          (amp) => amp.idfuncionario === this.user.id
        );

        const agendamentosValidos = agendamentosDoUsuario.filter(
          (amp) => amp.status !== "Cancelado"
        );

        this.ganhosTotaisN = agendamentosValidos.reduce(
          (total, agendamento) => {
            return total + parseFloat(agendamento.service_price);
          },
          0
        );

        console.log(this.ganhosTotaisN.toFixed(2));
      } catch (error) {
        console.log(error);
      }
    },

    formatDateForDisplay(dateString) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      return date.toLocaleDateString("pt-BR", options);
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

    async findTopService() {
      try {
        await this.getUserByToken();
        let agendasDoUsuario;
        const servicos = await this.$api.get("/api/top-service");
        const agendas = await this.$api.get("/api/schedule");
        this.agendasDoUsuario = agendas.filter(
          (item) => item.idUser === this.user.id
        );
        if (this.user.role === "superadmin") {
          agendasDoUsuario = this.meusag.map((agenda) => agenda.id_schedule);
        } else {
          agendasDoUsuario = this.agendasDoUsuario.map((agenda) => agenda.id);
        }
        const top = servicos.filter((item) => {
          return agendasDoUsuario.includes(item.idsc);
        });
        const services = top;
        if (services.length === 0) {
          console.log("Nenhum serviço encontrado.");
          return;
        }
        const maxCount = Math.max(...services.map((service) => service.count));
        const topServices = services.filter(
          (service) => parseInt(service.count) === parseInt(maxCount)
        );
        const topServiceNames = topServices.map((service) => service.name);
        this.topServicos = topServiceNames[0];
      } catch (error) {
        console.error("Erro ao obter dados do serviço:", error);
      }
    },

    async getAllDataSchedulings() {
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
      const totalAgendamentos = response.filter((item) => {
        return agendasDoUsuario.includes(item.id_schedule || item.id);
      });
      this.agendamentosFiltrados = meusAgendamentos.map((ma) => {
        const data = new Date(ma.data_scheduling + "T" + ma.start_time);
        const status = ma.status;
        return { data, status };
      });
      const dataAtual = new Date();
      this.agendamentosFiltrados.map((af) => {
        if (af.data < dataAtual) {
          this.totalAtendidos.push(af);
          return this.totalAtendidos;
        }
      });
      this.totalAtendidos = this.totalAtendidos.length;
      this.totalAgendamentos = totalAgendamentos.length;
      this.totalConfirmados = meusAgendamentos.length;
    },

    async paymentAdmin() {
      try {
        const [agendas, pagamentos] = await Promise.all([
          this.$api.get(`/api/schedule/`),
          this.$api.get(`/api/payments-admin/`),
        ]);

        const minhasAgendas = agendas
          .filter((schedule) => schedule.idUser === this.user.id)
          .map((schedule) => schedule.id);
        const payments = pagamentos.filter((r) => {
          return (
            minhasAgendas.includes(r.id_schedule) && r.status === "Confirmado"
          );
        });

        const valorTotal = payments
          .reduce((total, payment) => {
            return total + parseFloat(payment.total_value);
          }, 0)
          .toFixed(2);
        this.ganhosTotais = valorTotal;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getUserByToken() {
      const { data } = await this.$api.get("/api/users/by-token");
      console.log("SOCORRO", data);
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
  },
};
</script>
