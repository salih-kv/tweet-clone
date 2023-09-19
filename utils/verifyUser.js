import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.json({ status: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded) {
      res.json({ status: true });
    }
  } catch (err) {
    res.json({ status: false });
  }
};
