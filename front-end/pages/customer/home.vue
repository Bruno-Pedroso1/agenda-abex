<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols="8">
        <v-img
          style="border-radius: 24px"
          max-width="800"
          max-height="220"
          :src="fotos[0]"
        ></v-img>
      </v-col>
      <v-col cols="4">
        <v-img
          style="border-radius: 24px"
          class="mb-5"
          max-width="400"
          max-height="100"
          :src="fotos[1]"
        ></v-img>
        <v-img
          style="border-radius: 24px"
          max-width="400"
          max-height="100"
          :src="fotos[2]"
        ></v-img>
      </v-col>
    </v-row>
    <v-row class="mt-5 align-center">
      <v-col>
        <v-row style="gap: 15px">
          <span style="font-size: 28px">Dental Dura</span>
          <span style="font-size: 18px; font-weight: 300;  10px">•</span>
          <span style="font-size: 18px; font-weight: 300;  10px"
            >Clinica Odontológica</span
          >
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-tabs
        v-model="tabs"
        background-color="#D7D7D7"
        color="#212121"
        slider-color="#036DCF"
        grow
      >
        <v-tab value="1">Serviços</v-tab>
        <v-tab value="2">Planos</v-tab>
        <v-tab value="3">Profissionais</v-tab>
        <v-tab-item key="1">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row class="justify-space-around mt-10 mb-5">
                <v-col cols="5">
                  <v-text-field
                    v-model="pesquisa"
                    id="search"
                    label="Buscar serviço..."
                    hint="A pesquisa pode ser feita pelo nome do serviço ou do profissional!"
                    append-icon="mdi-magnify"
                    outlined
                    dense
                    autofocus
                    @focus="pesquisarServico"
                    @input="pesquisarServico"
                  ></v-text-field>
                  <v-card
                    style="border: #d7d7d7 1px solid"
                    v-scroll.self="onScroll"
                    class="overflow-y-auto over"
                    max-height="400"
                  >
                    <v-card-text>
                      <v-row
                        v-for="item in servicos"
                        :key="item.id"
                        class="mb-3 justify-center align-center"
                      >
                        <v-card
                          id="cardService"
                          class="mt-5"
                          style="border: #d7d7d7 1px solid"
                          max-height="100"
                          width="430"
                        >
                          <v-card-text>
                            <v-row class="align-center">
                              <v-col cols="2">
                                <v-avatar size="60">
                                  <v-img
                                    style="cursor: pointer"
                                    :src="item.image"
                                    @click="dialogFotoService = true"
                                  ></v-img>
                                </v-avatar>
                              </v-col>
                              <v-col cols="7">
                                <h4>{{ item.nomeServico }}</h4>
                                <h5>R$: {{ item.precoServico }}</h5>
                                <h5>
                                  Profissional: {{ item.nomeFuncionario }}
                                </h5>
                              </v-col>
                              <v-col cols="3">
                                <v-btn
                                  class="blue white--text"
                                  small
                                  @click="step++, selecionaServico(item)"
                                  >Agendar</v-btn
                                >
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="5"> Localização </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row class="mt-3">
                <v-col>
                  <v-btn icon @click="step--">
                    <v-icon color="black"> mdi-arrow-left </v-icon>
                  </v-btn>
                  <v-btn @click="step++">Próximo</v-btn>
                </v-col>
              </v-row>
              <v-row class="mt-5 mb-5 justify-space-around">
                <v-col cols="5">
                  <v-row class="cyan mb-10">
                    <v-col style="height: 100px" class="text-center">
                      <h3>{{ dadosFuncionario.nomeFuncionario }}</h3>
                      <v-avatar
                        style="border: 2px solid #000"
                        class="mt-3"
                        size="80"
                        color="#212121"
                      >
                        <v-img
                          v-if="dadosFuncionario.photo"
                          style="cursor: pointer"
                          :src="dadosFuncionario.photo"
                          @click="dialogFotoFuncionario = true"
                        ></v-img>
                        <v-icon v-else color="#FFF">mdi-account</v-icon>
                      </v-avatar>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-center">
                      <v-date-picker
                        v-model="picker"
                        style="border-radius: 24px; border: solid 2px #d7d7d7"
                        elevation="8"
                        color="blue"
                        locale="Brazil"
                        @click:date="verData"
                        @input="handleDateChange"
                      ></v-date-picker>
                      <h4 class="mt-5 mb-5">
                        Você pode selecionar e agendar mais de um horário, basta
                        selecionar os horários desejados e confirmar a reserva.
                      </h4>
                    </v-col>
                  </v-row>
                  <v-divider class="black mb-3"></v-divider>
                  <h4>Manhã</h4>
                  <v-row class="justify-center">
                    <v-col>
                      <v-autocomplete
                        v-model="horariosSelecionadosManha"
                        class="mt-3 blue"
                        background-color="#D7D7D7"
                        item-color="green"
                        item-text="startTime"
                        :items="horarioManha"
                        filled
                        multiple
                        rounded
                        hide-details
                        deletable-chips
                        clearable
                        small-chips
                        dense
                        label="Selecionar horários"
                        placeholder="Selecionar horários"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-divider class="black mb-3 mt-5"></v-divider>
                  <h4>Tarde</h4>
                  <v-row class="justify-center">
                    <v-col>
                      <v-autocomplete
                        v-model="horariosSelecionadosTarde"
                        class="mt-3 blue"
                        background-color="#D7D7D7"
                        item-color="green"
                        item-text="startTime"
                        :items="horarioTarde"
                        filled
                        multiple
                        rounded
                        hide-details
                        deletable-chips
                        clearable
                        small-chips
                        dense
                        label="Selecionar horários"
                        placeholder="Selecionar horários"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-divider class="black mb-3 mt-5"></v-divider>
                  <v-row>
                    <v-col class="text-center">
                      <v-btn
                        class="blue white--text"
                        @click="(dialogHorario = true), continuarAgendamento()"
                      >
                        Continuaraaaa
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="3">
              <v-row class="mt-2">
                <v-col>
                  <v-btn icon @click="step--">
                    <v-icon color="black">mdi-arrow-left</v-icon>
                  </v-btn>
                  <h3 class="mt-3 ms-5">Forma de pagamento</h3>
                  <v-radio-group v-model="selectedPaymentMethod">
                    <v-radio
                      v-for="method in paymentMethods"
                      :key="method.id"
                      :label="method.type"
                      :value="method.id"
                      class="mt-n3 ms-5"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row class="justify-center text-center mb-5">
                <v-col cols="6">
                  <h1>Aguaradando pagamento...</h1>
                  <h4>
                    Copie o código abaixo para pagar via PIX em qualquer
                    aplicativo habilitado.
                  </h4>
                  <v-btn @click="createPayment"> TESTE PAGAMENTO </v-btn>
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
                  <h1>ATENÇÃO</h1>
                  <h4 class="mb-2">
                    Somente após o pagamento seu horário será confirmado.
                  </h4>
                  FAZER QRCODE
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-tab-item>
        <v-tab-item key="2">
          <h4 class="mt-5 text-center">
            Explore nossos planos e escolha aquele que atende melhor às suas
            necessidades.
          </h4>
          <v-row class="mt-5 mb-5">
            <v-col class="d-flex justify-center">
              <v-card
                style="border: solid 1px #d7d7d7; border-radius: 24px"
                elevation="8"
                width="337"
                height="477"
              >
                <v-card-title>
                  <v-row class="justify-center">
                    <v-col cols="4" class="d-flex justify-end align-center">
                      <v-avatar size="85">
                        <v-img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR02ungVkJHkmOglsNZg9rMvnTIVpKf0QFzXA&usqp=CAU"
                        ></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="8" class="text-start">
                      <h4 class="mt-2">titulo</h4>
                      <h4>subtitulo</h4>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-row class="justify-center">
                    <v-col cols="10" class="text-center">
                      <h4 class="black--text mb-3">texto aqui</h4>
                      <h3 class="mb-3" style="text-decoration: line-through">
                        Valor antigo
                      </h3>
                      <h1 class="blue--text mb-3">R$ Valor atual</h1>
                      <h3 class="mb-3">R$ / MÊS</h3>
                      <h5 class="mb-1 black--text">
                        <v-avatar color="blue" size="25">
                          <v-icon color="white">mdi-check</v-icon>
                        </v-avatar>
                        beneficio
                      </h5>
                      <h5 class="mb-1 black--text">
                        <v-avatar color="blue" size="25">
                          <v-icon color="white">mdi-check</v-icon>
                        </v-avatar>
                        beneficio
                      </h5>
                      <h5 class="mb-1 black--text">
                        <v-avatar color="blue" size="25">
                          <v-icon color="white">mdi-check</v-icon>
                        </v-avatar>
                        beneficio
                      </h5>
                      <h5 class="mb-1 black--text">
                        <v-avatar color="blue" size="25">
                          <v-icon color="white">mdi-check</v-icon>
                        </v-avatar>
                        beneficio
                      </h5>
                      <h5 class="black--text">
                        <v-avatar color="blue" size="25">
                          <v-icon color="white">mdi-check</v-icon>
                        </v-avatar>
                        beneficio
                      </h5>
                    </v-col>
                  </v-row>
                  <v-row class="justify-space-around mb-3">
                    <v-btn class="blue white--text mt-2" rounded elevation="8"
                      >COMPRAR PLANO</v-btn
                    >
                    <v-btn class="blue--text mt-2" rounded elevation="8"
                      >SAIBA MAIS</v-btn
                    >
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item key="3">
          <v-row class="mt-5">
            <v-col
              v-for="item in adm"
              :key="item.id"
              cols="2"
              class="text-center"
            >
              <v-avatar
                style="border: solid 2px #000; cursor: pointer"
                :color="item.corIcone"
                size="80"
                @click="
                  (dialogProfissional = true), selecionaProfissional(item)
                "
              >
                <v-img v-if="item.photo" :src="item.photo"></v-img>
                <v-icon v-else>mdi-account</v-icon>
              </v-avatar>
              <h3>
                {{ item.name }}
              </h3>
              <h5
                v-if="item.specialization"
                class="blue--text"
                style=" Georgia"
              >
                {{ item.specialization.toUpperCase() }}
              </h5>
              <h5 v-else class="red--text" style=" Georgia">
                SEM ESPECIALIDADE
              </h5>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-row>
    <v-dialog v-model="dialogFotoService" width="350" hide-overlay>
      <v-card v-for="item in servicos" :key="item.id">
        <v-img :src="item.image"></v-img>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogFotoFuncionario" width="350" hide-overlay>
      <v-card v-for="item in adm" :key="item.id">
        <v-img :src="item.photo"></v-img>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogHorario" width="410" persistent>
      <v-card>
        <v-card-title class="blue darken-3">
          <v-row>
            <v-col>
              <h3 class="white--text text-center ms-3">
                CONFIRMAR AGENDAMENTO
              </h3>
            </v-col>
            <v-icon class="me-n1" color="#FFF" @click="dialogHorario = false">
              mdi-close
            </v-icon>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="text-center" cols="4">
              <v-avatar style="border: 2px solid #d7d7d7" size="100">
                <v-img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYHwxmmhVawXwKrQEMgF-hHs_JRJy4U2x1wA&usqp=CAU"
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="8">
              <h1 class="black--text mt-4 mb-4">Dental Dura</h1>
              <a href="">
                <h4>
                  R. São domingos, 333 - Líder, Chapecó - SC, 89805-273
                  <v-icon color="blue"> mdi-arrow-right </v-icon>
                </h4>
              </a>
            </v-col>
          </v-row>
          <v-divider
            style="box-shadow: 0px 2px 3px #000"
            class="grey mt-2"
          ></v-divider>
          <v-row class="mt-5 mb-3 align-center">
            <v-col class="text-center" cols="3">
              <v-avatar v-if="dadosFuncionario.photo" size="60">
                <v-img :src="dadosFuncionario.photo"></v-img>
              </v-avatar>
              <v-avatar
                v-else-if="!dadosFuncionario.photo"
                color="#212121"
                size="60"
              >
                <v-icon color="#FFF">mdi-account</v-icon>
              </v-avatar>
            </v-col>
            <v-col class="black--text" cols="7">
              <h3 class="mb-3">{{ dadosFuncionario.nomeFuncionario }}</h3>
              <h4>{{ dadosFuncionario.nomeServico }}</h4>
            </v-col>
            <v-col cols="2">
              <h5>19 SET</h5>
            </v-col>
          </v-row>
          <v-divider
            style="box-shadow: 0px 2px 3px #000"
            class="grey mt-3 mb -5"
          ></v-divider>
          <h2 class="text-center mb-5 black--text">RESUMO</h2>
          <v-row
            v-for="(agendamento, index) in objetosAgendamento"
            :key="index"
          >
            <v-row
              v-if="
                index === 0 ||
                agendamento.dataAgendamento !==
                  objetosAgendamento[index - 1].dataAgendamento
              "
              class="align-center mb-3"
            >
              <v-icon color="black" class="justify-center"
                >mdi-calendar-clock</v-icon
              >
              <h4>{{ agendamento.dataAgendamento }}</h4>
            </v-row>
            <v-row class="mb-3">
              <v-icon class="justify-center" color="black"
                >mdi-clock-outline</v-icon
              >
              <h4 class="justify-center">
                {{ agendamento.horarioSelecionado }}
              </h4>
              <TooltipComponent
                icone="mdi-delete"
                corIcone="red"
                right
                texto="Remover Horário"
                @click="removerHorario(index)"
              />
            </v-row>
          </v-row>
          <v-row>
            <p class="align-end green--text">
              Valor Total: R$ {{ valorTotal }}
            </p>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-col>
            <v-btn
              block
              class="green white--text mb-3"
              @click="fazerOutroAgendamentoAsync"
            >
              Fazer outro agendamento
            </v-btn>
            <v-btn
              block
              class="blue darken-3 white--text"
              @click="step++, (dialogHorario = false)"
            >
              Pagamento
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogProfissional" width="724">
      <v-card>
        <v-card-title style="height: 100px" class="cyan lighten-4 text-center">
          <v-col class="mt-n5">
            <h4>{{ dadosFuncionario.name }}</h4>
            <v-avatar size="80" :color="dadosFuncionario.corIcone">
              <v-img
                v-if="dadosFuncionario.photo"
                :src="dadosFuncionario.photo"
              ></v-img>
              <v-icon v-else>mdi-account</v-icon>
            </v-avatar>
          </v-col>
        </v-card-title>
        <v-card-text>
          <v-row class="mt-5 black--text justify-center">
            <h2 class="mt-3 mb-3 text-center">Serviços prestados</h2>
            <v-col cols="10">
              <v-row v-for="item in servicosExibidos" :key="item.id">
                <v-col class="d-flex justify-center">
                  <v-card
                    style="border: solid 1px #d7d7d7"
                    width="400"
                    height="90"
                    elevation="12"
                    rounded
                  >
                    <v-card-text>
                      <v-row>
                        <v-col cols="3" class="text-center">
                          <v-avatar size="60">
                            <v-img :src="item.imagem"></v-img>
                          </v-avatar>
                        </v-col>
                        <v-col class="black--text">
                          <h3 class="mt-2">{{ item.nomeServico }}</h3>
                          <h4>
                            R$:
                            <strong style="color: #008000">{{
                              item.precoServico
                            }}</strong>
                          </h4>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-divider
                style="box-shadow: 1px 2px 3px #000"
                class="black mb-5 mt-5"
              ></v-divider>
              <v-btn
                block
                class="white--text"
                color="#036DCF"
                @click="
                  (dialogProfissional = false),
                    (tabs = 0),
                    adicionarNome(dadosFuncionario)
                "
                >Agendar um serviço</v-btn
              >
              <h5 class="text-center">
                Ao clicar nestes botao você será direcionado para a aba de
                SERVIÇOS
              </h5>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: "Home",
  layout: "customer",
  data() {
    return {
      valorTotal: 0,
      paymentMethods: [],
      selectedPaymentMethod: null,
      horariosSelecionadosManha: [],
      horariosSelecionadosTarde: [],
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      fotos: [
        { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg" },
      ],
      colors: [
        "#0000ff",
        "#7fffd4",
        "#ff0000",
        "#ffa500",
        "#008000",
        "#00ffff",
        "#ffc0cb",
        "#000",
        "#800080",
        "#808080",
        "#a52a2a",
      ],
      servicos: [],
      adm: [],
      horarios: [],
      horariosSelecionados: [],
      horarioManha: [],
      horarioTarde: [],
      agendamentos: [],
      servicosExibidos: [],
      agendasDoUsuario: [],
      dataSelecionada: [],
      meusAg: [],
      preco: [],
      pesquisa: null,
      idAgenda: null,
      idProfissional: null,
      exibeData: null,
      semana: null,
      date: null,
      tabs: null,
      scroll: 0,
      step: 1,
      indexCor: 0,
      dialogFotoService: false,
      dialogFotoFuncionario: false,
      dialogProfissional: false,
      dialogHorario: false,
      dadosAgendamentos: {},
      dadosFuncionario: {},
      users: {
        id: null,
        name: null,
        email: null,
        role: null,
      },
      objetosAgendamento: [],
    };
  },
  async created() {
    await this.google();
    await this.getUsersByToken();
    await this.getDados();
    await this.getUsers();
    await this.getDadosService();
    await this.fetchPaymentMethods();
  },
  methods: {
    async createPayment() {
      try {
        await this.getUsersByToken();
        const paymentRequest = {
          status: "Pagamento Efetivado",
          totalValue: this.valorTotal,
          idUser: this.user.id,
          idPaymentMethod: this.selectedPaymentMethod,
        };
        const paymentResponse = await this.$api.post(
          "/api/payments",
          paymentRequest
        );
        const idPayment = paymentResponse.id;
        for (const objetoAgendamento of this.objetosAgendamento) {
          const formatData = objetoAgendamento.dataAgendamento.split("/");
          const formatFinal = `${formatData[2]}-${formatData[1]}-${formatData[0]}`;
          const agendamentoRequest = {
            dataScheduling: formatFinal,
            timeScheduling: objetoAgendamento.horarioSelecionado,
            status: "Confirmado",
            idSchedule: this.idAgenda,
            idPayment: idPayment,
          };
          await this.$api.post("/api/schedulings", agendamentoRequest);
        }
        this.$toast.success("Pagamento e agendamentos criados com sucesso!");
        this.$router.push("/customer/schedule");
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async fetchPaymentMethods() {
      try {
        const response = await this.$api.get("/api/payment-methods");
        this.paymentMethods = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    removerHorario(index) {
      this.objetosAgendamento.splice(index, 1);
      this.atualizarValorTotal();
    },
    atualizarValorTotal() {
      let quantidadeObjetos = this.objetosAgendamento.length;
      const servicePrice = parseFloat(this.dadosFuncionario.precoServico);
      if (quantidadeObjetos > 0) {
        const valorTotal = quantidadeObjetos * servicePrice;
        this.objetosAgendamento.forEach((objeto) => {
          objeto.valorTotal = valorTotal.toFixed(2);
        });
        this.valorTotal = valorTotal.toFixed(2);
      } else {
        this.valorTotal = "0.00";
      }
    },
    adicionarNome(dadosFuncionario) {
      this.pesquisa = dadosFuncionario.name;
    },
    handleDateChange() {
      this.continuarAgendamento();
    },
    verData(picker) {
      const data = new Date(picker);
      data.setDate(data.getDate() + 1);
      let semana = new Date(picker).getDay() + 2;
      const t = new Date(data).toLocaleDateString();
      if (semana === 8) {
        semana = 1;
      }
      this.semana = semana;
      this.dataSelecionada = data;
      this.selecionaServico(
        this.dadosFuncionario,
        this.semana,
        picker,
        this.dataSelecionada
      );
      this.dadosAgendamentos = {
        dataAgendamento: this.dataSelecionada,
        Funcionario: this.dadosFuncionario.idAgenda,
        weekDay: this.semana,
      };
    },
    async selecionaServico(item, weekDay, dataSelecionada) {
      this.dadosFuncionario = item;
      this.idProfissional = item.id;
      this.idAgenda = item.idAgenda;
      const response = await this.$api.get("/api/schedules");
      this.horarios = response;
      const horariosFiltrados = this.horarios.filter(
        (index) => index.idSchedule == this.idAgenda && index.weekDay == weekDay
      );
      this.horarioManha = [];
      this.horarioTarde = [];
      const agendamentos = await this.$api.get("/api/agendamentos");
      this.meusAg = agendamentos;
      this.horariosDisponiveis = horariosFiltrados.map((horario) => {
        const marcado = this.meusAg.some(
          (agenda) =>
            agenda.id_schedule == horario.idSchedule &&
            agenda.start_time == horario.startTime &&
            agenda.week_day == horario.weekDay &&
            agenda.data_scheduling == dataSelecionada &&
            agenda.status == "Confirmado"
        );
        const selecionado = false;
        return { ...horario, selecionado, marcado };
      });
      for (const tempo of this.horariosDisponiveis) {
        if (tempo.startTime) {
          const startTimeHours = tempo.startTime.split(":")[0];
          if (startTimeHours < 12) {
            this.horarioManha.push(tempo);
          } else {
            this.horarioTarde.push(tempo);
          }
        }
      }
    },
    async fazerOutroAgendamentoAsync() {
      const horariosSelecionados = this.horariosDisponiveis.filter(
        (horario) => horario.selecionado
      );
      this.horariosSelecionados.push(...horariosSelecionados);
      this.horarioManha = [];
      this.horarioTarde = [];
      this.horariosDisponiveis.forEach((horario) => {
        horario.selecionado = false;
      });
      this.dialogHorario = false;
    },
    async selecionaProfissional(item) {
      this.dadosFuncionario = item;
      const idProfissional = item.id;
      const agenda = await this.$api.get("/api/schedule");
      const agendasFiltradas = agenda.filter(
        (ag) => ag.idUser === idProfissional
      );
      const idAgendas = agendasFiltradas.map((schedule) => schedule.id);
      this.agendasDoUsuario = idAgendas;
      this.servicosExibidos = [];
      idAgendas.forEach(async (id) => {
        const response = await this.$api.get(`/api/schedule/${id}`);
        const servicoPorAgenda = response.idServices;
        const responseServico = await this.$api.get(
          `/api/services/${servicoPorAgenda}`
        );
        this.servicosExibidos.push({
          imagem: responseServico.image,
          nomeServico: responseServico.name,
          precoServico: response.servicePrice.toFixed(2),
        });
      });
    },
    onScroll() {
      this.scroll++;
    },
    continuarAgendamento() {
      const horariosSelecionados = [
        ...this.horariosSelecionadosManha,
        ...this.horariosSelecionadosTarde,
      ];
      const objetosAgendamentoSelecao = [];
      for (const horarioSelecionado of horariosSelecionados) {
        const horarioString = Array.isArray(horarioSelecionado)
          ? horarioSelecionado.join(":")
          : horarioSelecionado;
        const objetoAgendamento = {
          dataAgendamento: this.dataSelecionada.toLocaleDateString(),
          Funcionario: this.dadosAgendamentos.Funcionario,
          weekDay: this.dadosAgendamentos.weekDay,
          horarioSelecionado: horarioString,
        };
        objetosAgendamentoSelecao.push(objetoAgendamento);
      }
      this.objetosAgendamento = this.objetosAgendamento.concat(
        objetosAgendamentoSelecao
      );
      const quantidadeAgendamentos = this.objetosAgendamento.length;
      const valorServico = this.dadosFuncionario.precoServico;
      const valorParaPagar = valorServico * quantidadeAgendamentos;
      this.valorTotal = valorParaPagar.toFixed(2);
      this.horariosSelecionadosManha = [];
      this.horariosSelecionadosTarde = [];
    },
    async google() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      try {
        if (code) {
          const response = await this.$api.post("/google/codeForToken", {
            code,
          });
          const token = response.access_token;
          localStorage.setItem("toksen", token);
          console.log(token);
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    setaCorIcone() {
      if (this.indexCor > 10) {
        this.indexCor = 0;
      }
      return this.colors[this.indexCor];
    },
    randomColor() {
      const random = Math.floor(Math.random() * this.colors.length);
      return random;
    },
    pesquisarServico() {
      let input = document.getElementById("search");
      let cards = document.querySelectorAll("#cardService");
      let inputed = input.value.toLowerCase();
      cards.forEach((card) => {
        let nomeServico = card.querySelector("h4").textContent.toLowerCase();
        let nomeFuncionario = card
          .querySelector("h5:nth-child(3)")
          .textContent.toLowerCase();
        if (
          nomeServico.includes(inputed) ||
          nomeFuncionario.includes(inputed)
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    },
    async getUsersByToken() {
      const { data } = await this.$api.get("/api/users/by-token");
      if (data) {
        this.user = {
          id: data.id,
          email: data.email,
          role: data.role,
          name: data.name,
        };
        console.log(data);
      } else {
        this.$toast.error("Faça o login");
        return this.$router.push("/");
      }
    },
    async getDados() {
      try {
        const [pagamentos, admin, servicos, meusag, pagt] = await Promise.all([
          this.$api.get("/api/payment-methods"),
          this.$api.get("/api/schedule"),
          this.$api.get("/api/services"),
          this.$api.get("/api/agendamentos"),
          this.$api.get("/api/payments"),
        ]);
        this.pagt = pagt;
        this.meusag = meusag;
        this.pagamentos = pagamentos;
        this.admin = admin;
        this.servicos = servicos;
        const idUser = this.idUser;
        const response = await this.$api.get(`/api/schedule`);
        if (this.user.role === "superadmin") {
          this.agendasDoUsuario = this.meusag.map(
            (agenda) => agenda.id_schedule
          );
        } else {
          this.agendasDoUsuario = response.filter(
            (agenda) => agenda.idUser === idUser
          );
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async validateLogin() {
      try {
        let token = localStorage.getItem("toksen");
        if (!token) {
          this.$toast.warning("Por favor efetue o login");
          return this.$router.push("/");
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getDadosService() {
      try {
        const response = await this.$api.get("/api/schedule-services");
        this.servicos = response.map((item) => ({
          ...item,
          precoServico: parseFloat(item.precoServico).toFixed(2),
        }));
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    copiarCodigo() {
      const input = document.getElementById("codigoPix");
      navigator.clipboard.writeText(input.value).then(() => {
        this.$toast.info("Código copiado para a área de transferência!");
      });
    },
    async getUsers() {
      try {
        const response = await this.$api.get("/api/users");
        this.adm = response.filter((func) => func.role === "admin");
        this.adm.forEach((user) => {
          user.corIcone = this.setaCorIcone();
          this.indexCor++;
        });
      } catch (error) {
        return this.$toast.error(error.message);
      }
    },
  },
};
</script>
<!-- <style>
  #profissionais:hover, #cardService:hover {
  transition: 0.4s;
  transform: scale(1.05);
  }
  ::selection {
  background-color: #8fbabc; 
  color: #000;
  }
</style> -->
