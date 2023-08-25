import formData from "../model/formData.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    let { fname, lname, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    //add a function to check if user email already exists

    const user = await formData.create({
      fname,
      lname,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ errorcode: 0, status: true, message: "User created succesfully", data: users });
  } catch (err) {
    res.json({ error: err.message });
  }
};
