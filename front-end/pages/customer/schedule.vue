<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" md="4">
        <v-btn
          class="white--text"
          :color="mostrarEventosConfirmados ? 'blue' : '#FF1493'"
          block
          @click="toggleEventos('confirmados')"
          v-if="!mostrarEventosCancelados && !mostrarEventosRealizados"
        >
          {{
            mostrarEventosConfirmados
              ? "Todos os Agendamentos"
              : "Agendamentos Confirmados"
          }}
        </v-btn>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn
          class="white--text"
          :color="mostrarEventosRealizados ? 'blue' : 'green'"
          block
          @click="toggleEventos('realizados')"
          v-if="!mostrarEventosCancelados && !mostrarEventosConfirmados"
        >
          {{
            mostrarEventosRealizados
              ? "Todos os Agendamentos"
              : "Agendamentos Realizados"
          }}
        </v-btn>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn
          class="mb-5 white--text"
          :color="mostrarEventosCancelados ? 'blue' : 'red'"
          block
          @click="toggleEventos('cancelados')"
          v-if="!mostrarEventosRealizados && !mostrarEventosConfirmados"
        >
          {{
            mostrarEventosCancelados
              ? "Todos os Agendamentos"
              : "Agendamentos Cancelados"
          }}
        </v-btn>
      </v-col>
    </v-row>
    <v-sheet>
      <v-row class="text-center align-center mb-2 mt-2">
        <v-col cols="12" md="3">
          <v-btn class="mr-5" outlined height="40" @click="setToday">
            Hoje
          </v-btn>
          <v-btn class="mr-5" fab small @click="prev">
            <v-icon> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn class="mr-5" fab small @click="next">
            <v-icon> mdi-chevron-right </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="weekday"
            :items="weekdays"
            outlined
            dense
            hide-details
            label="Dias da semana"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ types[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Dia</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mês</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 dias</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3"> </v-col>
      </v-row>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="agenda"
          locale="Brazil"
          color="cyan"
          :events="eventosAgendamento"
          :type="type"
          :mode="calendarMode"
          @click:date="viewDay"
          @click:more="dataCerta"
          :weekdays="weekday"
          :event-more="true"
          @click:event="verDetalhes"
        >
        </v-calendar>
      </v-sheet>
    </v-sheet>
    <v-dialog
      v-model="eventoSelecionadoDialog"
      width="600"
      class="overflow-hidden"
    >
      <v-card>
        <v-card-title class="justify-center">
          <h1 class="text-center text-break mb-3 mt-3">
            Detalhes do Agendamento
          </h1>
        </v-card-title>
        <v-card-text class="black--text">
          <v-row>
            <v-col>
              <h3 class="mt-2 mb-2">
                Data: {{ eventoSelecionado.dataScheduling }}
              </h3>
              <h3 class="mt-2 mb-2">
                Horário de Inicio:
                {{ eventoSelecionado.startTime }}
              </h3>
              <h3 class="mt-2 mb-2">
                Horário Final:
                {{ eventoSelecionado.endTime }}
              </h3>
              <h3 class="mt-2 mb-2">
                Forma de Pagamento: {{ eventoSelecionado.type }}
              </h3>
              <h3 class="mt-2 mb-2">
                Nome do Funcionário:
                {{ eventoSelecionado.nomeFuncionario }}
              </h3>
              <h3 class="mt-2 mb-2">
                Contato: {{ eventoSelecionado.foneFuncionario }}
              </h3>
              <h3 class="mt-2 mb-2">
                Serviço: {{ eventoSelecionado.nameServices }}
              </h3>
              <h3 class="mt-2 mb-2">Status: {{ eventoSelecionado.status }}</h3>
              <h3 class="mt-2 mb-2">
                Valor do Serviço: R$:
                {{ eventoSelecionado.servicePrice }}
              </h3>
              <h3 class="mt-2 mb-2">
                Data máxima para cancelar:
                {{ eventoSelecionado.formatarReagendar }}
              </h3>
              <h5>
                O cancelamento após a data máxima será cobrada uma taxa de
                {{ eventoSelecionado.fee }}%
              </h5>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions
          v-if="
            eventoSelecionado.status !== 'Cancelado' &&
            eventoSelecionado.tempoAtualDat < eventoSelecionado.dataAg
          "
        >
          <v-col class="mb-2">
            <v-btn
              color="green"
              @click="
                editarEventoDialog = true;
                eventoSelecionadoDialog = false;
              "
            >
              EDITAR
            </v-btn>
            <v-btn color="yellow" @click="cancelarAgendamento">
              Cancelar Agendamento
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editarEventoDialog" width="600" class="overflow-hidden">
      <v-card>
        <v-card-title class="justify-center">
          <h1 class="text-center text-break mb-3 mt-3">Informações Atuais</h1>
        </v-card-title>
        <v-card-text class="black--text">
          <h3>Data: {{ eventoSelecionado.dataScheduling }}</h3>
          <h3 class="mt-3 mb-3">
            Horário de Início: {{ eventoSelecionado.startTime }}
          </h3>
          <h3>Horário Final: {{ eventoSelecionado.endTime }}</h3>
          <v-row>
            <v-col class="text-center mt-2">
              <v-date-picker
                v-model="selectedEventDate"
                width="480"
                style="border-radius: 24px; border: solid 2px #d7d7d7"
                elevation="8"
                color="blue"
                locale="Brazil"
                :min="today"
                @click:date="verData"
              ></v-date-picker>
              <h4 class="mt-5">Horários Disponíveis</h4>
              <v-autocomplete
                v-model="horarioSelecionadoEdit"
                class="mt-3 blue"
                :items="horariosT"
                background-color="#D7D7D7"
                item-color="green"
                item-text="startTime"
                filled
                rounded
                hide-details
                deletable-chips
                clearable
                dense
                label="Selecionar horário"
                placeholder="Selecionar horário"
              ></v-autocomplete>
              <v-btn color="green" class="mt-4" block @click="continuar">
                Continuar
              </v-btn>
              <v-btn
                color="red"
                class="mt-4"
                block
                @click="editarEventoDialog = false"
              >
                Cancelar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "agendaCliente",
  layout: "customer",
  data() {
    return {
      horariosT: [],
      horarios: [],
      horarioSelecionadoEdit: [],
      dataScheduling: null,
      activePicker: null,
      selectedEventDate: null,
      eventoSelecionado: {},
      editarEventoDialog: false,
      eventoSelecionadoDialog: false,
      mostrarEventosRealizados: false,
      mostrarEventosCancelados: false,
      mostrarEventosConfirmados: false,
      calendarMode: "month",
      type: "month",
      weekday: [0, 1, 2, 3, 4, 5, 6],
      agenda: "",
      types: {
        month: "Mês",
        week: "Semana",
        day: "Dia",
        "4day": "4 Days",
      },
      today: new Date().toISOString().substring(0, 10),
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      weekdays: [
        { text: "Dom - Sab", value: [0, 1, 2, 3, 4, 5, 6] },
        { text: "Seg - Dom", value: [1, 2, 3, 4, 5, 6, 0] },
        { text: "Seg - Sex", value: [1, 2, 3, 4, 5] },
        { text: "Seg, Qua, Sex", value: [1, 3, 5] },
      ],
      eventosAgendamento: [],
      user: {
        id: null,
        email: null,
        role: null,
        name: null,
      },
    };
  },

  async created() {
    await this.getUserByToken();
    await this.verAgendamentos();
    await this.horariosS();
    console.log(this.user);
  },
  methods: {
    async continuar() {
      if (this.horarioSelecionadoEdit.length == 0) {
        this.$toast.info("Por favor selecione uma data e um horário!");
        return;
      }
      const dadosAgendamento = {
        idAgendamentoExistente: this.eventoSelecionado.idAgendamento,
        dataAgendamento: this.dataSelecionada,
        horarioAgendamento: this.horarioSelecionadoEdit,
        idPagamento: this.eventoSelecionado.idPayment,
        status: "Confirmado",
        idAgenda: this.eventoSelecionado.idSchedule,
      };
      try {
        const request = {
          dataScheduling: dadosAgendamento.dataAgendamento,
          idPayment: dadosAgendamento.idPagamento,
          idSchedule: dadosAgendamento.idAgenda,
          status: "Confirmado",
          timeScheduling: dadosAgendamento.horarioAgendamento,
        };
        await this.$api.patch(
          `/api/schedulings/${this.eventoSelecionado.idAgendamento}`,
          request
        );
        this.$toast.success("Agendamento Reagendado!");
        this.editarEventoDialog = false;
        await this.verAgendamentos();
      } catch (error) {
        console.log(error.message);
      }
    },

    async cancelarAgendamento() {
      const dataAtual = new Date();
      const tempoParaCancelar = this.eventoSelecionado.timeToReschedule;
      const dataAgendamento = new Date(this.eventoSelecionado.dataAg);
      const dataMaxCancelar = new Date(dataAgendamento);
      dataMaxCancelar.setDate(dataAgendamento.getDate() - tempoParaCancelar);
      if (dataAtual > dataMaxCancelar && dataAtual < dataAgendamento) {
        try {
          const respo = await this.$api.get(
            `/api/user-branch/user=${this.user.id}/filial=${this.eventoSelecionado.idFilial}`
          );
          const credAtual = parseFloat(respo.credits);

          let valorCred =
            (this.eventoSelecionado.fee / 100) *
            this.eventoSelecionado.servicePrice;
          let atribuiCreditos = credAtual + parseFloat(valorCred);
          await this.$api.patch(
            `/api/update-credits/user=${this.user.id}/branch=${this.eventoSelecionado.idFilial}`,
            {
              credits: atribuiCreditos,
            }
          );
          await this.$api.patch(
            `/api/schedulings/${this.eventoSelecionado.idAgendamento}`,
            {
              status: "Cancelado",
            }
          );
          await this.verAgendamentos();
          this.$toast.success(
            "Agendamento cancelado e créditos enviados a sua conta!"
          );
        } catch (error) {
          if (error.response && error.response.status === 404) {
            const newUserBranchResponse = await this.$api.post(
              `/api/user-branch/usuario=${this.user.id}/filial=${this.eventoSelecionado.idFilial}`
            );
            if (newUserBranchResponse.status === 201) {
              this.$toast.info("funciona pfv");
            }
            await this.$api.patch(
              `/api/update-credits/user=${this.user.id}/branch=${this.eventoSelecionado.idFilial}`,
              {
                credits: credAtribuido,
              }
            );
            await this.$api.patch(
              `/api/schedulings/${this.eventoSelecionado.idAgendamento}`,
              {
                status: "Cancelado",
              }
            );
            this.$toast.success(
              "Agendamento cancelado e créditos enviados a sua conta!"
            );
            await this.verAgendamentos();
            this.eventoSelecionadoDialog = false;
          }
        }
      }
      if (dataAtual < dataMaxCancelar && dataAtual < dataAgendamento) {
        try {
          const respo = await this.$api.get(
            `/api/user-branch/user=${this.user.id}/filial=${this.eventoSelecionado.idFilial}`
          );
          const credAtual = parseFloat(respo.credits);
          const credAtribuido =
            parseFloat(this.eventoSelecionado.servicePrice) + credAtual;
          await this.$api.patch(
            `/api/update-credits/user=${this.user.id}/branch=${this.eventoSelecionado.idFilial}`,
            {
              credits: credAtribuido,
            }
          );
          await this.$api.patch(
            `/api/schedulings/${this.eventoSelecionado.idAgendamento}`,
            {
              status: "Cancelado",
            }
          );
          await this.verAgendamentos();
          this.$toast.success(
            "Agendamento cancelado e créditos enviados a sua conta!"
          );
        } catch (error) {
          if (error.response && error.response.status === 404) {
            const newUserBranchResponse = await this.$api.post(
              `/api/user-branch/usuario=${this.user.id}/filial=${this.eventoSelecionado.idFilial}`
            );
            if (newUserBranchResponse.status === 201) {
              this.$toast.info("funciona pfv");
            }
            await this.$api.patch(
              `/api/update-credits/user=${this.user.id}/branch=${this.eventoSelecionado.idFilial}`,
              {
                credits: credAtribuido,
              }
            );
            await this.$api.patch(
              `/api/schedulings/${this.eventoSelecionado.idAgendamento}`,
              {
                status: "Cancelado",
              }
            );
            await this.verAgendamentos();
            this.$toast.success(
              "Agendamento cancelado e créditos enviados a sua conta!"
            );
          }
        }
      }
      this.eventoSelecionadoDialog = false;
    },

    verData(selectedEventDate) {
      const data = new Date(selectedEventDate);
      data.setDate(data.getDate());
      let semana = new Date(selectedEventDate).getDay() + 2;
      const t = new Date(selectedEventDate).toLocaleDateString();
      if (semana === 8) {
        semana = 1;
      }

      this.semana = semana;
      this.dataSelecionada = data.toISOString().split("T")[0];
      this.horariosS(this.semana, selectedEventDate, this.dataSelecionada);
      console.log(
        this.semana,
        this.dataSelecionada,
        this.horarioSelecionadoEdit
      );
      this.horarioSelecionadoEdit = [];
      this.dadosAgendamentos = {
        dataAgendamento: this.dataSelecionada,
        Funcionario: this.eventoSelecionado.idSchedule,
        weekDay: this.semana,
      };
    },

    async horariosS() {
      const idAgendaEdit = this.eventoSelecionado.idSchedule;
      const resposeHorarios = await this.$api.get("/api/schedules");
      this.horarios = resposeHorarios;
      const horariosFiltrados = this.horarios.filter(
        (index) =>
          index.idSchedule == idAgendaEdit && index.weekDay == this.semana
      );
      console.log("responage", resposeHorarios);
      console.log("gfsgsdfg", horariosFiltrados);

      const agendamentosMarcados = await this.$api.get("/api/agendamentos");
      this.meusAg = agendamentosMarcados;
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
      this.horariosT = this.horariosDisponiveis.filter(
        (tempo) => tempo.disponivel
      );
    },
    async verDetalhes(event) {
      const eventoSelecionado = {
        nomeFuncionario:
          event.event.nomeFuncionario.charAt(0).toUpperCase() +
          event.event.nomeFuncionario.slice(1),
        fee: event.event.fee,
        idFilial: event.event.idBranch,
        foneFuncionario: event.event.foneFuncionario,
        tempoAtualDat: new Date(),
        tempoAtual: new Date().toLocaleDateString(),
        dataScheduling: new Date(event.event.start).toLocaleDateString(),
        timeToReschedule: event.event.timeToReschedule,
        idAgendamento: event.event.agendamento,
        endTime:
          event.event.endTime.split(":")[0] +
          ":" +
          event.event.endTime.split(":")[1],
        foneUser: event.event.foneUser,
        idHorario: event.event.hora,
        idSchedule: event.event.idSchedule,
        idServices: event.event.idServices,
        nameServices: event.event.nameServices,
        nomeUser: event.event.nomeUser,
        servicePrice: event.event.servicePrice,
        startTime:
          event.event.startTime.split(":")[0] +
          ":" +
          event.event.startTime.split(":")[1],
        type: event.event.type,
        idPayment: event.event.idPayment,
        status: event.event.status,
        createdAg: new Date(event.event.createdAg),
        dataAg: new Date(event.event.start),
        idCliente: event.event.idCliente,
      };
      console.log(this.eventoSelecionado);
      const dataScheduling = new Date(event.event.start);
      let tempoReagendar = new Date(dataScheduling);
      tempoReagendar.setDate(
        dataScheduling.getDate() - parseInt(event.event.timeToReschedule)
      );
      eventoSelecionado.editData = `${
        eventoSelecionado.dataScheduling.split("/")[2]
      }-${eventoSelecionado.dataScheduling.split("/")[1]}-${
        eventoSelecionado.dataScheduling.split("/")[0]
      }`;
      console.log(eventoSelecionado.editData);
      eventoSelecionado.idAgendamento = event.event.agendamento;
      eventoSelecionado.tempoReagendar = tempoReagendar;
      eventoSelecionado.reagendar = tempoReagendar;
      if (eventoSelecionado.createdAg >= eventoSelecionado.tempoReagendar) {
        tempoReagendar = eventoSelecionado.dataAg;
        eventoSelecionado.tempoReagendar = tempoReagendar;
      } else {
        eventoSelecionado.reagendar = tempoReagendar;
      }
      eventoSelecionado.formatarReagendar =
        eventoSelecionado.tempoReagendar.toLocaleDateString();
      this.eventoSelecionado = eventoSelecionado;
      this.eventoSelecionadoDialog = true;
      console.log("evento selecio", this.eventoSelecionado);
      this.selectedEventDate = new Date(event.event.start)
        .toISOString()
        .substring(0, 10);
    },

    async dataCerta(clickedDate) {
      const year = clickedDate.year;
      const month = String(clickedDate.month).padStart(2, "0");
      const day = String(clickedDate.day).padStart(2, "0");
      this.date = `${year}-${month}-${day}`;
      this.agenda = this.date;
      this.type = "day";
    },

    toggleEventos(tipo) {
      if (tipo === "cancelados") {
        if (this.mostrarEventosCancelados) {
          this.eventosAgendamento = [...this.eventosAgendamentoOriginal];
        } else {
          this.eventosAgendamentoOriginal = [...this.eventosAgendamento];
          this.eventosAgendamento = this.eventosAgendamento.filter((evento) => {
            return evento.name.split(" ")[0] === "Cancelado";
          });
        }
        this.mostrarEventosCancelados = !this.mostrarEventosCancelados;
        this.mostrarEventosRealizados = false;
        this.mostrarEventosConfirmados = false;
      } else if (tipo === "realizados") {
        if (this.mostrarEventosRealizados) {
          this.eventosAgendamento = [...this.eventosAgendamentoOriginal];
        } else {
          this.eventosAgendamentoOriginal = [...this.eventosAgendamento];
          this.eventosAgendamento = this.eventosAgendamento.filter((evento) => {
            return evento.name.split(" ")[0] === "Realizado";
          });
        }
        this.mostrarEventosRealizados = !this.mostrarEventosRealizados;
        this.mostrarEventosCancelados = false;
        this.mostrarEventosConfirmados = false;
      } else if (tipo === "confirmados") {
        if (this.mostrarEventosConfirmados) {
          this.eventosAgendamento = [...this.eventosAgendamentoOriginal];
        } else {
          this.eventosAgendamentoOriginal = [...this.eventosAgendamento];
          this.eventosAgendamento = this.eventosAgendamento.filter((evento) => {
            return evento.name.split(" ")[0] === "Confirmado";
          });
        }
        this.mostrarEventosConfirmados = !this.mostrarEventosConfirmados;
        this.mostrarEventosRealizados = false;
        this.mostrarEventosCancelados = false;
      }
    },

    next() {
      this.$refs.calendar.next();
    },

    save(date) {
      this.$refs.menu.save(date);
    },

    prev() {
      this.$refs.calendar.prev();
    },

    setToday() {
      this.agenda = "";
    },

    verDia({ date }) {
      this.agenda = date;
      this.type = "day";
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },

    async getUserByToken() {
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

    async verAgendamentos() {
      try {
        const [meusag] = await Promise.all([
          this.$api.get("/api/agendamentos"),
        ]);
        this.meusag = meusag;
        console.log("meusag", meusag);
        const agendamentosnovo = this.meusag.map((item) => ({
          idAg: item.idag,
          createdAg: item.createdag,
          fee: item.fee,
          endTime: item.end_time,
          idPayment: item.id_payment,
          idServices: item.id_services,
          idCliente: item.idcliente,
          idFuncionario: item.idfuncionario,
          startTime:
            item.start_time.length < 5
              ? `0${item.start_time}`
              : `${item.start_time}`,
          servicePrice: item.service_price,
          timeToReschedule: item.time_to_reschedule,
          weekDay: item.week_day,
          dataScheduling: item.data_scheduling,
          status: item.status,
          idSchedule: item.id_schedule,
          branchId: item.branchid,
        }));

        const agendamentosFiltrados = agendamentosnovo.filter(
          (agenda) => agenda.idCliente === this.user.id
        );
        const responseDetalhes = await this.$api.get("/api/details");

        responseDetalhes.map((item) => {
          const fee = item.fee;
          const branchId = item.branchid;
          const idFuncionario = item.idfuncionario;
          const idCliente = item.idcliente;
          const agendamento = item.agendamento;
          const timeScheduling = item.time_scheduling;
          const dataScheduling = item.data_scheduling;
          const idServices = item.id_services;
          const idPayment = item.id_payment;
          const nomeFuncionario = item.nomeFuncionario;
          const foneFuncionario = item.foneFuncionario;
          const status = item.status;
          const idSchedule = item.id_schedule;
          const hora = item.hora;
          const idPaymentMethod = item.id_paymentMethod;
          const foneUser = item.foneUser;
          const nameServices = item.nameServices;
          const type = item.type;
          const servicePrice = item.service_price;
          const endTime = item.end_time;
          const startTime = item.start_time;
          const timeToReschedule = item.time_to_reschedule;
          return {
            branchId,
            fee,
            agendamento,
            idCliente,
            idFuncionario,
            dataScheduling,
            idPayment,
            nomeFuncionario,
            foneFuncionario,
            status,
            idSchedule,
            hora,
            idPaymentMethod,
            foneUser,
            nameServices,
            type,
            servicePrice,
            endTime,
            startTime,
            timeScheduling,
            idServices,
            timeToReschedule,
          };
        });
        this.eventosAgendamento = agendamentosFiltrados
          .map((agenda) => {
            const matchingConstante = responseDetalhes.find(
              (constante) =>
                constante.id_schedule === agenda.idSchedule &&
                constante.data_scheduling === agenda.dataScheduling &&
                constante.id_payment === agenda.idPayment &&
                constante.time_scheduling === agenda.startTime &&
                constante.created_at === agenda.createdAg
            );

            if (matchingConstante) {
              const idCliente = matchingConstante.id_user;
              const idBranch = agenda.branchId;
              const fee = agenda.fee;
              const dataDoAgendamento = agenda.dataScheduling.split("T")[0];
              const start = `${dataDoAgendamento}T${agenda.startTime}`;
              const end = `${dataDoAgendamento}T${matchingConstante.end_time}`;
              const idSchedule = agenda.idSchedule;
              const color = agenda.status === "Cancelado" ? "red" : "blue";
              const createdAg = agenda.createdAg;
              const evento = {
                start: start,
                fee: fee,
                idBranch: idBranch,
                createdAg: createdAg,
                end: end,
                timed: true,
                timeToReschedule: matchingConstante.time_to_reschedule,
                idSchedule: idSchedule,
                idServices: agenda.idServices,
                status: matchingConstante.status,
                agendamento: matchingConstante.agendamento,
                hora: matchingConstante.hora,
                startTime: matchingConstante.start_time,
                endTime: matchingConstante.end_time,
                id_paymentMethod: matchingConstante.id_paymentMethod,
                nomeUser: matchingConstante.nomeUser,
                nomeFuncionario: matchingConstante.nomeFuncionario,
                foneUser: matchingConstante.foneUser,
                foneFuncionario: matchingConstante.foneFuncionario,
                nameServices: matchingConstante.nameServices,
                type: matchingConstante.type,
                servicePrice: matchingConstante.service_price,
                idPayment: matchingConstante.id_payment,
                idCliente: idCliente,
                color,
              };
              if (
                new Date(evento.end) < new Date() &&
                agenda.status === "Confirmado"
              ) {
                evento.color = "green";
                evento.name = `Realizado`;
              } else {
                evento.name = `${agenda.status}`;
              }

              return evento;
            } else {
              return null;
            }
          })
          .filter((evento) => evento !== null);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<style></style>
