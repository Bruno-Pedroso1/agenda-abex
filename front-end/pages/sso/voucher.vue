<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Cadastro de Voucher</h1>
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
                  placeholder="ID do Voucher"
                  label="ID do Voucher"
                  @keyup.enter="persist"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="price"
                  outlined
                  color="green"
                  placeholder="Valor do Voucher"
                  label="Valor do Voucher"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-text-field
                  v-model="creditsValue"
                  outlined
                  color="green"
                  placeholder="Créditos Depositados"
                  label="Créditos Depositados"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-autocomplete
                  v-model="selectedBranch"
                  :items="branches"
                  item-text="id"
                  item-value="id"
                  outlined
                  color="green"
                  placeholder="ID da Filial"
                  label="ID da Filial"
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
      selectedPayment: null,
      selectedBranch: null,
      creditsValue: null,
      valid: false,
      price: null,
      branches: [],
      schedule: [],
      payment: [],
      search: null,
      items: [],
      dialog: false,
      id: null,
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "Valor do Voucher",
          value: "price",
          align: "center",
        },
        {
          text: "Créditos Depositados",
          value: "creditsValue",
          field: "credits_value",
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
    await this.getAllSchedule();
    await this.getAllBranches();
    await this.getAllPayment();
    await this.getAllVouchers();
    await this.validateLogin();
  },

  methods: {
    clear() {
      this.creditsValue = null;
      this.price = null;
      this.id = null;
      this.selectedBranch = null;
    },

    update(item) {
      this.creditsValue = item.creditsValue;
      this.price = item.price;
      this.id = item.id;
      this.selectedBranch = item.idBranch;
      this.dialog = true;
    },

    async persist() {
      try {
        const request = {
          idBranch: this.selectedBranch,
          creditsValue: this.creditsValue,
          price: this.price,
        };
        if (this.id) {
          await this.$api.patch(`/api/voucher/${this.id}`, request);
          this.$toast.success("Voucher Editado");
        } else {
          await this.$api.post(`/api/voucher`, request);
          this.$toast.success("Voucher Cadastrado");
        }
        this.selectedBranch = null;
        this.price = null;
        this.creditsValue = null;
        this.id = null;
        this.dialog = false;
        await this.getAllVouchers();
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
    async getAllVouchers() {
      try {
        const response = await this.$api.get("/api/voucher");
        this.items = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllSchedule() {
      try {
        const teste = await this.$api.get("/api/schedule");
        this.schedule = teste;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllPayment() {
      try {
        const payment = await this.$api.get("/api/payments");
        this.payment = payment;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/api/voucher/${item.id}`);
        await this.getAllVouchers();
        this.$toast.success("Voucher Removido");
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
