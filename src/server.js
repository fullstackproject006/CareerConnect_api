import express from "express";
import cors from "cors";
import { PORT } from "../config.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { schema } from "./schema.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  schema,
});


await server.start();

app.use("/graphql", express.json(), expressMiddleware(server));



app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on this http://localhost:${PORT}/`);
});
