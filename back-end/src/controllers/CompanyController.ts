import { Request, Response } from "express";
import Company from "../models/Company";

const CompanyController = {
  // cadastrar empresa.
  createCompany: async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        companyDocument,
        businessName,
        email,
        phone,
        idAddresses,
        businessType,
        logo,
      } = req.body;
      const company = await Company.create({
        companyDocument,
        businessName,
        email,
        phone,
        idAddresses,
        businessType,
        logo,
      });
      res.status(201).json(company);
    } catch (error) {
      res.status(500).json({ error: "Error creating the company" });
    }
  },
// exibir todas as empresas.
  getAllCompanies: async (_req: Request, res: Response): Promise<void> => {
    try {
      const companies = await Company.findAll();
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ error: "Error getting companies" });
    }
  },
// exibir empresa pelo seu id.
  getCompanyById: async (req: Request, res: Response): Promise<void> => {
    const companyId = parseInt(req.params.id, 10);
    try {
      const company = await Company.findByPk(companyId);
      if (!company) {
        res.status(404).json({ message: "Company not found" });
      } else {
        res.status(200).json(company);
      }
    } catch (error) {
      res.status(500).json({ error: "Error getting the company" });
    }
  },
// atualizar/modificar empresa.
  updateCompany: async (req: Request, res: Response): Promise<void> => {
    const companyId = parseInt(req.params.id, 10);
    try {
      const company = await Company.findByPk(companyId);
      if (!company) {
        res.status(404).json({ message: "Company not found" });
      } else {
        const {
          companyDocument,
          businessName,
          email,
          phone,
          idAddresses,
          businessType,
          logo,
        } = req.body;
        await company.update({
          companyDocument,
          businessName,
          email,
          phone,
          idAddresses,
          businessType,
          logo,
        });
        res.status(200).json(company);
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating the company" });
    }
  },
// excluir empresa.
  deleteCompany: async (req: Request, res: Response): Promise<void> => {
    const companyId = parseInt(req.params.id, 10);
    try {
      const company = await Company.findByPk(companyId);
      if (!company) {
        res.status(404).json({ message: "Company not found" });
      } else {
        await company.destroy();
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting the company" });
    }
  },
// procurar empresas pela categoria (área de atuação).
  getCompaniesByBusinessType: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { businessType } = req.query;
    try {
      let whereCondition = {};
      if (businessType) {
        whereCondition = { businessType: businessType as string };
      }
      const companies = await Company.findAll({
        where: whereCondition,
      });
      res.status(200).json(companies);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error getting companies by businessType" });
    }
  },
};

export default CompanyController;
