<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">APERTA F12 QUE VAI APARECER OS DADOS</h1>
      </v-col>
    </v-row>

  </v-container>
</template>
<script>
export default {
  name: "teste",
  data() {
    return {
      user: {
        email: null,
        role: null,
        name: null,
        id: null,
        idCompany: null,
      },
    };
  },
  async created() {
    await this.getUserByToken();
    await this.testeGrafico();
  },
  methods: {
  
    async getUserByToken() {
      const { data } = await this.$api.get("/api/users/by-token");
      console.log(data.idCompany);
      
      if (data) {
        this.user = {
          email: data.email,
          role: data.role,
          name: data.name,
          id: data.id,
          id_company: data.idCompany,
        };
      }
    },

    async testeGrafico() {
      try {
        const response = await this.$api.get(`/api/graficos`);
        const filtroUsuario = response.filter(item => item.id_funcionario === this.user.id);
        console.log(filtroUsuario);

      } catch (error) {
        this.$toast.error(error.message);
      }
    },
 
  },
};
</script>

<style></style>
