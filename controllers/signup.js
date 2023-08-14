import formData from "../model/formData.js";

export const createUser = async (req, res) => {

  try {
    let { fname, lname, email, password } = req.body;
    const user = await formData.create({ fname, lname, email, password })
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
};
