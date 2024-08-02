import express from "express";
import PaymentVoucherController from "../controllers/PaymentVoucherController";

const router = express.Router();

router.post("/payment-voucher", PaymentVoucherController.createPaymentVoucher);
router.get("/payment-voucher", PaymentVoucherController.getAllPaymentVoucher);
router.get(
  "/payment-voucher/:id",
  PaymentVoucherController.getPaymentVoucherById
);
router.get("/payment-voucher-info", PaymentVoucherController.getPayVoucherInfo);
router.patch(
  "/payment-voucher/:id",
  PaymentVoucherController.updatePaymentVoucher
);
router.delete(
  "/payment-voucher/:id",
  PaymentVoucherController.deletePaymentVoucher
);

export default router;
