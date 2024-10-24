<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h1>Seja bem vindo a tela de gerenciamento</h1>
      </v-col>
    </v-row>
      <v-col md="6" class="justify-center">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Usuários</h2>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col md="6">
                <v-btn
                class="primary mb-5"
                block
                to="/sso/user"
                >
                  Todos
                </v-btn>
                <v-btn
                class="primary"
                block
                to="/sso/getCustomer"
                >
                  Clientes
                </v-btn>
              </v-col>
              <v-col md="6">
                <v-btn
                class="primary mb-5"
                block
                to="/sso/getUsersAdmin"
                >
                  Administradores
                </v-btn>
                <v-btn
                class="primary"
                block
                to="/sso/getMasterUsers"
                >
                  Donos de Empresa
                </v-btn>
              </v-col>
              <v-col md="12">
                <v-btn
                class="primary"
                block
                to="/sso/getSuperUsers"
                >
                  Super Administradores
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    <v-row>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Países</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/countries"
            >
              Ver países
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Estados</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/states"
            >
              Ver estados
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Cidades</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/cities"
            >
              Ver cidades
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Empresas</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/company"
            >
              Ver empresas
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Integrações</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/integration"
            >
              Ver integrações
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Filiais</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/branch"
            >
              Ver filiais
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Endereços</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/address"
            >
              Ver endereços
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Serviços</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/services"
            >
              Ver serviços
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Métodos de pagamentos</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/paymentMethods"
            >
              Ver métodos de pagamentos
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Pagamentos</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/payments"
            >
              Ver pagamentos
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Agendas</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/schedule"
            >
              Ver agendas
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Horários</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/schedules"
            >
              Ver horários
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Agendamentos</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/scheduling"
            >
              Ver agendamentos
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Usuários - Filiais</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/userBranch"
            >
              Ver usuários - filiais
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Vouchers</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/voucher"
            >
              Ver vouchers
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title class="justify-center">
            <h2>Pagamentos vouchers</h2>
          </v-card-title>
          <v-card-text>
            <v-btn
            class="primary"
            block
            to="/sso/paymentVoucher"
            >
              Ver pagamentos vouchers
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "homeSuperAdmin",

  data() {
    return {
      users: {
        id: null,
        name: null,
        email: null,
        role: null,
      },
    };
  },

  async created() {
    await this.getUSerByToken();
    await this.validateLogin();
  },

  methods: {
    async getUSerByToken() {
      try {
        const { data } = await this.$api.get("/api/users/by-token");
        if (data) {
          this.users = {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
          };
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async validateLogin() {
      try {
        let token = localStorage.getItem("toksen");
        if (!token) {
          this.$toast.info("Faça o login!");
          return this.$router.push("/");
        }
        let response = await this.$axios.post(
          "http://localhost:3333/api/users/verify",
          { authorization: `Bearer ${token}` }
        );
        if (response.status === 200) {
          if (
            response.data.type === "unauthorized" ||
            response.data.type === "forbidden"
          ) {
            this.$toast.info(
              "Você não tem permissão para acessar esse recurso"
            );
            return this.$router.push("/customer/home");
          }
          if (response.data.message === "Permissão de administrador") {
            this.$toast.info(
              "Você não tem permissão para acessar esse recurso"
            );
            return this.$router.push("/admin/dashboard");
          }
        } else {
          console.error("Erro inesperado:", response);
          this.$toast.error(
            "Ocorreu um erro inesperado durante a validação do token"
          );
          return this.$router.push("/customer/home");
        }
      } catch (error) {
        return this.$router.push("/customer/home");
      }
    },
  },
};
</script>

<style>
  .v-btn:hover{
    transition: 0.5s;
    transform: scale(1.1);
  }
</style>