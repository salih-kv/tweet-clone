import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import createToken from "./tokenGen.js";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const validUser = await User.findOne({ username: username });
    const maxAge =3*24*60*60;

    if (!validUser)//error codes changed for unauthorised user
      return res.status(401).json({
        errorcode: 1,
        status: false,
        message: "user not found",
        data: null,
      });
    let compare = await bcrypt.compare(password, validUser.password);
    if (!compare)
      return res.status(401).json({
        errorcode: 2,
        status: false,
        message: "password not matching",
        data: null,
      });
      
    const token=createToken(validUser._id);  
    // res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000}); 
    res.status(200).json({
      errorcode: 0,
      status: true,
      message: "login successfully",
      data: validUser,
      token:token
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default loginUser;
