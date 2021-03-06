import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import usersRoutes from "./routes/users.routes";
import transactionsRoutes from "./routes/transactions.routes";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", usersRoutes);
app.use("/api", transactionsRoutes);

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use(express.static(path.join(__dirname, "build")));

mongoose.connect(
  `mongodb+srv://halniak-user:573phFHzhLBz064y@halniak-cluster.rnzwz.mongodb.net/cryptoDB?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.once("open", () => {
  console.log({ message: "successfully connected to the database" });
});
db.on("error", (err) => console.log({ message: err }));

/* Not found 404 */
app.use((_req, res) => {
  res.status(404).send("404... resource not found");
});

app.listen(process.env.PORT || 8011, () => {
  console.log("listening on port 8011");
});
