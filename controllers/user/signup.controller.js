import bcrypt from "bcrypt";
import formData from "../../model/user.model.js";

export const createUser = async (req, res) => {
  const { fname, lname, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    //add a function to check if user email already exists

    const user = await formData.create({
      fname,
      lname,
      username,
      password: hashedPassword,
    });

    res
      .status(200)
      .json({
        errorcode: 0,
        status: true,
        message: "User created succesfully",
      });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: err.message });
  }
};
