<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center">Cadastro de Endereços</h1>
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
                label="Search"
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
            <v-col cols="2">
              <v-text-field
                v-model="id"
                outlined
                disabled
                color="green"
                placeholder="ID do Endereço"
                label="ID do Endereço"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="zipCode"
                v-mask="['#####-###']"
                outlined
                color="green"
                placeholder="CEP"
                label="CEP"
                @input="searchZipCode"
              ></v-text-field>
              <v-text-field
                v-model="district"
                outlined
                color="green"
                placeholder="Bairro"
                label="Bairro"
              >
              </v-text-field>
              <v-text-field
                v-model="street"
                outlined
                color="green"
                placeholder="Rua"
                label="Rua"
              >
              </v-text-field>
              <v-text-field
                v-model="number"
                outlined
                color="green"
                placeholder="Número"
                label="Número"
              >
              </v-text-field>
              <v-text-field
                v-model="complement"
                outlined
                color="green"
                placeholder="Complemento"
                label="Complemento"
              >
              </v-text-field>
              <v-autocomplete
                v-model="selectedCity"
                :items="cities"
                item-text="name"
                item-value="id"
                outlined
                color="green"
                placeholder="Nome da Cidade"
                label="Nome da Cidade"
              >
              </v-autocomplete>
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
  name: "add",
  layout: "admin",
  data() {
    return {
      cities: [],
      selectedCity: null,
      search: null,
      items: [],
      dialog: false,
      id: null,
      zipCode: "",
      complement: null,
      number: null,
      street: null,
      district: null,
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "CEP",
          value: "zipCode",
          align: "center",
        },
        {
          text: "ID da Cidade",
          value: "idCity",
          align: "center",
        },
        {
          text: "Complemento",
          value: "complement",
          align: "center",
        },
        {
          text: "Número",
          value: "number",
          align: "center",
        },
        {
          text: "Rua",
          value: "street",
          align: "center",
        },
        {
          text: "Bairro",
          value: "district",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await this.getAllAddresses();
    await this.getAllCities();
    await this.validateLogin();
  },

  methods: {
    clear() {
      this.zipCode = null;
      this.selectedCity = null;
      this.complement = null;
      this.number = null;
      this.street = null;
      this.district = null;
      this.id = null;
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
      this.zipCode = item.zipCode;
      this.selectedCity = item.idCity;
      this.complement = item.complement;
      this.number = item.number;
      this.street = item.street;
      this.district = item.district;
      this.id = item.id;
      this.dialog = true;
    },

    async persist() {
      try {
        const request = {
          zipCode: this.zipCode,
          idCity: this.selectedCity,
          complement: this.complement,
          number: this.number,
          street: this.street,
          district: this.district,
        };
        if (this.id) {
          await this.$api.patch(`/api/addresses/${this.id}`, request);
          this.$toast.success("Endereço Editado");
        } else {
          await this.$api.post(`/api/addresses`, request);
          this.$toast.success("Endereço Cadastrado");
        }
        this.zipCode = null;
        this.selectedCity = null;
        this.complement = null;
        this.number = null;
        this.street = null;
        this.district = null;
        this.id = null;
        this.dialog = false;
        await this.getAllAddresses();
        await this.getAllCities();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllAddresses() {
      try {
        const response = await this.$api.get("/api/addresses");
        this.items = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllCities() {
      try {
        const response = await this.$api.get("/api/cities");
        this.cities = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/api/addresses/${item.id}`);
        await this.getAllAddresses();
        this.$toast.success("Endereço Removido");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async searchZipCode() {
      try {
        if (this.zipCode.length === 9) {
          const response = await this.$api.get(
            `https://viacep.com.br/ws/${this.zipCode}/json/`
          );
          this.street = response.logradouro;
          this.district = response.bairro;
          this.selectedCity = response.ibge;
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>
<style></style>
