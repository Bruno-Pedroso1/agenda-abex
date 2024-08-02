<template>
  <v-container>
    <header class="text-break text-center mb-5">
      <h1>Filiais da empresa: {{ empresaBusinessName }}</h1>
      <v-btn color="primary" @click="voltarParaEmpresas"
        >Voltar Para empresas</v-btn
      >
    </header>
    <h2 v-if="filiais.length > 0" class="text-center mb-5">Todas as filiais</h2>
    <v-row v-if="filiais.length > 0" class="mb-5">
      <v-col v-for="item in filiais" :key="item.id" cols="12" md="4">
        <v-card outlined elevation="8">
          <v-card-title> Filial: {{ item.businessName }} </v-card-title>
          <v-card-text class="black--text">
            <h3>Contato: {{ item.phone }}</h3>
            <h3>E-mail: {{ item.email }}</h3>
          </v-card-text>
          <v-card-actions>
            <v-col>
              <v-btn
                block
                class="mb-3"
                @click="verServicos(item)"
                color="primary"
              >
                Ver Serviços
              </v-btn>
              <v-btn block @click="vincular(item)" color="green accent-2"
                >Vincular-se</v-btn
              >
              <v-btn block @click="verVouchers(item)" color="info" class="mt-3">
                Ver Vouchers Disponíveis
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-divider v-if="filiaisUserVinculado.length > 0" class="black"></v-divider>
    <h2 v-if="filiaisUserVinculado.length > 0" class="text-center mt-5 mb-5">
      Filiais que você é vínculado
    </h2>

    <v-row v-if="filiais.length < 0">
      <v-col cols="12" class="text-center">
        <h1>Esta empresa não possui filiais.</h1>
      </v-col>
    </v-row>

    <v-row v-if="filiaisUserVinculado.length > 0">
      <v-col
        v-for="item in filiaisUserVinculado"
        :key="item.id"
        cols="12"
        md="4"
      >
        <v-card outlined elevation="8" class="mb-3" max-height="365">
          <v-card-title>
            <h3>Filial: {{ item.businessName }}</h3>
          </v-card-title>
          <v-card-text class="black--text">
            <h3>Contato: {{ item.phone }}</h3>
            <h3>E-mail: {{ item.email }}</h3>
            <h3>
              Seus Créditos: R$ <b class="green--text">{{ item.creditos }}</b>
            </h3>
          </v-card-text>
          <v-card-actions>
            <v-col>
              <v-btn block color="primary" @click="verServicos(item)"
                >Ver Serviços</v-btn
              >
              <v-btn block @click="verVouchers(item)" color="info" class="mt-3">
                Ver Vouchers Disponíveis
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BranchCompanyPage",
  layout: "customer",

  data() {
    return {
      filiaisUserVinculado: {},
      test: [],
      filiais: [],
      empresaBusinessName: this.$route.params.empresaBusinessName,
      idFilial: this.$route.params.idFilial,
      filial: null,
      user: {
        email: null,
        role: null,
        name: null,
        id: null,
      },
    };
  },

  async created() {
    await this.getUserByToken();
    this.idCompany = this.$route.params.id_company;
    await this.getFiliaisPorEmpresa();
    await this.filiaisByUser();
    console.log("branchCOmpany param", this.$route.params);
  },

  methods: {
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
    async verVouchers(filial) {
      try {
        const response = await this.$api.get(
          `/api/vouchers-branch/${filial.id}`
        );
        const vouchers = response;
        console.log("filial.id:", filial.id);
        console.log("this.idCompany:", this.idCompany);
        console.log("vouchers:", vouchers);
        console.log("this.$route.params:", this.$route.params);

        this.$router.push({
          name: "voucherBranch",
          params: {
            filialId: filial.id,
            idCompany: this.idCompany,
            vouchers: vouchers,
            ...this.$route.params,
          },
        });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async vincular(filial) {
      try {
        await this.$api.post(
          `/api/user-branch/usuario=${this.user.id}/filial=${filial.id}`
        );
        await this.getFiliaisPorEmpresa();
        await this.filiaisByUser();
        this.$toast.success("Vinculado com sucesso");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getFiliaisPorEmpresa() {
      try {
        try {
          const filiaisPorUsuario = await this.$api.get(
            `/api/user-branch/user=${this.user.id}`
          );
          const idFiliaisUser = filiaisPorUsuario.map((fpu) => fpu.idBranch);

          const response = await this.$api.get(
            `/api/company-branch?id_company=${this.idCompany}`
          );

          this.filiais = response.filter((f) => !idFiliaisUser.includes(f.id));
        } catch (error) {
          if (error.response && error.response.status == 404) {
            const response = await this.$api.get(
              `/api/company-branch?id_company=${this.idCompany}`
            );
            this.filiais = response;

            console.log(error.response.status);
          }
        }
        if (!this.idCompany) {
          this.$toast.error("Selecione uma categoria primeiro");
          return this.$router.push("/categories");
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async verServicos(filial) {
      try {
        const response = await this.$api.get(`/api/schedule-branch`, {
          params: { id_branch: filial.id },
        });
        const agendas = response;
        this.$router.push({
          name: "services",
          params: {
            idFilial: filial.id,
            agendas: agendas,
            idCompany: this.idCompany,
            ...this.$route.params,
          },
        });
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async filiaisByUser() {
      try {
        try {
          const filiaisPorUsuario = await this.$api.get(
            `/api/user-branch/user=${this.user.id}`
          );
          const filiaisPorEmpresa = await this.$api.get(
            `/api/company-branch?id_company=${this.idCompany}`
          );
          const idFiliaisUser = filiaisPorUsuario.map((fpu) => fpu.idBranch);
          const filiaisUserVinculado = filiaisPorEmpresa.filter((fpe) => {
            return idFiliaisUser.includes(fpe.id);
          });
          for (const filial of filiaisUserVinculado) {
            const userBranchInfo = filiaisPorUsuario.find(
              (fpu) => fpu.idBranch === filial.id
            );
            filial.creditos = userBranchInfo.credits;
          }

          this.filiaisUserVinculado = filiaisUserVinculado;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            this.filiaisUserVinculado = [];
          }
        }
      } catch (error) {
        this.$toast.error("111DASGDSG");
      }
    },

    voltarParaEmpresas() {
      this.$router.replace({
        name: "companies",
        params: { businessType: this.$route.params.businessType },
      });
    },
  },
};
</script>
