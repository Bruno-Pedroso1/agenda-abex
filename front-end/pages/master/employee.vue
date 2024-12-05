<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1>Funcionários</h1>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-card width="900" outlined elevation="8">
        <v-card-title>
          <v-row>
            <v-col md="8" cols="12">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-btn
                block
                color="green white--text"
                @click="(dialog = true), clear()"
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
              v-if="item.role !== 'customer'"
              icone="mdi-account"
              corIcone="purple"
              top
              texto="Alterar para Cliente"
              @click="changeToCustomer(item)"
            />
            <TooltipComponent
              icone="mdi-pencil"
              corIcone="green"
              right
              texto="Editar"
              @click="update(item)"
            />
            <TooltipComponent
              v-if="item.permission !== 'master' && item.role === 'admin'"
              icone="mdi-shield-crown"
              corIcone="pink"
              bottom
              texto="Dar permissão Master"
              @click="changeToMaster(item)"
            />
            <TooltipComponent
              v-if="item.permission === 'master' && item.role === 'admin'"
              icone="mdi-account-off"
              corIcone="brown"
              bottom
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
                  placeholder="Nome da Empresa"
                  label="Nome da Empresa"
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
    await this.getEmployee();
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
        await this.getEmployee();
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
        await this.getEmployee();
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
        await this.getEmployee();
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
          idCompany: idEmpresa,
        });
        await this.getEmployee();
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
        await this.getEmployee();
        this.$toast.info("Permissão Master revogada!");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getEmployee() {
      await this.getUserByToken();
      const idUser = this.user.id;
      const idEmpresa = this.user.idCompany;
      const response = await this.$api.get(
        `/api/user-admin/empresa=${idEmpresa}`
      );
      const filtroEmployee = response.filter((r) => r.id !== idUser);
      this.items = filtroEmployee;
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
        console.log(empresa);
        this.companies = empresa.businessName;
      } else {
        this.$toast.error("Faça o login");
        return this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
