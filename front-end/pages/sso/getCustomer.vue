<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
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
            <TooltipComponent
              v-if="item.role !== 'admin'"
              icone="mdi-account"
              corIcone="blue"
              left
              texto="Alterar para Admin"
              @click="changeToAdmin(item)"
            />
            <TooltipComponent
              v-if="item.role !== 'superadmin'"
              icone="mdi-account"
              corIcone="black"
              left
              texto="Alterar para Super Admin"
              @click="changeToSuper(item)"
            />
            <TooltipComponent
              v-if="item.role !== 'customer'"
              icone="mdi-account"
              corIcone="purple"
              left
              texto="Alterar para Cliente"
              @click="changeToCustomer(item)"
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
                  placeholder="ID do Usuario"
                  label="ID do Usuario"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="user.taxIdentificationNumber"
                  v-mask="['###.###.###-##', '##.###.###/####-##']"
                  outlined
                  color="green"
                  placeholder="###.###.###-##"
                  label="CPF/CNPJ"
                  @keyup.enter="persist"
                ></v-text-field>
                <v-text-field
                  v-model="user.phone"
                  v-mask="['(##) ####-####', '(##) #####-####']"
                  outlined
                  color="green"
                  placeholder="(##)#####-####"
                  label="Telefone"
                  @keyup.enter="persist"
                ></v-text-field>
                <v-text-field
                  v-model="user.email"
                  outlined
                  color="green"
                  placeholder="E-mail"
                  label="E-mail"
                  @keyup.enter="persist"
                ></v-text-field>
                <v-text-field
                  v-model="user.password"
                  outlined
                  clearable
                  label="Senha"
                  placeholder="Senha"
                  color="blue"
                  @keyup.enter="persist"
                ></v-text-field>
                <v-text-field
                  v-model="user.name"
                  outlined
                  color="green"
                  placeholder="Nome do Usuário"
                  label="Nome do Usuário"
                  hint="Informe nome e sobrenome"
                  @keyup.enter="persist"
                ></v-text-field>
                <v-text-field
                  v-model="user.photo"
                  outlined
                  color="green"
                  placeholder="Link da foto de perfil"
                  label="link da foto de perfil"
                  @keyup.enter="persist"
                ></v-text-field>
                <v-autocomplete
                  v-model="user.idAddresses"
                  item-text="id"
                  item-value="id"
                  :items="endereco"
                  outlined
                  color="green"
                  placeholder="Endereço"
                  label="Endereço"
                  @keyup.enter="persist"
                ></v-autocomplete>
                <v-autocomplete
                  v-model="user.role"
                  :items="rolea"
                  outlined
                  color="green"
                  placeholder="Função"
                  label="Função"
                  @keyup.enter="persist"
                ></v-autocomplete>
                <v-text-field
                  v-model="user.specialization"
                  outlined
                  color="green"
                  placeholder="Especialização"
                  label="Especialização"
                  @keyup.enter="persist"
                ></v-text-field>
                <v-autocomplete
                  v-model="user.idCompany"
                  item-text="businessName"
                  item-value="id"
                  :items="companies"
                  outlined
                  color="green"
                  placeholder="ID da Empresa"
                  label="ID da Empresa"
                  @keyup.enter="persist"
                ></v-autocomplete>
                <v-text-field
                  v-model="user.permission"
                  outlined
                  color="green"
                  placeholder="Permissão do Usuário"
                  label="Permissão do Usuário"
                  @keyup.enter="persist"
                ></v-text-field>
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
      rolea: ["admin", "customer", "superadmin"],
      specialization: null,
      companies: [],
      show: false,
      role: "",
      search: null,
      user: {
        photo: null,
        idAddresses: null,
        email: null,
        name: null,
        phone: null,
        password: null,
        photo: null,
        idAddresses: null,
        taxIdentificationNumber: null,
        idCompany: null,
        permission: null,
      },
      items: [],
      dialog: false,
      id: null,
      endereco: [],
      showTooltip: false,
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
    };
  },
  async created() {
    await this.getCompanies(),
      await Promise.all([
        this.validateLogin(),
        this.getCustomer(),
        this.getEnderecos(),
      ]);
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

    async getCustomer() {
      try {
        const response = await this.$api.get("/api/users-customer");
        this.items = response;
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
    async getCompanies() {
      try {
        const response = await this.$api.get("/api/companies");
        this.companies = response;
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

    async changeToAdmin(item) {
      try {
        await this.$api.patch(`/api/users/${item.id}`, { role: "admin" });
        await this.getCustomer();
        this.$toast.success("Usuario alterado para admin");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async changeToMaster(item) {
      try {
        await this.$api.patch(`/api/users/${item.id}`, {
          permission: "master",
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
          idCompany: null,
        });
        await this.getCustomer();
        this.$toast.info("Permissão Master revogada!");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async changeToSuper(item) {
      try {
        await this.$api.patch(`/api/users/${item.id}`, { role: "superadmin" });
        await this.getCustomer();
        this.$toast.success("Usuario alterado para Superadmin");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async changeToCustomer(item) {
      try {
        await this.$api.patch(`/api/users/${item.id}`, { role: "customer" });
        await this.getCustomer();
        this.$toast.success("Usuario alterado para cliente");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async validateLogin() {
      try {
        let token = localStorage.getItem("toksen", "AUTH0TOKEN");
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
  },
};
</script>

<style></style>
