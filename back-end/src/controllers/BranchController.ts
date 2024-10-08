import { Request, Response } from "express";
import Branch, { BranchAttributes } from "../models/Branch";
import { reseller_v1 } from "googleapis";
import { QueryTypes, Sequelize } from "sequelize";
import { type } from "os";

const BranchController = {
  // cadastrar filial.
  createBranch: async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        idCompany,
        idAddresses,
        companyDocument,
        email,
        tradingName,
        businessName,
        phone,
      } = req.body;
      const branch = await Branch.create({
        companyDocument,
        email,
        tradingName,
        businessName,
        phone,
        idCompany,
        idAddresses,
      });
      res.status(201).json(branch);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the branch." });
    }
  },
  // procurar filiais de uma empresa pelo id da mesma.
  getBranchesByCompany: async (req: Request, res: Response): Promise<void> => {
    const { id_company } = req.query;

    try {
      let whereCondition = {};
      if (id_company) {
        const companyId = Number(id_company);
        whereCondition = { id_company: companyId };
      }

      const branches = await Branch.findAll({
        where: whereCondition,
      });

      res.status(200).json(branches);
    } catch (error) {
      res.status(500).json({ error: "Error getting branches by id_company" });
    }
  },
// procurar todas as filiais.
  getAllBranches: async (req: Request, res: Response): Promise<void> => {
    try {
      const branches = await Branch.findAll();
      res.json(branches);
    } catch (error) {
      res.status(500).json({ error: "Error getting branches." });
    }
  },
// procurar filial especifica pelo id.
  getBranchById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const branch = await Branch.findByPk(id);
      if (branch) {
        res.json(branch);
      } else {
        res.status(404).json({ error: "Branch not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Error getting branch." });
    }
  },
// atualizar/modificar filialo pelo seu id.
  updateBranch: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const {
      idCompany,
      idAddresses,
      companyDocument,
      email,
      tradingName,
      businessName,
      phone,
    } = req.body;
    try {
      const branch = await Branch.findByPk(id);
      if (branch) {
        await branch.update({
          idCompany,
          idAddresses,
          companyDocument,
          email,
          tradingName,
          businessName,
          phone,
        });
        res.status(200).json({ message: "Branch updated successfully." });
      } else {
        res.status(404).json({ message: "Branch not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the branch." });
    }
  },
// excluir filial.
  deleteBranch: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedRowCount = await Branch.destroy({
        where: { id },
      });
      if (deletedRowCount > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Branch not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting branch." });
    }
  },
// ver todas as filiais que um usuário é vinculado.
  getBranchesByUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await Branch.sequelize?.query(
        `
          select
            ub.id,
            b.id as "idFilial", 
            c.id as "idCompany",
            c.business_type as "typeComp",
            ub.id_user,
            ub.credits as "creditosUser",
            u.name,
            c.business_name as "nomeEmpresa",
            c.logo,
            b.trading_name as "nomeFilial"
          from user_branch as ub
          join users as u on ub.id_user = u.id
          join branches as b on ub.id_branch = b.id
          join companies as c on b.id_company = c.id;
        `,
        { type: QueryTypes.SELECT }
      );
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Error get branches by user." });
    }
  },

  // infoBranchesByUser: async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const response = await Branch.sequelize?.query(
  //       `
  //       select
  //         b.id_company as "idEmpresaFilial",
  //         b.id as "idFilial",
  //         b.business_name as "nomeFilial",
  //         b.phone as "contatoFilial",
  //         b.email as "emailFilial",
  //         ub.id as "idUserBranch",
  //         ub.id_user as "idUser",
  //         ub.credits as "creditosUserPorFilial"
  //       from company as c
  //       join branch as b on c.id = b.id_company
  //       join userbranch as ub on b.id = ub.id_branch
  //       `,
  //       { type: QueryTypes.SELECT }
  //     );
  //       res.json(response);
  //   } catch (error) {
  //     res.status(500).json({ error: "Error get branches by user." });
  //   }
  // },
};

export default BranchController;
