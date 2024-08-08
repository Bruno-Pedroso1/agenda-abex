import { Request, Response } from "express";
import State from "../models/State";
import { QueryTypes, Sequelize } from "sequelize";
import { WhereOptions } from "sequelize";

const StateController = {
  // cadastrar estado.
  createState: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, idCountry } = req.body;
      const newState = await State.create({
        name,
        idCountry,
      });
      res.status(201).json(newState);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the state." });
    }
  },
// cadastrar estado
  newCreateState: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.params;
      const idCountry = 3;
      let whereCondition: WhereOptions<State> | undefined;

      if (name) {
        const nome = String(name);
        whereCondition = { name: nome };
      }

      const state = await State.findOne({ where: whereCondition });

      if (state) {
        res.status(400).json({ message: "State already exists" });
      } else {
        const newState = await State.create({ name: String(name), idCountry });
        res.status(200).json(newState);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while creating the state." });
    }
  },
// procura estado por nome.
  getStateByName: async (req: Request, res: Response): Promise<void> => {
    const { name } = req.query;
    try {
      let whereCondition: WhereOptions<State> | undefined;
      if (name) {
        const nome = String(name);
        whereCondition = { name: nome };
      }
      const state = await State.findOne({
        where: whereCondition,
      });

      res.status(200).json(state);
    } catch (error) {
      res.status(500).json({ error: "erro" });
    }
  },
// exibe todos os estados.
  getAllStates: async (req: Request, res: Response): Promise<void> => {
    try {
      const states = await State.findAll();
      res.status(200).json(states);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching states." });
    }
  },
// procura estado por id.
  getStateById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const state = await State.findByPk(id);
      if (state) {
        res.status(200).json(state);
      } else {
        res.status(404).json({ message: "State not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the state." });
    }
  },
// atualiza/modifica estado.
  updateState: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, idCountry } = req.body;
    try {
      const state = await State.findByPk(id);
      if (state) {
        await state.update({
          name,
          idCountry,
        });
        res.status(200).json({ message: "State updated successfully." });
      } else {
        res.status(404).json({ message: "State not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the state." });
    }
  },
// exclui estado.
  deleteState: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const state = await State.findByPk(id);
      if (state) {
        await state.destroy();
        res.status(200).json({ message: "State deleted successfully." });
      } else {
        res.status(404).json({ message: "State not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the state." });
    }
  },
};

export default StateController;
