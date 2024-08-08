import { Request, Response } from "express";
import { Model, QueryTypes, Sequelize } from "sequelize";
import Payment from "../models/Payment";

const PaymentController = {
  // cadastrar pagamento.
  createPayment: async (req: Request, res: Response): Promise<void> => {
    try {
      const { totalValue, status, idPaymentMethod, idUser } = req.body;
      const payment = await Payment.create({
        totalValue,
        status,
        idPaymentMethod,
        idUser,
      });
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: "Error creating the payment" });
    }
  },
  // exibir todos os pagementos de um usuário.
  getPayCustomer: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await Payment.sequelize?.query(
        `
        SELECT distinct on (p.id)
      p.id as payId,
    p.id_user as userid,
    p.total_value,
    p.id_payment_method as paymethodid,
    pm.type

from payment p
 join paymentmethods pm on p.id_payment_method = pm.id;
        `,
        { type: QueryTypes.SELECT }
      );
      res.json(response);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
      res.status(500).json({ error: "Erro ao buscar dados!" });
    }
  },
  // exibir todos os pagamentos recebidos por um funcionário.
  getPaymentsAdmin: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await Payment.sequelize?.query(
        `
        SELECT DISTINCT ON (p.id)
        ser.name as nomeservico,
        s.status,
        s.id_schedule,
        p.id as idpagamento,
        p.total_value,
        p.created_at as datapagamento,
        u.name as nomeCliente,
        us.id as funcid,
        pm.type
    FROM
        scheduling s
    JOIN
        payment p ON s.id_payment = p.id
    JOIN
        users u ON p.id_user = u.id
    JOIN
        paymentmethods pm ON p.id_payment_method = pm.id
    JOIN.
        schedule sc ON s.id_schedule = sc.id
    JOIN
        users us ON sc.id_user = us.id
    JOIN
        services ser ON sc.id_services = ser.id
    ORDER BY
        p.id, s.id_schedule, p.created_at DESC;
    
        `,
        { type: QueryTypes.SELECT }
      );
      res.json(response);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
      res.status(500).json({ error: "Erro ao buscar dados!" });
    }
  },
  // exibir todos os pagamentos com voucher/empresa/filial/funcionário/agenda/serviço.
  getAllPaymentsFromAnyWhere: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const response = await Payment.sequelize?.query(
        `
    SELECT
        DISTINCT
        p.id AS payment_id,
        s.id_schedule,
        p.total_value,
        sc.id_branch AS schedule_branch_id,
        b.id_company,
        b.trading_name AS branch_name,
        v.id_branch AS voucher_branch_id,
        branch_voucher.id_company AS voucher_company_id,
        branch_voucher.trading_name AS branch_voucher_name, 
        pv.id_voucher,
        serv.name AS service_name,
        u.name AS client_name,
        u.id AS id_client,
        pm.type AS payment_method,
        p.created_at,
        us.name as employee_name,
        s.status as statusAg
    FROM
        payment p
    LEFT JOIN
        scheduling s ON p.id = s.id_payment
    LEFT JOIN
        schedule sc ON s.id_schedule = sc.id
    LEFT JOIN
        users us ON sc.id_user = us.id
    LEFT JOIN
        branch b ON sc.id_branch = b.id
    LEFT JOIN
        LATERAL (
            SELECT id_voucher
            FROM payment_voucher pv
            WHERE pv.id_payment = p.id
        ) pv ON true
    LEFT JOIN
        vouchers v ON pv.id_voucher = v.id
    LEFT JOIN
        branch branch_voucher ON v.id_branch = branch_voucher.id
    LEFT JOIN
        services serv ON sc.id_services = serv.id
    LEFT JOIN
        users u ON p.id_user = u.id
    LEFT JOIN
        paymentmethods pm ON p.id_payment_method = pm.id
    ORDER BY
        p.id;
        `,
        { type: QueryTypes.SELECT }
      );
      res.json(response);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
      res.status(500).json({ error: "Erro ao buscar dados!" });
    }
  },
// visualização de pagamentos (sem vouchers).
  getAllPayments: async (_req: Request, res: Response): Promise<void> => {
    try {
      const payments = await Payment.findAll();
      res.json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting payments" });
    }
  },
// exibir pagamentos por id.
  getPaymentById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      if (!payment) {
        res.status(404).json({ message: "Payment not found" });
      } else {
        res.json(payment);
      }
    } catch (error) {
      res.status(500).json({ error: "Error getting the payment" });
    }
  },
// atualizar/modificar pagamento por id.
  updatePayment: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      if (!payment) {
        res.status(404).json({ message: "Payment not found" });
      } else {
        const { totalValue, status, idPaymentMethod, idUser } = req.body;
        await payment.update({ totalValue, status, idPaymentMethod, idUser });
        res.json(payment);
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating the payment" });
    }
  },
// excluir pagamento.
  deletePayment: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      if (!payment) {
        res.status(404).json({ message: "Payment not found" });
      } else {
        await payment.destroy();
        res.json({ message: "Payment deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting the payment" });
    }
  },
};

export default PaymentController;
