<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "LoginLayout",

  data() {
    return {
      user: {
        email: null,
        role: null,
        name: null,
      },
    };
  },

  async created() {
    await this.loginValidator();
  },

  methods: {
    async loginValidator() {
      let token = localStorage.getItem("toksen");
      const { data } = await this.$api.get("/api/users/by-token");
      if (data) {
        this.user = {
          email: data.email,
          role: data.role,
          name: data.name,
        };
      }
      if (token === "eusousuperadmin") {
        return this.$router.push("/superadmin/company");
      }

      if (!data || !token) {
        this.$toast.info("Por favor efetue o login!");
      }
      if (token) {
        if (this.user.role === "customer") {
          return this.$router.push("/userHome");
        }
        if (this.user.role === "admin") {
          return this.$router.push("/admin/dashboard");
        }
        if (this.user.role === "superadmin") {
          return this.$router.push("/superadmin/company");
        }
      }
    },
  },
};
</script>
