import express from "express";
import PaymentController from "../controllers/PaymentController";
import authMiddleware from "../utils/authMiddleware";
import superAdminOnlyMiddleware from "../utils/superAdminOnlyMiddleware";
import superAndAdminMiddleware from "../utils/superAndAdminMiddleware";

const router = express.Router();

router.post("/payments", PaymentController.createPayment);
router.get("/payments", PaymentController.getAllPayments);
router.get("/payments/:id", PaymentController.getPaymentById);
router.patch("/payments/:id", PaymentController.updatePayment);
router.delete("/payments/:id", PaymentController.deletePayment);
router.get("/payments-admin", PaymentController.getPaymentsAdmin);
router.get("/payment-customer", PaymentController.getPayCustomer);
router.get("/all-payments", PaymentController.getAllPaymentsFromAnyWhere);

export default router;
