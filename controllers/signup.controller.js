import bcrypt from "bcrypt";
import User from "../model/user.model.js";

export const createUser = async (req, res) => {
  const { fname, lname, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
<<<<<<< HEAD:controllers/signup.js

    //add a function to check if user email already exists

    const user = await formData.create({
=======
    const user = await User.create({
>>>>>>> ec54c68128b065165186cca0bbf6f53d005b8095:controllers/signup.controller.js
      fname,
      lname,
      username,
      password: hashedPassword,
    });

    res.status(200).json({ errorcode: 0, status: true, message: "User created succesfully", data: users });
  } catch (err) {
    res.json({ error: err.message });
  }
};
