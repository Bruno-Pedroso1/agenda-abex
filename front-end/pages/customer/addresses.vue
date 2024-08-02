<!-- eslint-disable vue/valid-#item.actions -->
<!-- eslint-disable vue/#item.actions-style -->
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
              @click="dialog = true"
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
              >
              </v-text-field>
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
              ></v-text-field>
              <v-text-field
                v-model="district"
                outlined
                color="green"
                placeholder="Bairro"
                label="Bairro"
              >
              </v-text-field>
              <v-text-field
                v-model="street"
                outlined
                color="green"
                placeholder="Rua"
                label="Rua"
              >
              </v-text-field>
              <v-text-field
                v-model="number"
                outlined
                color="green"
                placeholder="Número"
                label="Número"
              >
              </v-text-field>
              <v-text-field
                v-model="complement"
                outlined
                color="green"
                placeholder="Complemento"
                label="Complemento"
              >
              </v-text-field>
              <v-text-field
                v-model="selectedCity"
                outlined
                color="green"
                placeholder="Nome da Cidade"
                label="Nome da Cidade"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="persist"> Salvar </v-btn>
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
      this.zipCode = null;
      this.selectedCity = null;
      this.complement = null;
      this.number = null;
      this.street = null;
      this.district = null;
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
    async findOrCreateCity(cityName, state) {
      try {
        try {
          await this.$api.get("/api/city-by-state", {
            params: {
              name: cityName,
              idState: state.id,
            },
          });
        } catch (error) {
          if (error.response.status === 400) {
            console.log("oiofdisgśidg");
          }
        }

        console.log(response);
        if (response.length > 0) {
          return response[0];
        } else {
          const newCity = await this.$api.post(
            `/api/city-new/${cityName}/${state.id}`
          );
          return newCity;
        }
      } catch (error) {
        console.error(error.message);
        this.$toast.error("Erro ao procurar ou criar a cidade.");
        throw error;
      }
    },

    async findOrCreateState(stateName) {
      try {
        const response = await this.$api.get("/api/state-by-name", {
          params: {
            name: stateName,
          },
        });

        if (response.length > 0) {
          return response[0];
        } else {
          const newState = await this.$api.post(`/api/state-new/${stateName}`);
          return newState;
        }
      } catch (error) {
        console.error(error.message);
        this.$toast.error("Erro ao procurar ou criar o estado.");
        throw error;
      }
    },

    async checkExistingAddress(addressRequest) {
      try {
        const response = await this.$api.get(`/api/addresses`);

        const existingAddress = response.find((address) => {
          return (
            address.zipCode === addressRequest.zipCode &&
            address.idCity === addressRequest.idCity &&
            address.complement === addressRequest.complement &&
            address.number === addressRequest.number &&
            address.street === addressRequest.street &&
            address.district === addressRequest.district
          );
        });
        return existingAddress || null;
      } catch (error) {
        this.$toast.error(error.message);
        return null;
      }
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
            console.log(addressResponse);
            if (addressResponse && addressResponse.idCity) {
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
        this.$toast.error("rrrr");
      }
    },

    async allStates() {
      const responseStates = await this.$api.get("/api/states");
      this.states = responseStates;
    },

    async allCity() {
      const response = await this.$api.get("/api/cities");
      this.cidades = response;
    },

    async endereco() {
      await this.getUserByToken();
      try {
        try {
          const response = await this.$api.get(
            `https://viacep.com.br/ws/${this.zipCode}/json/`
          );
          await this.$api.get("/api/state-by-name", {
            params: {
              name: response.uf,
            },
          });
          return response.uf;
        } catch (error) {
          if (
            (error.response && error.response.status !== 400) ||
            response.length === 0 ||
            response.length == null
          ) {
            await this.$api.post(`/api/state-new/${response.uf}`);
            await this.allStates();
          }
        }
        try {
          const responseCep = await this.$api.get(
            `https://viacep.com.br/ws/${this.zipCode}/json/`
          );

          const responseStateName = await this.$api.get("/api/state-by-name", {
            params: {
              name: responseCep.uf,
            },
          });

          const cidade = await this.$api.get("/api/city-by-state", {
            params: {
              name: responseCep.localidade,
              idState: responseStateName.id,
            },
          });
          return cidade;
        } catch (error) {
          if (error.response && error.response.status == 400) {
            return cidade;
          }
          if (
            (error.response && error.response.status !== 400) ||
            cidade.length === 0 ||
            cidade == null
          ) {
            const responseCep = await this.$api.get(
              `https://viacep.com.br/ws/${this.zipCode}/json/`
            );

            const responseStateName = await this.$api.get(
              "/api/state-by-name",
              {
                params: {
                  name: responseCep.uf,
                },
              }
            );
            await this.$api.post(
              `/api/city-new/${responseCep.localidade}/${responseStateName.id}`
            );
            await this.allCity();
          }
        }
      } catch (error) {}
    },

    async persist() {
      try {
        const response = await this.$api.get(
          `https://viacep.com.br/ws/${this.zipCode}/json/`
        );
        const state = await this.findOrCreateState(response.uf);

        const city = await this.findOrCreateCity(response.localidade, state);

        const addressRequest = {
          zipCode: this.zipCode,
          idCity: city.id,
          complement: this.complement,
          number: Number(this.number),
          street: this.street,
          district: this.district,
        };

        const existingAddress = await this.checkExistingAddress(addressRequest);

        if (existingAddress) {
          const userUpdateRequest = {
            id: this.user.id,
            idAddresses: existingAddress.id,
          };

          await this.$api.patch(
            `/api/users/${this.user.id}`,
            userUpdateRequest
          );
          this.$toast.success("Endereço associado ao usuário");
        } else {
          const addressResponse = await this.$api.post(
            `/api/addresses`,
            addressRequest
          );

          const userUpdateRequest = {
            id: this.user.id,
            idAddresses: addressResponse.id,
          };

          await this.$api.patch(
            `/api/users/${this.user.id}`,
            userUpdateRequest
          );
          this.$toast.success("Novo endereço cadastrado");
        }

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
