import formData from "../model/formData.js";

export const createUser = async (req, res) => {
  try {
    let { fname, lname, email, password } = req.body;
    const user = await formData.create({ fname, lname, email, password });
    console.log(user);
    res.json(user);
  } catch {
    console.log(err);
    res.json({ error: err.message });
  }
};
