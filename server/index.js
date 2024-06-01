import express from "express";
import cors from "cors";
import assetRouter from "./routes/assets.route.js";
import ticketRouter from "./routes/ticket.route.js";
import { dbConnect } from "./db/dbConnet.js";

const app = express();

dbConnect();

app.use(express.json());
app.use(cors());
app.use("/api/v1", assetRouter);
app.use("/api/v1", ticketRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
