<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center">Administradores</h1>
      </v-col>
    </v-row>
    <v-row class="justify-center mb-5">
      <v-card width="900">
        <v-card-text>
          <v-row class="align-center">
            <v-col cols="8">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
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
        <v-data-table :headers="admin" :items="funcionarios" :search="search">
          <template #item.actions="{ item }">
            <v-icon small color="green" @click="update(item)">
              mdi-pencil
            </v-icon>
            <v-icon small color="red" @click="destroy(item)">
              mdi-delete
            </v-icon>
            <v-icon
              v-if="item.role === 'customer'"
              small
              color="blue"
              @click="changeToAdmin(item)"
            >
              mdi-account
            </v-icon>
            <v-icon
              v-if="item.role === 'admin'"
              small
              color="purple"
              @click="changeToCustomer(item)"
            >
              mdi-account
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-row>

    <v-row>
      <v-col>
        <h1 class="text-center">Meus clientes</h1>
      </v-col>
    </v-row>
    <v-row class="justify-center mt-5">
      <v-card width="900">
        <v-card-text>
          <v-row class="align-center">
            <v-col cols="8">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
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
        <v-data-table
          :headers="meusClientes"
          :items="clientes"
          :search="search"
        >
          <template #item.actions="{ item }">
            <v-icon small color="green" @click="update(item)">
              mdi-pencil
            </v-icon>
            <v-icon small color="red" @click="destroy(item)">
              mdi-delete
            </v-icon>
            <v-icon
              v-if="item.role === 'customer'"
              small
              color="blue"
              @click="changeToAdmin(item)"
            >
              mdi-account
            </v-icon>
            <v-icon
              v-if="item.role === 'admin'"
              small
              color="purple"
              @click="changeToCustomer(item)"
            >
              mdi-account
            </v-icon>
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
                placeholder="ID do Usuario"
                label="ID do Usuario"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="taxIdentificationNumber"
                v-mask="['###.###.###-##', '##.###.###/####-##']"
                outlined
                color="green"
                placeholder="###.###.###-##"
                label="CPF"
              >
              </v-text-field>
              <v-text-field
                v-model="phone"
                v-mask="['(##) ####-####', '(##) #####-####']"
                outlined
                color="green"
                placeholder="(##)#####-####"
                label="Telefone"
              >
              </v-text-field>
              <v-text-field
                v-model="email"
                outlined
                color="green"
                placeholder="E-mail"
                label="E-mail"
              >
              </v-text-field>
              <v-text-field
                v-model="name"
                outlined
                color="green"
                placeholder="Nome do Usuario"
                label="Nome do Usuario"
              >
              </v-text-field>
              <v-autocomplete
                v-model="role"
                :items="rolea"
                disabled
                outlined
                color="green"
                placeholder="Função"
                label="Função"
              >
              </v-autocomplete>
              <v-text-field
                v-model="specialization"
                outlined
                color="green"
                placeholder="Especialização"
                label="Especialização"
              >
              </v-text-field>
              <v-text-field
                v-model="passwordHash"
                outlined
                color="green"
                placeholder="Password Hash"
                label="Password Hash"
              >
              </v-text-field>
              <v-text-field
                v-model="token"
                outlined
                color="green"
                placeholder="Token"
                label="Token"
              >
              </v-text-field>
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
  name: "Index",
  layout: "admin",
  data() {
    return {
      rolea: ["admin", "customer"],
      search: null,
      clientes: [],
      funcionarios: [],
      user: {
        email: null,
        role: null,
        name: null,
        id: null,
        idCompany: null,
      },
      items: [],
      dialog: false,
      specialization: null,
      email: null,
      id: null,
      taxIdentificationNumber: null,
      name: null,
      phone: null,
      token: null,
      passwordHash: null,
      role: null,
      user: {
        id: null,
        name: null,
        email: null,
        role: null,
        idCompany: null,
      },
      admin: [
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
          text: "",
          value: "actions",
          align: "center",
          width: "100",
          filterable: false,
        },
      ],
      meusClientes: [
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
          align: "center",
        },
        {
          text: "Função",
          value: "role",
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
    await this.getUserByToken();
    await this.getAllUsers();
    await this.validateLogin();
    await this.getAllUsers();
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
          idCompany: data.idCompany,
        };
        console.log(data);
      }
    },

    clear() {
      this.specialization = null;
      this.name = null;
      this.id = null;
      this.taxIdentificationNumber = null;
      this.phone = null;
      this.email = null;
      this.role = null;
      this.passwordHash = null;
      this.token = null;
    },

    update(item) {
      this.specialization = item.specialization;
      this.name = item.name;
      this.id = item.id;
      this.taxIdentificationNumber = item.taxIdentificationNumber;
      this.phone = item.phone;
      this.email = item.email;
      this.role = item.role;
      this.passwordHash = item.passwordHash;
      this.token = item.token;
      this.dialog = true;
    },

    async persist() {
      try {
        const request = {
          specialization: this.specialization,
          name: this.name,
          taxIdentificationNumber: this.taxIdentificationNumber,
          email: this.email,
          phone: this.phone,
          role: this.role,
          passwordHash: this.passwordHash,
          token: this.token,
        };
        if (this.id) {
          await this.$api.patch(`/api/users/${this.id}`, request);
          this.$toast.success("Usuario Editado");
        } else {
          await this.$api.post(`/api/users/`, request);
          this.$toast.success("Usuario Cadastrado");
        }
        this.dialog = false;
        await this.getAllUsers();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllUsers() {
      try {
        const [usuarios, agendamentos] = await Promise.all([
          this.$api.get("/api/users"),
          this.$api.get("/api/agendamentos"),
        ]);
        const meusAg = agendamentos.filter(
          (a) => a.idfuncionario == this.user.id
        );
        const idCliente = meusAg.map((ma) => ma.idcliente);
        this.clientes = usuarios.filter((u) => {
          return idCliente.includes(u.id);
        });
        this.funcionarios = usuarios.filter(
          (u) => u.idCompany == this.user.idCompany && u.role == "admin"
        );
        console.log(this.user.idCompany);
        const response = await this.$api.get("/api/admin/user");
        console.log(response);
        this.items = response.filter(
          (user) =>
            user.permission === null &&
            (user.idCompany === null || user.idCompany === this.user.idCompany)
        );
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/api/users/${item.id}`);
        await this.getAllUsers();
        this.$toast.success("Usuario Removido");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async changeToAdmin(item) {
      try {
        await this.$api.patch(`/api/users/${item.id}`, {
          role: "admin",
          idCompany: this.user.idCompany,
        });
        await this.getAllUsers();
        this.$toast.success("Usuario alterado para admin");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async changeToCustomer(item) {
      try {
        await this.$api.patch(`/api/users/${item.id}`, {
          role: "customer",
          idCompany: null,
        });
        await this.getAllUsers();
        this.$toast.success("Usuario alterado para cliente");
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
          idCompany: data.idCompany,
        };
      } else {
        this.$toast.error("Faça o login");
        return this.$router.push("/");
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
