<template>
  <v-container>
    <header class="text-center mb-5">
      <h1>Serviços Ofertados</h1>
      <v-btn color="primary" @click="voltar">Voltar Para Filiais</v-btn>
    </header>
    <v-row v-if="agendas.length > 0">
      <v-col v-for="agenda in agendas" :key="agenda.id" cols="12" md="4">
        <v-card class="mb-3">
          <v-card-title> {{ agenda.nomeDoServico }}</v-card-title>
          <v-card-text>
            <p>Valor: R${{ Number(agenda.servicePrice).toFixed(2) }}</p>
            <p>
              Profissional:
              {{
                agenda.nomeProfissional.charAt(0).toUpperCase() +
                agenda.nomeProfissional.slice(1)
              }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue" @click="realizarAgendamento(agenda)">
              REALIZAR AGENDAMENTO
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <h1>Esta filial não possui serviços cadastrados</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ServicesPage",
  layout: "customer",

  data() {
    return {
      agendas: [],
    };
  },

  async created() {
    const idEmpresa = this.$route.params.id_company;
    const idFilial = this.$route.params.idFilial;
    const agendas = this.$route.params.agendas;
    if (!idFilial) {
      this.$toast.error("Selecione uma categoria primeiro.");
      return this.$router.push("/categories");
    }
    try {
      const response = await this.$api.get(`/api/schedule-branch`, {
        params: { id_branch: idFilial },
      });
      const agendas = response;
      const agendasComDetalhes = await Promise.all(
        agendas.map(async (agenda) => {
          const detalhesDoServico = await this.obterDetalhesDoServico(
            agenda.idServices
          );
          const nomeProfissional = await this.obterNomeProfissional(
            agenda.idUser
          );
          return {
            ...agenda,
            nomeDoServico: detalhesDoServico.name,
            nomeProfissional,
          };
        })
      );

      this.agendas = agendasComDetalhes || [];
    } catch (error) {
      this.$toast.error(error.message);
    }
    console.log("services params", this.$route.params);
  },
  methods: {
    voltar() {
      const params = {
        id_company: this.$route.params.idCompany,
        ...this.$route.params,
      };

      this.$router.push({
        name: "branchCompany",
        params: params,
        ...this.$route.params,
      });
    },
    realizarAgendamento(agenda) {
      this.$router.push({
        name: "agendamento",
        params: {
          idFilial: agenda.idFilial,
          idAgenda: agenda.id,
          idProfissional: agenda.idUser,
          nomeProfissional: agenda.nomeProfissional,
          nomeDoServico: agenda.nomeDoServico,
          servicePrice: agenda.servicePrice,
          ...this.$route.params,
        },
      });
    },

    async obterNomeProfissional(idProfissional) {
      try {
        const response = await this.$api.get(`/api/users/${idProfissional}`);
        return response.name;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async obterDetalhesDoServico(idServico) {
      try {
        const response = await this.$api.get(`/api/services/${idServico}`);
        return response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>
