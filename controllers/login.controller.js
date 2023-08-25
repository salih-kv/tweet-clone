import bcrypt from "bcrypt";
import User from "../model/user.model.js";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const validUser = await User.findOne({ username: username });

    if (!validUser)
      return res.status(200).json({
        errorcode: 1,
        status: false,
        message: "user not found",
        data: null,
      });
    let compare = await bcrypt.compare(password, validUser.password);
    if (!compare)
      return res.status(200).json({
        errorcode: 2,
        status: false,
        message: "password not matching",
        data: null,
      });

    return res.status(200).json({
      errorcode: 0,
      status: true,
      message: "login successfully",
      data: validUser,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default loginUser;
