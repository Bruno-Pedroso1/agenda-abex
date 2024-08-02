<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Cadastro de Integrações</h1>
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
                  placeholder="ID da Integração"
                  label="ID da Integração"
                  @keyup.enter="persist"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="type"
                  outlined
                  color="green"
                  placeholder="Tipo da Integração"
                  label="Tipo da Integração"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-text-field
                  v-model="tokenApi"
                  outlined
                  color="green"
                  placeholder="Token API"
                  label="Token API"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-autocomplete
                  v-model="selectedBranch"
                  :items="branches"
                  item-value="id"
                  item-text="tradingName"
                  outlined
                  color="green"
                  placeholder="Nome Fantasia da Filial"
                  label="Nome Fantasia da Filial"
                  @keyup.enter="persist"
                >
                </v-autocomplete>
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
      valid: false,
      branches: [],
      selectedBranch: null,
      search: null,
      items: [],
      dialog: false,
      id: null,
      type: null,
      tokenApi: null,
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "Tipo da API",
          value: "type",
          align: "center",
        },
        {
          text: "Token API",
          value: "tokenApi",
          field: "token_api",
          align: "center",
        },
        {
          text: "ID da Filial",
          value: "idBranch",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await this.getAllIntegration();
    await this.getAllBranches();
    await this.validateLogin();
  },

  methods: {
    clear() {
      this.type = null;
      this.id = null;
      this.selectedBranch = null;
      this.tokenApi = null;
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
    update(item) {
      this.type = item.type;
      this.id = item.id;
      this.selectedBranch = item.idBranch;
      this.dialog = true;
      this.tokenApi = item.tokenApi;
    },

    async persist() {
      try {
        const request = {
          type: this.type,
          idBranch: this.selectedBranch,
          tokenApi: this.tokenApi,
        };
        if (this.id) {
          await this.$api.patch(`/api/integrations/${this.id}`, request);
          this.$toast.success("Integração Editada");
        } else {
          await this.$api.post(`/api/integrations`, request);
          this.$toast.success("Integração Cadastrada");
        }
        this.type = null;
        this.selectedBranch = null;
        this.tokenApi = null;
        this.id = null;
        this.dialog = false;
        await this.getAllIntegration();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllIntegration() {
      try {
        const response = await this.$api.get("/api/integrations");
        this.items = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getAllBranches() {
      try {
        const response = await this.$api.get("/api/branches");
        this.branches = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/api/integrations/${item.id}`);
        await this.getAllIntegration();
        this.$toast.success("Integração Removida");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<style></style>
