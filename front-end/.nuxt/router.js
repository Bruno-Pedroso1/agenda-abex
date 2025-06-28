import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _365bf023 = () => interopDefault(import('..\\pages\\agendamento.vue' /* webpackChunkName: "pages/agendamento" */))
const _6332ddd9 = () => interopDefault(import('..\\pages\\branchCompany.vue' /* webpackChunkName: "pages/branchCompany" */))
const _727a17a4 = () => interopDefault(import('..\\pages\\categories.vue' /* webpackChunkName: "pages/categories" */))
const _3d0ea38e = () => interopDefault(import('..\\pages\\companies.vue' /* webpackChunkName: "pages/companies" */))
const _5002b0d7 = () => interopDefault(import('..\\pages\\criarp.vue' /* webpackChunkName: "pages/criarp" */))
const _df1b5096 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _0cbde3f0 = () => interopDefault(import('..\\pages\\services.vue' /* webpackChunkName: "pages/services" */))
const _67fc4bad = () => interopDefault(import('..\\pages\\support.vue' /* webpackChunkName: "pages/support" */))
const _b7825d1e = () => interopDefault(import('..\\pages\\teste.vue' /* webpackChunkName: "pages/teste" */))
const _a9081648 = () => interopDefault(import('..\\pages\\userHome.vue' /* webpackChunkName: "pages/userHome" */))
const _83e3e664 = () => interopDefault(import('..\\pages\\voucherBranch.vue' /* webpackChunkName: "pages/voucherBranch" */))
const _9a362912 = () => interopDefault(import('..\\pages\\voucherUser.vue' /* webpackChunkName: "pages/voucherUser" */))
const _4f852c85 = () => interopDefault(import('..\\pages\\admin\\addresses.vue' /* webpackChunkName: "pages/admin/addresses" */))
const _48288539 = () => interopDefault(import('..\\pages\\admin\\agenda.vue' /* webpackChunkName: "pages/admin/agenda" */))
const _4364c890 = () => interopDefault(import('..\\pages\\admin\\customers.vue' /* webpackChunkName: "pages/admin/customers" */))
const _335ad277 = () => interopDefault(import('..\\pages\\admin\\dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _2e7c9b70 = () => interopDefault(import('..\\pages\\admin\\management.vue' /* webpackChunkName: "pages/admin/management" */))
const _4c1b6951 = () => interopDefault(import('..\\pages\\admin\\modeloDashBoard.vue' /* webpackChunkName: "pages/admin/modeloDashBoard" */))
const _3347a2cc = () => interopDefault(import('..\\pages\\admin\\payments.vue' /* webpackChunkName: "pages/admin/payments" */))
const _4834ed04 = () => interopDefault(import('..\\pages\\admin\\schedule.vue' /* webpackChunkName: "pages/admin/schedule" */))
const _7bd756c2 = () => interopDefault(import('..\\pages\\admin\\schedules.vue' /* webpackChunkName: "pages/admin/schedules" */))
const _19712f4b = () => interopDefault(import('..\\pages\\admin\\services.vue' /* webpackChunkName: "pages/admin/services" */))
const _22c97090 = () => interopDefault(import('..\\pages\\admin\\settings.vue' /* webpackChunkName: "pages/admin/settings" */))
const _5480f96b = () => interopDefault(import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages/admin/users" */))
const _3a81c42e = () => interopDefault(import('..\\pages\\admin\\voucherAdmin.vue' /* webpackChunkName: "pages/admin/voucherAdmin" */))
const _0462d9e2 = () => interopDefault(import('..\\pages\\customer\\addresses.vue' /* webpackChunkName: "pages/customer/addresses" */))
const _467ecba0 = () => interopDefault(import('..\\pages\\customer\\customerVoucher.vue' /* webpackChunkName: "pages/customer/customerVoucher" */))
const _6838279a = () => interopDefault(import('..\\pages\\customer\\data.vue' /* webpackChunkName: "pages/customer/data" */))
const _051195cf = () => interopDefault(import('..\\pages\\customer\\historic.vue' /* webpackChunkName: "pages/customer/historic" */))
const _3ecaeb62 = () => interopDefault(import('..\\pages\\customer\\home.vue' /* webpackChunkName: "pages/customer/home" */))
const _7894e19d = () => interopDefault(import('..\\pages\\customer\\payments.vue' /* webpackChunkName: "pages/customer/payments" */))
const _4b24bff2 = () => interopDefault(import('..\\pages\\customer\\schedule.vue' /* webpackChunkName: "pages/customer/schedule" */))
const _b80400de = () => interopDefault(import('..\\pages\\master\\customers.vue' /* webpackChunkName: "pages/master/customers" */))
const _0de99360 = () => interopDefault(import('..\\pages\\master\\dashboard.vue' /* webpackChunkName: "pages/master/dashboard" */))
const _05bacabc = () => interopDefault(import('..\\pages\\master\\employee.vue' /* webpackChunkName: "pages/master/employee" */))
const _0156b653 = () => interopDefault(import('..\\pages\\master\\home.vue' /* webpackChunkName: "pages/master/home" */))
const _1ed8b2b7 = () => interopDefault(import('..\\pages\\master\\management.vue' /* webpackChunkName: "pages/master/management" */))
const _47936ba1 = () => interopDefault(import('..\\pages\\master\\payments.vue' /* webpackChunkName: "pages/master/payments" */))
const _ad27abea = () => interopDefault(import('..\\pages\\master\\schedule.vue' /* webpackChunkName: "pages/master/schedule" */))
const _c0d8932c = () => interopDefault(import('..\\pages\\master\\voucher.vue' /* webpackChunkName: "pages/master/voucher" */))
const _45808352 = () => interopDefault(import('..\\pages\\sso\\address.vue' /* webpackChunkName: "pages/sso/address" */))
const _5a5fc80f = () => interopDefault(import('..\\pages\\sso\\branch.vue' /* webpackChunkName: "pages/sso/branch" */))
const _6d059b94 = () => interopDefault(import('..\\pages\\sso\\cities.vue' /* webpackChunkName: "pages/sso/cities" */))
const _1109f260 = () => interopDefault(import('..\\pages\\sso\\company.vue' /* webpackChunkName: "pages/sso/company" */))
const _64af1657 = () => interopDefault(import('..\\pages\\sso\\countries.vue' /* webpackChunkName: "pages/sso/countries" */))
const _67b45237 = () => interopDefault(import('..\\pages\\sso\\getCustomer.vue' /* webpackChunkName: "pages/sso/getCustomer" */))
const _7cf43dfd = () => interopDefault(import('..\\pages\\sso\\getMasterUsers.vue' /* webpackChunkName: "pages/sso/getMasterUsers" */))
const _021a79e6 = () => interopDefault(import('..\\pages\\sso\\getSuperUsers.vue' /* webpackChunkName: "pages/sso/getSuperUsers" */))
const _0419e3c0 = () => interopDefault(import('..\\pages\\sso\\getUsersAdmin.vue' /* webpackChunkName: "pages/sso/getUsersAdmin" */))
const _1bb43be8 = () => interopDefault(import('..\\pages\\sso\\home.vue' /* webpackChunkName: "pages/sso/home" */))
const _3c94cab7 = () => interopDefault(import('..\\pages\\sso\\integration.vue' /* webpackChunkName: "pages/sso/integration" */))
const _81b0518e = () => interopDefault(import('..\\pages\\sso\\paymentMethods.vue' /* webpackChunkName: "pages/sso/paymentMethods" */))
const _bdf7da4c = () => interopDefault(import('..\\pages\\sso\\payments.vue' /* webpackChunkName: "pages/sso/payments" */))
const _bb6b8796 = () => interopDefault(import('..\\pages\\sso\\paymentVoucher.vue' /* webpackChunkName: "pages/sso/paymentVoucher" */))
const _02dcd144 = () => interopDefault(import('..\\pages\\sso\\schedule.vue' /* webpackChunkName: "pages/sso/schedule" */))
const _5c68f85f = () => interopDefault(import('..\\pages\\sso\\schedules.vue' /* webpackChunkName: "pages/sso/schedules" */))
const _026d66fe = () => interopDefault(import('..\\pages\\sso\\scheduling.vue' /* webpackChunkName: "pages/sso/scheduling" */))
const _57cdd8ea = () => interopDefault(import('..\\pages\\sso\\services.vue' /* webpackChunkName: "pages/sso/services" */))
const _05997f22 = () => interopDefault(import('..\\pages\\sso\\states.vue' /* webpackChunkName: "pages/sso/states" */))
const _0182fa10 = () => interopDefault(import('..\\pages\\sso\\user.vue' /* webpackChunkName: "pages/sso/user" */))
const _73ca1bba = () => interopDefault(import('..\\pages\\sso\\userBranch.vue' /* webpackChunkName: "pages/sso/userBranch" */))
const _477677de = () => interopDefault(import('..\\pages\\sso\\voucher.vue' /* webpackChunkName: "pages/sso/voucher" */))
const _44ba88a7 = () => interopDefault(import('..\\pages\\superadmin\\company.vue' /* webpackChunkName: "pages/superadmin/company" */))
const _8ba396a0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _365bf023,
    name: "agendamento"
  }, {
    path: "/branchCompany",
    component: _6332ddd9,
    name: "branchCompany"
  }, {
    path: "/categories",
    component: _727a17a4,
    name: "categories"
  }, {
    path: "/companies",
    component: _3d0ea38e,
    name: "companies"
  }, {
    path: "/criarp",
    component: _5002b0d7,
    name: "criarp"
  }, {
    path: "/register",
    component: _df1b5096,
    name: "register"
  }, {
    path: "/services",
    component: _0cbde3f0,
    name: "services"
  }, {
    path: "/support",
    component: _67fc4bad,
    name: "support"
  }, {
    path: "/teste",
    component: _b7825d1e,
    name: "teste"
  }, {
    path: "/userHome",
    component: _a9081648,
    name: "userHome"
  }, {
    path: "/voucherBranch",
    component: _83e3e664,
    name: "voucherBranch"
  }, {
    path: "/voucherUser",
    component: _9a362912,
    name: "voucherUser"
  }, {
    path: "/admin/addresses",
    component: _4f852c85,
    name: "admin-addresses"
  }, {
    path: "/admin/agenda",
    component: _48288539,
    name: "admin-agenda"
  }, {
    path: "/admin/customers",
    component: _4364c890,
    name: "admin-customers"
  }, {
    path: "/admin/dashboard",
    component: _335ad277,
    name: "admin-dashboard"
  }, {
    path: "/admin/management",
    component: _2e7c9b70,
    name: "admin-management"
  }, {
    path: "/admin/modeloDashBoard",
    component: _4c1b6951,
    name: "admin-modeloDashBoard"
  }, {
    path: "/admin/payments",
    component: _3347a2cc,
    name: "admin-payments"
  }, {
    path: "/admin/schedule",
    component: _4834ed04,
    name: "admin-schedule"
  }, {
    path: "/admin/schedules",
    component: _7bd756c2,
    name: "admin-schedules"
  }, {
    path: "/admin/services",
    component: _19712f4b,
    name: "admin-services"
  }, {
    path: "/admin/settings",
    component: _22c97090,
    name: "admin-settings"
  }, {
    path: "/admin/users",
    component: _5480f96b,
    name: "admin-users"
  }, {
    path: "/admin/voucherAdmin",
    component: _3a81c42e,
    name: "admin-voucherAdmin"
  }, {
    path: "/customer/addresses",
    component: _0462d9e2,
    name: "customer-addresses"
  }, {
    path: "/customer/customerVoucher",
    component: _467ecba0,
    name: "customer-customerVoucher"
  }, {
    path: "/customer/data",
    component: _6838279a,
    name: "customer-data"
  }, {
    path: "/customer/historic",
    component: _051195cf,
    name: "customer-historic"
  }, {
    path: "/customer/home",
    component: _3ecaeb62,
    name: "customer-home"
  }, {
    path: "/customer/payments",
    component: _7894e19d,
    name: "customer-payments"
  }, {
    path: "/customer/schedule",
    component: _4b24bff2,
    name: "customer-schedule"
  }, {
    path: "/master/customers",
    component: _b80400de,
    name: "master-customers"
  }, {
    path: "/master/dashboard",
    component: _0de99360,
    name: "master-dashboard"
  }, {
    path: "/master/employee",
    component: _05bacabc,
    name: "master-employee"
  }, {
    path: "/master/home",
    component: _0156b653,
    name: "master-home"
  }, {
    path: "/master/management",
    component: _1ed8b2b7,
    name: "master-management"
  }, {
    path: "/master/payments",
    component: _47936ba1,
    name: "master-payments"
  }, {
    path: "/master/schedule",
    component: _ad27abea,
    name: "master-schedule"
  }, {
    path: "/master/voucher",
    component: _c0d8932c,
    name: "master-voucher"
  }, {
    path: "/sso/address",
    component: _45808352,
    name: "sso-address"
  }, {
    path: "/sso/branch",
    component: _5a5fc80f,
    name: "sso-branch"
  }, {
    path: "/sso/cities",
    component: _6d059b94,
    name: "sso-cities"
  }, {
    path: "/sso/company",
    component: _1109f260,
    name: "sso-company"
  }, {
    path: "/sso/countries",
    component: _64af1657,
    name: "sso-countries"
  }, {
    path: "/sso/getCustomer",
    component: _67b45237,
    name: "sso-getCustomer"
  }, {
    path: "/sso/getMasterUsers",
    component: _7cf43dfd,
    name: "sso-getMasterUsers"
  }, {
    path: "/sso/getSuperUsers",
    component: _021a79e6,
    name: "sso-getSuperUsers"
  }, {
    path: "/sso/getUsersAdmin",
    component: _0419e3c0,
    name: "sso-getUsersAdmin"
  }, {
    path: "/sso/home",
    component: _1bb43be8,
    name: "sso-home"
  }, {
    path: "/sso/integration",
    component: _3c94cab7,
    name: "sso-integration"
  }, {
    path: "/sso/paymentMethods",
    component: _81b0518e,
    name: "sso-paymentMethods"
  }, {
    path: "/sso/payments",
    component: _bdf7da4c,
    name: "sso-payments"
  }, {
    path: "/sso/paymentVoucher",
    component: _bb6b8796,
    name: "sso-paymentVoucher"
  }, {
    path: "/sso/schedule",
    component: _02dcd144,
    name: "sso-schedule"
  }, {
    path: "/sso/schedules",
    component: _5c68f85f,
    name: "sso-schedules"
  }, {
    path: "/sso/scheduling",
    component: _026d66fe,
    name: "sso-scheduling"
  }, {
    path: "/sso/services",
    component: _57cdd8ea,
    name: "sso-services"
  }, {
    path: "/sso/states",
    component: _05997f22,
    name: "sso-states"
  }, {
    path: "/sso/user",
    component: _0182fa10,
    name: "sso-user"
  }, {
    path: "/sso/userBranch",
    component: _73ca1bba,
    name: "sso-userBranch"
  }, {
    path: "/sso/voucher",
    component: _477677de,
    name: "sso-voucher"
  }, {
    path: "/superadmin/company",
    component: _44ba88a7,
    name: "superadmin-company"
  }, {
    path: "/",
    component: _8ba396a0,
    name: "index"
  }, {
    path: "/",
    component: _8ba396a0,
    name: "Welcome"
  }, {
    path: "/",
    component: _8ba396a0,
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
