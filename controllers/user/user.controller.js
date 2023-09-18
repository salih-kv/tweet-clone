import { BearerParser } from "bearer-token-parser";
import Users from "../../model/user.model.js";

export const getUser = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const user = await Users.findOne({ userId });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// !pending : update user, delete user

export const updateUser = async (req, res, next) => {
  const { userId, userInfo } = req.body;

  // *

  try {
    const validUser = await Users.findById({ userId });

    // validUser.username = validUser;
    // validUser.roles = roles;
    // validUser.active = active;

    validUser.save();
    res.status(200).json({
      status: true,
      message: "Userinfo updated successfully",
      data: {
        posts: "trial",
      },
    });
  } catch (err) {
    next(err);
  }
};

// *

export const deleteUser = () => {};
