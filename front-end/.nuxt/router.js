import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3b79b068 = () => interopDefault(import('..\\pages\\agendamento.vue' /* webpackChunkName: "pages/agendamento" */))
const _d03cbe44 = () => interopDefault(import('..\\pages\\branchCompany.vue' /* webpackChunkName: "pages/branchCompany" */))
const _0f0cd16e = () => interopDefault(import('..\\pages\\categories.vue' /* webpackChunkName: "pages/categories" */))
const _2523bbbe = () => interopDefault(import('..\\pages\\companies.vue' /* webpackChunkName: "pages/companies" */))
const _fbc5f4e0 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _032edc6a = () => interopDefault(import('..\\pages\\services.vue' /* webpackChunkName: "pages/services" */))
const _28b2131c = () => interopDefault(import('..\\pages\\support.vue' /* webpackChunkName: "pages/support" */))
const _7ca12d14 = () => interopDefault(import('..\\pages\\teste.vue' /* webpackChunkName: "pages/teste" */))
const _c5b2ba92 = () => interopDefault(import('..\\pages\\userHome.vue' /* webpackChunkName: "pages/userHome" */))
const _1a86605a = () => interopDefault(import('..\\pages\\voucherBranch.vue' /* webpackChunkName: "pages/voucherBranch" */))
const _8ffaa888 = () => interopDefault(import('..\\pages\\voucherUser.vue' /* webpackChunkName: "pages/voucherUser" */))
const _0cbdcf60 = () => interopDefault(import('..\\pages\\admin\\addresses.vue' /* webpackChunkName: "pages/admin/addresses" */))
const _7cd7483e = () => interopDefault(import('..\\pages\\admin\\agenda.vue' /* webpackChunkName: "pages/admin/agenda" */))
const _c8f382da = () => interopDefault(import('..\\pages\\admin\\customers.vue' /* webpackChunkName: "pages/admin/customers" */))
const _1ed9155c = () => interopDefault(import('..\\pages\\admin\\dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _185853f5 = () => interopDefault(import('..\\pages\\admin\\management.vue' /* webpackChunkName: "pages/admin/management" */))
const _31c73bec = () => interopDefault(import('..\\pages\\admin\\modeloDashBoard.vue' /* webpackChunkName: "pages/admin/modeloDashBoard" */))
const _ab337742 = () => interopDefault(import('..\\pages\\admin\\payments.vue' /* webpackChunkName: "pages/admin/payments" */))
const _0c3f02c9 = () => interopDefault(import('..\\pages\\admin\\schedule.vue' /* webpackChunkName: "pages/admin/schedule" */))
const _7f4cf77a = () => interopDefault(import('..\\pages\\admin\\schedules.vue' /* webpackChunkName: "pages/admin/schedules" */))
const _450975e0 = () => interopDefault(import('..\\pages\\admin\\services.vue' /* webpackChunkName: "pages/admin/services" */))
const _3258f356 = () => interopDefault(import('..\\pages\\admin\\settings.vue' /* webpackChunkName: "pages/admin/settings" */))
const _19c97c74 = () => interopDefault(import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages/admin/users" */))
const _1c516f73 = () => interopDefault(import('..\\pages\\admin\\voucherAdmin.vue' /* webpackChunkName: "pages/admin/voucherAdmin" */))
const _339af5b2 = () => interopDefault(import('..\\pages\\customer\\addresses.vue' /* webpackChunkName: "pages/customer/addresses" */))
const _1a1c0496 = () => interopDefault(import('..\\pages\\customer\\customerVoucher.vue' /* webpackChunkName: "pages/customer/customerVoucher" */))
const _6d3c7596 = () => interopDefault(import('..\\pages\\customer\\data.vue' /* webpackChunkName: "pages/customer/data" */))
const _56acedea = () => interopDefault(import('..\\pages\\customer\\historic.vue' /* webpackChunkName: "pages/customer/historic" */))
const _41c427ea = () => interopDefault(import('..\\pages\\customer\\home.vue' /* webpackChunkName: "pages/customer/home" */))
const _6b9f8c90 = () => interopDefault(import('..\\pages\\customer\\payments.vue' /* webpackChunkName: "pages/customer/payments" */))
const _2c08f822 = () => interopDefault(import('..\\pages\\customer\\schedule.vue' /* webpackChunkName: "pages/customer/schedule" */))
const _e44c8fd4 = () => interopDefault(import('..\\pages\\master\\customers.vue' /* webpackChunkName: "pages/master/customers" */))
const _3a322256 = () => interopDefault(import('..\\pages\\master\\dashboard.vue' /* webpackChunkName: "pages/master/dashboard" */))
const _8b498506 = () => interopDefault(import('..\\pages\\master\\employee.vue' /* webpackChunkName: "pages/master/employee" */))
const _c01e02a4 = () => interopDefault(import('..\\pages\\master\\home.vue' /* webpackChunkName: "pages/master/home" */))
const _70740ad2 = () => interopDefault(import('..\\pages\\master\\management.vue' /* webpackChunkName: "pages/master/management" */))
const _04cc0e7c = () => interopDefault(import('..\\pages\\master\\payments.vue' /* webpackChunkName: "pages/master/payments" */))
const _66a4cce6 = () => interopDefault(import('..\\pages\\master\\schedule.vue' /* webpackChunkName: "pages/master/schedule" */))
const _639dcc2f = () => interopDefault(import('..\\pages\\master\\voucher.vue' /* webpackChunkName: "pages/master/voucher" */))
const _7bda06b2 = () => interopDefault(import('..\\pages\\sso\\address.vue' /* webpackChunkName: "pages/sso/address" */))
const _5f7d8854 = () => interopDefault(import('..\\pages\\sso\\branch.vue' /* webpackChunkName: "pages/sso/branch" */))
const _62ca1b0a = () => interopDefault(import('..\\pages\\sso\\cities.vue' /* webpackChunkName: "pages/sso/cities" */))
const _a0b78a8a = () => interopDefault(import('..\\pages\\sso\\company.vue' /* webpackChunkName: "pages/sso/company" */))
const _744e981c = () => interopDefault(import('..\\pages\\sso\\countries.vue' /* webpackChunkName: "pages/sso/countries" */))
const _24ecf512 = () => interopDefault(import('..\\pages\\sso\\getCustomer.vue' /* webpackChunkName: "pages/sso/getCustomer" */))
const _5ec3e942 = () => interopDefault(import('..\\pages\\sso\\getMasterUsers.vue' /* webpackChunkName: "pages/sso/getMasterUsers" */))
const _53b5d201 = () => interopDefault(import('..\\pages\\sso\\getSuperUsers.vue' /* webpackChunkName: "pages/sso/getSuperUsers" */))
const _55b53bdb = () => interopDefault(import('..\\pages\\sso\\getUsersAdmin.vue' /* webpackChunkName: "pages/sso/getUsersAdmin" */))
const _35d0ef91 = () => interopDefault(import('..\\pages\\sso\\home.vue' /* webpackChunkName: "pages/sso/home" */))
const _0c6524dc = () => interopDefault(import('..\\pages\\sso\\integration.vue' /* webpackChunkName: "pages/sso/integration" */))
const _be10fb04 = () => interopDefault(import('..\\pages\\sso\\paymentMethods.vue' /* webpackChunkName: "pages/sso/paymentMethods" */))
const _549a5442 = () => interopDefault(import('..\\pages\\sso\\payments.vue' /* webpackChunkName: "pages/sso/payments" */))
const _f7cc310c = () => interopDefault(import('..\\pages\\sso\\paymentVoucher.vue' /* webpackChunkName: "pages/sso/paymentVoucher" */))
const _378b9449 = () => interopDefault(import('..\\pages\\sso\\schedule.vue' /* webpackChunkName: "pages/sso/schedule" */))
const _84dad40c = () => interopDefault(import('..\\pages\\sso\\schedules.vue' /* webpackChunkName: "pages/sso/schedules" */))
const _7a593b74 = () => interopDefault(import('..\\pages\\sso\\scheduling.vue' /* webpackChunkName: "pages/sso/scheduling" */))
const _08c7d690 = () => interopDefault(import('..\\pages\\sso\\services.vue' /* webpackChunkName: "pages/sso/services" */))
const _025100b4 = () => interopDefault(import('..\\pages\\sso\\states.vue' /* webpackChunkName: "pages/sso/states" */))
const _42e9907d = () => interopDefault(import('..\\pages\\sso\\user.vue' /* webpackChunkName: "pages/sso/user" */))
const _37d4317f = () => interopDefault(import('..\\pages\\sso\\userBranch.vue' /* webpackChunkName: "pages/sso/userBranch" */))
const _7adf0c6c = () => interopDefault(import('..\\pages\\sso\\voucher.vue' /* webpackChunkName: "pages/sso/voucher" */))
const _268a33ec = () => interopDefault(import('..\\pages\\superadmin\\company.vue' /* webpackChunkName: "pages/superadmin/company" */))
const _50c26696 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _3b79b068,
    name: "agendamento"
  }, {
    path: "/branchCompany",
    component: _d03cbe44,
    name: "branchCompany"
  }, {
    path: "/categories",
    component: _0f0cd16e,
    name: "categories"
  }, {
    path: "/companies",
    component: _2523bbbe,
    name: "companies"
  }, {
    path: "/register",
    component: _fbc5f4e0,
    name: "register"
  }, {
    path: "/services",
    component: _032edc6a,
    name: "services"
  }, {
    path: "/support",
    component: _28b2131c,
    name: "support"
  }, {
    path: "/teste",
    component: _7ca12d14,
    name: "teste"
  }, {
    path: "/userHome",
    component: _c5b2ba92,
    name: "userHome"
  }, {
    path: "/voucherBranch",
    component: _1a86605a,
    name: "voucherBranch"
  }, {
    path: "/voucherUser",
    component: _8ffaa888,
    name: "voucherUser"
  }, {
    path: "/admin/addresses",
    component: _0cbdcf60,
    name: "admin-addresses"
  }, {
    path: "/admin/agenda",
    component: _7cd7483e,
    name: "admin-agenda"
  }, {
    path: "/admin/customers",
    component: _c8f382da,
    name: "admin-customers"
  }, {
    path: "/admin/dashboard",
    component: _1ed9155c,
    name: "admin-dashboard"
  }, {
    path: "/admin/management",
    component: _185853f5,
    name: "admin-management"
  }, {
    path: "/admin/modeloDashBoard",
    component: _31c73bec,
    name: "admin-modeloDashBoard"
  }, {
    path: "/admin/payments",
    component: _ab337742,
    name: "admin-payments"
  }, {
    path: "/admin/schedule",
    component: _0c3f02c9,
    name: "admin-schedule"
  }, {
    path: "/admin/schedules",
    component: _7f4cf77a,
    name: "admin-schedules"
  }, {
    path: "/admin/services",
    component: _450975e0,
    name: "admin-services"
  }, {
    path: "/admin/settings",
    component: _3258f356,
    name: "admin-settings"
  }, {
    path: "/admin/users",
    component: _19c97c74,
    name: "admin-users"
  }, {
    path: "/admin/voucherAdmin",
    component: _1c516f73,
    name: "admin-voucherAdmin"
  }, {
    path: "/customer/addresses",
    component: _339af5b2,
    name: "customer-addresses"
  }, {
    path: "/customer/customerVoucher",
    component: _1a1c0496,
    name: "customer-customerVoucher"
  }, {
    path: "/customer/data",
    component: _6d3c7596,
    name: "customer-data"
  }, {
    path: "/customer/historic",
    component: _56acedea,
    name: "customer-historic"
  }, {
    path: "/customer/home",
    component: _41c427ea,
    name: "customer-home"
  }, {
    path: "/customer/payments",
    component: _6b9f8c90,
    name: "customer-payments"
  }, {
    path: "/customer/schedule",
    component: _2c08f822,
    name: "customer-schedule"
  }, {
    path: "/master/customers",
    component: _e44c8fd4,
    name: "master-customers"
  }, {
    path: "/master/dashboard",
    component: _3a322256,
    name: "master-dashboard"
  }, {
    path: "/master/employee",
    component: _8b498506,
    name: "master-employee"
  }, {
    path: "/master/home",
    component: _c01e02a4,
    name: "master-home"
  }, {
    path: "/master/management",
    component: _70740ad2,
    name: "master-management"
  }, {
    path: "/master/payments",
    component: _04cc0e7c,
    name: "master-payments"
  }, {
    path: "/master/schedule",
    component: _66a4cce6,
    name: "master-schedule"
  }, {
    path: "/master/voucher",
    component: _639dcc2f,
    name: "master-voucher"
  }, {
    path: "/sso/address",
    component: _7bda06b2,
    name: "sso-address"
  }, {
    path: "/sso/branch",
    component: _5f7d8854,
    name: "sso-branch"
  }, {
    path: "/sso/cities",
    component: _62ca1b0a,
    name: "sso-cities"
  }, {
    path: "/sso/company",
    component: _a0b78a8a,
    name: "sso-company"
  }, {
    path: "/sso/countries",
    component: _744e981c,
    name: "sso-countries"
  }, {
    path: "/sso/getCustomer",
    component: _24ecf512,
    name: "sso-getCustomer"
  }, {
    path: "/sso/getMasterUsers",
    component: _5ec3e942,
    name: "sso-getMasterUsers"
  }, {
    path: "/sso/getSuperUsers",
    component: _53b5d201,
    name: "sso-getSuperUsers"
  }, {
    path: "/sso/getUsersAdmin",
    component: _55b53bdb,
    name: "sso-getUsersAdmin"
  }, {
    path: "/sso/home",
    component: _35d0ef91,
    name: "sso-home"
  }, {
    path: "/sso/integration",
    component: _0c6524dc,
    name: "sso-integration"
  }, {
    path: "/sso/paymentMethods",
    component: _be10fb04,
    name: "sso-paymentMethods"
  }, {
    path: "/sso/payments",
    component: _549a5442,
    name: "sso-payments"
  }, {
    path: "/sso/paymentVoucher",
    component: _f7cc310c,
    name: "sso-paymentVoucher"
  }, {
    path: "/sso/schedule",
    component: _378b9449,
    name: "sso-schedule"
  }, {
    path: "/sso/schedules",
    component: _84dad40c,
    name: "sso-schedules"
  }, {
    path: "/sso/scheduling",
    component: _7a593b74,
    name: "sso-scheduling"
  }, {
    path: "/sso/services",
    component: _08c7d690,
    name: "sso-services"
  }, {
    path: "/sso/states",
    component: _025100b4,
    name: "sso-states"
  }, {
    path: "/sso/user",
    component: _42e9907d,
    name: "sso-user"
  }, {
    path: "/sso/userBranch",
    component: _37d4317f,
    name: "sso-userBranch"
  }, {
    path: "/sso/voucher",
    component: _7adf0c6c,
    name: "sso-voucher"
  }, {
    path: "/superadmin/company",
    component: _268a33ec,
    name: "superadmin-company"
  }, {
    path: "/",
    component: _50c26696,
    name: "index"
  }, {
    path: "/",
    component: _50c26696,
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
