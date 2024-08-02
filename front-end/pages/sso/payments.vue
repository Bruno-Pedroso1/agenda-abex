<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Cadastro de Pagamentos</h1>
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
                  placeholder="ID"
                  label="ID"
                  @keyup.enter="persist"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="totalValue"
                  outlined
                  color="green"
                  placeholder="Valor Total"
                  label="Valor Total"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-autocomplete
                  v-model="status"
                  :items="stat"
                  outlined
                  color="green"
                  placeholder="Status"
                  label="Status"
                  @keyup.enter="persist"
                >
                </v-autocomplete>
                <v-autocomplete
                  v-model="idUser"
                  item-text="name"
                  item-value="id"
                  :items="users"
                  outlined
                  color="green"
                  placeholder="Cliente"
                  label="Cliente"
                  @keyup.enter="persist"
                >
                </v-autocomplete>
                <v-autocomplete
                  v-model="selectedPaymentMethod"
                  outlined
                  :items="paymethod"
                  item-text="type"
                  item-value="id"
                  color="green"
                  placeholder="Tipo do Método de Pagamento"
                  label="Tipo do Método de Pagamento"
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
      search: null,
      items: [],
      dialog: false,
      id: null,
      status: null,
      idUser: null,
      paymethod: [],
      user: [],
      users: [],
      stat: [
        "Aguardando Pagamento",
        "Pagamento Efetivado",
        "Pagamento não efetivado",
      ],
      selectedPaymentMethod: null,
      selectedUser: null,
      totalValue: null,
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "Status",
          value: "status",
          align: "center",
        },
        {
          text: "Valor Total",
          value: "totalValue",
          align: "center",
        },
        {
          text: "Cliente",
          value: "idUser",
          field: "id_user",
          align: "center",
        },
        {
          text: "ID Método de Pagamento",
          value: "idPaymentMethod",
          field: "id_payment_method",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await Promise.all([
      this.validateLogin(),
      this.getAllPayments(),
      this.getAllPaymentM(),
      this.getAllUsers(),
    ]);
  },

  methods: {
    clear() {
      this.idUser = null;
      this.status = null;
      this.totalValue = null;
      this.selectedPaymentMethod = null;
      this.id = null;
    },

    update(item) {
      this.idUser = item.idUser;
      this.status = item.status;
      this.totalValue = item.totalValue;
      this.selectedPaymentMethod = item.idPaymentMethod;
      this.id = item.id;
      this.dialog = true;
    },

    async persist() {
      try {
        const request = {
          status: this.status,
          totalValue: this.totalValue,
          idUser: this.idUser,
          idPaymentMethod: this.selectedPaymentMethod,
        };
        if (this.id) {
          await this.$api.patch(`/api/payments/${this.id}`, request);
          this.$toast.success("Pagamento Editado");
        } else {
          await this.$api.post(`/api/payments`, request);
          this.$toast.success("Pagamento Cadastrado");
        }
        this.status = null;
        this.totalValue = null;
        this.selectedUser = null;
        this.selectedPaymentMethod = null;
        this.idUser = null;
        this.id = null;
        this.dialog = false;
        await this.getAllPayments();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getAllUsers() {
      try {
        const response = await this.$api.get("/api/users");
        this.user = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllPayments() {
      try {
        const response = await this.$api.get("/api/payments");
        this.items = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllPaymentM() {
      try {
        const response = await this.$api.get("/api/payment-methods");
        this.paymethod = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllUsers() {
      try {
        const response = await this.$api.get("/api/users");
        this.users = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/api/payments/${item.id}`);
        // this.$toast.success("Pagamento Removido");
        await this.getAllPayments();
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
