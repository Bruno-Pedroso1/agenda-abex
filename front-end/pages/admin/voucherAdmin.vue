<template>
  <v-container>
    <h1 class="text-center">Vouchers</h1>
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
                placeholder="ID do Voucher"
                label="ID do Voucher"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="selectedBranch"
                :items="branches"
                item-text="id"
                item-value="id"
                outlined
                color="green"
                placeholder="ID da Filial"
                label="ID da Filial"
              ></v-autocomplete>
              <v-autocomplete
                v-model="selectedPayment"
                :items="payments"
                item-text="id"
                item-value="id"
                outlined
                color="green"
                placeholder="ID do Pagamento"
                label="ID do Pagamento"
              ></v-autocomplete>
              <v-text-field
                v-model="creditsValue"
                outlined
                color="green"
                placeholder="Valor em Créditos"
                label="Valor em Créditos"
              ></v-text-field>
              <v-text-field
                v-model="price"
                outlined
                color="green"
                placeholder="Valor do Voucher"
                label="Valor do Voucher"
              ></v-text-field>
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
  name: "voucherAdmin",
  layout: "admin",
  data() {
    return {
      search: null,
      items: [],
      dialog: false,
      schedule: [],
      payments: [],
      id: null,
      selectedBranch: null,
      selectedPayment: null,
      branches: [],
      creditsValue: null,
      price: null,
      user: {
        email: null,
        role: null,
        name: null,
        id: null,
      },
      minhasAgendas: [],
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "ID da Filial",
          value: "idBranch",
          field: "id_branch",
          align: "center",
        },
        {
          text: "ID do Pagamento",
          value: "idPayment",
          field: "id_payment",
          align: "center",
        },
        {
          text: "Valor em Créditos",
          value: "creditsValue",
          field: "credits_value",
          align: "center",
        },
        {
          text: "Valor do Voucher",
          value: "price",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await this.getUserByToken();
    await this.getAllPayments();
    await this.getallBranches();
    await this.getAllVouchers();
    await this.verMinhasAgendas();
  },

  methods: {
    async verMinhasAgendas() {
      await this.getUserByToken();
      try {
        const idUser = this.user.id;
        const userRole = this.user.role;
        let response;
        if (userRole === "superadmin") {
          response = await this.$api.get(`/api/schedule`);
        } else {
          response = await this.$api.get(`/api/schedule`);
          response = response.filter((agenda) => agenda.idUser === idUser);
        }
        const idsDasAgendas = response.map((agenda) => agenda.id);
        this.minhasAgendas = idsDasAgendas;
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
        };
      }
    },
    clear() {
      this.selectedPayment = null;
      this.selectedBranch = null;
      this.price = null;
      this.creditsValue = null;
      this.id = null;
    },
    update(item) {
      this.selectedPayment = item.idPayment;
      this.selectedBranch = item.idBranch;
      this.creditsValue = item.creditsValue;
      this.price = item.price;
      this.id = item.id;
      this.dialog = true;
    },
    async persist() {
      try {
        const request = {
          idPayment: this.selectedPayment,
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
        this.selectedPayment = null;
        this.selectedBranch = null;
        this.creditsValue = null;
        this.price = null;
        this.id = null;
        this.dialog = false;
        await this.getAllVouchers();
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
    async getallBranches() {
      try {
        const response = await this.$api.get("/api/branches");
        this.branches = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getAllPayments() {
      try {
        const response = await this.$api.get("/api/payments");
        this.payments = response;
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
  },
};
</script>

<style></style>
