import formData from "../model/formData.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    let { fname, lname, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await formData.create({
      fname,
      lname,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};
