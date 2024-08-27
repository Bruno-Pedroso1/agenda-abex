# back-end:
#install
$ npm install
$ npm run dev
#server rodando no localhost:3333


# front-end:
#install
$ npm install
$ npm run dev
#server rodando no localhost:3000




# fluxo: 
    Superadministrador (nós) adicionamos uma empresa/filiais da empresa, criamos um usuário para o dono dela (role: admin, permission: master), a partir disto ele pode cadastrar seus serviços prestados com suas respectivas caracteristicas, ele pode fazer com que outros usuários se tornem funcionários desta empresa (role: admin), com isso os funcionários podem adicionar/modificar suas agendas, horarios, valores, serviços.
    Clientes ao acessar o site (tela inicial após login) verão as empresas com quem já solicitaram agendamento de serviço, caso ele queira outra empresa/serviço, ele poderá filtrar todas as empresas cadastradas no sistema para o que ele deseja. O usuário necessita fazer o pagamento do serviço antes de fato o mesmo ser agendado, no momento que é confirmado o pagamento do agendamento, ele cadastra no calendário, e se for de preferência do cliente, diretamente no google calendar, ao clicar em cima de um evento (criado no calendário do sistema), caso for cliente, mostrará informações sobre o valor, a data de agendamento, opção para reagendar/cancelar, taxas cobradas em caso de cancelamento (em caso de cancelamento o usuário terá o estorno em créditos para gastar em qualquer serviço prestado pela mesma empresa), caso o usuário seja um funcionário, mostrará informações a respeito do cliente em vez da empresa.
    Um usuário com permission master (dono), terá como criar voucher para sua empresa, válidos em qualquer uma das filiais da mesma, os vouchers são créditos ex: o cliente compra 1000 reais em créditos por valores como 800 reais.
    Além dos donos da empresa poderem adicionar integrações (como inteligencias artificais, sistemas de notificação, modobank), métodos de pagamento e outras coisas mostradas no banco de dados abaixo.

# Criação do bd:
   create table countries
(
    id         serial
        primary key,
    name       varchar(40) not null
        unique,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);

alter table countries
    owner to postgres;

create table states
(
    id         serial
        primary key,
    name       varchar(40) not null,
    id_country integer     not null
        references countries,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);

alter table states
    owner to postgres;

create table cities
(
    id         serial
        primary key,
    name       varchar(40) not null,
    id_state   integer     not null
        references states,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);

alter table cities
    owner to postgres;

create table addresses
(
    id         serial
        primary key,
    zip_code   varchar(10)  not null,
    district   varchar(50)  not null,
    street     varchar(50)  not null,
    number     integer      not null,
    complement varchar(100) not null,
    id_city    integer      not null
        references cities,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);

alter table addresses
    owner to postgres;

create table companies
(
    id               serial
        primary key,
    company_document varchar(20)  not null
        unique,
    business_type    varchar(40)  not null,
    logo             varchar(500) not null
        unique,
    business_name    varchar(100) not null
        unique,
    phone            varchar(16)  not null
        unique,
    email            varchar(80)  not null
        unique,
    id_addresses     integer      not null
        references addresses,
    created_at       timestamp default CURRENT_TIMESTAMP,
    updated_at       timestamp default CURRENT_TIMESTAMP
);

alter table companies
    owner to postgres;

create table branches
(
    id               serial
        primary key,
    company_document varchar(20)  not null
        unique,
    email            varchar(80)  not null
        unique,
    trading_name     varchar(100) not null,
    business_name    varchar(100) not null
        unique,
    id_company       integer      not null
        references companies,
    id_addresses     integer      not null
        references addresses,
    created_at       timestamp default CURRENT_TIMESTAMP,
    updated_at       timestamp default CURRENT_TIMESTAMP,
    phone            varchar(30)
);

alter table branches
    owner to postgres;

create table integrations
(
    id         serial
        primary key,
    type       varchar(100) not null,
    token_api  varchar(500) not null,
    id_branch  integer      not null
        references branches,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);

alter table integrations
    owner to postgres;

create table services
(
    id          serial
        primary key,
    image       varchar(500) not null,
    name        varchar(40)  not null,
    description varchar(40)  not null,
    created_at  timestamp default CURRENT_TIMESTAMP,
    updated_at  timestamp default CURRENT_TIMESTAMP,
    id_branch   integer      not null
        references branches
);

alter table services
    owner to postgres;

create table payment_methods
(
    id             serial
        primary key,
    id_branch      integer      not null
        references branches,
    id_integration integer      not null
        references integrations,
    type           varchar(100) not null,
    description    varchar(255) not null,
    created_at     timestamp default CURRENT_TIMESTAMP,
    updated_at     timestamp default CURRENT_TIMESTAMP
);

alter table payment_methods
    owner to postgres;

create table users
(
    id                        serial
        primary key,
    name                      varchar(100) not null,
    photo                     varchar(500),
    tax_identification_number varchar(18)  not null
        unique,
    phone                     varchar(16)  not null
        unique,
    password_hash             varchar(500),
    email                     varchar(80)  not null
        unique,
    role                      varchar(10)  not null,
    token                     varchar(500),
    id_addresses              integer
        references addresses,
    permission                varchar(10),
    id_company                integer
        references companies,
    specialization            varchar(25),
    created_at                timestamp default CURRENT_TIMESTAMP,
    updated_at                timestamp default CURRENT_TIMESTAMP
);

alter table users
    owner to postgres;

create table user_branch
(
    id         serial
        primary key,
    id_branch  integer not null,
    id_user    integer not null,
    credits    double precision,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);

alter table user_branch
    owner to postgres;

create table schedule
(
    id                 serial
        primary key,
    service_price      double precision not null,
    cancellation_fee   double precision not null,
    time_to_reschedule integer          not null,
    id_branch          integer          not null
        references branches,
    id_user            integer          not null
        references users,
    id_services        integer          not null
        references services,
    created_at         timestamp default CURRENT_TIMESTAMP,
    updated_at         timestamp default CURRENT_TIMESTAMP,
    data_scheduling    date
);

alter table schedule
    owner to postgres;

create table payments
(
    id                serial
        primary key,
    total_value       double precision not null,
    status            varchar(25)      not null,
    id_user           integer          not null
        references users,
    id_payment_method integer          not null
        references payment_methods,
    created_at        timestamp default CURRENT_TIMESTAMP,
    updated_at        timestamp default CURRENT_TIMESTAMP
);

alter table payments
    owner to postgres;

create table schedules
(
    id          serial
        primary key,
    start_time  time    not null,
    end_time    time    not null,
    week_day    integer not null,
    id_schedule integer not null
        references schedule,
    created_at  timestamp default CURRENT_TIMESTAMP,
    updated_at  timestamp default CURRENT_TIMESTAMP
);

alter table schedules
    owner to postgres;

create table voucher
(
    id            serial
        primary key,
    credits_value double precision not null,
    price         double precision not null,
    id_branch     integer          not null
        references branches,
    updated_at    timestamp,
    created_at    timestamp
);

alter table voucher
    owner to postgres;

create table scheduling
(
    id              serial
        primary key,
    data_scheduling date        not null,
    status          varchar(25) not null,
    time_scheduling time        not null,
    id_schedule     integer     not null
        references schedule,
    id_payment      integer     not null
        references payments,
    created_at      timestamp default CURRENT_TIMESTAMP,
    updated_at      timestamp default CURRENT_TIMESTAMP
);

alter table scheduling
    owner to postgres;

create table payment_voucher
(
    id         serial
        primary key,
    id_payment integer not null
        references payments,
    id_voucher integer not null
        references voucher,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);

alter table payment_voucher
    owner to postgres;






create table pais (
    id serial primary key,
    nome varchar(40) not null unique,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table estado (
    id serial primary key,
    nome varchar(40) not null,
    id_pais int not null,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_pais) references pais(id)
);

create table cidade (
    id serial primary key,
    nome varchar(40) not null,
    id_estado int not null,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_estado) references estado(id)
);

create table enderecos (
    id serial primary key,
    cep varchar(10) not null,
    bairro varchar(50) not null,
    rua varchar(50) not null,
    numero int not null,
    complemento varchar(100) not null,
    id_cidade int not null,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_cidade) references cidade(id)
);

create table empresas (
    id serial primary key,
    cnpj varchar(20) unique not null,
    categoria varchar(40) not null,
    logo varchar(500) unique not null,
    nome varchar(100) unique not null,
    telefone varchar(16) not null unique,
    email varchar(80) not null unique,
    id_endereco int not null,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_endereco) references enderecos(id)
);

create table filiais (
    id serial primary key,
    cnpj varchar(20) unique not null,
    email varchar(80) unique not null,
    nome_fantasia varchar(100) not null,
    nome varchar(100) not null unique,
    id_empresa int not null,
    id_endereco int not null,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_empresa) references empresas(id),
    foreign key (id_endereco) references enderecos(id)
);

create table integracoes (
    id serial primary key,
    tipo varchar(100) not null ,
    token_api varchar(500) not null,
    id_filial int not null,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_filial) references filiais(id)
);

create table servicos(
    id serial primary key,
    imagem varchar(500) not null,
    nome varchar(40) not null,
    descricao varchar(40) not null,
    id_filial int not null,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_filial) references filiais(id)
);

create table metodo_pagamento(
    id serial primary key,
    id_filial int not null,
    id_integracao int not null,
    tipo varchar(100) not null,
    descricao varchar(255) not null,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_filial) references filiais(id),
    foreign key (id_integracao) references integracoes(id)
);

create table usuarios (
    id serial primary key,
    nome varchar(100) not null,
    foto varchar(500),
    cpf varchar(18) not null unique,
    telefone varchar(16) not null unique,
    password_hash varchar(500),
    email varchar(80) not null unique,
    cargo varchar(10) not null,
    token varchar(500),
    id_endereco int,
    permissao varchar(10),
    id_empresa int,
    especializacao varchar(25),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_endereco) references enderecos(id),
    foreign key (id_empresa) references empresas(id)
);

create table usuario_filial (
    id serial primary key,
    id_filial int not null,
    id_usuario int not null,
    creditos float,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_filial) references filiais(id),
    foreign key (id_usuario) references usuarios(id)
);

create table agenda (
    id serial primary key,
    valor float not null,
    taxa_cancelamento float not null,
    tempo_reagendar int not null,
    id_filial int not null,
    id_usuario int not null,
    id_servico int not null,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_filial) references filiais(id),
    foreign key (id_usuario) references usuarios(id),
    foreign key (id_servico) references servicos(id)
);

create table pagamentos (
    id serial primary key,
    valor_total float not null,
    status varchar(25) not null,
    id_usuario int not null,
    id_metodo_pagamento int not null,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_usuario) references usuarios(id),
    foreign key (id_metodo_pagamento) references metodo_pagamento(id)
);
create table horarios (
    id serial primary key,
    horario_inicio time not null,
    horario_final time not null,
    dia_semana int not null,
    id_agenda int not null,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_agenda) references agenda(id)
);

create table voucher (
    id serial primary key,
    valor_creditos float not null,
    preco float not null,
    id_filial int not null,
    foreign key (id_filial) references filiais(id)
);

create table agendamento (
    id serial primary key,
    data_agendamento date not null,
    status varchar(25) not null,
    horario time not null,
    id_agenda int not null,
    id_pagamento int not null,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_agenda) references agenda(id),
    foreign key (id_pagamento) references pagamentos(id)
);

create table pagamento_voucher(
    id serial primary key,
    id_pagamento int not null,
    id_voucher int not null,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_pagamento) references pagamentos(id),
    foreign key (id_voucher) references voucher(id)
);
