import { Schema, model } from "mongoose";

const userSchema = Schema({
  fname: {
    type: String,
    required: [true, "First Name is required"],
  },
  lname: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema); // users is the collection name

export default User;
