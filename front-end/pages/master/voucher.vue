<template>
  <v-container>
    <h1 class="text-center mb-5">Vouchers</h1>
    <v-row class="justify-center">
      <v-card width="900">
        <v-card-text>
          <v-row class="align-center">
            <v-col md="8" cols="10">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="2">
              <v-btn
                block
                class="green white--text"
                @click="(dialog = true), clear()"
              >
                Cadastrar
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
                item-text="tradingName"
                item-value="id"
                outlined
                color="green"
                placeholder="Nome da Filial"
                label="Nome da Filial"
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
  layout: "master",
  data() {
    return {
      dialog: false,
      search: null,
      creditsValue: null,
      price: null,
      id: null,
      idBranch: null,
      selectedBranch: null,
      schedule: [],
      payments: [],
      branches: [],
      items: [],
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
        {
          text: "Nome da Filial",
          value: "branchName",
          align: "center",
        },

        { text: "", value: "actions", filterable: false },
      ],
      user: {
        id: null,
        email: null,
        role: null,
        name: null,
        permission: null,
        idCompany: null,
      },
    };
  },

  async created() {
    await this.getUserByToken();
    await this.getFiliaisEmpresa();
    await this.getVoucherCompany();
  },

  methods: {
    async getUserByToken() {
      const { data } = await this.$api.get("/api/users/by-token");
      if (data) {
        this.user = {
          email: data.email,
          role: data.role,
          name: data.name,
          id: data.id,
          permission: data.permission,
          idCompany: data.idCompany,
        };
        const empresa = await this.$api.get(
          `/api/companies/${this.user.idCompany}`
        );
        this.companies = empresa.businessName;
      } else {
        this.$toast.error("Faça o login");
        return this.$router.push("/");
      }
    },

    async getFiliaisEmpresa() {
      await this.getUserByToken();
      const idEmpresa = this.user.idCompany;
      const filiaisEmpresa = await this.$api.get(
        `api/company-branch?id_company=${idEmpresa}`
      );
      this.branches = filiaisEmpresa;
      console.log(this.branches);
    },

    async getVoucherCompany() {
      await this.getUserByToken();
      const idEmpresa = this.user.idCompany;
      const voucherEmpresa = await this.$api.get(
        `/api/voucher-company/empresa=${idEmpresa}`
      );
      const voucherBranch = [];
      voucherEmpresa.forEach((idBranch) => {
        voucherBranch.push(idBranch.idBranch);
      });

      const responseBranch = voucherBranch.map(
        async (branchId) => await this.$api.get(`/api/branches/${branchId}`)
      );

      voucherEmpresa.forEach(async (idBranch) => {
        await this.$api.get(`/api/branches/${idBranch}`);
      });

      await Promise.all(voucherEmpresa);
      await Promise.all(responseBranch);
      const items = await Promise.all(
        voucherEmpresa.map(async (voucher) => {
          const branchId = voucher.idBranch;
          const branch = await this.$api.get(`/api/branches/${branchId}`);
          return {
            ...voucher,
            branchName: branch.tradingName,
          };
        })
      );
      this.items = items;
    },

    clear() {
      this.selectedBranch = null;
      this.price = null;
      this.creditsValue = null;
      this.id = null;
    },

    update(item) {
      this.selectedBranch = item.idBranch;
      this.creditsValue = item.creditsValue;
      this.price = item.price;
      this.id = item.id;
      this.dialog = true;
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/api/voucher/${item.id}`);
        await this.getVoucherCompany();
        this.$toast.success("Voucher Removido");
      } catch (error) {
        this.$toast.error(error.message);
      }
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
        this.idBranch = null;
        this.selectedBranch = null;
        this.creditsValue = null;
        this.price = null;
        this.id = null;
        this.dialog = false;
        await this.getVoucherCompany();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<style></style>
