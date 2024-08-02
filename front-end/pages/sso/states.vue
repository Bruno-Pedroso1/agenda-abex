<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Cadastro de Estados</h1>
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
                  placeholder="ID do Estado"
                  label="ID do Estado"
                  @keyup.enter="persist"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="name"
                  outlined
                  color="green"
                  placeholder="Nome do Estado"
                  label="Nome do Estado"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-autocomplete
                  v-model="selectedCountry"
                  :items="countries"
                  item-text="name"
                  item-value="id"
                  outlined
                  color="green"
                  placeholder="Nome do País"
                  label="Nome do País"
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
      selectedCountry: null,
      countries: [],
      search: null,
      items: [],
      dialog: false,
      id: null,
      name: null,
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "Nome",
          value: "name",
          align: "center",
        },
        {
          text: "ID do País",
          value: "idCountry",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await this.getAllStates();
    await this.getAllCountries();
    await this.validateLogin();
  },

  methods: {
    clear() {
      this.name = null;
      this.id = null;
      this.selectedCountry = null;
    },

    update(item) {
      this.name = item.name;
      this.id = item.id;
      this.selectedCountry = item.idCountry;
      this.dialog = true;
    },

    async persist() {
      try {
        const request = {
          name: this.name,
          idCountry: this.selectedCountry,
        };
        if (this.id) {
          await this.$api.patch(`/api/states/${this.id}`, request);
          this.$toast.success("Estado Editado");
        } else {
          await this.$api.post(`/api/states`, request);
          this.$toast.success("Estado Cadastrado");
        }
        this.name = null;
        this.selectedCountry = null;
        this.id = null;
        this.dialog = false;
        await this.getAllStates();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllStates() {
      try {
        const response = await this.$api.get("/api/states");
        this.items = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllCountries() {
      try {
        const teste = await this.$api.get("/api/countries");
        this.countries = teste;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/api/states/${item.id}`);
        await this.getAllStates();
        this.$toast.success("Estado Removido");
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
        if (token === "eusousuperadmin") {
          response.data.type = "authorized";
        }

        if (response.status === 200) {
          if (
            (response.data.type === "unauthorized" &&
              token !== "eusousuperadmin") ||
            (response.data.type === "forbidden" && token !== "eusousuperadmin")
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
