import express from "express";
import mongoose from "mongoose";

import usersRoutes from "./routes/users.js";
import signupRoutes from "./routes/signup.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/formDB")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

app.use("/signup", signupRoutes);
app.use("/users", usersRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
