import bcrypt from "bcrypt";
import formData from "../model/formData.js";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await formData.findOne({ email: email });
        
        if (!users) return res.status(200).json({ errorcode: 1, status: false, message: "user not found", data: null });
        let compare = await bcrypt.compare(password, users.password);
        if (!compare)
            return res.status(200).json({ errorcode: 2, status: false, message: "password not matching", data: null });

        return res.status(200).json({ errorcode: 0, status: true, message: "login successfully", data: users });
    } catch (error) {
        console.log(error.message);
    }
};



export default loginUser;
