<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Meus Dados</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center flex-column">
      <v-card width="900" class="mt-10">
        <v-data-table :headers="headers" :items="items" :search="search">
          <template #item.actions="{ item }">
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
              ></v-text-field>
              <v-text-field
                v-model="user.phone"
                v-mask="['(##) ####-####', '(##) #####-####']"
                outlined
                color="green"
                placeholder="(##)#####-####"
                label="Telefone"
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                outlined
                color="green"
                placeholder="E-mail"
                label="E-mail"
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                outlined
                clearable
                label="Senha"
                placeholder="Senha"
                color="blue"
              ></v-text-field>
              <v-text-field
                v-model="user.name"
                outlined
                color="green"
                placeholder="Nome do Usuário"
                label="Nome do Usuário"
              ></v-text-field>
              <v-text-field
                v-model="user.photo"
                outlined
                color="green"
                placeholder="Link da foto de perfil"
                label="link da foto de perfil"
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
  layout: "customer",
  data() {
    return {
      rolea: "customer",
      show: false,
      role: "",
      search: null,
      user: {
        id: null,
        photo: null,
        idAddresses: null,
        email: null,
        name: null,
        phone: null,
        password: null,
        photo: null,
        idAddresses: null,
        taxIdentificationNumber: null,
      },
      items: [],
      dialog: false,
      id: null,
      endereco: [],
      showTooltip: false,
      userId: null,
      headers: [
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
          text: "Foto",
          value: "photo",
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
  },

  methods: {
    clear() {
      this.user.name = null;
      this.user.id = null;
      this.user.taxIdentificationNumber = null;
      this.user.phone = null;
      this.user.email = null;
      this.user.role = null;
      this.user.photo = null;
      this.user.idAddresses = null;
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
        this.userId = data.id;
      }
    },
    update(item) {
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
          email: this.user.email,
          name: this.user.name,
          phone: this.user.phone,
          password: this.user.password,
          role: this.user.role,
          taxIdentificationNumber: this.user.taxIdentificationNumber,
          photo: this.user.photo,
          idAddresses: this.user.idAddresses,
        };
        if (this.id) {
          await this.$api.patch(`/api/users/${this.id}`, user);
          this.$toast.success("Usuario Editado");
        } else {
          await this.$api.post(`/api/users/`, user);
          this.$toast.success("Usuario Cadastrado");
        }
        this.dialog = false;
        this.clear();
        await this.getAllUsers();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getAllUsers() {
      try {
        const response = await this.$api.get(`/api/users/${this.userId}`);
        if (
          response &&
          typeof response === "object" &&
          !Array.isArray(response)
        ) {
          this.items = [response];
        } else if (Array.isArray(response)) {
          this.items = response;
        } else {
          this.items = [];
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<style></style>
