import { resolve } from "path";

export default {
  config: path.resolve("config", "config.js"),
  "models-path": resolve("models"),
  "migrations-path": resolve("migrations")
};
