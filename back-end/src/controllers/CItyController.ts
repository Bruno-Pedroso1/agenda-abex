import { Request, Response } from "express";
import City from "../models/City";
import { WhereOptions } from "sequelize";

const CityController = {
  // cadastrar cidade.
  createCity: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, idState } = req.body;
      const city = await City.create({
        name,
        idState,
      });
      res.status(201).json(city);
    } catch (error) {
      res.status(500).json({ error: "Error creating the city" });
    }
  },
  // procurar todas as cidades.
  getAllCities: async (req: Request, res: Response): Promise<void> => {
    try {
      const cities = await City.findAll();
      res.status(200).json(cities);
    } catch (error) {
      res.status(500).json({ error: "Error getting cities" });
    }
  },
// procurar cidade pelo id.
  getCityById: async (req: Request, res: Response): Promise<void> => {
    const cityId = parseInt(req.params.id, 10);
    try {
      const city = await City.findByPk(cityId);
      if (!city) {
        res.status(404).json({ message: "City not found" });
      } else {
        res.status(200).json(city);
      }
    } catch (error) {
      res.status(500).json({ error: "Error getting the city" });
    }
  },
// atualizar/modificar cidade.
  updateCity: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, idState } = req.body;
    try {
      const state = await City.findByPk(id);
      if (state) {
        await state.update({
          name,
          idState,
        });
        res.status(200).json({ message: "City updated successfully." });
      } else {
        res.status(404).json({ message: "City not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the city." });
    }
  },
// excluir cidade.
  deleteCity: async (req: Request, res: Response): Promise<void> => {
    const cityId = parseInt(req.params.id, 10);
    try {
      const city = await City.findByPk(cityId);
      if (!city) {
        res.status(404).json({ message: "City not found" });
      } else {
        await city.destroy();
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting the city" });
    }
  },
// procurar cidade baseado em seu nome e estado.
  getCityByNameAndState: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, idState } = req.query;
      let whereCondition: WhereOptions<City> | undefined;

      if (name && idState) {
        const cityName = String(name);
        const stateId = Number(idState);

        whereCondition = { name: cityName, idState: stateId };
      }

      const city = await City.findOne({
        where: whereCondition,
      });

      res.status(200).json(city);
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

newCreateCity: async (req: Request, res: Response): Promise<void> => {
  try {
    const { cidade, estado } = req.params;

    let whereCondition: WhereOptions<City> | undefined;
    if (cidade && estado) {
        const cityName = String(cidade);
      const stateId = Number(estado);
      whereCondition = { name: cityName, idState: stateId };
    }

    const city = await City.findOne({ where: whereCondition });
    if (city) {
        res.status(400).json({ message: "City already exists in the state" });
    } else {
      const cityName = String(cidade);
      const stateId = Number(estado);
      const newCity = await City.create({ name: cityName, idState: stateId });
      res.status(201).json(newCity);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the city." });
  }
},
};

export default CityController;
