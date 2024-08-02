import express from "express";
import BranchController from "../controllers/BranchController";
import authMiddleware from "../utils/authMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";

const router = express.Router();

router.post("/branches", BranchController.createBranch);
router.get("/branches", BranchController.getAllBranches);
router.get("/branches/:id", BranchController.getBranchById);
router.patch("/branches/:id", BranchController.updateBranch);
router.get("/company-branch/", BranchController.getBranchesByCompany);
router.get("/branches-by-user", BranchController.getBranchesByUser);
// router.get("/info-branches-by-user", BranchController.infoBranchesByUser);
router.delete("/branches/:id", BranchController.deleteBranch);

export default router;
