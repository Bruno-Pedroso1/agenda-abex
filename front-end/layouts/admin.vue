<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" color="#000" app>
      <h6 style="font-size: 30px; color: #fff" class="text-center mt-5 mb-5">
        TimelyAPP
      </h6>
      <v-divider class="white"></v-divider>
      <v-row class="justify-center">
        <v-btn
          class="white--text mt-5 mb-5"
          color="#ff6b00"
          width="215"
          height="40"
        >
          <v-icon>mdi-share-variant</v-icon>
          Compartilhar link
        </v-btn>
      </v-row>
      <v-divider class="white"></v-divider>
      <v-row class="justify-center">
        <v-btn
          class="white--text mt-5"
          color="#036dcf"
          width="215"
          height="40"
          to="/admin/schedule"
        >
          <v-icon>mdi-calendar-month</v-icon>
          Agenda
        </v-btn>
      </v-row>
      <v-list>
        <v-container v-if="logado">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            color="blue"
            @click="item.action && item.action()"
            exact
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
      <v-row class="justify-center">
        <v-img
          class="mt-10"
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
  name: "AgendaFuncionario",

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
      },
      items: [
        {
          icon: "mdi-shield-crown",
          title: "Entrar como Cliente",
          to: "/userHome",
        },
        {
          icon: "mdi-account-group",
          title: "Clientes",
          to: "/admin/customers",
        },
        {
          icon: "mdi-cash-sync",
          title: "Pagamentos Recebidos",
          to: "/admin/payments",
        },
        {
          icon: "mdi-cog-outline",
          title: "Página de gerenciamento",
          to: "/admin/management",
        },
        {
          icon: "mdi-finance",
          title: "Dashboard",
          to: "/admin/dashboard",
        },
        {
          icon: "mdi-cog",
          title: "Configurações",
          to: "/admin/settings",
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
    await this.getUserByToken();
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
    async getUserByToken() {
      const { data } = await this.$api.get("/api/users/by-token");
      if (data) {
        this.user = {
          email: data.email,
          role: data.role,
          name: data.name,
        };
        if (this.user.role === "superadmin") {
          this.items.unshift({
            icon: "mdi-shield-crown",
            title: "Entrar como Super Admin",
            to: "/superadmin/company",
          });
        }
      }
    },
  },
};
</script>

<style></style>
