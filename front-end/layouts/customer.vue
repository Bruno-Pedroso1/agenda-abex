<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      color="#001233"
      app
    >
      <v-row class="justify-center">
        <v-col>
          <v-row class="justify-center" style="gap: 30px">
            <h1
              class="white--text mt-5"
              style="font-size: 40px; font-weight: 300"
            >
              TimelyAPP
            </h1>
            <v-img
              class="mt-5"
              max-height="50"
              max-width="50"
              src="https://cdn.discordapp.com/attachments/1148348260533162005/1148353943215284325/image.png?ex=65168ab3&is=65153933&hm=3e142c176b115a497ecefd2c8c93474f5cb6f4d459ea6ad01f31e63009f4d43c&"
            ></v-img>
          </v-row>

          <h1
            class="white--text text-center ms-12"
            style="font-size: 25px; font-weight: 300"
          >
            Schedule
          </h1>
        </v-col>
      </v-row>

      <v-list>
        <v-container v-if="logado">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            @click="item.action && item.action()"
          >
            <v-list-item-action>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <h4 class="white--text">{{ item.title }}</h4>
            </v-list-item-content>
          </v-list-item>
        </v-container>
      </v-list>
      <v-row class="justify-center mt-16">
        <v-img
          class="mt-16"
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
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "agendaCustomer",

  data() {
    return {
      drawer: false,
      clipped: false,
      fixed: false,
      logado: false,
      miniVariant: false,
      user: {
        email: null,
        role: null,
        name: null,
        id: null,
      },
      items: [
        {
          icon: "mdi-home-outline",
          title: "Inicio",
          to: "/userHome",
        },
        {
          icon: "mdi-home-outline",
          title: "Comprar Voucher",
          to: "/customer/customerVoucher",
        },
        {
          icon: "mdi-calendar-month",
          title: "Agenda",
          to: "/customer/schedule",
        },
        {
          icon: "mdi-map-marker",
          title: "Cadastrar meu endereço",
          to: "/customer/addresses",
        },
        {
          icon: "mdi-map-marker",
          title: "Meus Dados",
          to: "/customer/data",
        },
        {
          icon: "mdi-map-marker",
          title: "Meus Pagamentos",
          to: "/customer/payments",
        },
        {
          icon: "mdi-clipboard-text-clock-outline",
          title: "Histórico",
          to: "/customer/historic",
        },
        {
          icon: "mdi-headset",
          title: "Suporte",
          to: "/support",
        },
        {
          icon: "mdi-arrow-collapse-left",
          title: "Sair",
          action: this.sairConta,
        },
      ],
    };
  },
  async created() {
    this.getUsuario();
    // await this.getUserByToken();
  },

  methods: {
    getUsuario() {
      const token = localStorage.getItem("toksen");
      if (token) {
        this.logado = true;
      }
    },

    sairConta() {
      this.logado = false;
      localStorage.removeItem("toksen");
      this.$router.push("/");
    },

    // async getUserByToken() {
    //   const { data } = await this.$api.get("/api/users/by-token");
    //   if (data) {
    //     this.user = {
    //       email: data.email,
    //       role: data.role,
    //       name: data.name,
    //       id: data.id,
    //     };
    //     if (this.user.role === "admin") {
    //       this.items.unshift({
    //         icon: "mdi-shield-crown",
    //         title: "Entrar como Funcionário",
    //         to: "/admin/dashboard",
    //       });
    //     }
    //     if (this.user.role === "superadmin") {
    //       this.items.unshift({
    //         icon: "mdi-shield-crown",
    //         title: "Entrar como Funcionário",
    //         to: "/admin/dashboard",
    //       });
    //       this.items.unshift({
    //         icon: "mdi-shield-crown",
    //         title: "Entrar como Super Admin",
    //         to: "/superadmin/company",
    //       });
    //     }
    //   }
    // },
  },
};
</script>

<style>
.v-list-item {
  color: #036dcf;
}

.v-list-item:hover {
  color: #036dcf;
  font-size: 20px;
}
</style>
