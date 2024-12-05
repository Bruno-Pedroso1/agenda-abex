<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Clientes</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center flex-column">
      <v-card width="900" outlined elevation="8">
        <v-card-title>
          <v-row class="align-center">
            <v-col>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>

        <v-data-table :headers="headers" :items="items" :search="search">
          <template #item.actions="{ item }">
            <TooltipComponent
              v-if="item.role !== 'customer'"
              icone="mdi-account"
              corIcone="purple"
              left
              texto="Alterar para Cliente"
              @click="changeToCustomer(item)"
            />
            <TooltipComponent
              v-if="item.role === 'customer'"
              icone="mdi-account"
              corIcone="black"
              left
              texto="Alterar para Admin"
              @click="changeToAdmin(item)"
            />
            <TooltipComponent
              v-if="item.permission !== 'master' && item.role === 'admin'"
              icone="mdi-shield-crown"
              corIcone="pink"
              left
              texto="Dar permissão Master"
              @click="changeToMaster(item)"
            />
            <TooltipComponent
              v-if="item.permission === 'master' && item.role === 'admin'"
              icone="mdi-account-off"
              corIcone="brown"
              left
              texto="Revogar permissão Master"
              @click="revokeMaster(item)"
            />
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      dialog: false,
      valid: false,
      specialization: null,
      role: null,
      search: null,
      companies: null,
      id: null,
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
          text: "Telefone",
          value: "phone",
          align: "center",
        },
        {
          text: "E-mail",
          value: "email",
          align: "center",
        },
        {
          text: "CPF",
          value: "taxIdentificationNumber",
          field: "tax_identification_number",
          align: "center",
        },
        {
          text: "Função",
          value: "role",
          align: "center",
        },
        {
          text: "Especialização",
          value: "specialization",
          align: "center",
        },
        {
          text: "Foto",
          value: "photo",
          align: "center",
        },
        {
          text: "ID do Endereço",
          value: "idAddresses",
          field: "id_addresses",
          align: "center",
        },
        {
          text: "ID da Empresa",
          value: "idCompany",
          field: "id_company",
          align: "center",
        },
        {
          text: "Permissão",
          value: "permission",
          align: "center",
        },
        {
          text: "",
          value: "actions",
          align: "center",
          width: "100",
          filterable: false,
        },
      ],
      rolea: ["admin", "customer"],
      endereco: [],
      items: [],
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
    await this.getEnderecos();
    await this.getCustomer();
  },

  methods: {
    clear() {
      this.user.specialization = null;
      this.user.name = null;
      this.user.id = null;
      this.user.taxIdentificationNumber = null;
      this.user.phone = null;
      this.user.email = null;
      this.user.role = null;
      this.user.photo = null;
      this.user.idAddresses = null;
      this.user.idCompany = null;
      this.user.permission = null;
    },

    update(item) {
      this.user.specialization = item.specialization;
      this.user.idCompany = item.idCompany;
      this.user.permission = item.permission;
      this.user.name = item.name;
      this.id = item.id;
      this.user.taxIdentificationNumber = item.taxIdentificationNumber;
      this.user.phone = item.phone;
      this.user.email = item.email;
      this.user.role = item.role;
      this.user.photo = item.photo;
      this.user.idAddresses = item.idAddresses;
      this.dialog = true;
    },

    async persist() {
      try {
        const user = {
          specialization: this.user.specialization,
          email: this.user.email,
          name: this.user.name,
          phone: this.user.phone,
          password: this.user.password,
          role: this.user.role,
          taxIdentificationNumber: this.user.taxIdentificationNumber,
          photo: this.user.photo,
          idAddresses: this.user.idAddresses,
          idCompany: this.user.idCompany,
          permission: this.user.permission,
        };
        if (this.id) {
          await this.$api.patch(`/api/users/${this.id}`, user);
          this.$toast.success("Usuario Editado");
        } else {
          await this.$api.post(`/api/users/`, user);
          this.$toast.success("Usuario Cadastrado");
        }
        this.clear();
        this.dialog = false;
        await this.getCustomer();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getEnderecos() {
      try {
        const response = await this.$api.get("/api/addresses");
        this.endereco = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/api/users/${item.id}`);
        await this.getCustomer();
        this.$toast.success("Usuario Removido");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async changeToCustomer(item) {
      try {
        await this.$api.patch(`/api/users/${item.id}`, {
          role: "customer",
          permission: null,
          idCompany: null,
        });
        await this.getCustomer();
        this.$toast.success("Usuario alterado para cliente");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async changeToAdmin(item) {
      try {
        await this.getUserByToken();
        const idEmpresa = this.user.idCompany;
        await this.$api.patch(`/api/users/${item.id}`, {
          role: "admin",
          permission: null,
          idCompany: idEmpresa,
        });
        await this.getCustomer();
        this.$toast.success("Usuario alterado para cliente");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async changeToMaster(item) {
      try {
        await this.getUserByToken();
        const idEmpresa = this.user.idCompany;
        await this.$api.patch(`/api/users/${item.id}`, {
          permission: "master",
          role: "admin",
          idCompany: idEmpresa,
        });
        await this.getCustomer();
        this.$toast.success("Administrador recebeu permissão Master");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async revokeMaster(item) {
      try {
        await this.$api.patch(`/api/users/${item.id}`, {
          permission: null,
        });
        await this.getCustomer();
        this.$toast.info("Permissão Master revogada!");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getCustomer() {
      await this.getUserByToken();
      const idEmpresa = this.user.idCompany;
      const response = await this.$api.get("/api/all-payments");
      const filtroResponse = response.filter(
        (f) => f.id_company == idEmpresa || f.voucher_company_id == idEmpresa
      );

      const setIdCliente = new Set();
      filtroResponse.forEach((payment) => {
        setIdCliente.add(payment.id_client);
      });
      const idUnico = Array.from(setIdCliente);
      const responseUser = idUnico.map(
        async (userId) => await this.$api.get(`/api/users/${userId}`)
      );
      console.log(idUnico);
      const users = await Promise.all(responseUser);
      console.log(users);
      const filterUser = users.filter((r) => r.role == "customer");
      this.items = filterUser;
    },

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
  },
};
</script>