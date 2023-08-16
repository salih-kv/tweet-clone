import { Schema, model } from "mongoose";

const form_data = Schema({
  fname: {
    type: String,
    required: [true, "First Name is required"],
  },
  lname: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const formData = model("users", form_data); // users is collection name

export default formData;
