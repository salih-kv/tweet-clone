import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { errorHandler } from "./errorHandler.js";

// *

export const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decode.id).select("-password");
        next()
      } catch (err) {
        next(err);
      }
    }
    if (!token) return next(errorHandler(401, "Unauthorized, invalid token"));
  } catch (err) {
    next(err);
  }
};
