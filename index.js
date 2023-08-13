import express from "express";
import mongoose from "mongoose";
import formData from "./model/formData.js";
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

app.post("/signup", async (req, res) => {
  try {
    let { fname, lname, email, password } = req.body;
    const user = await formData.create({ fname, lname, email, password });
    res.json(user);
  } catch {
    console.log(err);
    res.json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await formData.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
