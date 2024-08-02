import express from "express";
import IntegrationsController from "../controllers/IntegrationsController";
import authMiddleware from "../utils/authMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";

const router = express.Router();

router.post("/integrations", IntegrationsController.createIntegration);
router.get("/integrations", IntegrationsController.getAllIntegrations);
router.get("/integrations/:id", IntegrationsController.getIntegrationById);
router.patch("/integrations/:id", IntegrationsController.updateIntegration);
router.delete("/integrations/:id", IntegrationsController.deleteIntegration);

export default router;
