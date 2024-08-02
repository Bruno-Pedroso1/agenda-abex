<template>
  <v-container>
    <header class="text-center mb-5">
      <h1>dsfsdf sdffdfd sdfsdff</h1>
    </header>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-3">
          <v-card-title>xzcsf</v-card-title>
          <v-card-text>
            <p>Agenda ID: {{ detalhesAgenda.id }}</p>
            <p>
              Profissional:
              {{
                nomeProfissional.charAt(0).toUpperCase() +
                nomeProfissional.slice(1)
              }}
            </p>
            <p>Serviço: {{ nomeServico }}</p>
            <p>Valor: R${{ Number(valorServicoAgenda).toFixed(2) }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-col cols="12">
          <v-date-picker
            v-model="picker"
            style="border-radius: 24px; border: solid 2px #d7d7d7"
            elevation="8"
            color="blue"
            locale="Brazil"
            :min="today"
            @click:date="verData"
            @input="handleDateChange"
          ></v-date-picker>
          <h4 class="mt-5 mb-5">
            Você pode selecionar e agendar mais de um horário, basta selecionar
            os horários desejados e confirmar a reserva.
          </h4>
        </v-col>
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
              @click="continuarAgendamento(), (dialogHorario = true)"
            >
              Continuar
            </v-btn>
          </v-col>
        </v-row>
        <v-dialog v-model="dialogHorario" width="410" persistent>
          <v-card>
            <v-card-title class="blue darken-3">
              <v-row>
                <v-col>
                  <h3 class="white--text text-center ms-3">
                    CONFIRMAR AGENDAMENTO
                  </h3>
                </v-col>
                <v-icon
                  class="me-n1"
                  color="#FFF"
                  @click="dialogHorario = false"
                >
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
                  <p>
                    Profissional:
                    {{
                      nomeProfissional.charAt(0).toUpperCase() +
                      nomeProfissional.slice(1)
                    }}
                  </p>
                  <p>Serviço: {{ nomeServico }}</p>
                </v-col>
                <v-col cols="2">
                  <h5>19 SET</h5>
                </v-col>
              </v-row>
              <v-divider
                style="box-shadow: 0px 2px 3px #000"
                class="grey mt-3 mb -5"
              ></v-divider>
              <h2 class="text-center mb-5 black--text mt-3">RESUMO</h2>
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
                  Valor Total: R$ {{ Number(valorTotal).toFixed(2) }}
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
                  @click="(dialogHorario = false), (dialogPagamento = true)"
                >
                  Pagamento
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogPagamento" class="overflow-x-hidden">
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
  </v-container>
</template>

<script>
export default {
  name: "AgendamentosPage",
  layout: "customer",

  data() {
    return {
      dialogHorario: false,
      dialogPagamento: false,
      agendaId: null,
      selectedPaymentMethod: null,
      today: new Date().toISOString().substring(0, 10),
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      valorTotal: 0,
      detalhesAgenda: [],
      horarioManha: [],
      horarioTarde: [],
      objetosAgendamento: [],
      horariosSelecionados: [],
      horariosSelecionadosManha: [],
      horariosSelecionadosTarde: [],
      paymentMethods: [],
      dadosAgendamentos: {},
      dadosFuncionario: {},
    };
  },

  created() {
    this.agendaId = this.$route.params.idAgenda;
    this.idProfissional = this.$route.params.idProfissional;
    this.nomeProfissional = this.$route.params.nomeProfissional;
    this.nomeServico = this.$route.params.nomeDoServico;
    this.valorServicoAgenda = this.$route.params.servicePrice;
    this.getUsersByToken();
    this.getSchedule();
    this.selecionaServico();
    this.fetchPaymentMethods();
  },

  methods: {
    async fetchPaymentMethods() {
      try {
        const response = await this.$api.get("/api/payment-methods");
        this.paymentMethods = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
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
      } else {
        this.$toast.error("Faça o login");
        return this.$router.push("/");
      }
    },
    copiarCodigo() {
      const input = document.getElementById("codigoPix");
      navigator.clipboard.writeText(input.value).then(() => {
        this.$toast.info("Código copiado para a área de transferência!");
      });
    },
    async createPayment() {
      try {
        await this.getUsersByToken();
        try {
          await this.$api.get(
            `/api/user-branch/user=${this.user.id}/filial=${this.idFilialAtual}`
          );
        } catch (error) {
          if (error.response && error.response.status === 404) {
            const newUserBranchResponse = await this.$api.post(
              `/api/user-branch/usuario=${this.user.id}/filial=${this.idFilialAtual}`
            );
            this.$toast.info("Usuário vinculado à filial com sucesso!");
            if (newUserBranchResponse.status === 201) {
              this.$toast.info("Usuário vinculado à filial com sucesso!");
            }
          }
        }
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
    removerHorario(index) {
      this.objetosAgendamento.splice(index, 1);
      this.atualizarValorTotal();
    },
    atualizarValorTotal() {
      let quantidadeObjetos = this.objetosAgendamento.length;
      const servicePrice = this.valorServicoAgenda;
      if (quantidadeObjetos > 0) {
        const valorTotal = quantidadeObjetos * servicePrice;
        this.objetosAgendamento.forEach((objeto) => {
          objeto.valorTotal = valorTotal;
        });
        this.valorTotal = valorTotal;
      } else {
        this.valorTotal = 0.0;
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
    async selecionaProfissional() {
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
    async selecionaServico() {
      this.idAgenda = this.agendaId;
      const response = await this.$api.get("/api/schedules");
      this.horarios = response;
      const horariosFiltrados = this.horarios.filter(
        (index) =>
          index.idSchedule == this.idAgenda && index.weekDay == this.semana
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
            agenda.data_scheduling == this.dataSelecionada &&
            agenda.status == "Confirmado"
        );
        const selecionado = false;
        const disponivel = !marcado;
        return { ...horario, selecionado, disponivel };
      });
      this.horarioManha = this.horariosDisponiveis.filter(
        (tempo) => tempo.disponivel && tempo.startTime.split(":")[0] < 12
      );
      this.horarioTarde = this.horariosDisponiveis.filter(
        (tempo) => tempo.disponivel && tempo.startTime.split(":")[0] >= 12
      );
    },
    handleDateChange() {
      this.continuarAgendamento();
    },

    continuarAgendamento() {
      const horariosSelecionados = [
        ...this.horariosSelecionadosManha,
        ...this.horariosSelecionadosTarde,
      ];
      const existeConflito = horariosSelecionados.some((horarioSelecionado) => {
        const horarioString = Array.isArray(horarioSelecionado)
          ? horarioSelecionado.join(":")
          : horarioSelecionado;
        return this.objetosAgendamento.some(
          (agendamento) =>
            agendamento.dataAgendamento === this.dataSelecionada &&
            agendamento.horarioSelecionado === horarioString
        );
      });
      if (existeConflito) {
        this.$toast.error("Você já selecionou este horário nesta data.");
        return;
      }
      const objetosAgendamentoSelecao = [];
      for (const horarioSelecionado of horariosSelecionados) {
        const horarioString = Array.isArray(horarioSelecionado)
          ? horarioSelecionado.join(":")
          : horarioSelecionado;
        const objetoAgendamento = {
          dataAgendamento: this.dataSelecionada,
          Funcionario: this.detalhesAgenda.id,
          weekDay: this.dadosAgendamentos.weekDay,
          horarioSelecionado: horarioString,
        };
        objetosAgendamentoSelecao.push(objetoAgendamento);
      }

      this.objetosAgendamento = this.objetosAgendamento.concat(
        objetosAgendamentoSelecao
      );
      const quantidadeAgendamentos = this.objetosAgendamento.length;
      const valorServico = this.servicoPorAgenda;
      const valorParaPagar = valorServico * quantidadeAgendamentos;
      this.valorTotal = valorParaPagar.toFixed(2);
      this.atualizarValorTotal();
      this.horariosSelecionadosManha = [];
      this.horariosSelecionadosTarde = [];
    },

    verData(picker) {
      const data = new Date(picker);
      data.setDate(data.getDate());
      let semana = new Date(picker).getDay() + 2;
      const t = new Date(data).toLocaleDateString();
      if (semana === 8) {
        semana = 1;
      }
      this.semana = semana;
      this.dataSelecionada = data.toISOString().split("T")[0];
      this.selecionaServico(this.semana, picker, this.dataSelecionada);
      this.dadosAgendamentos = {
        dataAgendamento: this.dataSelecionada,
        Funcionario: this.detalhesAgenda.id,
        weekDay: this.semana,
      };
    },

    async getSchedule() {
      try {
        if (this.agendaId) {
          const response = await this.$api.get(
            `/api/schedule/${this.agendaId}`
          );
          this.detalhesAgenda = response;
          const idBranch = response.idBranch;
          this.idFilialAtual = idBranch;
        } else {
          this.$toast.error("Selecione uma categoria primeiro");
          return this.$router.push("/categories");
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>
