<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column"> lista de Filial - Usuário</h1>
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
          
            </v-col>
          </v-row>
        </v-card-title>
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
        <v-form v-model="valid" @submit.prevent="persist">
          <v-card-title>
            <v-row>
              <v-col cols="2">
                <v-text-field
                  v-model="id"
                  outlined
                  disabled
                  color="green"
                  placeholder="ID"
                  label="ID"
                  @keyup.enter="persist"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="selectedIdBranch"
                  :items="idb"
                  item-text="tradingName"
                  item-value="id"
                  outlined
                  color="green"
                  placeholder="Nome Fantasia da Filial"
                  label="Nome Fantasia da Filial"
                  @keyup.enter="persist"
                >
                </v-autocomplete>
                <v-autocomplete
                  v-model="selectedIdUser"
                  :items="idu"
                  item-text="name"
                  item-value="id"
                  outlined
                  color="green"
                  placeholder="Nome do Usuário"
                  label="Nome do Usuário"
                  @keyup.enter="persist"
                >
                </v-autocomplete>
                <v-text-field
                  v-model="creditos"
                  outlined
                  color="green"
                  placeholder="Créditos"
                  label="Créditos"
                  @keyup.enter="persist"
                >
                </v-text-field>
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
  name: "Index",
  data() {
    return {
      search: null,
      valid: false,
      creditos: null,
      idb: [],
      items: [],
      dialog: false,
      id: null,
      name: null,
      selectedIdBranch: null,
      selectedIdUser: null,
      idu: [],
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "ID da Filial",
          value: "idBranch",
          align: "center",
        },
        {
          text: "ID do Usuário",
          value: "idUser",
          align: "center",
        },
        {
          text: "Créditos",
          value: "credits",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await this.getAllBranches();
    await this.getAllUsers();
    await this.getAllUserBranches();
    await this.validateLogin();
  },

  methods: {
    clear() {
      this.selectedIdBranch = null;
      this.id = null;
      this.creditos = null;
      this.selectedIdUser = null;
    },

    update(item) {
      this.selectedIdBranch = item.idBranch;
      this.id = item.id;
      this.creditos = item.credits;
      this.selectedIdUser = item.idUser;
      this.dialog = true;
    },

    async persist() {
      this.creditos = this.creditos || "0.0";

      try {
        const request = {
          idUser: this.selectedIdUser,
          idBranch: this.selectedIdBranch,
          credits: this.creditos,
        };

        if (this.id) {
          await this.$api.patch(/api/user-branches/${this.id}, request);
          this.$toast.success("Filial - Usuário Editado");
        } else {
          await this.$api.post(/api/user-branches, request);
          this.$toast.success("Usuário cadastrado na filial");
        }
        this.selectedIdUser = null;
        this.creditos = null;
        this.selectedIdBranch = null;
        this.id = null;
        this.dialog = false;
        await this.getAllBranches();
        await this.getAllUsers();
        await this.getAllUserBranches();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllUserBranches() {
      try {
        const response = await this.$api.get("/api/user-branches");
        this.items = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllUsers() {
      try {
        const response = await this.$api.get("/api/users");
        this.idu = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllBranches() {
      try {
        const teste = await this.$api.get("/api/branches");
        this.idb = teste;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async destroy(item) {
      try {
        await this.$api.delete(/api/user-branches/${item.id});
        await this.getAllUserBranches();
        this.$toast.success("Usuário removido da filial");
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
          { authorization: Bearer ${token} }
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
