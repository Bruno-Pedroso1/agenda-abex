<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card outlined elevation="8">
          <v-card-title class="justify-center">
            <h2>Gerenciamento</h2>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-btn large color="primary" block href="/admin/users">
                  <v-icon class="mb-1 mr-1">mdi-account-cog-outline</v-icon>
                  Gerenciar Usuários
                  <v-icon class="mb-1 ml-1">mdi-account-cog-outline</v-icon>
                </v-btn>
                <v-btn
                  class="mb-3 mt-3"
                  large
                  color="primary"
                  block
                  href="/admin/agenda"
                >
                  <v-icon class="mb-1 mr-1">mdi-calendar</v-icon>
                  Gerenciar Agendas
                  <v-icon class="mb-1 ml-1">mdi-calendar</v-icon>
                </v-btn>
                <v-btn large color="primary" block href="/admin/schedules">
                  <v-icon class="mb-1 mr-1">mdi-clock</v-icon>
                  Gerenciar Horários
                  <v-icon class="mb-1 ml-1">mdi-clock</v-icon>

                </v-btn>
                <v-btn large class="mt-4 mb-4"color="primary" block href="/admin/schedules">
                  <v-icon class="mb-1 mr-1">mdi-briefcase</v-icon>
                  Gerenciar Serviços
                  <v-icon class="mb-1 ml-1">mdi-briefcase</v-icon>

                </v-btn>
                <v-btn large  class="mt-4 mb-4"color="primary" block href="/admin/schedules">
                  <v-icon class="mb-1 mr-1">mdi-currency-usd-off</v-icon>
                  Gerenciar Vouchers
                  <v-icon class="mb-1 ml-1">mdi-currency-usd-off</v-icon>

                </v-btn>
                
                <v-btn large color="primary" block href="/admin/schedules">
                  <v-icon class="mb-1 mr-1">mdi-office-building</v-icon>
                  Gerenciar Filiais
                  <v-icon class="mb-1 ml-1">mdi-office-building</v-icon>

                </v-btn>

              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Management",
  layout: "admin",
};
</script>

<style></style>
