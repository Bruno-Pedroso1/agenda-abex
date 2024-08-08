import { Request, Response } from "express";
import Schedules from "../models/Schedules";

const SchedulesController = {
  // cadastrar horários.
  createScheduleEntry: async (req: Request, res: Response): Promise<void> => {
    try {
      const { idSchedule, startTime, endTime, weekDay } = req.body;
      const newScheduleEntry = await Schedules.create({
        startTime,
        endTime,
        weekDay,
        idSchedule,
      });
      res.status(201).json(newScheduleEntry);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while creating the schedule entry.",
      });
    }
  },
// exibir todos os horários.
  getAllScheduleEntries: async (req: Request, res: Response): Promise<void> => {
    try {
      const scheduleEntries = await Schedules.findAll();
      res.status(200).json(scheduleEntries);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while fetching schedule entries.",
      });
    }
  },
// exibir horários por id.
  getScheduleEntryById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const scheduleEntry = await Schedules.findByPk(id);
      if (scheduleEntry) {
        res.status(200).json(scheduleEntry);
      } else {
        res.status(404).json({ message: "Schedule entry not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while fetching the schedule entry.",
      });
    }
  },
// atualizar/modificar horários.
  updateScheduleEntry: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { idSchedule, startTime, endTime, weekDay } = req.body;
    try {
      const scheduleEntry = await Schedules.findByPk(id);
      if (scheduleEntry) {
        await scheduleEntry.update({
          startTime,
          endTime,
          weekDay,
          idSchedule,
        });
        res
          .status(200)
          .json({ message: "Schedule entry updated successfully." });
      } else {
        res.status(404).json({ message: "Schedule entry not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while updating the schedule entry.",
      });
    }
  },
// excluir horários.
  deleteScheduleEntry: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const scheduleEntry = await Schedules.findByPk(id);
      if (scheduleEntry) {
        await scheduleEntry.destroy();
        res
          .status(200)
          .json({ message: "Schedule entry deleted successfully." });
      } else {
        res.status(404).json({ message: "Schedule entry not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while deleting the schedule entry.",
      });
    }
  },
};

export default SchedulesController;
