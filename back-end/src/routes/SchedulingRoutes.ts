import express, { Router } from "express";
import SchedulingController from "../controllers/SchedulingController";
import authMiddleware from "../utils/authMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";

const router = express.Router();


router.post("/schedulings", SchedulingController.createScheduling);
router.get("/schedulings", SchedulingController.getAllSchedulings);
router.get("/schedulings/:id", SchedulingController.getSchedulingById);
router.patch("/schedulings/:id", SchedulingController.updateScheduling);
router.delete("/schedulings/:id", SchedulingController.deleteScheduling);
router.get("/agendamentos", SchedulingController.getDadosScheduling);
router.get("/details", SchedulingController.getDetails);
router.get("/top-service", SchedulingController.getTopService);
router.get("/grafico-admin", SchedulingController.getDadosGraficoAdmin);
router.get("/grafico-geral-admin-empresa", SchedulingController.getDadosFull);

export default router;
