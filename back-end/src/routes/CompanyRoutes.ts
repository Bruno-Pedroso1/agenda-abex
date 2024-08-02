import express from "express";
import CompanyController from "../controllers/CompanyController";
import authMiddleware from "../utils/authMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";

const router = express.Router();

router.post("/companies", CompanyController.createCompany);
router.get("/companies", CompanyController.getAllCompanies);
router.get("/companies/:id", CompanyController.getCompanyById);
router.get("/companies-by-type", CompanyController.getCompaniesByBusinessType);
router.patch("/companies/:id", CompanyController.updateCompany);
router.delete("/companies/:id", CompanyController.deleteCompany);

export default router;
