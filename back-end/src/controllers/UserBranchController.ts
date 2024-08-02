import { Request, Response } from "express";
import UserBranch from "../models/UserBranch";

const UserBranchController = {
  getBranchByUserId: async (req: Request, res: Response): Promise<void> => {
    try {
      const { idUser } = req.params;
      const userId = parseInt(idUser, 10);
      const userBranches = await UserBranch.findAll({
        where: { idUser: userId },
      });
      if (userBranches && userBranches.length > 0) {
        res.status(200).json(userBranches);
      } else {
        res
          .status(404)
          .json({
            message:
              "User-branch relationships not found for the specified user id.",
          });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "An error occurred while fetching user-branch relationships by user id.",
      });
    }
  },
  createUserBranch: async (req: Request, res: Response): Promise<void> => {
    try {
      const { idBranch, idUser, credits } = req.body;
      const userbranch = await UserBranch.create({ idBranch, idUser, credits });
      res.status(201).json(userbranch);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the User Branch." });
    }
  },
  deleteUserBranchByIdNovo: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { idUser, idBranch } = req.params;
      const userBranch = await UserBranch.findOne({
        where: { idUser, idBranch },
      });

      if (userBranch) {
        await userBranch.destroy();
        res
          .status(200)
          .json({ message: "User-branch relationship deleted successfully." });
      } else {
        res
          .status(404)
          .json({ message: "User-branch relationship not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "An error occurred while deleting the user-branch relationship.",
      });
    }
  },
  createUserBranchNovo: async (req: Request, res: Response): Promise<void> => {
    try {
      const { idUser, idBranch } = req.params;
      const userId = parseInt(idUser, 10);
      const branchId = parseInt(idBranch, 10);
      const newUserBranch = await UserBranch.create({
        idUser: userId,
        idBranch: branchId,
        credits: 0.0,
      });

      res.status(201).json(newUserBranch);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "An error occurred while creating the user-branch relationship.",
      });
    }
  },
  getUserBranchByIdNovo: async (req: Request, res: Response): Promise<void> => {
    try {
      const { idUser, idBranch } = req.params;
      const userBranch = await UserBranch.findOne({
        where: { idUser: idUser, idBranch: idBranch },
      });

      if (userBranch) {
        res.status(200).json(userBranch);
      } else {
        res
          .status(404)
          .json({ message: "User-branch relationship not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "An error occurred while fetching the user-branch relationship.",
      });
    }
  },

  getUserBranchById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const userBranch = await UserBranch.findByPk(id);
      if (userBranch) {
        res.status(200).json(userBranch);
      } else {
        res
          .status(404)
          .json({ message: "User-branch relationship not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "An error occurred while fetching the user-branch relationship.",
      });
    }
  },

  updateUserBranch: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { idUser, idBranch, credits } = req.body;
    try {
      const userBranch = await UserBranch.findByPk(id);
      if (userBranch) {
        await userBranch.update({ idUser, idBranch, credits });
        res
          .status(200)
          .json({ message: "User-branch relationship updated successfully." });
      } else {
        res
          .status(404)
          .json({ message: "User-branch relationship not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "An error occurred while updating the user-branch relationship.",
      });
    }
  },

  getAllUsersBranch: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await UserBranch.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the users." });
    }
  },
  updateUserBranchCredits: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { idUser, idBranch } = req.params;
      const { credits } = req.body;

      const userId = parseInt(idUser, 10);
      const branchId = parseInt(idBranch, 10);

      const userBranch = await UserBranch.findOne({
        where: { idUser: userId, idBranch: branchId },
      });

      if (userBranch) {
        await userBranch.update({ credits });
        res
          .status(200)
          .json({ message: "User-branch credits updated successfully." });
      } else {
        res
          .status(404)
          .json({ message: "User-branch relationship not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while updating the user-branch credits.",
      });
    }
  },
  deleteUserBranch: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const userBranch = await UserBranch.findByPk(id);
      if (userBranch) {
        await userBranch.destroy();
        res
          .status(200)
          .json({ message: "User-branch relationship deleted successfully." });
      } else {
        res
          .status(404)
          .json({ message: "User-branch relationship not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "An error occurred while deleting the user-branch relationship.",
      });
    }
  },
};

export default UserBranchController;
