import bcrypt from "bcrypt";

export const loginUser = (req, res) => {
  const { email, password } = req.body;


  bcrypt.compare(password,)
};

export default loginUser;
