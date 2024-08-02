import express from "express";
import CountryController from "../controllers/CountryController";
import authMiddleware from "../utils/authMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";

const router = express.Router();

router.post("/countries", CountryController.createCountry);
router.get("/countries", CountryController.getAllCountries);
router.get("/countries/:id", CountryController.getCountryById);
router.patch("/countries/:id", CountryController.updateCountry);
router.delete("/countries/:id", CountryController.deleteCountry);

export default router;
