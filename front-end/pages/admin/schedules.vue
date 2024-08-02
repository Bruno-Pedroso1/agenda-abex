<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Cadastro de Horários</h1>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-card width="900">
        <v-card-text>
          <v-row class="align-center">
            <v-col cols="8">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn
                class="green white--text"
                @click="(dialog = true), clear()"
              >
                Cadastrar
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn class="blue white--text" href="/admin/management">
                Voltar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-data-table :headers="headers" :items="schedules" :search="search">
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
        <v-card-title>
          <v-row>
            <v-col>
              <v-text-field
                v-model="startTime"
                v-mask="['##:##']"
                outlined
                color="green"
                placeholder="Horário de Início"
                label="Horário de Início"
                @input="calculateEndTime"
              ></v-text-field>
              <v-text-field
                v-model="endTime"
                outlined
                color="green"
                placeholder="Horário de término"
                label="Horário de término"
              ></v-text-field>
              <v-autocomplete
                v-model="weekDay"
                :items="diad"
                item-text="name"
                item-value="id"
                outlined
                color="green"
                placeholder="Dia da semana"
                label="Dia da semana"
              ></v-autocomplete>
              <v-autocomplete
                v-model="selectedSchedule"
                :items="agendasDoUsuario"
                item-text="id"
                item-value="id"
                outlined
                color="green"
                placeholder="ID da Agenda"
                label="ID da Agenda"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="persist"> Salvar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "SchedulesPage",
  layout: "admin",
  data() {
    return {
      search: null,
      schedules: [],
      agendasDoUsuario: [],
      schedule: [],
      service: [],
      dialog: false,
      startTime: null,
      endTime: null,
      weekDay: null,
      selectedSchedule: null,
      user: {
        email: null,
        role: null,
        name: null,
      },
      diad: [
        { id: 1, name: "Domingo" },
        { id: 2, name: "Seguda-Feira" },
        { id: 3, name: "Terça-Feira" },
        { id: 4, name: "Quarta-Feira" },
        { id: 5, name: "Quinta-Feira" },
        { id: 6, name: "Sexta-Feira" },
        { id: 7, name: "Sábado" },
      ],
      headers: [
        { text: "ID", value: "id", align: "center" },
        { text: "Horário de Início", value: "startTime", align: "center" },
        { text: "Hora de término", value: "endTime", align: "center" },
        { text: "Dia da semana", value: "weekDay", align: "center" },
        { text: "ID da Agenda", value: "idSchedule", align: "center" },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await this.getAllScheduleEntries();
    await this.getAllSchedule();
    await this.getAllServices();
    await this.validateLogin();
    await this.getUserByToken();
    await this.getAgendas();
  },
  methods: {
    calculateEndTime() {
      if (this.startTime) {
        const [startHour, startMinute] = this.startTime.split(":").map(Number);
        let endHour = startHour;
        let endMinute = startMinute + 30;
        if (!startMinute) {
          endMinute = 30;
        }
        if (!endMinute) {
          endMinute = 0;
        }
        if (endMinute >= 60) {
          endHour += 1;
          endMinute -= 60;
        }
        this.endTime = `${String(endHour).padStart(2, "0")}:${String(
          endMinute
        ).padStart(2, "0")}`;
      } else {
        this.endTime = null;
      }
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
    async getAgendas() {
      try {
        const response = await this.$api.get("/api/schedule");
        if (this.user.role === "superadmin") {
          this.agendasDoUsuario = response;
        } else {
          this.agendasDoUsuario = response.filter(
            (item) => item.idUser === this.user.id
          );
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    clear() {
      this.startTime = null;
      this.id = null;
      this.endTime = null;
      this.weekDay = null;
      this.selectedSchedule = null;
    },
    async persist() {
      try {
        if (this.startTime.length < 3) {
          this.startTime = `${this.startTime}:00`;
        }
        const request = {
          startTime: this.startTime,
          endTime: this.endTime,
          weekDay: this.weekDay,
          idSchedule: this.selectedSchedule,
        };

        if (this.id) {
          await this.$api.patch(`/api/schedules/${this.id}`, request);
          this.$toast.success("Horário Editado");
          await this.getAllScheduleEntries();
        } else {
          await this.$api.post("/api/schedules", request);
          this.$toast.success("Horário Cadastrado");
          await this.getAllScheduleEntries();
        }
        this.startTime = null;
        this.endTime = null;
        this.weekDay = null;
        this.selectedSchedule = null;
        this.dialog = false;
        await this.getAllScheduleEntries();
        await this.getAllSchedule();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getAllServices() {
      try {
        const response = await this.$api.get("/api/services");
        this.service = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getAllScheduleEntries() {
      try {
        await this.getUserByToken();
        let userId = this.user.id;
        const scheduleResponse = await this.$api.get("/api/schedule");
        this.agendasDoUsuario = scheduleResponse.filter(
          (item) => item.idUser === userId
        );
        const allSchedulesResponse = await this.$api.get("/api/schedules");
        const allSchedules = allSchedulesResponse;
        this.schedules = allSchedules.filter((schedule) =>
          this.agendasDoUsuario.some(
            (agenda) => agenda.id === schedule.idSchedule
          )
        );
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    update(item) {
      this.id = item.id;
      this.startTime = item.startTime;
      this.endTime = item.endTime;
      this.weekDay = item.weekDay;
      this.selectedSchedule = item.idSchedule;
      this.dialog = true;
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/api/schedules/${item.id}`);
        this.$toast.success("Horário Removido");
        await this.getAllScheduleEntries();
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
