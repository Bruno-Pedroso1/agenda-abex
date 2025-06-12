
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">APERTA F12 QUE VAI APARECER OS DADOS</h1>

        <v-card style="height: 200px; background-color: blue;">
          <v-card-title class="d-flex justify-content-center" style="position: relative; left: 50%; transform: translate(-45%);">
            isso só funciona pra admin logado, a segunda função da pra usar no gráfico 3, apenas precisa mudar o filtro
          </v-card-title>

          <v-btn @click="testeGrafico()" class="mb-3 d-flex justify-content-center" style="position: relative; left: 50%; transform: translate(-50%);"> função merda que da pra melhora</v-btn>
          <v-btn @click="testeFull()" class="d-flex justify-content-center" style="position: relative; left: 50%; transform: translate(-50%);"> tem mais dados aqui, nessa função falta somar o valor total caso exista mais de uma agenda por funcionario</v-btn>
        </v-card>
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
    // await this.testeFull();
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

async testeFull() {
const { data } = await this.$api.get("/api/users/by-token");

try {

  if(data.role == 'admin') {
  console.log('???')
  const test = await this.$api.get("/api/grafico-geral-admin-empresa");
  const filtroTeste = test.filter(item => item.funcionario_id === data.id);
  console.log(filtroTeste)
}
} catch {
  console.log(error.message)
}
},

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
