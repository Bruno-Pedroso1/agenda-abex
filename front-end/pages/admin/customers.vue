<template>
  <v-container>
    <h1 class="mb-5 text-center">Clientes</h1>
    <v-row class="justify-center">
      <v-col
      cols="12"
      md="4"
      >
        <v-text-field
          id="search"
          prepend-inner-icon="mdi-magnify"
          outlined
          dense
          label="Buscar clientes..."
          @input="pesquisarUsers"
        ></v-text-field>
        <v-card
          id="campoUsers"
          v-scroll.self="onScroll"
          class="overflow-y-auto over mt-2"
        >
          <v-card-text class="text-center">
            <v-btn
              class="justify-start btnUsers"
              width="300"
              height="62"
              v-for="item in users"
              :key="item.id"
              :id="`user-${item.id}`"
              @click="seleciona(item)"
            >
              <v-avatar
                v-if="item.photo"
                class="white--text mb-3 mt-3"
                size="40"
              >
                <v-img :src="item.photo"></v-img>
              </v-avatar>
              <v-avatar v-else-if="!item.photo" :color="item.corIcone">
                <v-icon>mdi-account</v-icon>
              </v-avatar>
              <h2 style="font-size: 12px" class="ms-3">{{ item.name }}</h2>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
      cols="12"
      md="4"
      >
        <v-card
        outlined
        elevation="8"
        >
          <v-card-title class="justify-start">
            <v-avatar v-if="dadosUser.photo" class="me-5">
              <v-img :src="dadosUser.photo"></v-img>
            </v-avatar>
            <v-avatar
              v-else-if="!dadosUser.photo"
              :color="dadosUser.corIcone"
              class="me-5"
            >
              <v-icon>mdi-account</v-icon>
            </v-avatar>
            <h2 v-if="dadosUser.name">
              {{ dadosUser.name.split(" ")[0].toUpperCase() }}
            </h2>
          </v-card-title>
          <v-card-text>
            <v-col class="black--text">
              <v-text-field
                v-model="dadosUser.name"
                label="Nome completo"
                outlined
                disabled
              ></v-text-field>
              <v-text-field
                v-model="dadosUser.email"
                label="E-mail"
                outlined
                disabled
              ></v-text-field>
              <v-text-field
                v-model="dadosUser.phone"
                label="Telefone"
                outlined
                disabled
              ></v-text-field>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Customers",
  layout: "admin",
  data() {
    return {
      users: [],
      colors: [
        "#0000ff",
        "#7fffd4",
        "#ff0000",
        "#ffa500",
        "#008000",
        "#00ffff",
        "#ffc0cb",
        "#800080",
        "#808080",
        "#a52a2a",
      ],
      indexCor: 0,
      dadosUser: {},
      scroll: 0,
    };
  },

  async created() {
    await this.validateLogin();
    await this.getUsers();
    this.seleciona(this.users[0]);
  },

  methods: {
    onScroll() {
      this.scroll++;
    },

    pesquisarUsers() {
      let input = document.getElementById("search");
      let card = document.getElementById("campoUsers");
      let btn = card.querySelectorAll("button");

      let inputed = input.value.toLowerCase();
      btn.forEach((items) => {
        let text = items.textContent.toLowerCase();
        if (text.includes(inputed)) {
          items.style.display = "block";
          items.style.margin = '0 auto'
        } else {
          items.style.display = "none";
        }
      });
    },

    setaCorIcone() {
      if (this.indexCor > 10) {
        this.indexCor = 0;
      }
      return this.colors[this.indexCor];
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

    async getUsers() {
      try {
        const response = await this.$api.get("/api/admin/user");
        this.users = response;
        this.users = response.filter((user) => user.role === "customer");
        this.users.forEach((user) => {
          user.corIcone = this.setaCorIcone();
          this.indexCor++;
        });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    randomColor() {
      const random = Math.floor(Math.random() * this.colors.length);
      return random;
    },

    seleciona(item) {
      if (item) {
        let usuario;
        if (this.dadosUser.id) {
          usuario = document.querySelector("#user-" + this.dadosUser.id);
          usuario.classList.remove("user-active");
        }
        this.dadosUser = item;
        usuario = document.querySelector("#user-" + item.id);
        usuario.classList.add("user-active");
      }
    },
  },
};
</script>

<style>
.user-active {
  border-left: 3px blue solid;
}

.btnUsers:hover {
  transition: 0.4s;
  transform: scale(1.1);
}

#campoUsers {
  max-height: 500px;
  margin-top: -25px;
  border: 1px solid #d7d7d7;
}
</style>
