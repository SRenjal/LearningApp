import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

import user from "./routes/user.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: [GET, POST, PATCH, PUT, DELETE],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to Learning app");
});

app.use("/courses", user);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
