import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import { fileURLToPath } from "url";
import path from "path";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cors());
app.use("/api/users", userRouter);
app.use("/models", express.static(path.join(__dirname, "models")));
// app.use("/static", express.static(__dirname + "/client/static"));
app.use("/static", express.static(path.join(__dirname, "client", "static")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});
const PORT = 8000;
mongoose
  .connect(
    "mongodb+srv://admin:TX0D7jDS4wu1sG4z@cluster0.r0oe2on.mongodb.net/codeBugged?retryWrites=true&w=majority"
  )
  .then(() => {
    // console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
