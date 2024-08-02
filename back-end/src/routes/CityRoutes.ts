import express from "express";
import CityController from "../controllers/CItyController";
import authMiddleware from "../utils/authMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";

const router = express.Router();

router.post("/cities", CityController.createCity);
router.post("/city-new/:cidade/:estado", CityController.newCreateCity);
router.get("/cities", CityController.getAllCities);
router.get("/cities/:id", CityController.getCityById);
router.patch("/cities/:id", CityController.updateCity);
router.delete("/cities/:id", CityController.deleteCity);
router.get("/city-by-state", CityController.getCityByNameAndState);

export default router;
