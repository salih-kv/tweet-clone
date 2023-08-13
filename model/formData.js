import { Schema, model } from "mongoose";

const form_data = Schema({
  fname: String,
  lname: String,
  email: String,
  password: Number,
});

const formData = model("formData", form_data);

export default formData;
