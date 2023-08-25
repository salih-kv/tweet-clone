import bcrypt from "bcrypt";
import User from "../model/user.model.js";

export const createUser = async (req, res) => {
  const { fname, lname, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fname,
      lname,
      username,
      password: hashedPassword,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};
