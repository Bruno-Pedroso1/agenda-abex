<template>
  <v-container>
    <header class="text-center text-break mb-5">
      <h1>
        Empresas da Categoria:
        {{ businessType }}
      </h1>
      <v-btn color="primary" to="/categories">Voltar Para Categorias</v-btn>
    </header>
    <v-row>
      <v-col v-for="empresa in empresas" :key="empresa.id" cols="12" md="4">
        <v-card outlined rounded="xl" elevation="8" height="363">
          <v-card-title class="justify-center">
            <v-avatar size="120">
              <v-img :src="empresa.logo"></v-img>
            </v-avatar>
          </v-card-title>
          <v-divider class="black"></v-divider>
          <v-card-text class="black--text">
            <h3>{{ empresa.businessName }}</h3>
            <h3 class="mt-2 mb-2">{{ empresa.phone }}</h3>
            <h3>{{ empresa.email }}</h3>
          </v-card-text>
        </v-card>
        <v-btn
          class="white--text mt-n16 mb-5 ml-3"
          color="#036DCF"
          depressed
          @click="verFiliais(empresa)"
          >Ver Filiais</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "companiesPage",
  layout: "customer",

  data() {
    return {
      businessType: null,
      empresas: [],
    };
  },

  async created() {
    this.businessType = this.$route.params.businessType;
    this.getEmpresasPorCategoria();
    console.log("Companies params", this.$route.params);
  },

  methods: {
    async getEmpresasPorCategoria() {
      try {
        if (this.businessType) {
          const response = await this.$api.get(
            `/api/companies-by-type?businessType=${this.businessType}`
          );
          this.empresas = response;
        } else {
          this.$toast.error("Por favor selecione uma categoria primeiro");
          return this.$router.push("/categories");
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    verFiliais(empresa) {
      this.$router.push({
        name: "branchCompany",
        params: {
          id_company: empresa.id,
          businessType: this.businessType,
          empresaBusinessName: empresa.businessName,
        },
      });
    },

    async getFiliaisPorEmpresa() {
      try {
        const response = await this.$api.get(
          `/api/company-branch?id_company=${this.id}`
        );
        this.filiais = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>
