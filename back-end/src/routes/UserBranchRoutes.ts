import express from "express";
import UserBranchController from "../controllers/UserBranchController";
import authMiddleware from "../utils/authMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";

const router = express.Router();

router.post("/user-branches", UserBranchController.createUserBranch);
router.post(
  "/user-branch/usuario=:idUser/filial=:idBranch",
  UserBranchController.createUserBranchNovo
);
router.get("/user-branches/:id", UserBranchController.getUserBranchById);
router.get("/user-branches", UserBranchController.getAllUsersBranch);
router.get(
  "/user-branch/user=:idUser/filial=:idBranch",
  UserBranchController.getUserBranchByIdNovo
);
router.get("/user-branch/user=:idUser", UserBranchController.getBranchByUserId);
router.patch("/user-branches/:id", UserBranchController.updateUserBranch);
router.patch(
  "/update-credits/user=:idUser/branch=:idBranch",
  UserBranchController.updateUserBranchCredits
);
router.delete(
  "/user-branch/userdel=:idUser/filial=:idBranch",
  UserBranchController.deleteUserBranchByIdNovo
);
router.delete("/user-branches/:id", UserBranchController.deleteUserBranch);
export default router;
