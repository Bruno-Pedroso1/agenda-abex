import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f8f35a74 = () => interopDefault(import('..\\pages\\agendamento.vue' /* webpackChunkName: "pages/agendamento" */))
const _0f4f23bc = () => interopDefault(import('..\\pages\\branchCompany.vue' /* webpackChunkName: "pages/branchCompany" */))
const _6d7f9daa = () => interopDefault(import('..\\pages\\categories.vue' /* webpackChunkName: "pages/categories" */))
const _1bdd44c8 = () => interopDefault(import('..\\pages\\companies.vue' /* webpackChunkName: "pages/companies" */))
const _c4101758 = () => interopDefault(import('..\\pages\\criarp.vue' /* webpackChunkName: "pages/criarp" */))
const _3624aff2 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _9b1f87a6 = () => interopDefault(import('..\\pages\\services.vue' /* webpackChunkName: "pages/services" */))
const _4ea11060 = () => interopDefault(import('..\\pages\\support.vue' /* webpackChunkName: "pages/support" */))
const _512e4d19 = () => interopDefault(import('..\\pages\\userHome.vue' /* webpackChunkName: "pages/userHome" */))
const _6a2a52b1 = () => interopDefault(import('..\\pages\\voucherBranch.vue' /* webpackChunkName: "pages/voucherBranch" */))
const _000f4e1a = () => interopDefault(import('..\\pages\\voucherUser.vue' /* webpackChunkName: "pages/voucherUser" */))
const _04a4107c = () => interopDefault(import('..\\pages\\admin\\addresses.vue' /* webpackChunkName: "pages/admin/addresses" */))
const _177669c8 = () => interopDefault(import('..\\pages\\admin\\agenda.vue' /* webpackChunkName: "pages/admin/agenda" */))
const _e7133216 = () => interopDefault(import('..\\pages\\admin\\customers.vue' /* webpackChunkName: "pages/admin/customers" */))
const _3cf8c498 = () => interopDefault(import('..\\pages\\admin\\dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _456d37d3 = () => interopDefault(import('..\\pages\\admin\\management.vue' /* webpackChunkName: "pages/admin/management" */))
const _2fc7da64 = () => interopDefault(import('..\\pages\\admin\\modeloDashBoard.vue' /* webpackChunkName: "pages/admin/modeloDashBoard" */))
const _0702f086 = () => interopDefault(import('..\\pages\\admin\\payments.vue' /* webpackChunkName: "pages/admin/payments" */))
const _5e574627 = () => interopDefault(import('..\\pages\\admin\\schedule.vue' /* webpackChunkName: "pages/admin/schedule" */))
const _703d1fdc = () => interopDefault(import('..\\pages\\admin\\schedules.vue' /* webpackChunkName: "pages/admin/schedules" */))
const _2f93886e = () => interopDefault(import('..\\pages\\admin\\services.vue' /* webpackChunkName: "pages/admin/services" */))
const _38ebc9b3 = () => interopDefault(import('..\\pages\\admin\\settings.vue' /* webpackChunkName: "pages/admin/settings" */))
const _a6ba29b0 = () => interopDefault(import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages/admin/users" */))
const _57bcd3d1 = () => interopDefault(import('..\\pages\\admin\\voucherAdmin.vue' /* webpackChunkName: "pages/admin/voucherAdmin" */))
const _219de985 = () => interopDefault(import('..\\pages\\customer\\addresses.vue' /* webpackChunkName: "pages/customer/addresses" */))
const _0dcc2393 = () => interopDefault(import('..\\pages\\customer\\customerVoucher.vue' /* webpackChunkName: "pages/customer/customerVoucher" */))
const _3fa49e17 = () => interopDefault(import('..\\pages\\customer\\data.vue' /* webpackChunkName: "pages/customer/data" */))
const _6796f468 = () => interopDefault(import('..\\pages\\customer\\historic.vue' /* webpackChunkName: "pages/customer/historic" */))
const _8ff1fe68 = () => interopDefault(import('..\\pages\\customer\\home.vue' /* webpackChunkName: "pages/customer/home" */))
const _3fb7d19a = () => interopDefault(import('..\\pages\\customer\\payments.vue' /* webpackChunkName: "pages/customer/payments" */))
const _bcdedff8 = () => interopDefault(import('..\\pages\\customer\\schedule.vue' /* webpackChunkName: "pages/customer/schedule" */))
const _8a22c818 = () => interopDefault(import('..\\pages\\master\\customers.vue' /* webpackChunkName: "pages/master/customers" */))
const _0ffbd2b3 = () => interopDefault(import('..\\pages\\master\\dashboard.vue' /* webpackChunkName: "pages/master/dashboard" */))
const _a9693442 = () => interopDefault(import('..\\pages\\master\\employee.vue' /* webpackChunkName: "pages/master/employee" */))
const _5978a810 = () => interopDefault(import('..\\pages\\master\\home.vue' /* webpackChunkName: "pages/master/home" */))
const _3408ba98 = () => interopDefault(import('..\\pages\\master\\management.vue' /* webpackChunkName: "pages/master/management" */))
const _14879244 = () => interopDefault(import('..\\pages\\master\\payments.vue' /* webpackChunkName: "pages/master/payments" */))
const _5794f548 = () => interopDefault(import('..\\pages\\master\\schedule.vue' /* webpackChunkName: "pages/master/schedule" */))
const _9493e0e6 = () => interopDefault(import('..\\pages\\master\\voucher.vue' /* webpackChunkName: "pages/master/voucher" */))
const _3561b014 = () => interopDefault(import('..\\pages\\sso\\address.vue' /* webpackChunkName: "pages/sso/address" */))
const _b0ebaa9c = () => interopDefault(import('..\\pages\\sso\\branch.vue' /* webpackChunkName: "pages/sso/branch" */))
const _16a794d9 = () => interopDefault(import('..\\pages\\sso\\cities.vue' /* webpackChunkName: "pages/sso/cities" */))
const _692be41d = () => interopDefault(import('..\\pages\\sso\\company.vue' /* webpackChunkName: "pages/sso/company" */))
const _3c1b8cd4 = () => interopDefault(import('..\\pages\\sso\\countries.vue' /* webpackChunkName: "pages/sso/countries" */))
const _15dd1d74 = () => interopDefault(import('..\\pages\\sso\\getCustomer.vue' /* webpackChunkName: "pages/sso/getCustomer" */))
const _cba164c0 = () => interopDefault(import('..\\pages\\sso\\getMasterUsers.vue' /* webpackChunkName: "pages/sso/getMasterUsers" */))
const _6d852c3a = () => interopDefault(import('..\\pages\\sso\\getSuperUsers.vue' /* webpackChunkName: "pages/sso/getSuperUsers" */))
const _69865886 = () => interopDefault(import('..\\pages\\sso\\getUsersAdmin.vue' /* webpackChunkName: "pages/sso/getUsersAdmin" */))
const _02be916f = () => interopDefault(import('..\\pages\\sso\\home.vue' /* webpackChunkName: "pages/sso/home" */))
const _2a84d418 = () => interopDefault(import('..\\pages\\sso\\integration.vue' /* webpackChunkName: "pages/sso/integration" */))
const _473a3248 = () => interopDefault(import('..\\pages\\sso\\paymentMethods.vue' /* webpackChunkName: "pages/sso/paymentMethods" */))
const _4d2058bd = () => interopDefault(import('..\\pages\\sso\\payments.vue' /* webpackChunkName: "pages/sso/payments" */))
const _80f56850 = () => interopDefault(import('..\\pages\\sso\\paymentVoucher.vue' /* webpackChunkName: "pages/sso/paymentVoucher" */))
const _a20dd1b2 = () => interopDefault(import('..\\pages\\sso\\schedule.vue' /* webpackChunkName: "pages/sso/schedule" */))
const _33d56edc = () => interopDefault(import('..\\pages\\sso\\schedules.vue' /* webpackChunkName: "pages/sso/schedules" */))
const _14eba5a4 = () => interopDefault(import('..\\pages\\sso\\scheduling.vue' /* webpackChunkName: "pages/sso/scheduling" */))
const _ff954d24 = () => interopDefault(import('..\\pages\\sso\\services.vue' /* webpackChunkName: "pages/sso/services" */))
const _4a5da312 = () => interopDefault(import('..\\pages\\sso\\states.vue' /* webpackChunkName: "pages/sso/states" */))
const _0fd7325b = () => interopDefault(import('..\\pages\\sso\\user.vue' /* webpackChunkName: "pages/sso/user" */))
const _ec271646 = () => interopDefault(import('..\\pages\\sso\\userBranch.vue' /* webpackChunkName: "pages/sso/userBranch" */))
const _3466b5ce = () => interopDefault(import('..\\pages\\sso\\voucher.vue' /* webpackChunkName: "pages/sso/voucher" */))
const _61f5984a = () => interopDefault(import('..\\pages\\superadmin\\company.vue' /* webpackChunkName: "pages/superadmin/company" */))
const _7617e4da = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _f8f35a74,
    name: "agendamento"
  }, {
    path: "/branchCompany",
    component: _0f4f23bc,
    name: "branchCompany"
  }, {
    path: "/categories",
    component: _6d7f9daa,
    name: "categories"
  }, {
    path: "/companies",
    component: _1bdd44c8,
    name: "companies"
  }, {
    path: "/criarp",
    component: _c4101758,
    name: "criarp"
  }, {
    path: "/register",
    component: _3624aff2,
    name: "register"
  }, {
    path: "/services",
    component: _9b1f87a6,
    name: "services"
  }, {
    path: "/support",
    component: _4ea11060,
    name: "support"
  }, {
    path: "/userHome",
    component: _512e4d19,
    name: "userHome"
  }, {
    path: "/voucherBranch",
    component: _6a2a52b1,
    name: "voucherBranch"
  }, {
    path: "/voucherUser",
    component: _000f4e1a,
    name: "voucherUser"
  }, {
    path: "/admin/addresses",
    component: _04a4107c,
    name: "admin-addresses"
  }, {
    path: "/admin/agenda",
    component: _177669c8,
    name: "admin-agenda"
  }, {
    path: "/admin/customers",
    component: _e7133216,
    name: "admin-customers"
  }, {
    path: "/admin/dashboard",
    component: _3cf8c498,
    name: "admin-dashboard"
  }, {
    path: "/admin/management",
    component: _456d37d3,
    name: "admin-management"
  }, {
    path: "/admin/modeloDashBoard",
    component: _2fc7da64,
    name: "admin-modeloDashBoard"
  }, {
    path: "/admin/payments",
    component: _0702f086,
    name: "admin-payments"
  }, {
    path: "/admin/schedule",
    component: _5e574627,
    name: "admin-schedule"
  }, {
    path: "/admin/schedules",
    component: _703d1fdc,
    name: "admin-schedules"
  }, {
    path: "/admin/services",
    component: _2f93886e,
    name: "admin-services"
  }, {
    path: "/admin/settings",
    component: _38ebc9b3,
    name: "admin-settings"
  }, {
    path: "/admin/users",
    component: _a6ba29b0,
    name: "admin-users"
  }, {
    path: "/admin/voucherAdmin",
    component: _57bcd3d1,
    name: "admin-voucherAdmin"
  }, {
    path: "/customer/addresses",
    component: _219de985,
    name: "customer-addresses"
  }, {
    path: "/customer/customerVoucher",
    component: _0dcc2393,
    name: "customer-customerVoucher"
  }, {
    path: "/customer/data",
    component: _3fa49e17,
    name: "customer-data"
  }, {
    path: "/customer/historic",
    component: _6796f468,
    name: "customer-historic"
  }, {
    path: "/customer/home",
    component: _8ff1fe68,
    name: "customer-home"
  }, {
    path: "/customer/payments",
    component: _3fb7d19a,
    name: "customer-payments"
  }, {
    path: "/customer/schedule",
    component: _bcdedff8,
    name: "customer-schedule"
  }, {
    path: "/master/customers",
    component: _8a22c818,
    name: "master-customers"
  }, {
    path: "/master/dashboard",
    component: _0ffbd2b3,
    name: "master-dashboard"
  }, {
    path: "/master/employee",
    component: _a9693442,
    name: "master-employee"
  }, {
    path: "/master/home",
    component: _5978a810,
    name: "master-home"
  }, {
    path: "/master/management",
    component: _3408ba98,
    name: "master-management"
  }, {
    path: "/master/payments",
    component: _14879244,
    name: "master-payments"
  }, {
    path: "/master/schedule",
    component: _5794f548,
    name: "master-schedule"
  }, {
    path: "/master/voucher",
    component: _9493e0e6,
    name: "master-voucher"
  }, {
    path: "/sso/address",
    component: _3561b014,
    name: "sso-address"
  }, {
    path: "/sso/branch",
    component: _b0ebaa9c,
    name: "sso-branch"
  }, {
    path: "/sso/cities",
    component: _16a794d9,
    name: "sso-cities"
  }, {
    path: "/sso/company",
    component: _692be41d,
    name: "sso-company"
  }, {
    path: "/sso/countries",
    component: _3c1b8cd4,
    name: "sso-countries"
  }, {
    path: "/sso/getCustomer",
    component: _15dd1d74,
    name: "sso-getCustomer"
  }, {
    path: "/sso/getMasterUsers",
    component: _cba164c0,
    name: "sso-getMasterUsers"
  }, {
    path: "/sso/getSuperUsers",
    component: _6d852c3a,
    name: "sso-getSuperUsers"
  }, {
    path: "/sso/getUsersAdmin",
    component: _69865886,
    name: "sso-getUsersAdmin"
  }, {
    path: "/sso/home",
    component: _02be916f,
    name: "sso-home"
  }, {
    path: "/sso/integration",
    component: _2a84d418,
    name: "sso-integration"
  }, {
    path: "/sso/paymentMethods",
    component: _473a3248,
    name: "sso-paymentMethods"
  }, {
    path: "/sso/payments",
    component: _4d2058bd,
    name: "sso-payments"
  }, {
    path: "/sso/paymentVoucher",
    component: _80f56850,
    name: "sso-paymentVoucher"
  }, {
    path: "/sso/schedule",
    component: _a20dd1b2,
    name: "sso-schedule"
  }, {
    path: "/sso/schedules",
    component: _33d56edc,
    name: "sso-schedules"
  }, {
    path: "/sso/scheduling",
    component: _14eba5a4,
    name: "sso-scheduling"
  }, {
    path: "/sso/services",
    component: _ff954d24,
    name: "sso-services"
  }, {
    path: "/sso/states",
    component: _4a5da312,
    name: "sso-states"
  }, {
    path: "/sso/user",
    component: _0fd7325b,
    name: "sso-user"
  }, {
    path: "/sso/userBranch",
    component: _ec271646,
    name: "sso-userBranch"
  }, {
    path: "/sso/voucher",
    component: _3466b5ce,
    name: "sso-voucher"
  }, {
    path: "/superadmin/company",
    component: _61f5984a,
    name: "superadmin-company"
  }, {
    path: "/",
    component: _7617e4da,
    name: "index"
  }, {
    path: "/",
    component: _7617e4da,
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
