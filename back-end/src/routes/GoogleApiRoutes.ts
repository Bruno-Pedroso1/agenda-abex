import express from "express";
import { getAuthUrl, exchangeCodeForToken } from "../utils/google-api-auth";

const routerGoogle = express.Router();

routerGoogle.get("/auth-url", getAuthUrl);
routerGoogle.post("/codeForToken", exchangeCodeForToken);

export default routerGoogle;
