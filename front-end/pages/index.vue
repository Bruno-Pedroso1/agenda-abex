<template>
  <v-container>
    <v-form @submit.prevent="login">
      <v-row class="justify-center">

        <h1 style="font-size: 60px" class="justify-center mt-15">
          TimelyAPP
        </h1>
      </v-row>

      <v-row class="justify-center">
        <v-col cols="12" md="6"> 
          <h2 class="mb-3">Login</h2>
          <v-text-field
            v-model="email"
            outlined
            :rules="[rules.required]"
            color="blue"
            prepend-inner-icon="mdi-email"
            label="E-mail"
            @keyup.enter="login"
          ></v-text-field>
          <v-text-field
            v-model="senha"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            outlined
            color="blue"
            prepend-inner-icon="mdi-lock"
            label="Senha"
            @click:append="show2 = !show2"
            @keyup.enter="login"
          ></v-text-field>
          <v-row>
            <v-col class="text-center col-6" style="position: relative; left: 40px;">
              <!-- <span class="" style="position: relative; top: 50%; white-space: nowrap;">Ainda não possui conta? </span> -->
              <a href="/register">Cadastre-se</a>
          </v-col>
            <v-col class="text-center col-6" style="position: relative; right: 20px;">
              <a href="##" style="white-space: nowrap;">Esqueci minha senha</a>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>

    <v-row class="justify-center mt-5 mb-5">
      <v-btn
        x-large
        rounded
        elevation="8"
        class="blue white--text"
        @click="login"
        >Acessar</v-btn
      >
    </v-row>
    <a class="d-flex justify-center mb-5" style="text-decoration: none;" href="/criarp">
        Clique para saber como cadastrar sua empresa
    </a>
    <v-row class="justify-center mb-5 text-center">
      <span
        >Ao continuar, você está concordando com nossos
        <a href="##">Termos de Uso</a>
        e
        <a href="##">Política de Privacidade</a>
      </span>
    </v-row>

    <v-row class="mb-5 justify-center">
      <v-col cols="2"><v-divider class="black"></v-divider></v-col>
      Acessar com
      <v-col cols="2"><v-divider class="black"></v-divider></v-col>
    </v-row>
    <v-row class="justify-center mb-5">
      <v-icon  @click="GoogleLogin" size="50px">
         mdi-google

      </v-icon>

    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  layout: "login",
  data() {
    return {
      email: null,
      senha: "",
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: "Password",
      rules: {
        required: (value) => !!value || "Obrigatório.",
        min: (v) => v.length >= 8 || "Min 8 caracteres",
      },
      user: {
        role: null,
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
    };
  },
  created() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("code")) {
    this.handleAuthorizationCode();
  }
},


  methods: {
    async getServiceByCity() {
      console.log('click');
      
      try {
        const response = await this.$api.get("/api/services-city");
        this.test = response;
        console.log('TESTE 1', response)
      } catch (error) {
        this.$toast.error('err');
      }
    },

    async getUserByToken() {
      const { data } = await this.$api.get("/api/users/by-token");
      console.log(data);
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
    async handleAuthorizationCode() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log("Código de autorização recebido:", code);
    const response = await this.$api.post("/google/codeForToken", { code });

    if (response.data && response.data.access_token) {
      localStorage.setItem("toksen", response.data.access_token);
      const userData = await this.$api.get("/api/users/by-token");
      this.user = {
        email: userData.data.email,
        role: userData.data.role,
        name: userData.data.name,
        id: userData.data.id,
        idCompany: userData.data.idCompany,
      };

      if (this.user.role === "customer") {
        this.$router.push("/userHome");
      } else if (this.user.role === "superadmin") {
        this.$router.push("/superadmin/company");
      } else if (this.user.role === "admin") {
        this.$router.push("/admin/dashboard");
      } else {
        this.$router.push("/");
      }
    } else {
      this.$toast.error("Erro ao obter o token de acesso.");
    }
  } catch (error) {
    console.error("Erro durante o processamento do código de autorização:", error);
    this.$toast.error("Erro durante o login com Google.");
  }
},


    async login() {
      const request = {
        email: this.email,
        password: this.senha,
      };
      try {
        const response = await this.$api.post("/api/users/login", request);
        console.log(request);
        console.log(response);
        if (response.type == "success") {
          localStorage.setItem("toksen", response.data.token);
          this.$toast.success(`Bem Vindo ${response.data.name}`);
          if (response.data.role === "superadmin") {
            this.$router.push("/superadmin/company");
          } else if (response.data.role === "customer") {
            this.$router.push("/userHome");
            window.location.reload();
          } else if (
            response.data.role === "admin" &&
            !response.data.permission
          ) {
            this.$router.push("/admin/dashboard");
            window.location.reload();
          } else if (response.data.permission === "master") {
            this.$router.push("/master/home");
          }
        } else if (!email) {
          this.$toast.warning(response.message);
        }
      } catch (error) {
        this.$toast.warning("Usuário ou senha incorretos");
      }
    },
    async GoogleLogin() {
      try {
        const data = await this.$api.get("/google/auth-url");
        const authUrl = data.authUrl;

        window.location.href = authUrl;
        console.log('aedsgfsdg');
        
      } catch (error) {
        console.error("Erro durante o login do Google:", error);
        this.$toast.error("Erro durante o login do Google");
      }
    },
  },
};
</script>

  <style>
    a {
      text-decoration: none;
    }
  </style>
