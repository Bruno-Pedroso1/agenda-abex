<template>
    <v-container class="pa-5">

      <v-card class="pa-4 mb-6">
        <v-btn href="/" class="d-inline-flex justify-content" style="position: relative; left: 50%; transform: translate(-50%);">

Voltar ao login

        </v-btn>
        <v-card-title class="text-h5">Como posso me cadastrar?</v-card-title>
        <v-card-text>
          <p>
            Para se cadastrar, primeiro você precisa entrar em contato conosco pelo seguinte email:
          </p>
          <a href="https://workspace.google.com/intl/pt-BR/gmail/"> suporte@timelyapp.com.br </a>

          <h3 class="d-flex justify-center mt-5"> Abaixo você encontra o serviço mais agendado por região</h3>

        </v-card-text>
   
 
      <div v-for="(dados, cidade) in filtradoPorCidade" :key="cidade" class="mb-10">
        <h2 class="text-h6 mb-2">{{ cidade }}</h2>
 
        <v-data-table
          :headers="headers"
          :items="dados"
          :search="search"
          class="elevation-1"
          item-value="name"
          no-data-text="Nenhum dado disponível"
        />
      </div>
    </v-card>
    </v-container>
  </template>
  <script>
  export default {
    name: "ss",
    data() {
      return {
        search: "",
        items: [],
        headers: [
          { text: "Serviços Mais Agendados", value: "servico", align: "center" },
          { text: "Quantidade de Agendamentos", value: "quantidade_agendamentos", align: "center" },
        ],
      };
    },
    async created() {
      await this.carregarDados();
    },
    computed: {
      filtradoPorCidade() {
        const grupos = {};
        this.items.forEach((item) => {
          if (!grupos[item.cidade]) {
            grupos[item.cidade] = [];
          }
          grupos[item.cidade].push(item);
        });
        return grupos;
      },
    },
    methods: {
      async carregarDados() {
        try {
          const response = await this.$api.get("/api/services-city");
          this.items = response;
        } catch (error) {
          this.$toast.error(error.message);
        }
      },
    },
  };
  </script>
 
  <style>
  .text-h6.mb-2 {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .v-data-footer {
    display: none;
  }
  .email {
    font-weight: bold;
    color: #1976d2;
    font-size: 18px;
    margin-top: 10px;
  }

  .v-data-table.elevation-1.v-data-table--has-bottom.theme--light {
  width: 50%;
  justify-content: center;
  display: flex;
  align-items: center;
  justify-items: center;
  position: relative;
  right: -280px;
}
#igm {
    max-height: 200px;
  max-width: 200px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: relative;
  right: -470px;
  margin-bottom: 40px;
}

p {
  width: 50%;
  justify-content: center;
  display: flex;
  align-items: center;
  justify-items: center;
  position: relative;
  right: -280px;
}

.v-application p {
  margin-bottom: 16px;
  white-space: nowrap;
}


.v-card__title {
  display: flex;
  justify-content: center;
}

a  {
    display: flex;
    justify-content: center;
}  
</style>