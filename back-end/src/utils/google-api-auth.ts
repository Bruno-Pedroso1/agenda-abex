import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import express from "express";
import Users from "../models/Users";
import { google, Auth } from "googleapis";

const JWT_SECRET = "toksen";
const AUTH_SCOPES = [
  "https://www.googleapis.com/auth/contacts",
  "https://www.googleapis.com/auth/contacts.readonly",
  "https://www.googleapis.com/auth/directory.readonly",
  "https://www.googleapis.com/auth/profile.agerange.read",
  "https://www.googleapis.com/auth/profile.emails.read",
  "https://www.googleapis.com/auth/profile.language.read",
  "https://www.googleapis.com/auth/user.addresses.read",
  "https://www.googleapis.com/auth/user.birthday.read",
  "https://www.googleapis.com/auth/user.emails.read",
  "https://www.googleapis.com/auth/user.gender.read",
  "https://www.googleapis.com/auth/user.organization.read",
  "https://www.googleapis.com/auth/user.phonenumbers.read",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const googleCredentials = {
  client_id:
    "895516917156-62gl3q0382u6an5do0u9fjb6ck8dga4l.apps.googleusercontent.com",

  client_secret: "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",
  redirect_uri: "http://localhost:3000",
};

export async function getAuthUrl(req: express.Request, res: express.Response) {
  try {
    const oauth2Client = await makeOAuth2Client(googleCredentials);
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: AUTH_SCOPES,
    });
    console.log(authUrl);
    res.json({ authUrl });
  } catch (error) {
    res.status(500).json({ error: "Error when obtaining authorization URL" });
  }
}

export async function makeOAuth2Client(keys: {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}) {
  return new google.auth.OAuth2({
    clientId: keys.client_id,
    clientSecret: keys.client_secret,
    redirectUri: keys.redirect_uri,
  });
}

function generateJWT(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" }); // Token expira em 1 hora
}

export async function exchangeCodeForToken(
  req: express.Request,
  res: express.Response
) {
  const code = req.body.code;
  console.log(code);

  try {
    if (!code) {
      res.status(400).json({ error: "Authorization code not provided." });
      return;
    }
    const tokens = await getTokens(code);
    if (tokens.access_token) {
      const accessToken = tokens.access_token ?? "";
      const refreshToken = tokens.refresh_token ?? "";
      const userInfo = await getUserInfo(accessToken, refreshToken);
      const existingUser = await findUserByGoogleEmail(userInfo.email);

      if (existingUser) {
        const updatedUser = await updateUser(existingUser, userInfo);
        const jwtToken = generateJWT(existingUser.id);
        res.json({
          access_token: tokens.access_token,
          id_token: tokens.id_token,
          jwt_token: jwtToken,
          user_info: userInfo,
          user: updatedUser,
        });
      } else {
        const user = await insertUserInfo(userInfo as any);
        await updateTaxIdentificationNumber(user, user.id);
        const jwtToken = generateJWT(user.id); // Gerar token JWT com o ID do novo usuário
        res.json({
          access_token: tokens.access_token,
          id_token: tokens.id_token,
          jwt_token: jwtToken, // Enviar o token JWT para o frontend
          user_info: userInfo,
          user,
        });
      }
    } else {
      console.error("Error getting access token.");
      res.status(500).json({ error: "Error getting access token." });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error." });
  }
}

async function updateUser(existingUser: Users, userInfo: any) {
  try {
    existingUser.email = userInfo.email || existingUser.email;
    existingUser.name = userInfo.name || existingUser.name;
    await existingUser.save();
    return existingUser;
  } catch (error) {
    throw error;
  }
}

async function findUserByGoogleEmail(email: string) {
  try {
    const user = await Users.findOne({ where: { email } });
    return user || null;
  } catch (error) {
    throw error;
  }
}

async function getTokens(code: string) {
  const oauth2Client = await makeOAuth2Client(googleCredentials);
  try {
    console.log("Attempting to obtain tokens...");
    const { tokens } = await oauth2Client.getToken(code);
    console.log("Tokens obtained successfully:", tokens);
    return tokens;
  } catch (error) {
    console.error("Error obtaining tokens:", error);
    throw error;
  }
}
export async function getUserInfo(accessToken: string, refreshToken: string) {
  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  const people = google.people({ version: "v1", auth: oauth2Client });
  try {
    const userInfoResponse = await people.people.get({
      resourceName: "people/me",
      personFields: "names,emailAddresses,photos",
    });
    const userInfo = userInfoResponse.data;
    const token = accessToken;
    const displayName = userInfo.names ? userInfo.names[0]?.displayName : "";
    const emailAddress = userInfo.emailAddresses
      ? userInfo.emailAddresses[0]?.value
      : "";
    const profilePhotoUrl = userInfo.photos ? userInfo.photos[0]?.url : "";
    const temporaryTaxID = "G_user_pending";
    const temporaryPhone = "G_user_pending";
    const user = {
      email: emailAddress || "",
      name: displayName,
      photo: profilePhotoUrl,
      role: "customer",
      token,
      taxIdentificationNumber: temporaryTaxID,
      phone: temporaryPhone,
    };
    console.log("POR FAVOR", userInfo);
    return user;
  } catch (error) {
    console.error("Error getting user information", error);
    throw error;
  }
}

async function updateTaxIdentificationNumber(user: Users, userId: number) {
  const newTaxID = `G_user_${userId}`;
  const newPhoneID = `G_user_${userId}`;
  try {
    await Users.update(
      { taxIdentificationNumber: newTaxID, phone: newPhoneID },
      {
        where: { id: userId },
      }
    );
  } catch (error) {
    throw error;
  }
}

export async function insertUserInfo(user: Users) {
  try {
    const newUser = await Users.create(user);
    return newUser;
  } catch (error) {
    throw error;
  }
}
