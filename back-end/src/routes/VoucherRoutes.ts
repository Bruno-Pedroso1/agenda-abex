import express from "express";
import VoucherController from "../controllers/VoucherController";

const router = express.Router();

router.post("/voucher", VoucherController.createVoucher);
router.get("/voucher", VoucherController.getAllVoucher);
router.get("/voucher/:id", VoucherController.getVoucherById);
router.patch("/voucher/:id", VoucherController.updateVoucher);
router.delete("/voucher/:id", VoucherController.deleteVoucher);
router.get("/voucher-by-branches", VoucherController.getVoucherByBranches);
router.get(
  "/vouchers-branch/:idBranch",
  VoucherController.getVouchersByBranchId
);
router.get(
  "/voucher-company/empresa=:idEmpresa",
  VoucherController.getVouchersByCompanyId
);

export default router;
