import express from "express";
import ServicesController from "../controllers/ServicesController";
import authMiddleware from "../utils/authMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";

const router = express.Router();

router.post("/services", ServicesController.createService);
router.get("/services", ServicesController.getAllServices);
router.get("/services/:id", ServicesController.getServiceById);
router.patch("/services/:id", ServicesController.updateService);
router.delete("/services/:id", ServicesController.deleteService);

export default router;
