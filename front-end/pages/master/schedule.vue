<template>
  <v-container>
    <v-sheet>
      <v-row class="text-center align-center mb-2 mt-2">
        <v-col cols="12" md="3">
          <v-btn class="mr-5" outlined height="40"> Hoje </v-btn>
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
            class=""
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
        <v-col cols="12" md="3">
          <v-toolbar-title v-if="$refs.calendar"
            >{{ $refs.calendar.title }}
          </v-toolbar-title>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="agenda"
        :type="type"
        :mode="calendarMode"
        :weekdays="weekday"
        :events="eventosAgendamento"
        @click:event="verDetalhes"
        @click:date="viewDay"
        @click:more="dataCerta"
        locale="Brazil"
        color="cyan"
        :event-more="true"
      >
      </v-calendar>
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
                Nome da Filial:
                {{ eventoSelecionado.nomeBranch }}
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
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      eventoSelecionadoDialog: false,
      activePicker: null,
      calendarMode: "month",
      type: "month",
      agenda: "",
      today: new Date().toISOString().substring(0, 10),
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      eventosAgendamento: [],
      weekdays: [
        { text: "Dom - Sab", value: [0, 1, 2, 3, 4, 5, 6] },
        { text: "Seg - Dom", value: [1, 2, 3, 4, 5, 6, 0] },
        { text: "Seg - Sex", value: [1, 2, 3, 4, 5] },
        { text: "Seg, Qua, Sex", value: [1, 3, 5] },
      ],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      types: {
        month: "Mês",
        week: "Semana",
        day: "Dia",
        "4day": "4 Days",
      },
      eventoSelecionado: {},
      user: {
        id: null,
        email: null,
        role: null,
        name: null,
        permission: null,
        idCompany: null,
      },
    };
  },
  async created() {
    await this.getUserByToken();
    await this.verAgendamentos();
  },
  methods: {
    async verDetalhes(event) {
      console.log(event);
      const eventoSelecionado = {
        nomeFuncionario:
          event.event.nomeFuncionario.charAt(0).toUpperCase() +
          event.event.nomeFuncionario.slice(1),
        nomeBranch: event.event.nomeBranch,
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
      this.selectedEventDate = new Date(event.event.start)
        .toISOString()
        .substring(0, 10);
      console.log(this.eventoSelecionado);
    },
    async getUserByToken() {
      const { data } = await this.$api.get("/api/users/by-token");
      if (data) {
        this.user = {
          id: data.id,
          email: data.email,
          role: data.role,
          name: data.name,
          permission: data.permission,
          idCompany: data.idCompany,
        };
      } else {
        this.$toast.error("Faça o login");
        return this.$router.push("/");
      }
    },

    async verAgendamentos() {
      try {
        const minhaEmpresa = this.user.idCompany;
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
          companyId: item.companyid,
          nomeBranch: item.branchName,
        }));
        console.log(agendamentosnovo);
        const agendamentosFiltrados = agendamentosnovo.filter(
          (empresa) => empresa.companyId === minhaEmpresa
        );
        const responseDetalhes = await this.$api.get("/api/details");
        console.log("det", responseDetalhes);
        responseDetalhes.map((item) => {
          const fee = item.fee;
          const idEmpresa = item.idEmpresaC;
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
          const nomeBranch = item.nomeBranch;
          return {
            branchId,
            nomeBranch,
            idEmpresa,
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
        console.log("filt", agendamentosFiltrados);
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
              const nomeBranch = agenda.nomeBranch;
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
                nomeBranch: nomeBranch,
              };
              if (
                new Date(evento.end) < new Date() &&
                agenda.status === "Confirmado"
              ) {
                evento.color = "green";
                evento.name = `Realizado`;
              } else {
                evento.name = `${agenda.status} - ${idBranch}`;
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

    async dataCerta(clickedDate) {
      const year = clickedDate.year;
      const month = String(clickedDate.month).padStart(2, "0");
      const day = String(clickedDate.day).padStart(2, "0");
      this.date = `${year}-${month}-${day}`;
      this.agenda = this.date;
      this.type = "day";
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
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
  },
};
</script>

<style></style>
