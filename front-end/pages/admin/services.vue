<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center">Cadastro de Serviços</h1>
      </v-col>
    </v-row>

    <v-row class="justify-center">
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
                placeholder="ID do Serviço"
                label="ID do Serviço"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="name"
                outlined
                color="green"
                placeholder="Nome do Serviço"
                label="Nome do Serviço"
              >
              </v-text-field>
              <v-text-field
                v-model="image"
                outlined
                color="green"
                placeholder="Link da imagem do Serviço"
                label="Link da imagem do Serviço"
              ></v-text-field>
              <v-text-field
                v-model="description"
                outlined
                color="green"
                placeholder="Descrição do serviço"
                label="Descrição do serviço"
              ></v-text-field>
              <v-autocomplete
                v-model="selectedBranch"
                :items="branches"
                item-text="tradingName"
                item-value="id"
                outlined
                color="green"
                placeholder="Nome Fantasia da Filial"
                label="Nome Fantasia da Filial"
              >
              </v-autocomplete>
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
      user: {
        email: null,
        role: null,
        name: null,
        id: null,
        idCompany: null,
      },

      search: null,
      items: [],
      dialog: false,
      id: null,
      name: null,
      image: null,
      description: null,
      selectedBranch: null,
      branches: [],
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
          text: "Imagem",
          value: "image",
          align: "center",
        },
        {
          text: "Descrição",
          value: "description",
          align: "center",
        },
        {
          text: "ID da Filial",
          value: "idBranch",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await this.getUserByToken();
    await this.getAllServices();
    await this.getAllBranches();
    await this.validateLogin();
  },

  methods: {
    clear() {
      this.description = null;
      this.image = null;
      this.name = null;
      this.id = null;
      this.selectedBranch = null;
    },

    update(item) {
      this.description = item.description;
      this.image = item.image;
      this.name = item.name;
      this.id = item.id;
      this.selectedBranch = item.idBranch;
      this.dialog = true;
    },

    async persist() {
      try {
        const request = {
          name: this.name,
          image: this.image,
          description: this.description,
          idBranch: this.selectedBranch,
        };
        if (this.id) {
          await this.$api.patch(`/api/services/${this.id}`, request);
          this.$toast.success("Serviço Editado");
        } else {
          await this.$api.post(`/api/services`, request);
          this.$toast.success("Serviço Cadastrado");
        }
        this.name = null;
        this.image = null;
        this.description = null;
        this.selectedBranch = null;
        this.id = null;
        this.dialog = false;
        await this.getAllServices();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllServices() {
      try {
        await this.getUserByToken();
        const empresa = this.user.idCompany;
        const filiais = await this.$api.get(
          `/api/company-branch?id_company=${empresa}`
        );
        const response = await this.$api.get("/api/services");
        const servicosFiltrados = response.filter((servico) => {
          return filiais.some((filial) => filial.id === servico.idBranch);
        });
        this.items = servicosFiltrados;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllBranches() {
      try {
        await this.getUserByToken();
        const idEmpresa = this.user.idCompany;
        const response = await this.$api.get(
          `/api/company-branch?id_company=${idEmpresa}`
        );

        this.branches = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/api/services/${item.id}`);
        await this.getAllServices();
        this.$toast.success("Serviço Removido");
      } catch (error) {
        this.$toast.error(error.message);
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

    // async filialEmpresa() {
    //   await this.getUserByToken();
    //   const response
    // },
  },
};
</script>

<style></style>
