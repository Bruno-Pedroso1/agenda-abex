import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3eeaf215 = () => interopDefault(import('..\\pages\\agendamento.vue' /* webpackChunkName: "pages/agendamento" */))
const _f7eda96a = () => interopDefault(import('..\\pages\\branchCompany.vue' /* webpackChunkName: "pages/branchCompany" */))
const _6c32ebfc = () => interopDefault(import('..\\pages\\categories.vue' /* webpackChunkName: "pages/categories" */))
const _396384ab = () => interopDefault(import('..\\pages\\companies.vue' /* webpackChunkName: "pages/companies" */))
const _5979eb03 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _54751184 = () => interopDefault(import('..\\pages\\services.vue' /* webpackChunkName: "pages/services" */))
const _452e169f = () => interopDefault(import('..\\pages\\support.vue' /* webpackChunkName: "pages/support" */))
const _7483882a = () => interopDefault(import('..\\pages\\userHome.vue' /* webpackChunkName: "pages/userHome" */))
const _42374b80 = () => interopDefault(import('..\\pages\\voucherBranch.vue' /* webpackChunkName: "pages/voucherBranch" */))
const _8918252e = () => interopDefault(import('..\\pages\\voucherUser.vue' /* webpackChunkName: "pages/voucherUser" */))
const _cbb8dc5a = () => interopDefault(import('..\\pages\\admin\\addresses.vue' /* webpackChunkName: "pages/admin/addresses" */))
const _68fed2ab = () => interopDefault(import('..\\pages\\admin\\agenda.vue' /* webpackChunkName: "pages/admin/agenda" */))
const _28ec0106 = () => interopDefault(import('..\\pages\\admin\\customers.vue' /* webpackChunkName: "pages/admin/customers" */))
const _7df937c5 = () => interopDefault(import('..\\pages\\admin\\dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _37aadfe2 = () => interopDefault(import('..\\pages\\admin\\management.vue' /* webpackChunkName: "pages/admin/management" */))
const _c87fc7c2 = () => interopDefault(import('..\\pages\\admin\\modeloDashBoard.vue' /* webpackChunkName: "pages/admin/modeloDashBoard" */))
const _2ad4e78c = () => interopDefault(import('..\\pages\\admin\\payments.vue' /* webpackChunkName: "pages/admin/payments" */))
const _e6a4b414 = () => interopDefault(import('..\\pages\\admin\\schedule.vue' /* webpackChunkName: "pages/admin/schedule" */))
const _0cb2b9ed = () => interopDefault(import('..\\pages\\admin\\schedules.vue' /* webpackChunkName: "pages/admin/schedules" */))
const _5de9e83d = () => interopDefault(import('..\\pages\\admin\\services.vue' /* webpackChunkName: "pages/admin/services" */))
const _67422982 = () => interopDefault(import('..\\pages\\admin\\settings.vue' /* webpackChunkName: "pages/admin/settings" */))
const _5dd235b9 = () => interopDefault(import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages/admin/users" */))
const _9d9e97c0 = () => interopDefault(import('..\\pages\\admin\\voucherAdmin.vue' /* webpackChunkName: "pages/admin/voucherAdmin" */))
const _7b11c9d4 = () => interopDefault(import('..\\pages\\customer\\addresses.vue' /* webpackChunkName: "pages/customer/addresses" */))
const _0be44ca2 = () => interopDefault(import('..\\pages\\customer\\customerVoucher.vue' /* webpackChunkName: "pages/customer/customerVoucher" */))
const _622b8868 = () => interopDefault(import('..\\pages\\customer\\data.vue' /* webpackChunkName: "pages/customer/data" */))
const _21abdf9d = () => interopDefault(import('..\\pages\\customer\\historic.vue' /* webpackChunkName: "pages/customer/historic" */))
const _4ae429c6 = () => interopDefault(import('..\\pages\\customer\\home.vue' /* webpackChunkName: "pages/customer/home" */))
const _d5a1a92a = () => interopDefault(import('..\\pages\\customer\\payments.vue' /* webpackChunkName: "pages/customer/payments" */))
const _11f02c56 = () => interopDefault(import('..\\pages\\customer\\schedule.vue' /* webpackChunkName: "pages/customer/schedule" */))
const _a5a777fa = () => interopDefault(import('..\\pages\\master\\customers.vue' /* webpackChunkName: "pages/master/customers" */))
const _02397ac2 = () => interopDefault(import('..\\pages\\master\\dashboard.vue' /* webpackChunkName: "pages/master/dashboard" */))
const _47c0fff0 = () => interopDefault(import('..\\pages\\master\\employee.vue' /* webpackChunkName: "pages/master/employee" */))
const _0aa7f2a1 = () => interopDefault(import('..\\pages\\master\\home.vue' /* webpackChunkName: "pages/master/home" */))
const _3b72fc85 = () => interopDefault(import('..\\pages\\master\\management.vue' /* webpackChunkName: "pages/master/management" */))
const _db9c5e22 = () => interopDefault(import('..\\pages\\master\\payments.vue' /* webpackChunkName: "pages/master/payments" */))
const _17eae14e = () => interopDefault(import('..\\pages\\master\\schedule.vue' /* webpackChunkName: "pages/master/schedule" */))
const _37e72148 = () => interopDefault(import('..\\pages\\master\\voucher.vue' /* webpackChunkName: "pages/master/voucher" */))
const _32de0ab6 = () => interopDefault(import('..\\pages\\sso\\address.vue' /* webpackChunkName: "pages/sso/address" */))
const _62eeca01 = () => interopDefault(import('..\\pages\\sso\\branch.vue' /* webpackChunkName: "pages/sso/branch" */))
const _5be797b0 = () => interopDefault(import('..\\pages\\sso\\cities.vue' /* webpackChunkName: "pages/sso/cities" */))
const _1a5b2eae = () => interopDefault(import('..\\pages\\sso\\company.vue' /* webpackChunkName: "pages/sso/company" */))
const _5ea27725 = () => interopDefault(import('..\\pages\\sso\\countries.vue' /* webpackChunkName: "pages/sso/countries" */))
const _9b5a90f6 = () => interopDefault(import('..\\pages\\sso\\getCustomer.vue' /* webpackChunkName: "pages/sso/getCustomer" */))
const _18b9a422 = () => interopDefault(import('..\\pages\\sso\\getMasterUsers.vue' /* webpackChunkName: "pages/sso/getMasterUsers" */))
const _1eb4c3b4 = () => interopDefault(import('..\\pages\\sso\\getSuperUsers.vue' /* webpackChunkName: "pages/sso/getSuperUsers" */))
const _20b42d8e = () => interopDefault(import('..\\pages\\sso\\getUsersAdmin.vue' /* webpackChunkName: "pages/sso/getUsersAdmin" */))
const _4a10b87e = () => interopDefault(import('..\\pages\\sso\\home.vue' /* webpackChunkName: "pages/sso/home" */))
const _f1999ff6 = () => interopDefault(import('..\\pages\\sso\\integration.vue' /* webpackChunkName: "pages/sso/integration" */))
const _35d6c72b = () => interopDefault(import('..\\pages\\sso\\paymentMethods.vue' /* webpackChunkName: "pages/sso/paymentMethods" */))
const _7c4b3f68 = () => interopDefault(import('..\\pages\\sso\\payments.vue' /* webpackChunkName: "pages/sso/payments" */))
const _18f92c27 = () => interopDefault(import('..\\pages\\sso\\paymentVoucher.vue' /* webpackChunkName: "pages/sso/paymentVoucher" */))
const _23b31eb6 = () => interopDefault(import('..\\pages\\sso\\schedule.vue' /* webpackChunkName: "pages/sso/schedule" */))
const _565c592d = () => interopDefault(import('..\\pages\\sso\\schedules.vue' /* webpackChunkName: "pages/sso/schedules" */))
const _43420573 = () => interopDefault(import('..\\pages\\sso\\scheduling.vue' /* webpackChunkName: "pages/sso/scheduling" */))
const _16213e06 = () => interopDefault(import('..\\pages\\sso\\services.vue' /* webpackChunkName: "pages/sso/services" */))
const _05c24261 = () => interopDefault(import('..\\pages\\sso\\states.vue' /* webpackChunkName: "pages/sso/states" */))
const _5729596a = () => interopDefault(import('..\\pages\\sso\\user.vue' /* webpackChunkName: "pages/sso/user" */))
const _8f7a56a8 = () => interopDefault(import('..\\pages\\sso\\userBranch.vue' /* webpackChunkName: "pages/sso/userBranch" */))
const _34d3ff42 = () => interopDefault(import('..\\pages\\sso\\voucher.vue' /* webpackChunkName: "pages/sso/voucher" */))
const _892d0ece = () => interopDefault(import('..\\pages\\superadmin\\company.vue' /* webpackChunkName: "pages/superadmin/company" */))
const _12da1422 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _3eeaf215,
    name: "agendamento"
  }, {
    path: "/branchCompany",
    component: _f7eda96a,
    name: "branchCompany"
  }, {
    path: "/categories",
    component: _6c32ebfc,
    name: "categories"
  }, {
    path: "/companies",
    component: _396384ab,
    name: "companies"
  }, {
    path: "/register",
    component: _5979eb03,
    name: "register"
  }, {
    path: "/services",
    component: _54751184,
    name: "services"
  }, {
    path: "/support",
    component: _452e169f,
    name: "support"
  }, {
    path: "/userHome",
    component: _7483882a,
    name: "userHome"
  }, {
    path: "/voucherBranch",
    component: _42374b80,
    name: "voucherBranch"
  }, {
    path: "/voucherUser",
    component: _8918252e,
    name: "voucherUser"
  }, {
    path: "/admin/addresses",
    component: _cbb8dc5a,
    name: "admin-addresses"
  }, {
    path: "/admin/agenda",
    component: _68fed2ab,
    name: "admin-agenda"
  }, {
    path: "/admin/customers",
    component: _28ec0106,
    name: "admin-customers"
  }, {
    path: "/admin/dashboard",
    component: _7df937c5,
    name: "admin-dashboard"
  }, {
    path: "/admin/management",
    component: _37aadfe2,
    name: "admin-management"
  }, {
    path: "/admin/modeloDashBoard",
    component: _c87fc7c2,
    name: "admin-modeloDashBoard"
  }, {
    path: "/admin/payments",
    component: _2ad4e78c,
    name: "admin-payments"
  }, {
    path: "/admin/schedule",
    component: _e6a4b414,
    name: "admin-schedule"
  }, {
    path: "/admin/schedules",
    component: _0cb2b9ed,
    name: "admin-schedules"
  }, {
    path: "/admin/services",
    component: _5de9e83d,
    name: "admin-services"
  }, {
    path: "/admin/settings",
    component: _67422982,
    name: "admin-settings"
  }, {
    path: "/admin/users",
    component: _5dd235b9,
    name: "admin-users"
  }, {
    path: "/admin/voucherAdmin",
    component: _9d9e97c0,
    name: "admin-voucherAdmin"
  }, {
    path: "/customer/addresses",
    component: _7b11c9d4,
    name: "customer-addresses"
  }, {
    path: "/customer/customerVoucher",
    component: _0be44ca2,
    name: "customer-customerVoucher"
  }, {
    path: "/customer/data",
    component: _622b8868,
    name: "customer-data"
  }, {
    path: "/customer/historic",
    component: _21abdf9d,
    name: "customer-historic"
  }, {
    path: "/customer/home",
    component: _4ae429c6,
    name: "customer-home"
  }, {
    path: "/customer/payments",
    component: _d5a1a92a,
    name: "customer-payments"
  }, {
    path: "/customer/schedule",
    component: _11f02c56,
    name: "customer-schedule"
  }, {
    path: "/master/customers",
    component: _a5a777fa,
    name: "master-customers"
  }, {
    path: "/master/dashboard",
    component: _02397ac2,
    name: "master-dashboard"
  }, {
    path: "/master/employee",
    component: _47c0fff0,
    name: "master-employee"
  }, {
    path: "/master/home",
    component: _0aa7f2a1,
    name: "master-home"
  }, {
    path: "/master/management",
    component: _3b72fc85,
    name: "master-management"
  }, {
    path: "/master/payments",
    component: _db9c5e22,
    name: "master-payments"
  }, {
    path: "/master/schedule",
    component: _17eae14e,
    name: "master-schedule"
  }, {
    path: "/master/voucher",
    component: _37e72148,
    name: "master-voucher"
  }, {
    path: "/sso/address",
    component: _32de0ab6,
    name: "sso-address"
  }, {
    path: "/sso/branch",
    component: _62eeca01,
    name: "sso-branch"
  }, {
    path: "/sso/cities",
    component: _5be797b0,
    name: "sso-cities"
  }, {
    path: "/sso/company",
    component: _1a5b2eae,
    name: "sso-company"
  }, {
    path: "/sso/countries",
    component: _5ea27725,
    name: "sso-countries"
  }, {
    path: "/sso/getCustomer",
    component: _9b5a90f6,
    name: "sso-getCustomer"
  }, {
    path: "/sso/getMasterUsers",
    component: _18b9a422,
    name: "sso-getMasterUsers"
  }, {
    path: "/sso/getSuperUsers",
    component: _1eb4c3b4,
    name: "sso-getSuperUsers"
  }, {
    path: "/sso/getUsersAdmin",
    component: _20b42d8e,
    name: "sso-getUsersAdmin"
  }, {
    path: "/sso/home",
    component: _4a10b87e,
    name: "sso-home"
  }, {
    path: "/sso/integration",
    component: _f1999ff6,
    name: "sso-integration"
  }, {
    path: "/sso/paymentMethods",
    component: _35d6c72b,
    name: "sso-paymentMethods"
  }, {
    path: "/sso/payments",
    component: _7c4b3f68,
    name: "sso-payments"
  }, {
    path: "/sso/paymentVoucher",
    component: _18f92c27,
    name: "sso-paymentVoucher"
  }, {
    path: "/sso/schedule",
    component: _23b31eb6,
    name: "sso-schedule"
  }, {
    path: "/sso/schedules",
    component: _565c592d,
    name: "sso-schedules"
  }, {
    path: "/sso/scheduling",
    component: _43420573,
    name: "sso-scheduling"
  }, {
    path: "/sso/services",
    component: _16213e06,
    name: "sso-services"
  }, {
    path: "/sso/states",
    component: _05c24261,
    name: "sso-states"
  }, {
    path: "/sso/user",
    component: _5729596a,
    name: "sso-user"
  }, {
    path: "/sso/userBranch",
    component: _8f7a56a8,
    name: "sso-userBranch"
  }, {
    path: "/sso/voucher",
    component: _34d3ff42,
    name: "sso-voucher"
  }, {
    path: "/superadmin/company",
    component: _892d0ece,
    name: "superadmin-company"
  }, {
    path: "/",
    component: _12da1422,
    name: "index"
  }, {
    path: "/",
    component: _12da1422,
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
