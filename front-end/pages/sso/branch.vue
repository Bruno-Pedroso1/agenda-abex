<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Cadastro de Filiais</h1>
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
                  placeholder="ID da Filial"
                  label="ID da Filial"
                  @keyup.enter="persist"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="businessName"
                  outlined
                  color="green"
                  placeholder="Razão Social da Filial"
                  label="Razão Social da Filial"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-text-field
                  v-model="companyDocument"
                  v-mask="['##.###.###/####-##']"
                  outlined
                  color="green"
                  placeholder="CNPJ da Filial"
                  label="CNPJ da Filial"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-text-field
                  v-model="email"
                  outlined
                  color="green"
                  placeholder="E-mail da Filial"
                  label="E-mail da Filial"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-text-field
                  v-model="tradingName"
                  outlined
                  color="green"
                  placeholder="Nome fantasia da Filial"
                  label="Nome fantasia da Filial"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-text-field
                  v-model="phone"
                  v-mask="['(##) #####-####', '(##) ####-####']"
                  outlined
                  color="green"
                  placeholder="Telefone da filial"
                  label="Telefone da filial"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-autocomplete
                  v-model="selectedCompany"
                  :items="companies"
                  item-text="businessName"
                  item-value="id"
                  outlined
                  color="green"
                  placeholder="Razão social da Empresa"
                  label="Razão social da Empresa"
                  @keyup.enter="persist"
                >
                </v-autocomplete>
                <v-autocomplete
                  v-model="idAddresses"
                  :items="addresses"
                  item-text="id"
                  item-value="id"
                  outlined
                  color="green"
                  placeholder="ID do Endereço"
                  label="ID do Endereço"
                  @keyup.enter="persist"
                ></v-autocomplete>
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
      addresses: [],
      companies: [],
      items: [],
      dialog: false,
      id: null,
      companyDocument: null,
      email: null,
      tradingName: null,
      businessName: null,
      selectedCompany: null,
      addresses: [],
      idAddresses: null,
      phone: null,
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "CNPJ",
          value: "companyDocument",
          field: "company_document",
          align: "center",
        },
        {
          text: "E-mail",
          value: "email",
          align: "center",
        },
        {
          text: "Telefone",
          value: "phone",
          align: "center",
        },
        {
          text: "Nome Fantasia",
          value: "tradingName",
          field: "trading_name",
          align: "center",
        },
        {
          text: "Razão Social",
          value: "businessName",
          field: "business_name",
          align: "center",
        },
        {
          text: "ID da Empresa",
          value: "idCompany",
          field: "id_company",
          align: "center",
        },
        {
          text: "ID do Endereço",
          value: "idAddresses",
          field: "id_addresses",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await this.getAllBranch();
    await this.getAllCompanies();
    await this.loadAddresses();
    await this.validateLogin();
  },

  methods: {
    clear() {
      this.companyDocument = null;
      this.email = null;
      this.tradingName = null;
      this.businessName = null;
      this.selectedCompany = null;
      this.idAddresses = null;
      this.phone = null;
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
      this.phone = item.phone;
      this.businessName = item.businessName;
      this.companyDocument = item.companyDocument;
      this.email = item.email;
      this.tradingName = item.tradingName;
      this.selectedCompany = item.idCompany;
      this.idAddresses = item.idAddresses;
      this.id = item.id;
      this.dialog = true;
    },
    async loadAddresses() {
      try {
        const response = await this.$api.get("/api/addresses");
        this.addresses = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async persist() {
      try {
        const request = {
          companyDocument: this.companyDocument,
          email: this.email,
          tradingName: this.tradingName,
          businessName: this.businessName,
          phone: this.phone,
          idCompany: this.selectedCompany,
          idAddresses: this.idAddresses,
        };
        if (this.id) {
          await this.$api.patch(`/api/branches/${this.id}`, request);
          this.$toast.success("Filial Editado");
        } else {
          await this.$api.post(`/api/branches`, request);
          this.$toast.success("Filial Cadastrado");
        }
        this.companyDocument = null;
        this.email = null;
        this.tradingName = null;
        this.businessName = null;
        this.selectedCompany = null;
        this.phone = null;
        this.idAddresses = null;
        this.id = null;
        this.dialog = false;
        await this.getAllBranch();
        await this.getAllCompanies();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getAllBranch() {
      try {
        const response = await this.$api.get("/api/branches");
        this.items = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllCompanies() {
      try {
        const comp = await this.$api.get("/api/companies");
        this.companies = comp;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/api/branches/${item.id}`);
        await this.getAllBranch();
        this.$toast.success("FIlial Removida");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<style></style>
