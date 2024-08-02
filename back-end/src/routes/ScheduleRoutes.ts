import express from "express";
import ScheduleController from "../controllers/ScheduleController";
import authMiddleware from "../utils/authMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";

const router = express.Router();

router.post("/schedule", ScheduleController.createSchedule);
router.get("/schedule", ScheduleController.getAllSchedule);
router.get("/schedule/:id", ScheduleController.getScheduleById);
router.patch("/schedule/:id", ScheduleController.updateSchedule);
router.delete("/schedule/:id", ScheduleController.deleteSchedule);
router.get("/schedule-services", ScheduleController.getDadosServices);
router.get("/schedule-branch", ScheduleController.getScheduleByBranch);

export default router;
