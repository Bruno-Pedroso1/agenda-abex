<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">
          Cadastro de Agendamentos
        </h1>
      </v-col>
    </v-row>

    <v-row class="d-flex align-center flex-column">
      <v-card width="900" outlined elevation="8">
        <v-card-title>
          <v-row class="align-center">
            <v-col md="8" cols="10">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="2" class="text-end">
              <v-btn
                color="green"
                @click="(dialog = true), clear()"
                block
                class="mt-3"
              >
                Cadastrar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="
            schedulings.map((scheduling) => ({
              ...scheduling,
              dataScheduling: formatDateForDisplay(scheduling.dataScheduling),
            }))
          "
          :search="search"
        >
          <template #item.actions="{ item }">
            <TooltipComponent
              icone="mdi-delete"
              corIcone="red"
              left
              texto="Excluir"
              @click="destroy(item)"
            />
            <TooltipComponent
              icone="mdi-pencil"
              corIcone="green"
              left
              texto="Editar"
              @click="update(item)"
            />
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card>
        <v-form v-model="valid" @submit.prevent="persist">
          <v-card-title>
            <v-row>
              <v-col>
                <div>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dataScheduling"
                        label="Data de Agendamento"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dataScheduling"
                      :active-picker.sync="activePicker"
                      @change="save"
                      :min="
                        new Date(
                          Date.now() - new Date().getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .substring(0, 10)
                      "
                    ></v-date-picker>
                  </v-menu>
                </div>
                <v-autocomplete
                  v-model="timeScheduling"
                  item-text="startTime"
                  item-value="startTime"
                  :items="testhorarios"
                  outlined
                  color="green"
                  placeholder="Horário do Agendamento"
                  label="Horário do Agendamento"
                  @keyup.enter="persist"
                ></v-autocomplete>
                <v-autocomplete
                  v-model="status"
                  :items="['Cancelado', 'Confirmado', 'Realizado']"
                  outlined
                  color="green"
                  placeholder="Status"
                  label="Status"
                  @keyup.enter="persist"
                ></v-autocomplete>
                <v-autocomplete
                  v-model="selectedSchedule"
                  :items="schedule"
                  item-text="id"
                  item-value="id"
                  outlined
                  color="green"
                  placeholder="ID da Agenda"
                  label="ID da Agenda"
                  @keyup.enter="persist"
                ></v-autocomplete>
                <v-autocomplete
                  v-model="selectedPayment"
                  :items="payment"
                  item-text="id"
                  item-value="id"
                  outlined
                  color="green"
                  placeholder="ID do Pagamento"
                  label="ID do Pagamento"
                  @keyup.enter="persist"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" @click="persist"> Salvar </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "SchedulingsPage",
  data() {
    return {
      valid: false,
      servicex: [],
      schedule: [],
      payment: [],
      activePicker: null,
      menu: false,
      search: null,
      schedulings: [],
      dialog: false,
      date: null,
      dataScheduling: null,
      timeScheduling: null,
      status: null,
      selectedSchedule: null,
      selectedPayment: null,
      selectedService: null,
      testhorarios: [],
      userBranchInfo: {},

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
    await this.getAllSchedulings();
    await this.getAllHorarios();
    await this.getAllSchedule();
    await this.getAllPayment();
    await this.getAllServices();
    await this.validateLogin();
  },
  methods: {
    formatDateForDisplay(dateString) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      return date.toLocaleDateString("pt-BR", options);
    },
    clear() {
      this.dataScheduling = null;
      this.timeScheduling = null;
      this.status = null;
      this.selectedSchedule = null;
      this.selectedPayment = null;
    },

    save(date) {
      this.$refs.menu.save(date);
    },
    async update(item) {
      this.dataScheduling = item.dataScheduling;
      this.timeScheduling = item.timeScheduling;
      this.id = item.id;
      this.status = item.status;
      this.selectedSchedule = item.idSchedule;
      this.selectedPayment = item.idPayment;
      this.dialog = true;
    },
    formatDate(dateString) {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    },
    async persist() {
      try {
        const timeAndDateScheduling = this.schedulings.map((item) => ({
          timeScheduling: item.timeScheduling,
          dataScheduling: item.dataScheduling,
          status: item.status,
        }));
        const tempData = this.formatDate(this.dataScheduling);
        const agendamentoExistente = timeAndDateScheduling.find(
          (item) =>
            item.dataScheduling === tempData &&
            item.timeScheduling === this.timeScheduling &&
            item.status !== "Cancelado"
        );
        if (agendamentoExistente) {
          this.$toast.error("Já existe um agendamento neste dia e horário.");
          return;
        }
        const request = {
          dataScheduling: tempData,
          timeScheduling: this.timeScheduling,
          status: this.status,
          idSchedule: this.selectedSchedule,
          idPayment: this.selectedPayment,
        };
        if (this.id) {
          await this.$api.patch(`/api/schedulings/${this.id}`, request);
          this.$toast.success("Agendamento Editado");
        } else {
          await this.$api.post(`/api/schedulings`, request);
          this.$toast.success("Agendamento Cadastrado");
        }
        await this.getAllSchedulings();

        this.dataScheduling = null;
        this.timeScheduling = null;
        this.status = null;
        this.idSchedule = null;
        this.idPayment = null;
        this.id = null;
        this.dialog = false;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllSchedulings() {
      try {
        const response = await this.$api.get("/api/schedulings");
        this.schedulings = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/api/schedulings/${item.id}`);
        this.$toast.success("Agendamento Removido");
        await this.getAllSchedulings();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getAllSchedule() {
      try {
        const response = await this.$api.get("/api/schedule");
        this.schedule = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getAllHorarios() {
      try {
        const response = await this.$api.get("/api/schedules");
        this.testhorarios = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getAllServices() {
      try {
        const response = await this.$api.get("/api/services");
        this.servicex = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getAllPayment() {
      try {
        const response = await this.$api.get("/api/payments");
        this.payment = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async validateLogin() {
      try {
        let token = localStorage.getItem("toksen");
        if (!token) {
          this.$toast.info("Você não tem permissão para acessar esse recurso");
          return this.$router.push("/customer/home");
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
            this.$toast.info(
              "Você não tem permissão para acessar esse recurso"
            );
            return this.$router.push("/customer/home");
          }
        } else {
          console.error("Erro inesperado:", response);
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
