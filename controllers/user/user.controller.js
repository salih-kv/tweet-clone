import { BearerParser } from "bearer-token-parser";
import Users from "../../model/user.model.js";

export const getUser = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const user = await Users.findOne({ userId },{ password: 0});
    
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


export const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { username,fname,lname, } = req.body;
  // *

  try {
    let validUser = await Users.findOne({ userId });

    validUser.username = username;
    validUser.fname = fname;
    validUser.lname = lname;

    let response=await validUser.save({ validateBeforeSave: false });
    if(response){
      res.status(200).json({
      status: true,
      message: "Userinfo updated successfully",
      
    });
    }
    
  } catch (err) {
    next(err);
  }
};

// !pending : delete user

export const deleteUser = () => {};
