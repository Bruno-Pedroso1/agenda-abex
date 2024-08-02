<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1>Adquira vouchers para seus agendamentos por ótimos preços!!</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col
      v-for="item in vouchersBranches"
      :key="item.id"
      cols="12"
      md="6"
      >
        <v-card 
        outlined
        elevation="8"
        >
          <v-card-title>
            <v-row>
              <v-col class="text-break">
                <h3>Filial: {{ item.nomeFilial }}</h3>
              </v-col>
              <v-col class="text-end" cols="2">
                <v-icon
                class="mt-n7 ml-4" 
                color="#036DCF">
                  mdi-gift-outline
                </v-icon>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="black--text">
            <h3>Preço: R$ <b class="green--text">{{ item.valorVoucher }}</b></h3>
            <h3>Valor em créditos: R$ <b class="green--text">{{ item.atribuicaoCreditos }}</b></h3>
          </v-card-text>
          <v-card-actions>
            <v-btn
            class="primary"
            small
            block
            >Comprar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'pageVouchersUser',
  layout: 'customer',

  data() {
    return {
      vouchersBranches: [],
    };
  },

  async created() {
    await Promise.all([
      this.getVouchersByBranches(),
    ]);
  },

  methods: {
    async getVouchersByBranches() {
      try {
        const response = await this.$api.get("/api/voucher-by-branches");
        this.vouchersBranches = response;
        console.log(this.vouchersBranches);
      } catch (error) {
        this.$toast.error(error.message);
      }
    }
  },
};
</script>