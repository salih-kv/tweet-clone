import { Schema, model } from "mongoose";
import { nanoid } from "nanoid";

const userSchema = Schema({
  userId: {
    type: String,
    default: () => nanoid(5),
  },
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

const Users = model("Users", userSchema);

export default Users;
