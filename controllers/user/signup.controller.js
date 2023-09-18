import bcrypt from "bcrypt";
import Users from "../../model/user.model.js";

export const createUser = async (req, res, next) => {
  const { fname, lname, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    //add a function to check if user email already exists

    const user = await Users.create({
      fname,
      lname,
      username,
      password: hashedPassword,
    });

    res.status(200).json({
      status: true,
      message: "User created successfully",
    });
  } catch (err) {
    next(err);
  }
};
