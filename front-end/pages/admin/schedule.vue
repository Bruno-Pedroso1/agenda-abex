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

    <v-dialog v-model="editarDialog" width="500">
      <v-card>
        <v-card-title class="justify-center class=red">
          <h1 class="text-center text-break mb-3">Editar Agendamento</h1>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Data"
                    append-icon="mdi-calendar"
                    outlined
                    class="blue--text"
                    color="black"
                    background-color="#EEEBEB"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  locale="Brazil"
                  :active-picker.sync="activePicker"
                  :min="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substring(0, 10)
                  "
                  @change="save"
                ></v-date-picker>
              </v-menu>
              <v-autocomplete
                v-model="eventoSelecionado.horario"
                outlined
                class="blue--text"
                color="black"
                hide-details
                background-color="#EEEBEB"
                item-text="startTime"
                item-value="startTime"
                label="Horário"
                :items="horariosget"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="align-center text-center">
            <v-col cols="12" md="5">
              <v-btn
                class="red white--text"
                elevation="8"
                @click="editarDialog = false"
                >Fechar</v-btn
              >
            </v-col>
            <v-col cols="12" md="2">
              <v-img
                class="ml-auto mr-auto"
                max-height="75"
                max-width="75"
                src="https://cdn.discordapp.com/attachments/1148348260533162005/1151944021430779907/image.png"
              ></v-img>
            </v-col>
            <v-col cols="12" md="5">
              <v-btn
                class="green white--text"
                elevation="8"
                @click="editarAgendamento"
                >Salvar</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

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
              <p>Data: {{ eventoSelecionado.dataScheduling }}</p>
              <p>
                Horário de Inicio:
                {{ eventoSelecionado.startTime }}
              </p>
              <p>
                Horário Final:
                {{ eventoSelecionado.endTime }}
              </p>
              <p>Forma de Pagamento: {{ eventoSelecionado.type }}</p>
              <p>Nome Cliente: {{ eventoSelecionado.nomeUser }}</p>
              <p>Contato: {{ eventoSelecionado.foneUser }}</p>
              <p>Serviço: {{ eventoSelecionado.nameServices }}</p>
              <p>Status: {{ eventoSelecionado.status }}</p>
              <p>
                Valor do Serviço: R$:
                {{ eventoSelecionado.servicePrice }}
              </p>
              <p>
                Data máxima para reagendar:
                {{ eventoSelecionado.formatarReagendar }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center" md="3">
              <v-btn class="red white--text" @click="fecharDetalhesEvento">
                Fechar
              </v-btn>
            </v-col>
            <v-col class="text-center" md="6">
              <v-btn
                v-if="
                  eventoSelecionado.tempoReagendar >
                    eventoSelecionado.tempoAtualDat &&
                  eventoSelecionado.status === 'Confirmado'
                "
                color="yellow black--text"
                @click="cancelarAgendamento(), fecharDetalhesEvento()"
              >
                Cancelar Agendamento
              </v-btn>
            </v-col>
            <v-col class="text-center" md="3">
              <v-btn
                v-if="
                  eventoSelecionado.tempoReagendar >
                    eventoSelecionado.tempoAtualDat &&
                  eventoSelecionado.status !== 'Cancelado'
                "
                class="green white--text"
                @click="(editarDialog = true), fecharDetalhesEvento()"
              >
                Editar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

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
        locale="Brazil"
        color="cyan"
        :type="type"
        :mode="calendarMode"
        :weekdays="weekday"
        :event-more="true"
        @click:more="verDia"
        :events="eventosAgendamento"
        @click:date="dataCerta"
        @click:event="verDetalhes"
      >
      </v-calendar>
    </v-sheet>

    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title class="justify-center">
          <h1 class="text-center text-break mb-3 mt-3">
            Cadastrar agendamento
          </h1>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Data"
                    append-icon="mdi-calendar"
                    readonly
                    disabled
                    outlined
                    class="blue--text"
                    color="black"
                    background-color="#EEEBEB"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  locale="Brazil"
                  :active-picker.sync="activePicker"
                  :min="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substring(0, 10)
                  "
                  @change="save"
                ></v-date-picker>
              </v-menu>
              <v-select
                v-model="idAgenda"
                class="blue--text"
                color="black"
                outlined
                hide-details
                background-color="#EEEBEB"
                label="Escolher agenda"
                item-text="id"
                item-value="id"
                :items="agendasDoUsuario"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="horario"
                outlined
                class="blue--text"
                color="black"
                background-color="#EEEBEB"
                item-text="startTime"
                item-value="startTime"
                label="Horário"
                :items="horariosget"
              ></v-select>
              <v-select
                v-model="idPagamento"
                class="blue--text"
                background-color="#EEEBEB"
                color="black"
                outlined
                hide-details
                item-value="id"
                item-text="id"
                :items="pagt"
                label="ID do pagamentos"
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="text-center">
            <v-col md="4" cols="12">
              <v-btn
                class="red white--text mt-3"
                @click="dialog = false"
                elevation="8"
              >
                Fechar
              </v-btn>
            </v-col>
            <v-col class="d-flex justify-center" md="4" cols="12">
              <v-img
                max-height="75"
                max-width="75"
                src="https://cdn.discordapp.com/attachments/1148348260533162005/1151944021430779907/image.png"
              ></v-img>
            </v-col>
            <v-col md="4" cols="12">
              <v-btn
                class="green white--text mt-3"
                @click="persistNovo"
                elevation="8"
              >
                Salvar
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
  name: "Schedule",
  layout: "admin",

  data() {
    return {
      situacao: "Confirmado",
      calendarMode: "month",
      type: "month",
      agenda: "",
      focus: "",
      atualtempo: "",
      datasel2: "",
      status: ["Confirmado", "Cancelado"],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: "Dom - Sab", value: [0, 1, 2, 3, 4, 5, 6] },
        { text: "Seg - Dom", value: [1, 2, 3, 4, 5, 6, 0] },
        { text: "Seg - Sex", value: [1, 2, 3, 4, 5] },
        { text: "Seg, Qua, Sex", value: [1, 3, 5] },
      ],
      admin: [],
      vinculo: [],
      pagamentos: [],
      horariosget: [],
      servicos: [],
      registros: [],
      pagt: [],
      eventosAgendamento: [],
      horarios: [],
      agendamentos: [],
      agendasDoUsuario: [],
      eventosAgendamentoOriginal: [],
      horariosAgendados: [],
      agendamentosDoDia: [],
      disponibilidadeDiaria: [],
      selectedTime: null,
      idSchedule: null,
      selectedDayOfWeek: null,
      statusSelecionado: null,
      idAgenda: null,
      selectedSchedule: null,
      activePicker: null,
      stat: null,
      selectedElement: null,
      nome: null,
      email: null,
      telefone: null,
      dataAgendamento: null,
      idAgenda: null,
      horario: null,
      idPagamento: null,
      idServico: null,
      dialog: false,
      selectedOpen: false,
      eventoSelecionadoDialog: false,
      editarDialog: false,
      mostrarEventosRealizados: false,
      mostrarEventosCancelados: false,
      mostrarEventosConfirmados: false,
      menu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      item: {},
      types: {
        month: "Mês",
        week: "Semana",
        day: "Dia",
        "4day": "4 Days",
      },
      selectedEvent: {},
      meusag: {},
      eventoSelecionado: {},
      horariosPorAgenda: {},
      user: {
        email: null,
        role: null,
        name: null,
      },
    };
  },

  mounted() {
    this.$refs.calendar.checkChange();
  },

  async created() {
    await this.validateLogin();
    await this.getUserByToken();
    await this.getSqlAgenda();
    await this.getAllSchedulings();
    await this.getDados();
    await this.getAllHorarios();
    await this.verAgendamentos();
  },

  methods: {
    async cancelarAgendamento() {
      try {
        const idCliente = this.eventoSelecionado.idCliente;
        const idAgendamento = this.eventoSelecionado.idAgendamento;
        const valorServico = this.eventoSelecionado.servicePrice;
        const idScheduleAgendamento = this.eventoSelecionado.idSchedule;
        const responseBranch = await this.$api.get(
          `/api/schedule/${idScheduleAgendamento}`
        );
        const idBranchAgendamento = responseBranch.idBranch;
        try {
          this.vinculo = await this.$api.get(
            `/api/user-branch/user=${idCliente}/filial=${idBranchAgendamento}`
          );
          this.userCredit = parseFloat(this.vinculo.credits);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            await this.$api.post(
              `/api/user-branch/usuario=${idCliente}/filial=${idBranchAgendamento}`
            );
            this.userCredit = 0;
          }
        }

        let atribuiCreditos =
          parseFloat(this.userCredit) + parseFloat(valorServico);
        await this.$api.patch(
          `/api/update-credits/user=${idCliente}/branch=${idBranchAgendamento}`,
          {
            credits: atribuiCreditos,
          }
        );

        const response = await this.$api.patch(
          `/api/schedulings/${idAgendamento}`,
          {
            status: "Cancelado",
          }
        );
        const toastFormat = parseFloat(valorServico).toFixed(2);
        await this.getAllSchedulings();
        await this.verAgendamentos();
        if (response.message === "Scheduling updated successfully.") {
          this.eventoSelecionado.status = "Cancelado";
          this.eventoSelecionadoDialog = false;
          this.$toast.success(
            `Foram adicionados R$${toastFormat} ao usuário e o agendamento foi cancelado!`
          );
          await this.verAgendamentos();
          await this.getAllSchedulings();
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    editarAgendamento(data, eventoSelecionado) {
      this.verDetalhes(data, eventoSelecionado.horario);
    },

    verDia({ date }) {
      this.agenda = date;
      this.type = "day";
    },

    async getUserByToken() {
      const { data } = await this.$api.get("/api/users/by-token");
      if (data) {
        this.user = {
          email: data.email,
          role: data.role,
          name: data.name,
        };
      } else {
        this.$toast.error("Faça o login");
        return this.$router.push("/");
      }
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

    async verDetalhes(event) {
      const eventoSelecionado = {
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
    },

    fecharDetalhesEvento() {
      this.eventoSelecionadoDialog = false;
    },

    setToday() {
      this.agenda = "";
    },

    async getAllHorarios(weekDay) {
      try {
        const [meusag] = await Promise.all([
          this.$api.get("/api/agendamentos"),
        ]);
        this.meusag = meusag;
        let idSchedules;
        if (this.user.role === "superadmin") {
          idSchedules = this.meusag.map((agenda) => agenda.id_schedule);
        } else {
          idSchedules = this.agendasDoUsuario.map((agenda) => agenda.id);
        }

        const response = await this.$api.get(`/api/schedules`);

        const filtrando = response.filter(
          (horario) =>
            idSchedules.includes(horario.idSchedule) &&
            horario.weekDay === weekDay
        );

        const horarioLivre = filtrando.filter((horario) => {
          const marcado = this.meusag.some(
            (agenda) =>
              agenda.id_schedule === horario.idSchedule &&
              agenda.start_time === horario.startTime &&
              agenda.week_day === horario.weekDay &&
              agenda.data_scheduling === this.date &&
              agenda.status === "Confirmado"
          );
          return !marcado;
        });

        this.horariosget = horarioLivre;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    selecionarEvento(evento) {
      this.eventoSelecionado = evento;
    },

    clear() {
      this.date = null;
      this.idAgenda = null;
    },

    prev() {
      this.$refs.calendar.prev();
    },

    next() {
      this.$refs.calendar.next();
    },

    save(date) {
      this.$refs.menu.save(date);
    },

    async dataCerta(clickedDate) {
      const year = clickedDate.year;
      const month = String(clickedDate.month).padStart(2, "0");
      const day = String(clickedDate.day).padStart(2, "0");
      this.date = `${year}-${month}-${day}`;
      const dayOfWeek = new Date(year, month - 1, day).getDay();
      const adjustedDayOfWeek = dayOfWeek + 1;
      await this.getAllHorarios(adjustedDayOfWeek, this.date);
      const today = new Date();
      const hoje = today.toISOString().split("T")[0];
      const ano = hoje.split("-")[0];
      const mes = hoje.split("-")[1];
      const dia = hoje.split("-")[2];
      const hojefinal = `${dia}/${mes}/${ano}`;
      if (clickedDate.date < hoje) {
        this.$toast.error(
          `Não é possível fazer agendamento em datas anteriores a ${hojefinal}`
        );
        this.dialog = false;
        return;
      }
      this.dialog = true;
    },

    async persistNovo() {
      try {
        const agendamentoExistente = this.schedulings.find(
          (item) =>
            item.dataScheduling === this.date &&
            item.timeScheduling === this.horario &&
            item.status !== "Cancelado" &&
            item.idSchedule === this.idAgenda
        );
        const dataSchedulingDate = new Date(this.date);
        let diaDaSemanaNumero = dataSchedulingDate.getDay() + 2;
        if (diaDaSemanaNumero === 8) {
          diaDaSemanaNumero = 1;
        }
        let horarioExiste = this.horariosget.find(
          (schedule) =>
            schedule.idSchedule === this.idAgenda &&
            schedule.weekDay === diaDaSemanaNumero &&
            schedule.startTime === this.horario
        );
        if (!horarioExiste) {
          this.$toast.error("Horário não cadastrado na Agenda");
          return;
        }
        const dataAtual = new Date();
        dataAtual.setHours(
          dataAtual.getHours(),
          dataAtual.getMinutes(),
          dataAtual.getSeconds(),
          0
        );
        const formatData = dataAtual.toLocaleDateString();
        const dataAg = new Date(this.date);
        dataAg.setDate(dataAg.getDate() + 1);
        dataAg.setHours(
          Number(this.horario.split(":")[0]),
          Number(this.horario.split(":")[1]),
          0,
          0
        );
        const hoursAtual = dataAtual.getHours();
        const minutesAtual = dataAtual.getMinutes();
        const horarioAtual = `${hoursAtual}:${
          minutesAtual < 10 ? "0" : ""
        }${minutesAtual}:00`;
        if (dataAtual > dataAg) {
          this.$toast.error(
            `Não é possivel agendar em datas anteriores a ${formatData} às ${horarioAtual}`
          );
          return;
        }
        if (dataAtual > dataAg && horarioAtual > this.horario) {
          this.$toast.error(
            `Não é possivel agendar em horários anteriores a ${formatData} às ${horarioAtual}`
          );
          return;
        }

        if (agendamentoExistente) {
          this.$toast.error("Já existe um agendamento neste dia e horário.");
          return;
        }

        const request = {
          dataScheduling: this.date,
          timeScheduling: this.horario,
          status: "Confirmado",
          idSchedule: this.idAgenda,
          idPayment: this.idPagamento,
        };

        if (this.id) {
          await this.$api.patch(`/api/schedulings/${this.id}`, request);
          this.$toast.success("Agendamento Editado");
          await this.getAllSchedulings();
          await this.verAgendamentos();
        } else {
          await this.$api.post(`/api/schedulings`, request);
          this.$toast.success("Agendamento Cadastrado");
          await this.getAllSchedulings();
          await this.verAgendamentos();
        }

        await this.getAllSchedulings();
        await this.verAgendamentos();

        this.date = null;
        this.horario = null;
        this.status = null;
        this.idAgenda = null;
        this.idPagamento = null;
        this.id = null;
        this.dialog = false;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getAllSchedulings() {
      try {
        const response = await this.$api.get("/api/schedulings");
        this.schedulings = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async verAgendamentos() {
      try {
        const [meusag] = await Promise.all([
          this.$api.get("/api/agendamentos"),
        ]);
        this.meusag = meusag;
        let agendasDoUsuario;
        if (this.user.role === "superadmin") {
          agendasDoUsuario = this.meusag.map((agenda) => agenda.id_schedule);
        } else {
          agendasDoUsuario = this.agendasDoUsuario.map((agenda) => agenda.id);
        }
        const agendamentosnovo = this.meusag.map((item) => ({
          createdAg: item.createdag,
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
        }));
        const agendamentosFiltrados = agendamentosnovo.filter((agenda) =>
          agendasDoUsuario.includes(agenda.idSchedule)
        );
        const responseDetalhes = await this.$api.get("/api/details");
        responseDetalhes.map((item) => {
          const idFuncionario = item.idfuncionario;
          const idCliente = item.idcliente;
          const agendamento = item.agendamento;
          const timeScheduling = item.time_scheduling;
          const dataScheduling = item.data_scheduling;
          const idServices = item.id_services;
          const idPayment = item.id_payment;
          const nomeUser = item.nomeUser;
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
            agendamento,
            idCliente,
            idFuncionario,
            dataScheduling,
            idPayment,
            nomeUser,
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
              const dataDoAgendamento = agenda.dataScheduling.split("T")[0];
              const start = `${dataDoAgendamento}T${agenda.startTime}`;
              const end = `${dataDoAgendamento}T${matchingConstante.end_time}`;
              const idSchedule = agenda.idSchedule;
              const color = agenda.status === "Cancelado" ? "red" : "blue";
              const createdAg = agenda.createdAg;
              const evento = {
                start: start,
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
                foneUser: matchingConstante.foneUser,
                nameServices: matchingConstante.nameServices,
                type: matchingConstante.type,
                servicePrice: matchingConstante.service_price,
                idPayment: matchingConstante.id_payment,
                idCliente: idCliente,
                color,
              };
              if (
                new Date(evento.start) < new Date() &&
                agenda.status === "Confirmado"
              ) {
                evento.color = "green";
                evento.name = `Realizado - ${agenda.idSchedule}`;
              } else {
                evento.name = `${agenda.status} - ${agenda.idSchedule}`;
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

    async getSqlAgenda() {
      try {
        const response = await this.$api.get("/api/agendamentos");
        this.agendateste = response;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    formatDate(date) {
      const dataFormatada1 = date.split("-")[2];
      const dataFormatada2 = date.split("-")[1];
      const dataFormatada3 = date.split("-")[0];
      return `${dataFormatada1}/${dataFormatada2}/${dataFormatada3}`;
    },

    async validarAgendamentoDuplicado(date, horario) {
      const response = await this.$api.get("/api/schedulings");
      const agendamentos = response.filter((agendamento) => {
        return (
          agendamento.dataScheduling === date &&
          agendamento.timeScheduling === horario &&
          agendamento.status === "Confirmado" &&
          agendamento.idSchedule === this.idAgenda
        );
      });
      return agendamentos.length > 0;
    },

    async validateLogin() {
      try {
        let token = localStorage.getItem("toksen");
        if (!token) {
          this.$toast.warning("Por favor efetue o login");
          return this.$router.push("/");
        }
        let response = await this.$axios.post(
          "http://localhost:3333/api/users/verify",
          { authorization: `Bearer ${token}` }
        );
        if (response.status === 200) {
          this.idUser = response.data.id;
          if (
            response.data.type === "unauthorized" ||
            response.data.type === "forbidden"
          ) {
            this.$toast.error(
              "Você não tem permissão para acessar esse recurso"
            );
            return this.$router.push("/customer/home");
          }
        } else {
          this.$toast.error(
            "Ocorreu um erro inesperado durante a validação do token"
          );
          return this.$router.push("/customer/home");
        }
      } catch (error) {
        return this.$router.push("/customer/home");
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
  },
};
</script>

<!-- <style></style> -->
