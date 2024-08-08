import { Request, Response } from "express";
import PaymentVoucher from "../models/PaymentVoucher";
import { Model, QueryTypes, Sequelize } from "sequelize";

const PaymentVoucherController = {
  // criar relação de pagamento-voucher.
  createPaymentVoucher: async (req: Request, res: Response): Promise<void> => {
    try {
      const { idPayment, idVoucher } = req.body;
      const paymentvoucher = await PaymentVoucher.create({
        idPayment,
        idVoucher,
      });
      res.status(201).json(paymentvoucher);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while creating the Payment Voucher.",
      });
    }
  },
// exibir todos os pagamentos-voucher.
  getPaymentVoucherById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const paymentvoucher = await PaymentVoucher.findByPk(id);
      if (paymentvoucher) {
        res.status(200).json(paymentvoucher);
      } else {
        res.status(404).json({ message: "Payment-Voucher not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while fetching the Payment-Voucher.",
      });
    }
  },
// atualizar/modificar pagamento-voucher por id.
  updatePaymentVoucher: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { idPayment, idVoucher } = req.body;
    try {
      const paymentvoucher = await PaymentVoucher.findByPk(id);
      if (paymentvoucher) {
        await paymentvoucher.update({ idPayment, idVoucher });
        res
          .status(200)
          .json({ message: "Payment-Voucher updated successfully." });
      } else {
        res.status(404).json({ message: "Payment-Voucher not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while updating the Payment-Voucher.",
      });
    }
  },
// exibir todos os pagamentos-voucher.
  getAllPaymentVoucher: async (req: Request, res: Response): Promise<void> => {
    try {
      const paymentvoucher = await PaymentVoucher.findAll();
      res.status(200).json(paymentvoucher);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the payments." });
    }
  },
// excluir pagamento-voucher.
  deletePaymentVoucher: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const paymentvoucher = await PaymentVoucher.findByPk(id);
      if (paymentvoucher) {
        await paymentvoucher.destroy();
        res.status(200).json({
          message: "Payment-Voucher relationship deleted successfully.",
        });
      } else {
        res
          .status(404)
          .json({ message: "Payment-Voucher relationship not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "An error occurred while deleting the Payment-Voucher relationship.",
      });
    }
  },
  // exibe informações a respeito de um pagamento-voucher.
  getPayVoucherInfo: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await PaymentVoucher.sequelize?.query(
        `
        SELECT
        pv.id_payment AS idPayment,
        pv.id_voucher AS idVoucher,
        pv.created_at AS created,
        v.id AS voucherId,
        v.credits_value AS creditsValue,
        v.price,
        p.id AS paymentId,
        p.total_value AS totalValue,
        p.id_user AS idUser,
        u.name AS "nomeUsuario",
        p.id_payment_method AS idPaymentMethod,
        p.created_at AS paymentCreated_at,
        b.id AS idBranch,
        b.trading_name
      FROM
        payment_voucher AS pv
      JOIN
        vouchers AS v ON pv.id_voucher = v.id
      JOIN
        branch AS b ON v.id_branch = b.id
      JOIN
        payment AS p ON pv.id_payment = p.id
      JOIN
        users AS u ON p.id_user = u.id;
        `,
        { type: QueryTypes.SELECT }
      );
      res.json(response);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
      res.status(500).json({ error: "Erro ao buscar dados!" });
    }
  },
};

export default PaymentVoucherController;
