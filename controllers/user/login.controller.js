import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../../model/user.model.js";
import { errorHandler } from "../../utils/errorHandler.js";

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const validUser = await Users.findOne({ username: username });

    if (!validUser) return next(errorHandler(404,"User not found"));

    let validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));

    let token = createToken(validUser._id);

    let user = { ...validUser._doc, token };
    res.status(200).json({
      status: true,
      message: "login successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
