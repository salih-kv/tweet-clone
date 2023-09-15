import { BearerParser } from "bearer-token-parser";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res) => {
    const token =  BearerParser.parseBearerToken(req.headers);
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
     
      res.status(200).json({
        errorcode: 0,
        status: true,
        message: "Token verified successully",
        // data: {
        //   posts:"trial"
        // },
      });
    
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
        errorcode: 1,
        status: false,
        message: "Invalid Token",
        data: null,
      });
  }
};