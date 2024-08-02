import { Request, Response } from "express";
import Voucher from "../models/Voucher";
import Branch from "../models/Branch";
import { promises } from "dns";
import { QueryTypes } from "sequelize";
import { Op } from "sequelize";

const VoucherController = {
  createVoucher: async (req: Request, res: Response): Promise<void> => {
    try {
      const { idBranch, price, creditsValue } = req.body;
      const newVoucher = await Voucher.create({
        idBranch,
        price,
        creditsValue,
      });
      res.status(201).json(newVoucher);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the voucher." });
    }
  },

  getAllVoucher: async (req: Request, res: Response): Promise<void> => {
    try {
      const vouchers = await Voucher.findAll();
      res.status(200).json(vouchers);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occudddrred while fetching vouchers." });
    }
  },

  getVouchersByBranchId: async (req: Request, res: Response): Promise<void> => {
    const { idBranch } = req.params;

    try {
      const vouchers = await Voucher.findAll({
        where: {
          idBranch: {
            [Op.eq]: idBranch,
          },
        },
      });

      res.status(200).json(vouchers);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching vouchers." });
    }
  },

  getVoucherById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const vouchers = await Voucher.findByPk(id);
      if (vouchers) {
        res.status(200).json(vouchers);
      } else {
        res.status(404).json({ message: "Voucher not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the Voucher." });
    }
  },

  updateVoucher: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { idBranch, price, creditsValue } = req.body;
    try {
      const vouchers = await Voucher.findByPk(id);
      if (vouchers) {
        await vouchers.update({
          idBranch,
          price,
          creditsValue,
        });
        res.status(200).json({ message: "Voucher updated successfully." });
      } else {
        res.status(404).json({ message: "Voucher not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the Voucher." });
    }
  },

  deleteVoucher: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const vouchers = await Voucher.findByPk(id);
      if (vouchers) {
        await vouchers.destroy();
        res.status(200).json({ message: "Voucher deleted successfully." });
      } else {
        res.status(404).json({ message: "Voucher not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the Voucher." });
    }
  },

  getVoucherByBranches: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await Voucher.sequelize?.query(
        `
        select
          v.price as "valorVoucher",
          v.credits_value as "atribuicaoCreditos",
          b.business_name as "nomeFilial"
        from vouchers as v
        join branch as b on v.id_branch = b.id
        `,
        { type: QueryTypes.SELECT }
      );
      res.json(response);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
      res.status(500).json({ error: "Erro ao buscar dados!" });
    }
  },

  getVouchersByCompanyId: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { idEmpresa } = req.params;

    try {
      const branches = await Branch.findAll({
        where: {
          idCompany: {
            [Op.eq]: idEmpresa,
          },
        },
        attributes: ["id"],
      });

      const branchIds = branches.map((branch) => branch.id);

      const vouchers = await Voucher.findAll({
        where: {
          idBranch: {
            [Op.in]: branchIds,
          },
        },
      });

      res.status(200).json(vouchers);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching vouchers." });
    }
  },
};

export default VoucherController;
