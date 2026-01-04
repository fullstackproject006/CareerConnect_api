import express from "express";
import cors from "cors";
import { PORT } from "../config.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { schema } from "./schema.js";
import { sequelize } from "./db/index.js";
import db from '../models/index.js';
const { User } = db;


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  await sequelize.authenticate();
  console.log("MySQL connected");
} catch (err) {
  console.error("DB connection failed", err);
  process.exit(1);
}

app.get("/test-db", async (req, res) => {
  const user = await User.create({
    email: "test@example.com",
    gender: "male",
    userType: 1,
  });
  console.log(
    "User created",
    user
  )
});

const server = new ApolloServer({
  schema,
});


await server.start();

app.get("/graphql", (req, res) => {
  res.status(200).send("graphql endpoint");
});

app.use("/graphql", express.json(), expressMiddleware(server));



app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on this http://localhost:${PORT}/`);
});
