<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      color="deep-purple darken-3"
      app
    >
      <v-list>
        <v-container v-if="logado">
          <v-list>
            <!-- Item "Início" -->
            <v-list-item
              :to="items[0].to"
              router
              @click="items[0].action && items[0].action()"
              exact
            >
              <v-list-item-action>
                <v-icon large color="white">{{ items[0].icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <h4 class="white--text">{{ items[0].title }}</h4>
              </v-list-item-content>
            </v-list-item>

            <v-list-group v-if="logado">
              <v-list-item
                v-for="item in paginaUser"
                :key="item.id"
                link
                exact
                :to="item.to"
              >
                <v-list-item-title class="white--text">
                  {{ item.title }}
                </v-list-item-title>
                <v-icon color="white">{{ item.icon }}</v-icon>
              </v-list-item>
              <template v-slot:activator>
                <v-list-item-title class="white--text"
                  ><h4>
                    <v-icon size="35" color="white">mdi-calendar</v-icon>
                    <span class="ml-7">Usuários</span>
                  </h4></v-list-item-title
                >
              </template>
            </v-list-group>
            <v-list-item
              v-for="(item, i) in items.slice(1)"
              :key="i"
              :to="item.to"
              router
              @click="item.action && item.action()"
              exact
            >
              <v-list-item-action>
                <v-icon large color="white">{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <h4 class="white--text">{{ item.title }}</h4>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-container>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      paginaUser: [
        {
          icon: "mdi-account-multiple-outline",
          title: "Todos os Usuários",
          to: "/sso/user",
        },
        {
          title: "Clientes",
          icon: "mdi-account",
          to: "/sso/getCustomer",
        },
        {
          title: "Administradores",
          icon: "mdi-shield-outline",
          to: "/sso/getUsersAdmin",
        },
        {
          title: "Master",
          icon: "mdi-shield",
          to: "/sso/getMasterUsers",
        },
        {
          title: "Super Administradores",
          icon: "mdi-shield-crown",
          to: "/sso/getSuperUsers",
        },
      ],
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Início",
          to: "/superadmin/company",
        },
        {
          icon: "mdi-shield-crown",
          title: "Entrar como Funcionário",
          to: "/admin/dashboard",
        },
        {
          icon: "mdi-shield-crown",
          title: "Entrar como Cliente",
          to: "/userHome",
        },
        {
          icon: "mdi-earth",
          title: "Paises",
          to: "/sso/countries",
        },
        {
          icon: "mdi-flag",
          title: "Estados",
          to: "/sso/states",
        },
        {
          icon: "mdi-city",
          title: "Cidades",
          to: "/sso/cities",
        },
        {
          icon: "mdi-domain",
          title: "Empresas",
          to: "/sso/company",
        },
        {
          icon: "mdi-link",
          title: "Integrações",
          to: "/sso/integration",
        },
        {
          icon: "mdi-domain",
          title: "Filiais",
          to: "/sso/branch",
        },
        {
          icon: "mdi-map-marker",
          title: "Endereços",
          to: "/sso/address",
        },
        {
          icon: "mdi-cog",
          title: "Serviços",
          to: "/sso/services",
        },
        {
          icon: "mdi-credit-card",
          title: "Métodos de Pagamento",
          to: "/sso/paymentMethods",
        },
        {
          icon: "mdi-currency-usd",
          title: "Pagamentos",
          to: "/sso/payments",
        },
        {
          icon: "mdi-calendar",
          title: "Agendas",
          to: "/sso/schedule",
        },
        {
          icon: "mdi-clock",
          title: "Horarios",
          to: "/sso/schedules",
        },
        {
          icon: "mdi-calendar-clock",
          title: "Agendamentos",
          to: "/sso/scheduling",
        },
        {
          icon: "mdi-account-group",
          title: "Usuários - Filial",
          to: "/sso/userBranch",
        },
        {
          icon: "mdi-account-group",
          title: "Vouchers",
          to: "/sso/voucher",
        },
        {
          icon: "mdi-account-group",
          title: "Pagamentos - Voucher",
          to: "/sso/paymentVoucher",
        },
        {
          icon: "mdi-arrow-collapse-left",
          title: "Sair",
          action: this.sairConta,
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    };
  },
  async created() {
    this.getUsuario();
  },
  methods: {
    getUsuario() {
      const token = localStorage.getItem("toksen");
      console.log(token);
      if (token) {
        this.logado = true;
      }
    },
    sairConta() {
      this.logado = false;
      localStorage.removeItem("toksen");
      this.$router.push("/");
    },
  },
};
</script>
