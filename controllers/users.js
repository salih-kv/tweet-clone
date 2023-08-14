import formData from "../model/formData.js";

export const getUsers = async (req, res) => {
  try {
    const users = await formData.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};
