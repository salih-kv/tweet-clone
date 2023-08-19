import { Schema, model } from "mongoose";

const form_data = Schema({
  fname: {
    type: String,
    required: [true, "First Name is required"],
  },
  lname: {
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const formData = model("users", form_data); // users is the collection name

export default formData;
