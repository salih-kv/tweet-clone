import Users from "../../model/user.model.js";

export const getUser = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const user = await Users.findOne({ userId }, { password: 0 });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { username, fname, lname } = req.body;
  // *

  try {
    let validUser = await Users.findOne({ userId });

    validUser.username = username;
    validUser.fname = fname;
    validUser.lname = lname;

    let response = await validUser.save({ validateBeforeSave: false });
    if (response) {
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

// Follow a user
export const followUser = async (req, res, next) => {
  const { followerId, followedId } = req.body;
  try {
    const follower = await Users.findOne({ userId: followerId });
    const followed = await Users.findOne({ userId: followedId });
    // Ensure follower and followed are Mongoose documents
    if (!follower || !followed) {
      return res.status(404).send({ message: "User not found" });
    }

    // Add new ObjectId to following and followers arrays
    follower.following.push(followed.userId);
    followed.followers.push(follower.userId);

    await follower.save();
    await followed.save();

    res.send({ message: "Followed successfully!" });
  } catch (err) {
    next(err);
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  const { followerId, followedId } = req.body;
  try {
    const follower = await Users.findOne({ userId: followerId });
    const followed = await Users.findOne({ userId: followedId });
    // Ensure follower and followed are Mongoose documents
    if (!follower || !followed) {
      return res.status(404).send({ message: "User not found" });
    }

    // Add new ObjectId to following and followers arrays
    follower.following.pull(followed._id);
    followed.followers.pull(follower._id);

    await follower.save();
    await followed.save();

    res.send({ message: "Unfollowed successfully!" });
  } catch (err) {
    next(err);
  }
};

// Search user
export const searchUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    const users = await Users.find({ username }).select('username fname avatar')
    console.log(users);
    res.json(users);
  } catch (err) {
    next(err);
  }
};
