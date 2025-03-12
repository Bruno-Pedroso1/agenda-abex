import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f92e155e = () => interopDefault(import('..\\pages\\agendamento.vue' /* webpackChunkName: "pages/agendamento" */))
const _bdd960f2 = () => interopDefault(import('..\\pages\\branchCompany.vue' /* webpackChunkName: "pages/branchCompany" */))
const _1aecdd80 = () => interopDefault(import('..\\pages\\categories.vue' /* webpackChunkName: "pages/categories" */))
const _5ec126e7 = () => interopDefault(import('..\\pages\\companies.vue' /* webpackChunkName: "pages/companies" */))
const _b5fddd72 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _214c9d82 = () => interopDefault(import('..\\pages\\services.vue' /* webpackChunkName: "pages/services" */))
const _2671d04a = () => interopDefault(import('..\\pages\\support.vue' /* webpackChunkName: "pages/support" */))
const _7feaa324 = () => interopDefault(import('..\\pages\\userHome.vue' /* webpackChunkName: "pages/userHome" */))
const _08230308 = () => interopDefault(import('..\\pages\\voucherBranch.vue' /* webpackChunkName: "pages/voucherBranch" */))
const _001c1eb6 = () => interopDefault(import('..\\pages\\voucherUser.vue' /* webpackChunkName: "pages/voucherUser" */))
const _0d5b97d2 = () => interopDefault(import('..\\pages\\admin\\addresses.vue' /* webpackChunkName: "pages/admin/addresses" */))
const _f3ee1232 = () => interopDefault(import('..\\pages\\admin\\agenda.vue' /* webpackChunkName: "pages/admin/agenda" */))
const _efcab96c = () => interopDefault(import('..\\pages\\admin\\customers.vue' /* webpackChunkName: "pages/admin/customers" */))
const _45b04bee = () => interopDefault(import('..\\pages\\admin\\dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _835ef3c4 = () => interopDefault(import('..\\pages\\admin\\management.vue' /* webpackChunkName: "pages/admin/management" */))
const _1f14fb63 = () => interopDefault(import('..\\pages\\admin\\modeloDashBoard.vue' /* webpackChunkName: "pages/admin/modeloDashBoard" */))
const _2de6ecc8 = () => interopDefault(import('..\\pages\\admin\\payments.vue' /* webpackChunkName: "pages/admin/payments" */))
const _e080a99c = () => interopDefault(import('..\\pages\\admin\\schedule.vue' /* webpackChunkName: "pages/admin/schedule" */))
const _6be15c31 = () => interopDefault(import('..\\pages\\admin\\schedules.vue' /* webpackChunkName: "pages/admin/schedules" */))
const _60fbed79 = () => interopDefault(import('..\\pages\\admin\\services.vue' /* webpackChunkName: "pages/admin/services" */))
const _6a542ebe = () => interopDefault(import('..\\pages\\admin\\settings.vue' /* webpackChunkName: "pages/admin/settings" */))
const _add6cc06 = () => interopDefault(import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages/admin/users" */))
const _2505bb5c = () => interopDefault(import('..\\pages\\admin\\voucherAdmin.vue' /* webpackChunkName: "pages/admin/voucherAdmin" */))
const _22325de0 = () => interopDefault(import('..\\pages\\customer\\addresses.vue' /* webpackChunkName: "pages/customer/addresses" */))
const _3d8df6de = () => interopDefault(import('..\\pages\\customer\\customerVoucher.vue' /* webpackChunkName: "pages/customer/customerVoucher" */))
const _333428a8 = () => interopDefault(import('..\\pages\\customer\\data.vue' /* webpackChunkName: "pages/customer/data" */))
const _6fbb00e1 = () => interopDefault(import('..\\pages\\customer\\historic.vue' /* webpackChunkName: "pages/customer/historic" */))
const _5ec84e61 = () => interopDefault(import('..\\pages\\customer\\home.vue' /* webpackChunkName: "pages/customer/home" */))
const _398366a2 = () => interopDefault(import('..\\pages\\customer\\payments.vue' /* webpackChunkName: "pages/customer/payments" */))
const _45170b19 = () => interopDefault(import('..\\pages\\customer\\schedule.vue' /* webpackChunkName: "pages/customer/schedule" */))
const _33d1ea3f = () => interopDefault(import('..\\pages\\master\\customers.vue' /* webpackChunkName: "pages/master/customers" */))
const _ee41be04 = () => interopDefault(import('..\\pages\\master\\dashboard.vue' /* webpackChunkName: "pages/master/dashboard" */))
const _b220bb98 = () => interopDefault(import('..\\pages\\master\\employee.vue' /* webpackChunkName: "pages/master/employee" */))
const _55ea56e5 = () => interopDefault(import('..\\pages\\master\\home.vue' /* webpackChunkName: "pages/master/home" */))
const _ecfbc46e = () => interopDefault(import('..\\pages\\master\\management.vue' /* webpackChunkName: "pages/master/management" */))
const _1d3f199a = () => interopDefault(import('..\\pages\\master\\payments.vue' /* webpackChunkName: "pages/master/payments" */))
const _5339319d = () => interopDefault(import('..\\pages\\master\\schedule.vue' /* webpackChunkName: "pages/master/schedule" */))
const _31c316d0 = () => interopDefault(import('..\\pages\\master\\voucher.vue' /* webpackChunkName: "pages/master/voucher" */))
const _31d35ee9 = () => interopDefault(import('..\\pages\\sso\\address.vue' /* webpackChunkName: "pages/sso/address" */))
const _b1266586 = () => interopDefault(import('..\\pages\\sso\\branch.vue' /* webpackChunkName: "pages/sso/branch" */))
const _168a3764 = () => interopDefault(import('..\\pages\\sso\\cities.vue' /* webpackChunkName: "pages/sso/cities" */))
const _659d92f2 = () => interopDefault(import('..\\pages\\sso\\company.vue' /* webpackChunkName: "pages/sso/company" */))
const _3a464b2e = () => interopDefault(import('..\\pages\\sso\\countries.vue' /* webpackChunkName: "pages/sso/countries" */))
const _118159c9 = () => interopDefault(import('..\\pages\\sso\\getCustomer.vue' /* webpackChunkName: "pages/sso/getCustomer" */))
const _6778352b = () => interopDefault(import('..\\pages\\sso\\getMasterUsers.vue' /* webpackChunkName: "pages/sso/getMasterUsers" */))
const _6cc3e4f8 = () => interopDefault(import('..\\pages\\sso\\getSuperUsers.vue' /* webpackChunkName: "pages/sso/getSuperUsers" */))
const _6ec34ed2 = () => interopDefault(import('..\\pages\\sso\\getUsersAdmin.vue' /* webpackChunkName: "pages/sso/getUsersAdmin" */))
const _6f6e5aba = () => interopDefault(import('..\\pages\\sso\\home.vue' /* webpackChunkName: "pages/sso/home" */))
const _333c5b6e = () => interopDefault(import('..\\pages\\sso\\integration.vue' /* webpackChunkName: "pages/sso/integration" */))
const _aca86332 = () => interopDefault(import('..\\pages\\sso\\paymentMethods.vue' /* webpackChunkName: "pages/sso/paymentMethods" */))
const _4236f6f0 = () => interopDefault(import('..\\pages\\sso\\payments.vue' /* webpackChunkName: "pages/sso/payments" */))
const _e663993a = () => interopDefault(import('..\\pages\\sso\\paymentVoucher.vue' /* webpackChunkName: "pages/sso/paymentVoucher" */))
const _40bd42f2 = () => interopDefault(import('..\\pages\\sso\\schedule.vue' /* webpackChunkName: "pages/sso/schedule" */))
const _4ad2871e = () => interopDefault(import('..\\pages\\sso\\schedules.vue' /* webpackChunkName: "pages/sso/schedules" */))
const _46540aaf = () => interopDefault(import('..\\pages\\sso\\scheduling.vue' /* webpackChunkName: "pages/sso/scheduling" */))
const _11f98539 = () => interopDefault(import('..\\pages\\sso\\services.vue' /* webpackChunkName: "pages/sso/services" */))
const _4a40459d = () => interopDefault(import('..\\pages\\sso\\states.vue' /* webpackChunkName: "pages/sso/states" */))
const _7c86fba6 = () => interopDefault(import('..\\pages\\sso\\user.vue' /* webpackChunkName: "pages/sso/user" */))
const _89564c30 = () => interopDefault(import('..\\pages\\sso\\userBranch.vue' /* webpackChunkName: "pages/sso/userBranch" */))
const _30d864a3 = () => interopDefault(import('..\\pages\\sso\\voucher.vue' /* webpackChunkName: "pages/sso/voucher" */))
const _2f3e7fd5 = () => interopDefault(import('..\\pages\\superadmin\\company.vue' /* webpackChunkName: "pages/superadmin/company" */))
const _01fa345e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _f92e155e,
    name: "agendamento"
  }, {
    path: "/branchCompany",
    component: _bdd960f2,
    name: "branchCompany"
  }, {
    path: "/categories",
    component: _1aecdd80,
    name: "categories"
  }, {
    path: "/companies",
    component: _5ec126e7,
    name: "companies"
  }, {
    path: "/register",
    component: _b5fddd72,
    name: "register"
  }, {
    path: "/services",
    component: _214c9d82,
    name: "services"
  }, {
    path: "/support",
    component: _2671d04a,
    name: "support"
  }, {
    path: "/userHome",
    component: _7feaa324,
    name: "userHome"
  }, {
    path: "/voucherBranch",
    component: _08230308,
    name: "voucherBranch"
  }, {
    path: "/voucherUser",
    component: _001c1eb6,
    name: "voucherUser"
  }, {
    path: "/admin/addresses",
    component: _0d5b97d2,
    name: "admin-addresses"
  }, {
    path: "/admin/agenda",
    component: _f3ee1232,
    name: "admin-agenda"
  }, {
    path: "/admin/customers",
    component: _efcab96c,
    name: "admin-customers"
  }, {
    path: "/admin/dashboard",
    component: _45b04bee,
    name: "admin-dashboard"
  }, {
    path: "/admin/management",
    component: _835ef3c4,
    name: "admin-management"
  }, {
    path: "/admin/modeloDashBoard",
    component: _1f14fb63,
    name: "admin-modeloDashBoard"
  }, {
    path: "/admin/payments",
    component: _2de6ecc8,
    name: "admin-payments"
  }, {
    path: "/admin/schedule",
    component: _e080a99c,
    name: "admin-schedule"
  }, {
    path: "/admin/schedules",
    component: _6be15c31,
    name: "admin-schedules"
  }, {
    path: "/admin/services",
    component: _60fbed79,
    name: "admin-services"
  }, {
    path: "/admin/settings",
    component: _6a542ebe,
    name: "admin-settings"
  }, {
    path: "/admin/users",
    component: _add6cc06,
    name: "admin-users"
  }, {
    path: "/admin/voucherAdmin",
    component: _2505bb5c,
    name: "admin-voucherAdmin"
  }, {
    path: "/customer/addresses",
    component: _22325de0,
    name: "customer-addresses"
  }, {
    path: "/customer/customerVoucher",
    component: _3d8df6de,
    name: "customer-customerVoucher"
  }, {
    path: "/customer/data",
    component: _333428a8,
    name: "customer-data"
  }, {
    path: "/customer/historic",
    component: _6fbb00e1,
    name: "customer-historic"
  }, {
    path: "/customer/home",
    component: _5ec84e61,
    name: "customer-home"
  }, {
    path: "/customer/payments",
    component: _398366a2,
    name: "customer-payments"
  }, {
    path: "/customer/schedule",
    component: _45170b19,
    name: "customer-schedule"
  }, {
    path: "/master/customers",
    component: _33d1ea3f,
    name: "master-customers"
  }, {
    path: "/master/dashboard",
    component: _ee41be04,
    name: "master-dashboard"
  }, {
    path: "/master/employee",
    component: _b220bb98,
    name: "master-employee"
  }, {
    path: "/master/home",
    component: _55ea56e5,
    name: "master-home"
  }, {
    path: "/master/management",
    component: _ecfbc46e,
    name: "master-management"
  }, {
    path: "/master/payments",
    component: _1d3f199a,
    name: "master-payments"
  }, {
    path: "/master/schedule",
    component: _5339319d,
    name: "master-schedule"
  }, {
    path: "/master/voucher",
    component: _31c316d0,
    name: "master-voucher"
  }, {
    path: "/sso/address",
    component: _31d35ee9,
    name: "sso-address"
  }, {
    path: "/sso/branch",
    component: _b1266586,
    name: "sso-branch"
  }, {
    path: "/sso/cities",
    component: _168a3764,
    name: "sso-cities"
  }, {
    path: "/sso/company",
    component: _659d92f2,
    name: "sso-company"
  }, {
    path: "/sso/countries",
    component: _3a464b2e,
    name: "sso-countries"
  }, {
    path: "/sso/getCustomer",
    component: _118159c9,
    name: "sso-getCustomer"
  }, {
    path: "/sso/getMasterUsers",
    component: _6778352b,
    name: "sso-getMasterUsers"
  }, {
    path: "/sso/getSuperUsers",
    component: _6cc3e4f8,
    name: "sso-getSuperUsers"
  }, {
    path: "/sso/getUsersAdmin",
    component: _6ec34ed2,
    name: "sso-getUsersAdmin"
  }, {
    path: "/sso/home",
    component: _6f6e5aba,
    name: "sso-home"
  }, {
    path: "/sso/integration",
    component: _333c5b6e,
    name: "sso-integration"
  }, {
    path: "/sso/paymentMethods",
    component: _aca86332,
    name: "sso-paymentMethods"
  }, {
    path: "/sso/payments",
    component: _4236f6f0,
    name: "sso-payments"
  }, {
    path: "/sso/paymentVoucher",
    component: _e663993a,
    name: "sso-paymentVoucher"
  }, {
    path: "/sso/schedule",
    component: _40bd42f2,
    name: "sso-schedule"
  }, {
    path: "/sso/schedules",
    component: _4ad2871e,
    name: "sso-schedules"
  }, {
    path: "/sso/scheduling",
    component: _46540aaf,
    name: "sso-scheduling"
  }, {
    path: "/sso/services",
    component: _11f98539,
    name: "sso-services"
  }, {
    path: "/sso/states",
    component: _4a40459d,
    name: "sso-states"
  }, {
    path: "/sso/user",
    component: _7c86fba6,
    name: "sso-user"
  }, {
    path: "/sso/userBranch",
    component: _89564c30,
    name: "sso-userBranch"
  }, {
    path: "/sso/voucher",
    component: _30d864a3,
    name: "sso-voucher"
  }, {
    path: "/superadmin/company",
    component: _2f3e7fd5,
    name: "superadmin-company"
  }, {
    path: "/",
    component: _01fa345e,
    name: "index"
  }, {
    path: "/",
    component: _01fa345e,
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
