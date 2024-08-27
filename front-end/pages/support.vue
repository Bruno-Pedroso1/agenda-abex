<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h1>CENTRAL DE SUPORTE</h1>
        <h4>entre em contato conosco pelas opções abaixo para resolvermos suas duvidas sobre o sistema!</h4>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col 
      md="4"
      cols="12"
      >
        <v-card
        outlined
        rounded="xl"
        elevation="8"
        height="192">
          <v-card-title class="justify-center">
            <h2>E-mails</h2>
          </v-card-title>
          <v-card-text class="black--text">
            <v-row>
              <v-col>
                <a href="mailto:exemplo@gmail.com">
                  <h3 class="mt-5">
                    <v-icon small class="blue--text">
                      mdi-email
                    </v-icon> 
                    TimelyAPP@timely.com
                  </h3>
                </a>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col 
      md="4"
      cols="12"
      >
        <v-card
        outlined
        rounded="xl"
        elevation="8"
        height="192">
          <v-card-title class="justify-center">
            <h2>Telefones</h2>
          </v-card-title>
          <v-card-text class="black--text">
            <v-row>
              <v-col>
                <h3 class="mt-5">
                  <v-icon small class="mb-1 black--text">
                    mdi-phone
                  </v-icon> 
                  (53) 01234-5678
                </h3>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col 
      md="4"
      cols="12"
      >
        <v-card
        outlined
        rounded="xl"
        elevation="8"
        >
          <v-card-title class="justify-center">
            <h2>Redes Sociais</h2>
          </v-card-title>
          <v-card-text class="black--text">
            <v-row>
              <v-col md="12" cols="12">
                <v-tooltip left color="success">
                  <template v-slot:activator="{ on, attrs}">
                    <v-btn
                    fab
                    v-bind="attrs"
                    v-on="on">
                      <v-icon color="#008000">mdi-whatsapp</v-icon>
                    </v-btn>
                  </template>
                  <span>Whatsapp</span>
                </v-tooltip>
                <v-tooltip top color="primary">
                  <template v-slot:activator="{ on, attrs}">
                    <v-btn
                    fab
                    class="ml-1 mr-1"
                    v-bind="attrs"
                    v-on="on"
                    href="https://www.facebook.com">
                      <v-icon color="#0000FF">mdi-facebook</v-icon>
                    </v-btn>
                  </template>
                  <span>Facebook</span>
                </v-tooltip>
                <v-tooltip right color="error">
                  <template v-slot:activator="{ on, attrs}">
                    <v-btn
                    fab
                    v-bind="attrs"
                    v-on="on"
                    href="https://www.instagram.com">
                      <v-icon>mdi-instagram</v-icon>
                    </v-btn>
                  </template>
                  <span>Instagram</span>
                </v-tooltip>
              </v-col>
              <v-col>
                <v-tooltip left color="erro">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    class="mt-n6 mr-1"
                    fab
                    v-bind="attrs"
                    v-on="on"
                    href="https://br.linkedin.com">
                      <v-icon color="#0E76A8">mdi-linkedin</v-icon>
                    </v-btn>
                  </template>
                  <span>Linkedin</span>
                </v-tooltip>
                <v-tooltip right color="black white--text">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    class="mt-n6 ml-1"
                    fab
                    v-bind="attrs"
                    v-on="on">
                      <v-icon color="#000000">mdi-github</v-icon>
                    </v-btn>
                  </template>
                  <span>Github</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="d-flex justify-center">
        <v-img
        max-height="200"
        max-width="200"
        src="https://cdn.discordapp.com/attachments/1148348260533162005/1148353943215284325/image.png?ex=65168ab3&is=65153933&hm=3e142c176b115a497ecefd2c8c93474f5cb6f4d459ea6ad01f31e63009f4d43c&"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "suporteCliente",
  layout: 'inicio',

  data() {
    return {
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
  },
};
</script>

<style>
  .mdi-instagram {
    background-image: linear-gradient(210deg,
    rgb(5 10 230),
    rgb(88 81 216),
    rgb(131 58 180),
    rgb(193 53 132),
    rgb(225 48 108),
    rgb(253 36 76),
    rgb(247 119 55),
    rgb(255 140 0),
    rgb(252 175 69),
    rgb(255 220 128));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>