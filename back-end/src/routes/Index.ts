import express from "express";
import AddressesRoutes from "./AddressesRoutes";
import IntegrationsRoutes from "./IntegrationsRoutes";
import PaymentMethodRoutes from "./PaymentMethodRoutes";
import PaymentRoutes from "./PaymentRoutes";
import SchedulingRoutes from "./SchedulingRoutes";
import UserBranchRoutes from "./UserBranchRoutes";
import UserRoutes from "./UserRoutes";
import BranchRoutes from "./BranchRoutes";
import CityRoutes from "./CityRoutes";
import CompanyRoutes from "./CompanyRoutes";
import CountryRoutes from "./CountryRoutes";
import ScheduleRoutes from "./ScheduleRoutes";
import SchedulesRoutes from "./SchedulesRoutes";
import VoucherRoutes from "./VoucherRoutes";
import StateRoutes from "./StateRoutes";
import ServicesRoutes from "./ServicesRoutes";
import PaymentVoucherRoutes from "./PaymentVoucherRoutes";
import authMiddleware from "../utils/authMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";
import adminOnlyMiddleware from "../utils/adminOnlyMiddleware";
import verifyToken from "../utils/verifyTokenMiddleware";

const router = express.Router();

// PAYMENTVOUCHER (PAGAMENTOS - VOUCHER)
router.post("/payment-voucher", PaymentVoucherRoutes);
router.get("/payment-voucher", PaymentVoucherRoutes);
router.get("/payment-voucher/:id", PaymentVoucherRoutes);
router.patch("/payment-voucher/:id", PaymentVoucherRoutes);
router.delete("/payment-voucher/:id", PaymentVoucherRoutes);
router.get("/payment-voucher-info", PaymentVoucherRoutes);

// VOUCHER
router.post("/voucher", VoucherRoutes);
router.get("/voucher", VoucherRoutes);
router.get("/voucher/:id", VoucherRoutes);
router.patch("/voucher/:id", VoucherRoutes);
router.delete("/voucher/:id", VoucherRoutes);
router.get("/voucher-by-branches", VoucherRoutes);
router.get("/vouchers-branch/:idBranch", VoucherRoutes);
router.get("/voucher-company/empresa=:idEmpresa", VoucherRoutes);

// ADDRESSES (ENDEREÇOS)
router.post("/addresses", AddressesRoutes);
router.get("/addresses", AddressesRoutes);
router.get("/addresses/:id", AddressesRoutes);
router.patch("/addresses/:id", AddressesRoutes);
router.delete("/addresses/:id", AddressesRoutes);

// INTEGRATIONS (INTEGRAÇÕES)
router.post("/integrations", IntegrationsRoutes);
router.get("/integrations", IntegrationsRoutes);
router.get("/integrations/:id", IntegrationsRoutes);
router.patch("/integrations/:id", IntegrationsRoutes);
router.delete("/integrations/:id", IntegrationsRoutes);

// PAYMENTMETHODS (MÉTODOS DE PAGAMENTO)
router.post("/payment-methods", PaymentMethodRoutes);
router.get("/payment-methods", PaymentMethodRoutes);
router.get("/payment-methods/:id", PaymentMethodRoutes);
router.patch("/payment-methods/:id", PaymentMethodRoutes);
router.delete("/payment-methods/:id", PaymentMethodRoutes);

// PAYMENTS (PAGAMENTOS)
router.post("/payments", PaymentRoutes);
router.get("/payments", PaymentRoutes);
router.get("/payments/:id", PaymentRoutes);
router.patch("/payments/:id", PaymentRoutes);
router.delete("/payments/:id", PaymentRoutes);
router.get("/payments-admin", PaymentRoutes);
router.get("/payment-customer", PaymentRoutes);
router.get("/all-payments", PaymentRoutes);

// USERBRANCH (FILIAL - USUÁRIOS)
router.post("/user-branches", UserBranchRoutes);
router.post("/user-branch/usuario=:idUser/filial=:idBranch", UserBranchRoutes);
router.get("/user-branches/:id", UserBranchRoutes);
router.get("/user-branches", UserBranchRoutes);
router.get("/user-branch/user=:idUser/filial=:idBranch", UserBranchRoutes);
router.get("/user-branch/user=:idUser", UserBranchRoutes);
router.patch("/user-branches/:id", UserBranchRoutes);
router.patch("/update-credits/user=:idUser/branch=:idBranch", UserBranchRoutes);
router.delete(
  "/user-branch/userdel=:idUser/filial=:idBranch",
  UserBranchRoutes
);
router.delete("/user-branches/:id", UserBranchRoutes);

// USERS (USUÁRIOS)
router.post("/users", UserRoutes);
router.post("/users/verify", UserRoutes);
router.post("/users/login", UserRoutes);
router.get("/users-customer", UserRoutes);
router.get("/users-admin", UserRoutes);
router.get("/users-superadmin", UserRoutes);
router.get("/users-master", UserRoutes);
router.patch("/users/:id", UserRoutes);
router.delete("/users/:id", UserRoutes);
router.get("/users", UserRoutes);
router.get("/users/by-token", UserRoutes);
router.get("/users/:id", UserRoutes);
router.get("/users/validate", UserRoutes);
router.get("/admin/user", UserRoutes);
router.get("/admin/new-user-week", UserRoutes);
router.get("/admin/new-user-month", UserRoutes);
router.get("/user-admin/empresa=:idEmpresa", UserRoutes);

// COUNTRY (PAÍSES)
router.post("/countries", CountryRoutes);
router.get("/countries", CountryRoutes);
router.get("/countries/:id", CountryRoutes);
router.patch("/countries/:id", CountryRoutes);
router.delete("/countries/:id", CountryRoutes);

// CITY (CIDADES)
router.post("/cities", CityRoutes);
router.post("/city-new/:cidade/:estado", CityRoutes);
router.get("/cities", CityRoutes);
router.get("/cities/:id", CityRoutes);
router.patch("/cities/:id", CityRoutes);
router.delete("/cities/:id", CityRoutes);
router.get("/city-by-state", CityRoutes);

// SCHEDULES (HORÁRIOS)
router.post("/schedules", SchedulesRoutes);
router.get("/schedules", SchedulesRoutes);
router.get("/schedules/:id", SchedulesRoutes);
router.patch("/schedules/:id", SchedulesRoutes);
router.delete("/schedules/:id", SchedulesRoutes);

// STATE (ESTADOS)
router.post("/states", StateRoutes);
router.post("/state-new/:name", StateRoutes);
router.get("/states", StateRoutes);
router.get("/states/:id", StateRoutes);
router.patch("/states/:id", StateRoutes);
router.delete("/states/:id", StateRoutes);
router.get("/state-by-name", StateRoutes);

// SERVICES (SERVIÇOS)
router.post("/services", ServicesRoutes);
router.get("/services", ServicesRoutes);
router.get("/services/:id", ServicesRoutes);
router.patch("/services/:id", ServicesRoutes);
router.delete("/services/:id", ServicesRoutes);

// SCHEDULING (AGENDAMENTOS)
router.post("/schedulings", SchedulingRoutes);
router.get("/schedulings", SchedulingRoutes);
router.get("/schedulings/:id", SchedulingRoutes);
router.patch("/schedulings/:id", SchedulingRoutes);
router.delete("/schedulings/:id", SchedulingRoutes);
router.get("/agendamentos", SchedulingRoutes);
router.get("/details", SchedulingRoutes);
router.get("/top-service", SchedulingRoutes);

// SCHEDULE (AGENDAS)
router.post("/schedule", ScheduleRoutes);
router.get("/schedule", ScheduleRoutes);
router.get("/schedule/:id", ScheduleRoutes);
router.patch("/schedule/:id", ScheduleRoutes);
router.delete("/schedule/:id", ScheduleRoutes);
router.get("/schedule-services", ScheduleRoutes);
router.get("/schedule-branch", ScheduleRoutes);

// BRANCH (FILIAIS)
router.post("/branches", BranchRoutes);
router.get("/branches", BranchRoutes);
router.get("/branches/:id", BranchRoutes);
router.patch("/branches/:id", BranchRoutes);
router.get("/company-branch/", BranchRoutes);
router.get("/branches-by-user", BranchRoutes);
// router.get("/info-branches-by-user", BranchRoutes);
router.delete("/branches/:id", BranchRoutes);

// COMPANY (EMPRESAS)
router.post("/companies", CompanyRoutes);
router.get("/companies", CompanyRoutes);
router.get("/companies/:id", CompanyRoutes);
router.get("/companies-by-type", CompanyRoutes);
router.patch("/companies/:id", CompanyRoutes);
router.delete("/companies/:id", CompanyRoutes);

export default router;
