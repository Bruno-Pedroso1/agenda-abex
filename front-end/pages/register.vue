<template>
  <v-container>
    <v-form v-model="valid" @submit.prevent="registerCustomer">
      <v-row class="justify-center align-center">
        <h1 style="font-size: 60px">
          TimelyAPP
        </h1>
      </v-row>

      <v-row>
        <v-col>
          <h2 class="text-center text-break">Complete o fomulario abaixo para concluir o cadastro</h2>
        </v-col>
      </v-row>

      <v-row class="justify-center">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="user.name"
            outlined
            clearable
            label="Nome Completo"
            placeholder="Nome Completo"
            color="blue"
            prepend-inner-icon="mdi-account"
            :rules="[rule.password]"
            @keyup.enter="registerCustomer"
          ></v-text-field>
          <v-text-field
            v-model="user.taxIdentificationNumber"
            v-mask="['###.###.###-##', '##.###.###/####-##']"
            outlined
            clearable
            label="CPF"
            placeholder="CPF"
            color="blue"
            prepend-inner-icon="mdi-card-account-details-outline"
            :rules="[rule.password]"
            @keyup.enter="registerCustomer"
          ></v-text-field>
          <v-text-field
            v-model="user.phone"
            v-mask="['(##) # ####-####', '(##) ####-####']"
            outlined
            clearable
            label="Celular"
            placeholder="Celular"
            color="blue"
            prepend-inner-icon="mdi-phone"
            :rules="[rule.password]"
            @keyup.enter="registerCustomer"
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            outlined
            clearable
            type="email"
            label="Email"
            placeholder="Email"
            color="blue"
            prepend-inner-icon="mdi-email"
            :rules="[rule.password]"
            @keyup.enter="registerCustomer"
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            outlined
            clearable
            label="Senha"
            placeholder="Senha"
            color="blue"
            prepend-inner-icon="mdi-lock"
            :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
            :type="show ? 'text' : 'password'"
            :rules="[rule.password]"
            @keyup.enter="registerCustomer"
            @click:append="toggleShow"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="justify-center mb-5 text-center">
        <span
          >Ao continuar, você está concordando com nossos
          <a href="##">Termos de Uso</a>
          e
          <a href="##">Política de Privacidade</a>
        </span>
      </v-row>

      <v-row class="justify-center">
        <v-btn class="blue white--text mb-5" @click="registerCustomer"
          >Cadastrar</v-btn
        >
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "LoginsPage",
  layout: "login",

  data() {
    return {
      valid: false,
      show: false,
      user: {
        email: null,
        name: null,
        phone: null,
        password: null,
        role: "customer",
        taxIdentificationNumber: null,
      },
      rule: {
        password: (v) => !!v || "Esse campo é obrigatório",
      },
    };
  },
  methods: {
    async registerCustomer() {
      try {
        if (!this.valid) {
          return this.$toast.warning("Informe todas as opções!");
        }
        const user = {
          email: this.user.email,
          name: this.user.name,
          phone: this.user.phone,
          password: this.user.password,
          role: this.user.role,
          taxIdentificationNumber: this.user.taxIdentificationNumber,
        };
        const response = await this.$axios.$post(
          "http://localhost:3333/api/users",
          user
        );
        if (response.type === "success") {
          this.$toast.success("Usuário cadastrado com sucesso!");
          this.$router.push("/");
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    toggleShow() {
      this.show = !this.show;
    },
  },
};
</script>

<style></style>
