import { Schema, model } from "mongoose";
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from 'uuid'

const userSchema = Schema({
  userId: {
    type: String,
    default: () => uuidv4(),
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
  avatar: {
    type: String,
    default:
      "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611746.jpg?w=740&t=st=1695968672~exp=1695969272~hmac=d801ed359445b7aefa5a2295258b96f39992ff8d778a5deafb37d831793199be",
  },
  bio: {
    type: String,
    default: "Hi👋 Welcome To My Profile",
  },
});

const Users = model("Users", userSchema);

export default Users;
