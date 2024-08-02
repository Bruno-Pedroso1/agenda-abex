<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" color="#000" app>
      <h1 style="font-size: 60px; color: #fff" class="text-center mt-5">
        IXC<span style="font-size: 30px">onnect </span>
      </h1>
      <v-row class="justify-center">
        <v-col md="10">
          <v-btn
          v-if="user && user.role == 'admin'"
          outlined
          color="#036DCF"
          width="100%"
          to="/admin/dashboard"
          >Sair da central</v-btn>
          <v-btn
          v-else-if="user && user.role == 'customer'"
          outlined
          color="#036DCF"
          width="100%"
          to="/userHome"
          >Sair da central</v-btn>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-img
          max-height="100"
          max-width="100"
          src="https://cdn.discordapp.com/attachments/1148348260533162005/1151944021430779907/image.png"
        ></v-img>
      </v-row>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'inicioLayout',

  data() {
    return {
      drawer: false,
      clipped: false,
      fixed: false,
      user: {
        id: null,
        name: null,
        email: null,
        role: null,
      },
    };
  },

  async created() {
    await this.validateLogin();
    await this.getUserByToken();
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
          return this.$router.push("/");
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
      } catch (error) {
        
      }
    },
  }
}

</script>