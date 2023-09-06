import User from "../model/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};


export const updateUsers = async (req, res) => {
  const token = req.headers['x-access-token']
  const { userId,userInfo } = req.body
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
  const validUser = await User.findOne({ _id: userId })

  // validUser.username = validUser
  // validUser.roles = roles
  // validUser.active = active
  res.status(200).json({
    errorcode: 0,
    status: true,
    message: "Userinfo updated successully",
    data: {
      posts:"trial"
    },
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