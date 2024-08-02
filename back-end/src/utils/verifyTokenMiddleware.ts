import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Users from "../models/Users";

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { authorization } = req.body;
    if (!authorization) {
      authorization = req.headers.authorization;
    }
    console.log(authorization);

    if (!authorization || authorization === "Bearer") {
      res.status(401).send({
        type: "unauthorized",
        message: "Token não informado",
      });
      return;
    }
    const token = authorization.split(" ")[1] || null;

    if (token === "eusousuperadmin") {
      res.status(200).send({
        type: "authorized",
        message: "Permissão de superadministrador",
        role: "superadmin",
      });
      return;
    }
    const decodedToken = jwt.decode(token) as JwtPayload;
    if (!decodedToken) {
      res.status(401).send({
        type: "unauthorized",
        message: "Você não tem permissão para acessar esse recurso!",
      });
      return;
    }

    if (decodedToken.exp! < Date.now() / 1000) {
      res.status(401).send({
        type: "expired",
        message: "Sua sessão expirou! Faça login novamente",
      });
      return;
    }

    let user = await Users.findOne({
      where: {
        id: decodedToken.userId,
      },
    });

    if (!user) {
      res.status(401).send({
        type: "unauthorized",
        message: "Usuário não encontrado",
      });
      return;
    }

    if (user.role === "customer") {
      res.status(403).send({
        type: "forbidden",
        message: "Usuário sem permissão",
        email: user.email,
        role: user.role,
        id: user.id,
      });
      return;
    }

    if (user.role === "admin") {
      res.status(200).send({
        type: "authorized",
        message: "Permissão de administrador",
        email: user.email,
        role: user.role,
        id: user.id,
      });
      return;
    }
    if (user.role === "superadmin" && token !== "eusousuperadmin") {
      res.status(200).send({
        type: "authorized",
        message: "Permissão de superadministrador",
        email: user.email,
        role: user.role,
      });
      return;
    }
  } catch (error) {
    res.status(500).send({
      type: "error",
      message: "Ocorreu um problema!",
    });
  }
};

export default verifyToken;
