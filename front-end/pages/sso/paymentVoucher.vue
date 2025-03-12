<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">
          Lista  de Pagamento - Voucher
        </h1>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center flex-column">
      <v-card width="900">
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
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="selectedPayment"
                  :items="idpaym"
                  item-text="id"
                  item-value="id"
                  outlined
                  color="green"
                  placeholder="ID do Pagamento"
                  label="ID do Pagamento"
                  @keyup.enter="persist"
                >
                </v-autocomplete>
                <v-autocomplete
                  v-model="selectedVoucher"
                  :items="idvou"
                  item-text="id"
                  item-value="id"
                  outlined
                  color="green"
                  placeholder="ID do Voucher"
                  label="ID do Voucher"
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
      search: null,
      valid: false,
      creditos: null,
      idpaym: [],
      idvou: [],
      items: [],
      dialog: false,
      id: null,
      selectedPayment: null,
      selectedVoucher: null,
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "ID do Pagamento",
          value: "idPayment",
          align: "center",
        },
        {
          text: "ID do Voucher",
          value: "idVoucher",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await this.getAllVouchers();
    await this.getAllPayments();
    await this.getAllPaymentVoucher();
    await this.validateLogin();
  },

  methods: {
    clear() {
      this.selectedPayment = null;
      this.id = null;
      this.selectedVoucher = null;
    },

    update(item) {
      this.selectedPayment = item.idPayment;
      this.id = item.id;
      this.selectedVoucher = item.idVoucher;
      this.dialog = true;
    },

    async persist() {
      try {
        const request = {
          idPayment: this.selectedPayment,
          idVoucher: this.selectedVoucher,
        };

        if (this.id) {
          await this.$api.patch(`/api/payment-voucher/${this.id}`, request);
          this.$toast.success("Pagamento - Voucher Editado");
        } else {
          await this.$api.post(`/api/payment-voucher`, request);
          this.$toast.success("Pagamento cadastrado.");
        }
        this.selectedPayment = null;
        this.selectedVoucher = null;
        this.id = null;
        this.dialog = false;
        await this.getAllPaymentVoucher();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllPaymentVoucher() {
      try {
        const response = await this.$api.get("/api/payment-voucher");
        this.items = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllPayments() {
      try {
        const response = await this.$api.get("/api/payments");
        this.idpaym = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllVouchers() {
      try {
        const response = await this.$api.get("/api/voucher");
        this.idvou = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/api/payment-voucher/${item.id}`);
        await this.getAllPaymentVoucher();
        // this.$toast.success("Item Excluído");
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
  {},
  {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
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
