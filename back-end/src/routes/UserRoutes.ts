import express from "express";
import UserController from "../controllers/UserController";
import verifyToken from "../utils/verifyTokenMiddleware";
import authMiddleware from "../utils/authMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";

const router = express.Router();

router.post("/users", UserController.register);
router.get("/users", UserController.getAllUsers);
router.get("/users-customer", UserController.getCustomer);
router.get("/users-admin", UserController.getAdmins);
router.get("/users-superadmin", UserController.getSuperAdmin);
router.get("/users-master", UserController.getMaster);
router.get("/users/by-token", UserController.getByToken);
router.get("/users/:id", UserController.getUserById);
router.patch("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.post("/users/verify", verifyToken);
router.post("/users/login", UserController.login);
router.get("/users/validate", UserController.validate);
router.get("/admin/user", UserController.getNonSuperadminUsers);
router.get("/admin/new-user-week", UserController.getNewUsersWeek);
router.get("/admin/new-user-month", UserController.getNewUsersMonth);
router.get(
  "/user-admin/empresa=:idEmpresa",
  UserController.getAdminUsersByCompany
);
export default router;
