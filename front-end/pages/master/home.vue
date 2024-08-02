<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1>Seja bem vindo!</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "master",
  data() {
    return {
      user: {
        id: null,
        email: null,
        role: null,
        name: null,
        permission: null,
        idCompany: null,
      },
    };
  },

  async created() {
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
          permission: data.permission,
          idCompany: data.idCompany,
        };
        console.log(this.user);
      } else {
        this.$toast.error("Faça o login");
        return this.$router.push("/");
      }
    },
  },
};
</script>
