<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">Meus endereços</h1>
      </v-col>
    </v-row>

    <v-btn
      fab
      small
      color="green"
      @click="
        dialog = true;
        clear();
      "
    >
      <v-icon> mdi-plus </v-icon>
    </v-btn>
    <v-row class="d-flex align-center flex-column mt-10">
      <v-card width="900">
        <v-data-table :headers="headers" :items="items">
          <template #item.actions="{ item }">
            <TooltipComponent
              icone="mdi-delete"
              corIcone="red"
              left
              texto="Excluir"
              @click="desvinculoUser"
            />
            <TooltipComponent
              icone="mdi-pencil"
              corIcone="green"
              left
              texto="Editar"
              @click="update(item)"
            />
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="id"
                outlined
                disabled
                color="green"
                placeholder="ID do Endereço"
                label="ID do Endereço"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="zipCode"
                v-mask="['#####-###']"
                outlined
                color="green"
                placeholder="CEP"
                label="CEP"
                @input="searchZipCode"
              />
              <v-text-field
                v-model="district"
                outlined
                color="green"
                placeholder="Bairro"
                label="Bairro"
              />
              <v-text-field
                v-model="street"
                outlined
                color="green"
                placeholder="Rua"
                label="Rua"
              />
              <v-text-field
                v-model="number"
                outlined
                color="green"
                placeholder="Número"
                label="Número"
              />
              <v-text-field
                v-model="complement"
                outlined
                color="green"
                placeholder="Complemento"
                label="Complemento"
              />
              <v-select
                v-model="selectedCity"
                :items="cities"
                item-text="name"
                item-value="id"
                outlined
                color="green"
                placeholder="Nome da Cidade"
                label="Nome da Cidade"
              />
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="persist">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  layout: "customer",
  data() {
    return {
      cities: [],
      selectedCity: null,
      items: [],
      dialog: false,
      id: null,
      zipCode: "",
      complement: null,
      number: null,
      street: null,
      district: null,
      user: {
        email: null,
        role: null,
        name: null,
        id: null,
      },
      headers: [
        {
          text: "CEP",
          value: "zipCode",
          align: "center",
        },
        {
          text: "Cidade",
          value: "cityName",
          align: "center",
        },
        {
          text: "Complemento",
          value: "complement",
          align: "center",
        },
        {
          text: "Número",
          value: "number",
          align: "center",
        },
        {
          text: "Rua",
          value: "street",
          align: "center",
        },
        {
          text: "Bairro",
          value: "district",
          align: "center",
        },
        { text: "", value: "actions", filterable: false },
      ],
    };
  },
  async created() {
    await this.getUserByToken();
    await this.getAllCities();
    await this.getAllAddresses();
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
    clear() {
      this.zipCode = "";
      this.selectedCity = null;
      this.complement = "";
      this.number = "";
      this.street = "";
      this.district = "";
      this.id = null;
    },

    update(item) {
      this.zipCode = item.zipCode;
      this.selectedCity = item.idCity;
      this.complement = item.complement;
      this.number = item.number;
      this.street = item.street;
      this.district = item.district;
      this.id = item.id;
      this.dialog = true;
    },

    async getAllAddresses() {
      try {
        const userId = this.user.id;
        const userResponse = await this.$api.get(`/api/users/${userId}`);
        if (userResponse && userResponse.idAddresses) {
          const idAddresses = userResponse.idAddresses;
          if (idAddresses) {
            const addressResponse = await this.$api.get(
              `/api/addresses/${idAddresses}`
            );
            const cityResponse = await this.$api.get(
              `/api/cities/${addressResponse.idCity}`
            );

            if (cityResponse) {
              this.items = [
                {
                  ...addressResponse,
                  cityName: cityResponse.name,
                },
              ];
            } else {
              this.items = [];
            }
          }
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllCities() {
      try {
        const response = await this.$api.get("/api/cities");
        this.cities = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async desvinculoUser() {
      try {
        await this.$api.patch(`/api/users/${this.user.id}`, {
          idAddresses: null,
        });
        this.items = [];
        await this.getAllAddresses();
        this.$toast.success("Endereço Removido");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async searchZipCode() {
      try {
        if (this.zipCode.length === 9) {
          const response = await this.$api.get(
            `https://viacep.com.br/ws/${this.zipCode}/json/`
          );

          this.street = response.logradouro;
          this.district = response.bairro;
        }
      } catch (error) {
        this.$toast.error("Erro ao buscar CEP.");
      }
    },

    async persist() {
      try {
        const addressRequest = {
          zipCode: this.zipCode,
          idCity: this.selectedCity,
          complement: this.complement,
          number: Number(this.number),
          street: this.street,
          district: this.district,
        };

        const addressResponse = await this.$api.post(
          `/api/addresses`,
          addressRequest
        );

        await this.$api.patch(`/api/users/${this.user.id}`, {
          idAddresses: addressResponse.id,
        });

        this.$toast.success("Novo endereço cadastrado e vinculado ao usuário.");
        await this.getAllAddresses();
        this.dialog = false;
      } catch (error) {
        console.log(error.message);
        this.$toast.error("Ocorreu um erro ao persistir os dados.");
      }
    },
  },
};
</script>

<style></style>
