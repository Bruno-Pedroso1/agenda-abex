
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">APERTA F12 QUE VAI APARECER OS DADOS</h1>


        <v-btn @click="testeGrafico()"> clica aqui e vai mostrar os dados do admin logado</v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>
<script>
export default {
  name: "graficos-teste",
  layout: "customer",
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
    // await this.getUserByToken();
    // await this.testeGrafico();
  },
  methods: {
    // async getUserByToken() {
    //   const { data } = await this.$api.get("/api/users/by-token");
    //   console.log(data.idCompany);
    //   console.log(data);
    //   const role = data.role;

    //   if (data) {
    //     this.user = {
    //       email: data.email,
    //       role: data.role,
    //       name: data.name,
    //       id: data.id,
    //       id_company: data.idCompany,
    //     };
    //   }
    // },

  async testeGrafico() {
  const { data } = await this.$api.get("/api/users/by-token");
  if(!data) {
    console.log('PROVAVELMENTE VC NAO TA LOGADO OU FUNÇÃO QUEBROU')
  }
  const role = data.role;
  console.log(`Cargo: ${role}, Empresa ID: ${data.idCompany}, User ID: ${data.id}`);
  console.log('this.$router:', this.$router);

  if (!(role == 'admin' || role == 'superadmin')) {
    alert('tem q ta logado como admin');
    this.$router.push('/')
  }

  if (data) {
    this.user = {
      email: data.email,
      role: data.role,
      name: data.name,
      id: data.id,
      id_company: data.idCompany,
    };
  }

  try {
    const response = await this.$api.get(`/api/grafico-admin`);
    const filtroUsuario = response.filter(item => item.id_funcionario === this.user.id);
    if(role == 'customer' || null) {
      console.log('teste validação de segurança')
    } else {
      console.log(filtroUsuario);

    }
  } catch (error) {
    this.$toast.error(error.message);
  }
}

 
  },
};
</script>

<style></style>
