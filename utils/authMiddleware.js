import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

// *

export const verifyToken = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
      } catch (err) {
        next(err);
      }
    }
    if (!token) return next(errorHandler(401, "Unauthorized, invalid token"));
  } catch (err) {
    next(err);
  }
};
