<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Cadastro de Agenda</h1>
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
        <v-data-table :headers="headers" :items="items" :search="search">
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
                v-model="id"
                outlined
                disabled
                color="green"
                placeholder="ID da Agenda"
                label="ID da Agenda"
              >
              </v-text-field>
              <v-text-field
                v-model="servicePrice"
                outlined
                color="green"
                placeholder="Valor do serviço"
                label="Valor do serviço"
              ></v-text-field>
              <v-text-field
                v-model="timeToReschedule"
                outlined
                color="green"
                hint="Informe o prazo em dias (minimo 4)"
                placeholder="Prazo para reagendar"
                label="Prazo para reagendar"
              ></v-text-field>
              <v-select
                v-model="selectedServices"
                outlined
                color="green"
                :items="services"
                item-text="name"
                item-value="id"
                placeholder="Nome do serviço"
                label="Nome do serviço"
              ></v-select>
              <v-text-field
                v-model="cancellationFee"
                hint="Valores entre 0 e 100%"
                outlined
                color="green"
                placeholder="Taxa de Cancelamento"
                label="Taxa de Cancelamento"
              ></v-text-field>
              <v-autocomplete
                v-model="selectedBranch"
                :items="branches"
                item-text="businessName"
                item-value="id"
                outlined
                color="green"
                placeholder="Razão Social da Filial"
                label="Razão Social da Filial"
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
      items: [],
      cancellationFee: null,
      search: null,
      id: null,
      user: {
        email: null,
        role: null,
        name: null,
        id: null,
        idCompany: null,
      },
      branches: [],
      services: [],
      dialog: false,
      servicePrice: null,
      timeToReschedule: null,
      selectedBranch: null,
      selectedServices: null,
      headers: [
        { text: "ID", value: "id", align: "center" },
        {
          text: "Valor do serviço",
          value: "servicePrice",
          field: "service_price",
          align: "center",
        },
        {
          text: "Prazo para reagendar",
          value: "timeToReschedule",
          field: "time_to_reschedule",
          align: "center",
        },
        {
          text: "ID do Serviço",
          value: "idServices",
          field: "id_services",
          align: "center",
        },
        {
          text: "Taxa de Cancelamento",
          value: "cancellationFee",
          field: "cancellation_fee",
          align: "center",
        },
        {
          text: "ID do Funcionário",
          value: "idUser",
          field: "id_user",
          align: "center",
        },
        {
          text: "ID da Filial",
          value: "idBranch",
          field: "id_branch",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },

  async created() {
    await this.getUserByToken();
    await this.validateLogin();
     await this.getAllServices();
      await this.getAllSchedules();
     await this.getAllBranches();

  },

  methods: {
    clear() {
      this.servicePrice = null;
      this.cancellationFee = null;
      this.timeToReschedule = null;
      this.id = null;
      this.selectedBranch = null;
      this.selectedServices = null;
    },

    async getAllBranches() {
      try {
        await this.getUserByToken();
        const idEmpresa = this.user.idCompany;
        const response = await this.$api.get(
          `/api/company-branch?id_company=${idEmpresa}`
        );

        this.branches = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllUsers() {
      try {
        const response = await this.$api.get("/api/users");
        if (Array.isArray(response)) {
          this.user = response;
        } else if (response.data && Array.isArray(response.data)) {
          this.user = response.data;
        } else {
          console.error(
            "Resposta da API não é um array de usuários:",
            response
          );
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllSchedules() {
      try {
        const response = await this.$api.get("/api/schedule");
        this.items = response.filter(
          (schedule) => schedule.idUser === this.user.id
        );
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

async getAllServices() {
  try {
    const services = await this.$api.get("/api/services");
    this.services = services;

  } catch (error) {
    this.$toast.error(error.message);
  }
},



    update(item) {
      this.id = item.id;
      this.cancellationFee = item.cancellationFee;
      this.servicePrice = item.servicePrice;
      this.timeToReschedule = item.timeToReschedule;
      this.selectedBranch = item.idBranch;
      this.selectedServices = item.idServices;
      this.dialog = true;
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/api/schedule/${item.id}`);
        await this.getAllSchedules();
        this.$toast.success("Agenda Removida");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async persist() {
      try {
        await this.getUserByToken();
        const userId = this.user.id;
        const request = {
          servicePrice: this.servicePrice,
          timeToReschedule: this.timeToReschedule,
          idUser: userId,
          idBranch: this.selectedBranch,
          idServices: this.selectedServices,
          cancellationFee: this.cancellationFee,
        };

        if (this.timeToReschedule < 4) {
          this.$toast.error("O prazo para reagendar deve ser no minímo 4 dias");
          return;
        }
        if (this.cancellationFee < 0 || this.cancellationFee > 100) {
          this.$toast.error("A taxa de cancelamento deve estar entre 0 e 100%");
          return;
        }
        if (this.id) {
          await this.$api.patch(`/api/schedule/${this.id}`, request);
          this.$toast.success("Agenda Editada");
        } else {
          await this.$api.post(`/api/schedule`, request);
          this.$toast.success("Agenda Cadastrada");
        }

        this.selectedBranch = null;
        this.cancellationFee = null;
        this.selectedServices = null;
        this.servicePrice = null;
        this.timeToReschedule = null;
        this.id = null;
        this.dialog = false;
        await this.getAllSchedules();
      } catch (error) {
        this.$toast.error(error.message);
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
          idCompany: data.idCompany,
        };
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
