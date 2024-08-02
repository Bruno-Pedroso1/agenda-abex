import express from "express";
import StateController from "../controllers/StateController";
import authMiddleware from "../utils/authMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";

const router = express.Router();

router.post("/states", StateController.createState);
router.post("/state-new/:name", StateController.newCreateState);
router.get("/states", StateController.getAllStates);
router.get("/states/:id", StateController.getStateById);
router.patch("/states/:id", StateController.updateState);
router.delete("/states/:id", StateController.deleteState);
router.get("/state-by-name", StateController.getStateByName);

export default router;
