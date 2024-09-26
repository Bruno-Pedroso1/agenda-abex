<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Cadastro de Empresa</h1>
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
              icone="mdi-pencil"
              corIcone="green"
              left
              texto="Editar"
              @click="update(item)"
            />
            <TooltipComponent
              icone="mdi-delete"
              corIcone="red"
              left
              texto="Excluir"
              @click="destroy(item)"
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
                  placeholder="ID da Empresa"
                  label="ID da Empresa"
                  @keyup.enter="persist"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="companyDocument"
                  v-mask="['##.###.###/####-##']"
                  outlined
                  color="green"
                  placeholder="CNPJ"
                  label="CNPJ"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-text-field
                  v-model="businessName"
                  outlined
                  color="green"
                  placeholder="Razão Social da Empresa"
                  label="Razão Social da Empresa"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-text-field
                  v-model="businessType"
                  outlined
                  color="green"
                  placeholder="Categoria"
                  label="Categoria"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-text-field
                  v-model="email"
                  outlined
                  color="green"
                  placeholder="E-mail da Empresa"
                  label="E-mail da Empresa"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-text-field
                  v-model="logo"
                  outlined
                  color="green"
                  placeholder="Logo da Empresa"
                  label="Logo da Empresa"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-text-field
                  v-model="phone"
                  v-mask="['(##) ####-####', '(##) # ####-####']"
                  outlined
                  color="green"
                  placeholder="Telefone da Empresa"
                  label="Telefone da Empresa"
                  @keyup.enter="persist"
                >
                </v-text-field>
                <v-autocomplete
                  v-model="idAddresses"
                  :items="endereco"
                  item-value="id"
                  item-text="id"
                  outlined
                  color="green"
                  placeholder="Endereço da Empresa"
                  label="Endereço da Empresa"
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
      endereco: [],
      valid: false,
      businessType: null,
      logo: null,
      search: null,
      items: [],
      dialog: false,
      id: null,
      idAddresses: null,
      companyDocument: null,
      businessName: null,
      businessType: null,
      phone: null,
      email: null,
      logo: null,
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "Nome da Empresa",
          value: "businessName",
          field: "business_name",
          align: "center",
        },
        {
          text: "Categoria da Empresa",
          value: "businessType",
          field: "business_type",
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
    await this.validateLogin();
    await this.getAllCompanies();
    await this.getEnderecos();
  },

  methods: {
    async destroy(item) {
      try {
        await this.$api.delete(`/api/companies/${item.id}`);
        // this.$toast.success("Pagamento Removido");
        await this.getAllCompanies();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    clear() {
      this.businessType = null;
      this.logo = null;
      this.businessName = null;
      this.id = null;
      this.logo = null;
      this.businessType = null;
      this.companyDocument = null;
      this.email = null;
      this.phone = null;
      this.idAddresses = null;
    },

    update(item) {
      this.businessType = item.businessType;
      this.logo = item.logo;
      this.businessName = item.businessName;
      this.id = item.id;
      this.logo = item.logo;
      this.businessType = item.businessType;
      this.companyDocument = item.companyDocument;
      this.dialog = true;
      this.email = item.email;
      this.idAddresses = item.idAddresses;
      this.phone = item.phone;
    },

    async getEnderecos() {
      try {
        const response = await this.$api.get("/api/addresses");
        this.endereco = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async persist() {
      try {
        const request = {
          businessType: this.businessType,
          logo: this.logo,
          businessName: this.businessName,
          companyDocument: this.companyDocument,
          phone: this.phone,
          email: this.email,
          idAddresses: this.idAddresses,
          businessType: this.businessType,
          logo: this.logo,
        };
        if (this.id) {
          await this.$api.patch(`/api/companies/${this.id}`, request);
          this.$toast.success("Empresa Editada");
        } else {
          await this.$api.post(`/api/companies`, request);
          this.$toast.success("Empresa Cadastrada");
        }
        this.clear();
        this.dialog = false;
        await this.getAllCompanies();
      } catch (error) {
        this.$toast.error("Preencha todos os campos!");
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
          if (response.data.message === "Permissão de administrador") {
            this.$toast.info(
              "Você não tem permissão para acessar esse recurso"
            );
            return this.$router.push("/admin/dashboard");
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
    async getAllCompanies() {
      try {
        const response = await this.$api.get("/api/companies");
        this.items = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<style></style>
