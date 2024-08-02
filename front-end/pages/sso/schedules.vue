<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Cadastro de Horarios</h1>
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
        <v-form v-model="valid" @submit.prevent="persist">
          <v-card-title>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="startTime"
                  outlined
                  color="green"
                  placeholder="Horário de Início"
                  label="Horário de Início"
                  @input="calculateEndTime"
                  @keyup.enter="persist"
                ></v-text-field>
                <v-text-field
                  v-model="endTime"
                  outlined
                  color="green"
                  placeholder="Horário de término"
                  label="Horário de término"
                  @keyup.enter="persist"
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
  name: "SchedulesPage",
  data() {
    return {
      valid: false,
      schedules: [],
      search: null,
      schedule: [],
      service: [],
      dialog: false,
      startTime: null,
      endTime: null,
      weekDay: null,
      selectedSchedule: null,
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
  },
  methods: {
    calculateEndTime() {
      if (this.startTime) {
        const [startHour, startMinute] = this.startTime.split(":").map(Number);
        let endHour = startHour;
        let endMinute = startMinute + 30;

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

    clear() {
      this.startTime = null;
      this.endTime = null;
      this.weekDay = null;
      this.selectedSchedule = null;
    },
    async persist() {
      try {
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
        const response = await this.$api.get("/api/schedules");
        this.schedules = response;
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
