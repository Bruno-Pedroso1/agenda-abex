<template>
  <div>
    <v-row v-if="groupedVouchers.length > 0" justify="center">
      <h3 class="mt-4">Ao realizar a compra você será vinculado a filial</h3>
      <v-col v-for="(group, index) in groupedVouchers" :key="index" cols="12">
        <v-card class="mb-4">
          <v-card-title>
            <v-col class="text-center">
              <h4>
                Filial:
                {{
                  group.branchName.charAt(0).toUpperCase() +
                  group.branchName.slice(1)
                }}
              </h4>
            </v-col>
          </v-card-title>
          <v-card-subtitle class="text-center green--text mb-4 mt-1">
            <h3>
              Seus Créditos na Filial: R$ {{ Number(group.credits).toFixed(2) }}
            </h3>
          </v-card-subtitle>
          <v-row>
            <v-col
              v-for="item in group.vouchers"
              :key="item.voucher.id"
              cols="12"
              md="6"
            >
              <v-card class="mb-4">
                <v-card-text class="mb-3">
                  <v-card v-if="item && item.voucher">
                    <v-card-text>
                      <p>Valor: R$ {{ item.voucher.price }}</p>
                      <p>
                        Créditos Depositados: R$
                        {{ item.voucher.creditsValue }}
                      </p>
                    </v-card-text>
                    <v-btn
                      color="green white--text"
                      @click="openDialog(item.voucher.id)"
                      block
                    >
                      Comprar
                    </v-btn>
                  </v-card>
                </v-card-text>
              </v-card>
              <v-dialog v-model="dialogStates[item.voucher.id]">
                <v-card>
                  <v-card-title>
                    <v-col>
                      <h3>Forma de pagamento</h3>
                      <v-radio-group v-model="selectedPaymentMethod">
                        <v-radio
                          v-for="method in paymentMethods"
                          :key="method.id"
                          :label="method.type"
                          :value="method.id"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-card-title>
                  <v-card-text>
                    <v-row class="text-center black--text">
                      <v-col md="6">
                        <h1>Aguaradando pagamento...</h1>
                        <h4>
                          Copie o código abaixo para pagar via PIX em qualquer
                          aplicativo habilitado.
                        </h4>
                        <v-btn
                          color="red"
                          @click="() => comprar(item.voucher, group, item.voucher.id)"
                        >
                          PAGAMENTO
                        </v-btn>
                        <v-text-field
                          id="codigoPix"
                          style="border: dashed 2px #000"
                          class="mt-5 mb-5"
                          append-icon="mdi-content-copy blue--text"
                          dense
                          flat
                          hide-details
                          solo
                          @click:append="copiarCodigo"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <h1>ATENÇÃO</h1>
                        <h4 class="mb-2">
                          Somente após o pagamento seu horário será confirmado.
                        </h4>
                        FAZER QRCODE
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col cols="12" md="8">
        <p class="text-center">Nenhum voucher disponível.</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "customer",
  data() {
    return {
      selectedPaymentMethod: null,
      isDialogOpen: false,
      user: {
        email: null,
        role: null,
        name: null,
        id: null,
      },
      branches: [],
      paymentMethods: [],
      vouchers: [],
      matchingVouchers: [],
      dialogStates: {},
    };
  },
  async created() {
    await this.getUserByToken();
    await this.getVoucher();
    await this.getPaymentMethods();

    const paymentInfoResponse = await this.$api.get(
      "/api/payment-voucher-info"
    );
    this.paymentInfo = paymentInfoResponse.map((item) => ({
      idVoucher: item.idvoucher,
      branchId: item.idbranch,
      created: item.created,
    }));

    await this.displayMatchingVouchers();
    this.matchingVouchers.forEach((item) => {
      this.$set(this.dialogStates, item.voucher.id, false);
    });
  },

  computed: {
    groupedVouchers() {
      const grouped = {};
      this.matchingVouchers.forEach((item) => {
        const branchName = item.branchName;
        const canBuy = item.canBuy;

        if (!grouped[branchName]) {
          grouped[branchName] = {
            branchName: branchName,
            vouchers: [],
            credits: item.credits,
            canBuy: canBuy,
          };
        }
        grouped[branchName].vouchers.push({ ...item, canBuy: canBuy });
      });

      return Object.values(grouped);
    },
  },
  methods: {
    copiarCodigo() {
      const input = document.getElementById("codigoPix");
      navigator.clipboard.writeText(input.value).then(() => {
        this.$toast.info("Código copiado para a área de transferência!");
      });
    },
    async getPaymentMethods() {
      try {
        const response = await this.$api.get("/api/payment-methods");
        this.paymentMethods = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getUserByToken() {
      const { data } = await this.$api.get("/api/users/by-token");
      if (data) {
        this.user = {
          email: data.email,
          role: data.role,
          name: data.name,
          id: data.id,
        };
      }
    },

async displayMatchingVouchers() {
  const matchingVouchers = [];
  
  const paymentInfoResponse = await this.$api.get("/api/payment-voucher-info");
  const userId = this.user.id;
  
  const paymentInfo = paymentInfoResponse
    .filter((item) => item.iduser === userId)
    .map((item) => ({
      idVoucher: item.idvoucher,
      branchId: item.idbranch,
      created: item.created,
    }));

  for (const voucher of this.vouchers) {
    const voucherBranchId = Number(voucher.idBranch);
    const branch = await this.getBranchById(voucherBranchId);
    const credits = await this.getUserBranchCredits(this.user.id, voucherBranchId);

    matchingVouchers.push({
      branchName: branch,
      credits: credits,
      voucher: voucher,
      canBuy: true,  // Alterado para sempre permitir a compra
    });
  }

  this.matchingVouchers = matchingVouchers;
},


    async getVoucher() {
      const responseVoucher = await this.$api.get("/api/voucher");
      this.vouchers = responseVoucher;
    },
    async getBranchById(branchId) {
      try {
        const response = await this.$api.get(`/api/branches/${branchId}`);
        return response.tradingName;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    openDialog(voucherId) {
      this.$set(this.dialogStates, voucherId, true);
      this.isDialogOpen = true;
    },
    async comprar(voucher, group, voucherId) {
      const userId = this.user.id;
      const branchId = voucher.idBranch;
      const voucherPrice = parseFloat(voucher.price);
      const creditsValue = parseFloat(voucher.creditsValue);

      try {
        await this.getUserBranchCredits(userId, branchId);
        try {
          await this.$api.get(
            `/api/user-branch/user=${userId}/filial=${branchId}`
          );
        } catch (error) {
          if (error.response && error.response.status === 404) {
            await this.$api.post(
              `/api/user-branch/usuario=${userId}/filial=${branchId}`
            );
          }
        }
        const paymentRequest = {
          status: "Pagamento Confirmado",
          totalValue: voucherPrice,
          idUser: userId,
          idPaymentMethod: this.selectedPaymentMethod,
        };

        const paymentResponse = await this.$api.post(
          "/api/payments",
          paymentRequest
        );

        const userBranchCredits = await this.getUserBranchCredits(
          userId,
          branchId
        );

        const idPayment = paymentResponse.id;
        const atribuiCreditos = parseFloat(userBranchCredits) + creditsValue;
        group.credits = atribuiCreditos;

        await this.$api.patch(
          `/api/update-credits/user=${userId}/branch=${branchId}`,
          {
            credits: group.credits,
          }
        );
        const paymentVoucherRequest = {
          idPayment: idPayment,
          idVoucher: voucher.id,
        };
        await this.$api.post("/api/payment-voucher", paymentVoucherRequest);
        const updatedVoucherIndex = this.matchingVouchers.findIndex(
          (item) => item.voucher.id === voucherId
        );
        if (updatedVoucherIndex !== -1) {
          this.$set(
            this.matchingVouchers[updatedVoucherIndex].voucher,
            "dummyProperty",
            Date.now()
          );
        }
        await this.displayMatchingVouchers();
        this.$toast.success("Compra realizada com sucesso!");
        this.$set(this.dialogStates, voucherId, false);
      } catch (error) {
        this.$toast.error("Erro ao realizar a compra. Tente novamente.");
      }
    },

    async getUserBranchCredits(userId, branchId) {
      try {
        const response = await this.$api.get(
          `/api/user-branch/user=${userId}/filial=${branchId}`
        );
        return response.credits;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return 0.0;
        }
        this.$toast.error(
          "Erro ao obter os créditos do usuário na filial:",
          error
        );
        return 0.0;
      }
    },
  },
};
</script>

<style></style>
