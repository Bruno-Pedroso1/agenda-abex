<template>
  <v-container>
    <header class="text-center mb-5">
      <h1>Categorias</h1>
    </header>
    <v-row
    class="justify-center"
    v-for="category in uniqueCategories"
    :key="category.id"
    > 
      <v-col md="6" cols="12">
        <v-btn
        class="white--text"
        color="#036DCF"
        height="45"
        width="100%"
        depressed
        small
        @click="selecionarCategoria(category)"
        >{{ category.businessType }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "categoriesPage",
  layout: "customer",
  
  data() {
    return {
      categories: [],
      categoriaSelecionada: null,
    };
  },

  computed: {
    uniqueCategories() {
      const uniqueCategorySet = new Set();
      this.categories.forEach((category) => {
        uniqueCategorySet.add(category.businessType);
      });
      return Array.from(uniqueCategorySet).map((businessType) => ({
        businessType,
      }));
    },
  },

  async created() {
    await Promise.all([
      this.getEmpresas(),
    ]);
  },

  methods: {
    async selecionarCategoria(category) {
      this.categoriaSelecionada = category.businessType;
      this.$router.push({
        name: "companies",
        params: { businessType: this.categoriaSelecionada },
      });
    },

    async getEmpresas() {
      try {
        const response = await this.$api.get("/api/companies");
        this.categories = response;
      } catch (error) {
        this.$toast.error("Algo deu errado!");
      }
    },
  },
};
</script>
