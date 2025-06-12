import { Request, Response } from "express";
import Services from "../models/Services";
import Scheduling from "../models/Scheduling";
import Schedule from "../models/Schedule";
import { Model, QueryTypes, Sequelize } from "sequelize";

const ServicesController = {
  // cadastra serviço.
  createService: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, image, description, idBranch } = req.body;
      const services = await Services.create({
        name,
        image,
        description,
        idBranch,
      });
      res.status(201).json(services);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the service." });
    }
  },
// exibe todos os serviços.
  getAllServices: async (req: Request, res: Response): Promise<void> => {
    try {
      const service = await Services.findAll();
      res.status(200).json(service);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching service." });
    }
  },
// exibe serviço por id.
  getServiceById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const service = await Services.findByPk(id);
      if (service) {
        res.status(200).json(service);
      } else {
        res.status(404).json({ message: "Service not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the service." });
    }
  },
// atualiza/modifica serviço.
  updateService: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, image, description, idBranch } = req.body;
    try {
      const service = await Services.findByPk(id);
      if (service) {
        await service.update({ name, image, description, idBranch });
        res.status(200).json({ message: "Service updated successfully." });
      } else {
        res.status(404).json({ message: "Service not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the Service." });
    }
  },
// excluir serviço.
  deleteService: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const service = await Services.findByPk(id);
      if (service) {
        await service.destroy();
        res.status(200).json({ message: "Service deleted successfully." });
      } else {
        res.status(404).json({ message: "Service not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the service." });
    }
  },

  getServicesByCity: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await Scheduling.sequelize?.query(
          `
          SELECT
              ci.name AS cidade,
              sv.name AS servico,
              COUNT(schd.id) AS quantidade_agendamentos
          FROM
              scheduling schd
          JOIN
              schedule sch ON schd.id_schedule = sch.id
          JOIN
              services sv ON sch.id_services = sv.id
          JOIN
              branches br ON sch.id_branch = br.id
          JOIN
              addresses ad ON br.id_addresses = ad.id
          JOIN
              cities ci ON ad.id_city = ci.id
          WHERE
              schd.status = 'Confirmado'
          GROUP BY
              ci.name, sv.name
          ORDER BY
              ci.name, quantidade_agendamentos DESC;

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

export default ServicesController;
