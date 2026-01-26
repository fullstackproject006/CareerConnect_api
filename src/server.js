import express from "express";
import cors from "cors";
import { PORT } from "../config.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { schema } from "./schema.js";
import { parse } from "graphql";
import { sequelize } from "./db/index.js";

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

const server = new ApolloServer({
  schema,
});


await server.start();

app.get("/graphql", (req, res) => {
  res.status(200).send("graphql endpoint");
});

app.use("/graphql", express.json(), expressMiddleware(server, {
  context: async ({ req }) => { 
    const skipOps = ["register", "login"];
    const { query } = req.body;
    const operationName = getOperationName(query);

    if (!skipOps.includes(operationName)) {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    }
    return { user: req.user };
  }
}));

const getOperationName = (query) => {
  const ast = parse(query);
  return ast.definitions.find(
    (def) => def.kind === "OperationDefinition"
  )?.name?.value;
};


app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on this http://localhost:${PORT}/`);
});
