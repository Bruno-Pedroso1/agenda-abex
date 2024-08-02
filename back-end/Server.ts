import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { Pool } from "pg";
import "./src/models/Index";
import router from "./src/routes/Index";
import routerGoogle from "./src/routes/GoogleApiRoutes";
import routerAuth0 from "./src/routes/Auth0Routes";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("combined"));
// middlewares
if (!process.env.DB_CONNECTION_STRING) {
  console.error(
    "The DB_CONNECTION_STRING environment variable is not defined."
  );
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: false,
});

pool.connect((err, client, done) => {
  if (err) {
    console.error("Error communicating with database", err);
    process.exit(1);
  }
  console.log("Successful connection to the database");

  app.use("/api", router);
  app.use("/google", routerGoogle);
  app.use("/sso", routerAuth0);

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
