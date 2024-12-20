import express from "express";
import AddressesController from "../controllers/AddressesController";
import authMiddleware from "../utils/authMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";
import adminOnlyMiddleware from "../utils/adminOnlyMiddleware";

const router = express.Router();

router.post("/addresses", AddressesController.createAddress);
router.get(
  "/addresses",
  superAdminOnlyMiddleware,
  AddressesController.getAllAddresses
);
router.get("/addresses/:id", AddressesController.getAddressById);
router.get("/addresses/user/:id", AddressesController.getAddressesByUserId);
router.patch("/addresses/:id", AddressesController.updateAddress);
router.delete("/addresses/:id", AddressesController.deleteAddress);

export default router;
