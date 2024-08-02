import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _441fd52f = () => interopDefault(import('..\\pages\\agendamento.vue' /* webpackChunkName: "pages/agendamento" */))
const _0f91afe5 = () => interopDefault(import('..\\pages\\branchCompany.vue' /* webpackChunkName: "pages/branchCompany" */))
const _d4af84bc = () => interopDefault(import('..\\pages\\categories.vue' /* webpackChunkName: "pages/categories" */))
const _7cca6645 = () => interopDefault(import('..\\pages\\companies.vue' /* webpackChunkName: "pages/companies" */))
const _617923ae = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _4b8efa64 = () => interopDefault(import('..\\pages\\services.vue' /* webpackChunkName: "pages/services" */))
const _303496b9 = () => interopDefault(import('..\\pages\\support.vue' /* webpackChunkName: "pages/support" */))
const _2b65e960 = () => interopDefault(import('..\\pages\\userHome.vue' /* webpackChunkName: "pages/userHome" */))
const _6a6cdeda = () => interopDefault(import('..\\pages\\voucherBranch.vue' /* webpackChunkName: "pages/voucherBranch" */))
const _7eae5efa = () => interopDefault(import('..\\pages\\voucherUser.vue' /* webpackChunkName: "pages/voucherUser" */))
const _3de28ef9 = () => interopDefault(import('..\\pages\\admin\\addresses.vue' /* webpackChunkName: "pages/admin/addresses" */))
const _16f15176 = () => interopDefault(import('..\\pages\\admin\\agenda.vue' /* webpackChunkName: "pages/admin/agenda" */))
const _66aa03a8 = () => interopDefault(import('..\\pages\\admin\\customers.vue' /* webpackChunkName: "pages/admin/customers" */))
const _21b834eb = () => interopDefault(import('..\\pages\\admin\\dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _0bcb877c = () => interopDefault(import('..\\pages\\admin\\management.vue' /* webpackChunkName: "pages/admin/management" */))
const _5bba24c5 = () => interopDefault(import('..\\pages\\admin\\modeloDashBoard.vue' /* webpackChunkName: "pages/admin/modeloDashBoard" */))
const _1362a4b4 = () => interopDefault(import('..\\pages\\admin\\payments.vue' /* webpackChunkName: "pages/admin/payments" */))
const _58276c10 = () => interopDefault(import('..\\pages\\admin\\schedule.vue' /* webpackChunkName: "pages/admin/schedule" */))
const _9f1c91da = () => interopDefault(import('..\\pages\\admin\\schedules.vue' /* webpackChunkName: "pages/admin/schedules" */))
const _2963ae57 = () => interopDefault(import('..\\pages\\admin\\services.vue' /* webpackChunkName: "pages/admin/services" */))
const _32bbef9c = () => interopDefault(import('..\\pages\\admin\\settings.vue' /* webpackChunkName: "pages/admin/settings" */))
const _018c9442 = () => interopDefault(import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages/admin/users" */))
const _0074458c = () => interopDefault(import('..\\pages\\admin\\voucherAdmin.vue' /* webpackChunkName: "pages/admin/voucherAdmin" */))
const _6cb21a24 = () => interopDefault(import('..\\pages\\customer\\addresses.vue' /* webpackChunkName: "pages/customer/addresses" */))
const _d4ce8b88 = () => interopDefault(import('..\\pages\\customer\\customerVoucher.vue' /* webpackChunkName: "pages/customer/customerVoucher" */))
const _47b3970e = () => interopDefault(import('..\\pages\\customer\\data.vue' /* webpackChunkName: "pages/customer/data" */))
const _5cbfa97a = () => interopDefault(import('..\\pages\\customer\\historic.vue' /* webpackChunkName: "pages/customer/historic" */))
const _7fd40c7a = () => interopDefault(import('..\\pages\\customer\\home.vue' /* webpackChunkName: "pages/customer/home" */))
const _45237711 = () => interopDefault(import('..\\pages\\customer\\payments.vue' /* webpackChunkName: "pages/customer/payments" */))
const _b207950a = () => interopDefault(import('..\\pages\\customer\\schedule.vue' /* webpackChunkName: "pages/customer/schedule" */))
const _fd6628c6 = () => interopDefault(import('..\\pages\\master\\customers.vue' /* webpackChunkName: "pages/master/customers" */))
const _534bbb48 = () => interopDefault(import('..\\pages\\master\\dashboard.vue' /* webpackChunkName: "pages/master/dashboard" */))
const _290005d4 = () => interopDefault(import('..\\pages\\master\\employee.vue' /* webpackChunkName: "pages/master/employee" */))
const _a7e11a72 = () => interopDefault(import('..\\pages\\master\\home.vue' /* webpackChunkName: "pages/master/home" */))
const _29316faa = () => interopDefault(import('..\\pages\\master\\management.vue' /* webpackChunkName: "pages/master/management" */))
const _35f0ce15 = () => interopDefault(import('..\\pages\\master\\payments.vue' /* webpackChunkName: "pages/master/payments" */))
const _d06ce702 = () => interopDefault(import('..\\pages\\master\\schedule.vue' /* webpackChunkName: "pages/master/schedule" */))
const _a0f39514 = () => interopDefault(import('..\\pages\\master\\voucher.vue' /* webpackChunkName: "pages/master/voucher" */))
const _f00f0a6a = () => interopDefault(import('..\\pages\\sso\\address.vue' /* webpackChunkName: "pages/sso/address" */))
const _6823ad1b = () => interopDefault(import('..\\pages\\sso\\branch.vue' /* webpackChunkName: "pages/sso/branch" */))
const _517dd17c = () => interopDefault(import('..\\pages\\sso\\cities.vue' /* webpackChunkName: "pages/sso/cities" */))
const _887aa258 = () => interopDefault(import('..\\pages\\sso\\company.vue' /* webpackChunkName: "pages/sso/company" */))
const _442a85cb = () => interopDefault(import('..\\pages\\sso\\countries.vue' /* webpackChunkName: "pages/sso/countries" */))
const _5611b4ab = () => interopDefault(import('..\\pages\\sso\\getCustomer.vue' /* webpackChunkName: "pages/sso/getCustomer" */))
const _42385709 = () => interopDefault(import('..\\pages\\sso\\getMasterUsers.vue' /* webpackChunkName: "pages/sso/getMasterUsers" */))
const _62ade14c = () => interopDefault(import('..\\pages\\sso\\getSuperUsers.vue' /* webpackChunkName: "pages/sso/getSuperUsers" */))
const _5eaf0d98 = () => interopDefault(import('..\\pages\\sso\\getUsersAdmin.vue' /* webpackChunkName: "pages/sso/getUsersAdmin" */))
const _e510cbd0 = () => interopDefault(import('..\\pages\\sso\\home.vue' /* webpackChunkName: "pages/sso/home" */))
const _2af22d2b = () => interopDefault(import('..\\pages\\sso\\integration.vue' /* webpackChunkName: "pages/sso/integration" */))
const _f7281f76 = () => interopDefault(import('..\\pages\\sso\\paymentMethods.vue' /* webpackChunkName: "pages/sso/paymentMethods" */))
const _4d62e4e6 = () => interopDefault(import('..\\pages\\sso\\payments.vue' /* webpackChunkName: "pages/sso/payments" */))
const _678e5541 = () => interopDefault(import('..\\pages\\sso\\paymentVoucher.vue' /* webpackChunkName: "pages/sso/paymentVoucher" */))
const _a188b960 = () => interopDefault(import('..\\pages\\sso\\schedule.vue' /* webpackChunkName: "pages/sso/schedule" */))
const _3be467d3 = () => interopDefault(import('..\\pages\\sso\\schedules.vue' /* webpackChunkName: "pages/sso/schedules" */))
const _0ebbcb8d = () => interopDefault(import('..\\pages\\sso\\scheduling.vue' /* webpackChunkName: "pages/sso/scheduling" */))
const _ff1034d2 = () => interopDefault(import('..\\pages\\sso\\services.vue' /* webpackChunkName: "pages/sso/services" */))
const _0af7257b = () => interopDefault(import('..\\pages\\sso\\states.vue' /* webpackChunkName: "pages/sso/states" */))
const _cadf89f8 = () => interopDefault(import('..\\pages\\sso\\user.vue' /* webpackChunkName: "pages/sso/user" */))
const _f886ca74 = () => interopDefault(import('..\\pages\\sso\\userBranch.vue' /* webpackChunkName: "pages/sso/userBranch" */))
const _f204fef6 = () => interopDefault(import('..\\pages\\sso\\voucher.vue' /* webpackChunkName: "pages/sso/voucher" */))
const _09fea1b3 = () => interopDefault(import('..\\pages\\superadmin\\company.vue' /* webpackChunkName: "pages/superadmin/company" */))
const _64545a88 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/agendamento",
    component: _441fd52f,
    name: "agendamento"
  }, {
    path: "/branchCompany",
    component: _0f91afe5,
    name: "branchCompany"
  }, {
    path: "/categories",
    component: _d4af84bc,
    name: "categories"
  }, {
    path: "/companies",
    component: _7cca6645,
    name: "companies"
  }, {
    path: "/register",
    component: _617923ae,
    name: "register"
  }, {
    path: "/services",
    component: _4b8efa64,
    name: "services"
  }, {
    path: "/support",
    component: _303496b9,
    name: "support"
  }, {
    path: "/userHome",
    component: _2b65e960,
    name: "userHome"
  }, {
    path: "/voucherBranch",
    component: _6a6cdeda,
    name: "voucherBranch"
  }, {
    path: "/voucherUser",
    component: _7eae5efa,
    name: "voucherUser"
  }, {
    path: "/admin/addresses",
    component: _3de28ef9,
    name: "admin-addresses"
  }, {
    path: "/admin/agenda",
    component: _16f15176,
    name: "admin-agenda"
  }, {
    path: "/admin/customers",
    component: _66aa03a8,
    name: "admin-customers"
  }, {
    path: "/admin/dashboard",
    component: _21b834eb,
    name: "admin-dashboard"
  }, {
    path: "/admin/management",
    component: _0bcb877c,
    name: "admin-management"
  }, {
    path: "/admin/modeloDashBoard",
    component: _5bba24c5,
    name: "admin-modeloDashBoard"
  }, {
    path: "/admin/payments",
    component: _1362a4b4,
    name: "admin-payments"
  }, {
    path: "/admin/schedule",
    component: _58276c10,
    name: "admin-schedule"
  }, {
    path: "/admin/schedules",
    component: _9f1c91da,
    name: "admin-schedules"
  }, {
    path: "/admin/services",
    component: _2963ae57,
    name: "admin-services"
  }, {
    path: "/admin/settings",
    component: _32bbef9c,
    name: "admin-settings"
  }, {
    path: "/admin/users",
    component: _018c9442,
    name: "admin-users"
  }, {
    path: "/admin/voucherAdmin",
    component: _0074458c,
    name: "admin-voucherAdmin"
  }, {
    path: "/customer/addresses",
    component: _6cb21a24,
    name: "customer-addresses"
  }, {
    path: "/customer/customerVoucher",
    component: _d4ce8b88,
    name: "customer-customerVoucher"
  }, {
    path: "/customer/data",
    component: _47b3970e,
    name: "customer-data"
  }, {
    path: "/customer/historic",
    component: _5cbfa97a,
    name: "customer-historic"
  }, {
    path: "/customer/home",
    component: _7fd40c7a,
    name: "customer-home"
  }, {
    path: "/customer/payments",
    component: _45237711,
    name: "customer-payments"
  }, {
    path: "/customer/schedule",
    component: _b207950a,
    name: "customer-schedule"
  }, {
    path: "/master/customers",
    component: _fd6628c6,
    name: "master-customers"
  }, {
    path: "/master/dashboard",
    component: _534bbb48,
    name: "master-dashboard"
  }, {
    path: "/master/employee",
    component: _290005d4,
    name: "master-employee"
  }, {
    path: "/master/home",
    component: _a7e11a72,
    name: "master-home"
  }, {
    path: "/master/management",
    component: _29316faa,
    name: "master-management"
  }, {
    path: "/master/payments",
    component: _35f0ce15,
    name: "master-payments"
  }, {
    path: "/master/schedule",
    component: _d06ce702,
    name: "master-schedule"
  }, {
    path: "/master/voucher",
    component: _a0f39514,
    name: "master-voucher"
  }, {
    path: "/sso/address",
    component: _f00f0a6a,
    name: "sso-address"
  }, {
    path: "/sso/branch",
    component: _6823ad1b,
    name: "sso-branch"
  }, {
    path: "/sso/cities",
    component: _517dd17c,
    name: "sso-cities"
  }, {
    path: "/sso/company",
    component: _887aa258,
    name: "sso-company"
  }, {
    path: "/sso/countries",
    component: _442a85cb,
    name: "sso-countries"
  }, {
    path: "/sso/getCustomer",
    component: _5611b4ab,
    name: "sso-getCustomer"
  }, {
    path: "/sso/getMasterUsers",
    component: _42385709,
    name: "sso-getMasterUsers"
  }, {
    path: "/sso/getSuperUsers",
    component: _62ade14c,
    name: "sso-getSuperUsers"
  }, {
    path: "/sso/getUsersAdmin",
    component: _5eaf0d98,
    name: "sso-getUsersAdmin"
  }, {
    path: "/sso/home",
    component: _e510cbd0,
    name: "sso-home"
  }, {
    path: "/sso/integration",
    component: _2af22d2b,
    name: "sso-integration"
  }, {
    path: "/sso/paymentMethods",
    component: _f7281f76,
    name: "sso-paymentMethods"
  }, {
    path: "/sso/payments",
    component: _4d62e4e6,
    name: "sso-payments"
  }, {
    path: "/sso/paymentVoucher",
    component: _678e5541,
    name: "sso-paymentVoucher"
  }, {
    path: "/sso/schedule",
    component: _a188b960,
    name: "sso-schedule"
  }, {
    path: "/sso/schedules",
    component: _3be467d3,
    name: "sso-schedules"
  }, {
    path: "/sso/scheduling",
    component: _0ebbcb8d,
    name: "sso-scheduling"
  }, {
    path: "/sso/services",
    component: _ff1034d2,
    name: "sso-services"
  }, {
    path: "/sso/states",
    component: _0af7257b,
    name: "sso-states"
  }, {
    path: "/sso/user",
    component: _cadf89f8,
    name: "sso-user"
  }, {
    path: "/sso/userBranch",
    component: _f886ca74,
    name: "sso-userBranch"
  }, {
    path: "/sso/voucher",
    component: _f204fef6,
    name: "sso-voucher"
  }, {
    path: "/superadmin/company",
    component: _09fea1b3,
    name: "superadmin-company"
  }, {
    path: "/",
    component: _64545a88,
    name: "index"
  }, {
    path: "/",
    component: _64545a88,
    name: "Welcome"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
