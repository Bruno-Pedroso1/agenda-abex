<template>
  <v-container>
    <h1 class="text-center mb-5">Suas filiais</h1>

    <v-row v-if="allBranchs.length > 0" class="justify-center">
      <v-col v-for="item in allBranchs" :key="item.id" cols="12" md="6">
        <v-card elevation="8" outlined>
          <v-card-text class="black--text">
            <v-row class="align-center">
              <v-col class="text-center" md="3" cols="12">
                <v-avatar size="110">
                  <v-img :src="item.logo"></v-img>
                </v-avatar>
              </v-col>
              <v-col md="9" cols="12">
                <h2>Empresa: {{ item.nomeEmpresa }}</h2>
                <h2 class="mb-3 mt-3">Filial: {{ item.nomeFilial }}</h2>
                <h2>
                  Seus créditos: R$
                  <b class="green--text">{{ item.creditosUser }}</b>
                </h2>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-space-around">
            <v-btn class="primary" @click="verServicos(item)"> Serviços </v-btn>
            <v-btn class="error" @click="deleteUserFilial(item)">
              Desvincular-se
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else class="text-center">
      <v-col>
        <h3 class="red--text">Você não é vínculado à nenhuma filial</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <h2 class="mb-5 mt-5">Deseja se víncular em mais filiais?</h2>
        <v-btn class="green accent-2" to="./categories">
          <v-icon class="mr-2"> mdi-list-box-outline </v-icon>
          Ir para categorias
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      width="950"
      close-delay
      overlay-color="#594947"
      overlay-opacity="0.8"
    >
      <v-card>
        <v-card-title class="justify-center">
          <h2>MEUS VOUCHERS</h2>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="vouchers"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          no-data-text="Você não possui nenhum voucher!"
          @page-count="pageCount = $event"
        >
        </v-data-table>
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="7"
          prev-icon="mdi-arrow-left"
          next-icon="mdi-arrow-right"
          class="mt-5"
          color="#036DCF"
          circle
        ></v-pagination>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "userHome",
  layout: "customer",

  data() {
    return {
      vouchers: null,
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      dialog: false,
      allBranchs: {},
      users: {
        id: null,
        name: null,
        email: null,
        role: null,
      },
      headers: [
        {
          text: "Preço",
          value: "preco",
          align: "center",
        },
        {
          text: "Créditos atribuidos",
          value: "valorAtribuido",
          align: "center",
        },
        {
          text: "Nome da filial",
          value: "nomeFilial",
          align: "center",
        },
        {
          text: "Data da compra",
          value: "dataCompra",
          align: "center",
        },
      ],
    };
  },

  async created() {
    await this.getUSerByToken();
    await this.getFiliaisByUser();
  },

  methods: {
    async deleteUserFilial(item) {
      try {
        if (item.creditosUser > 0) {
          this.$toast.error(
            "Você não pode se desvincular sem gastar seus créditos!"
          );
          return;
        } else {
          await this.$api.delete(`/api/user-branches/${item.id}`);
          await this.getFiliaisByUser();
          this.$toast.success("Você se desvinculou da filial");
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    verServicos(allBranchs) {
      try {
        this.$router.push({
          name: "services",
          params: {
            idFilial: allBranchs.idFilial,
            idCompany: allBranchs.idCompany,
            businessType: allBranchs.typeComp,
          },
        });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getUSerByToken() {
      try {
        const { data } = await this.$api.get("/api/users/by-token");
        console.log(data);
        if (data) {
          this.users = {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
          };
          console.log(this.users);
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getFiliaisByUser() {
      try {
        const response = await this.$api.get("/api/branches-by-user");
        this.allBranchs = response.filter(
          (item) => item.id_user == this.users.id
        );
        console.log("ADSOGHLASKDHGLKASDHGKLASHDG", this.allBranchs);
      } catch (error) {
        this.$toast.error(error.message);
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
          }
        } else {
          this.$toast.error(
            "Ocorreu um erro inesperado durante a validação do token"
          );
        }
      } catch (error) {}
    },
  },
};
</script>
