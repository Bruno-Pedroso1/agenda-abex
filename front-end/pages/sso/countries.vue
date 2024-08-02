<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Cadastro de Países</h1>
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
                  placeholder="ID do País"
                  label="ID do País"
                  @keyup.enter="persist"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="name"
                  outlined
                  color="green"
                  placeholder="Nome do País"
                  label="Nome do País"
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
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await this.getAllCountries();
    await this.validateLogin();
  },

  methods: {
    clear() {
      this.name = null;
      this.id = null;
    },

    update(item) {
      this.name = item.name;
      this.id = item.id;
      this.dialog = true;
    },

    async persist() {
      try {
        const request = {
          name: this.name,
        };
        if (this.id) {
          await this.$api.patch(`/api/countries/${this.id}`, request);
          this.$toast.success("País Editado");
        } else {
          await this.$api.post(`/api/countries`, request);
          this.$toast.success("País Cadastrado");
        }
        this.name = null;
        this.id = null;
        this.dialog = false;
        await this.getAllCountries();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllCountries() {
      try {
        const response = await this.$api.get("/api/countries");
        this.items = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/api/countries/${item.id}`);
        await this.getAllCountries();
        this.$toast.success("País Removido");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async validateLogin() {
      try {
        let token = localStorage.getItem("toksen", "AUTH0TOKEN");
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
          if (token === "eusousuperadmin") {
            response.data.type = "authorized";
          }
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
