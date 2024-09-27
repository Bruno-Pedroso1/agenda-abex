<template>
  <div>
    <v-row v-if="vouchers.length > 0" class="justify-center">
      <h2 class="mt-3">Ao efetuar a compra você será vinculado a filial</h2>
    </v-row>
    <v-row v-if="vouchers.length > 0" justify="center">
      <h1 class="mt-3">
        Vouchers da Filial:
        {{
          branchTradingName.charAt(0).toUpperCase() + branchTradingName.slice(1)
        }}
      </h1>
    </v-row>
    <v-col>
      <div class="d-flex justify-center mt-2">
        <v-btn
          v-if="vouchers.length > 0"
          color="blue"
          @click="voltarParaFiliais"
        >
          Voltar
        </v-btn>
      </div>
    </v-col>
    <v-row v-if="vouchers.length > 0" class="justify-center mt-5">
      <v-col v-for="voucher in vouchers" :key="voucher.id" cols="12" md="4">
        <v-card outlined elevation="8" max-height="365">
          <v-card-text class="black--text">
            <h3 class="mb-2">Valor a pagar: R$ {{ voucher.price }}</h3>
            <h3>Atribuição de Créditos: R$ {{ voucher.creditsValue }}</h3>
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              color="green"
              @click="
                openDialog(voucher.id, voucher.price, voucher.creditsValue)
              "
            >
              Comprar
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="dialogStates[voucher.id]" class="overflow-x-hidden">
          <v-card>
            <v-card-title>
              <v-col>
                <h3 class="">Forma de pagamento</h3>
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
                  <h1>Aguarde o pagamento...</h1>
                  <h4>
                    Copie o código abaixo para pagar via PIX em qualquer
                    aplicativo habilitado.
                  </h4>
                  <v-btn @click="efetuarCompra"> PAGAMENTO </v-btn>
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
    <v-row v-else class="text-center">
      <v-col>
        <h1>Esta filial não possui vouchers disponíveis.</h1>
        <v-btn class="mt-3" color="blue" @click="voltarParaFiliais">
          Voltar
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "VoucherBranch",
  layout: "customer",
  data() {
    return {
      dialogPagamento: false,
      vouchers: [],
      paymentMethods: [],
      branchTradingName: "",
      selectedPaymentMethod: null,
      currentVoucherId: null,
      dialogStates: {},
      user: {
        id: null,
        name: null,
        email: null,
        role: null,
      },
    };
  },
  async created() {
    const filialId = this.$route.params.filialId;
    const vouchers = this.$route.params.vouchers;

    if (!filialId || !vouchers) {
      this.$router.push("/categories");
      this.$toast.info("Por favor, selecione uma categoria!");
      return;
    }
    await this.getUserByToken();
    this.getPaymentMethods();
    this.$api
      .get(`/api/branches/${filialId}`)
      .then((response) => {
        const branch = response;
        if (branch) {
          this.branchTradingName = branch.tradingName;
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    this.vouchers = vouchers;

    this.vouchers.forEach((voucher) => {
      this.$set(this.dialogStates, voucher.id, false);
    });
    await this.loadPaymentInfo();
  },

  methods: {
    async loadPaymentInfo() {
      try {
        const paymentInfoResponse = await this.$api.get(
          "/api/payment-voucher-info"
        );
        this.paymentInfo = paymentInfoResponse.map((item) => ({
          idVoucher: item.idvoucher,
          branchId: item.idbranch,
          created: item.created,
        }));

        // Removendo a limitação de compra
        this.vouchers.forEach((voucher) => {
          voucher.canBuy = true; // Todos os vouchers podem ser comprados
          this.$set(this.dialogStates, voucher.id, false);
        });
      } catch (error) {
        console.error("Erro ao obter paymentInfo:", error);
      }
    },

    copiarCodigo() {
      const input = document.getElementById("codigoPix");
      navigator.clipboard.writeText(input.value).then(() => {
        this.$toast.info("Código copiado para a área de transferência!");
      });
    },

    voltarParaFiliais() {
      this.$router.replace({
        name: "branchCompany",
        params: {
          businessType: this.$route.params.businessType,
          id_company: this.$route.params.idCompany,
        },
      });
    },

    async efetuarCompra() {
      try {
        await this.getUserByToken();
        const idFilial = this.$route.params.filialId;
        const userId = this.user.id;
        const priceV = parseFloat(this.currentVoucherPrice);
        const creditAdd = parseFloat(this.currentVoucherCredits);
        const idV = this.currentVoucherId;

        try {
          await this.$api.get(
            `/api/user-branch/user=${userId}/filial=${idFilial}`
          );
        } catch (error) {
          if (error.response && error.response.status === 404) {
            await this.$api.post(
              `/api/user-branch/usuario=${userId}/filial=${idFilial}`
            );
          }
        }

        const paymentRequest = {
          status: "Pagamento Confirmado",
          totalValue: priceV,
          idUser: userId,
          idPaymentMethod: this.selectedPaymentMethod,
        };
        const paymentResponse = await this.$api.post(
          "/api/payments",
          paymentRequest
        );
        const userBranchCredits = await this.getUserBranchCredits(
          userId,
          idFilial
        );
        const idPayment = paymentResponse.id;
        const atribuiCreditos = parseFloat(userBranchCredits) + creditAdd;
        const toastFormat = parseFloat(creditAdd).toFixed(2);
        await this.$api.patch(
          `/api/update-credits/user=${userId}/branch=${idFilial}`,
          {
            credits: atribuiCreditos,
          }
        );
        const paymentVoucherRequest = {
          idPayment: idPayment,
          idVoucher: idV,
        };
        await this.$api.post("/api/payment-voucher", paymentVoucherRequest);
        this.$toast.success(
          `Foram adicionados R$${toastFormat} a seus créditos!`
        );
        await this.loadPaymentInfo();
      } catch (error) {
        console.log(error.message);
        this.$toast.error("Erro ao realizar a compra. Tente novamente.");
      } finally {
        this.$set(this.dialogStates, this.currentVoucherId, false);
        await this.loadPaymentInfo();
      }
    },
    
    async getUserBranchCredits(userId, idFilial) {
      try {
        const response = await this.$api.get(
          `/api/user-branch/user=${userId}/filial=${idFilial}`
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
    
    openDialog(voucherId, price, creditsValue) {
      this.$set(this.dialogStates, voucherId, true);
      this.currentVoucherId = voucherId;
      this.currentVoucherPrice = price;
      this.currentVoucherCredits = creditsValue;
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
      if (!this.fetchingUserByToken) {
        this.fetchingUserByToken = true;
        const { data } = await this.$api.get("/api/users/by-token");
        if (data) {
          this.user = {
            email: data.email,
            role: data.role,
            name: data.name,
            id: data.id,
          };
        }
        this.fetchingUserByToken = false;
      }
    },
  },
};
</script>
