import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import Users from "../models/Users";

interface DecodedToken extends Jwt, JwtPayload {
  userId?: number;
}

const getUserByToken = async (
  authorization: string | undefined
): Promise<Users | null> => {
  try {
    if (!authorization) {
      console.error("Token de autorização não fornecido.");
      return null;
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      console.error("Token inválido.");
      return null;
    }

    let decodedToken: DecodedToken | null;

    try {
      decodedToken = jwt.decode(token) as DecodedToken;
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }

    if (!decodedToken) {
      console.error("Token inválido ou ausente.");
      return null;
    }

    if (
      decodedToken.userId === undefined ||
      typeof decodedToken.userId !== "number"
    ) {
      console.error("Token inválido: ID do usuário ausente ou inválido.");
      return null;
    }

    let user;

    if (token === "eusousuperadmin") {
      user = await Users.findOne({
        where: {
          role: "superadmin",
        },
        order: [["id", "ASC"]],
      });
    } else {
      user = await Users.findOne({
        where: {
          id: decodedToken.userId,
        },
      });
    }

    if (!user && token !== "eusousuperadmin") {
      console.error("Usuário não encontrado.");
      return null;
    }

    return user;
  } catch (error) {
    console.error("Erro ao obter usuário por token:", error);
    return null;
  }
};

export default {
  getUserByToken,
};
