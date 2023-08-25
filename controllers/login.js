import bcrypt from "bcrypt";
import formData from "../model/formData.js";
import createToken from "./tokenGen.js";
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await formData.findOne({ email: email });
        const maxAge =3*24*60*60;


        if (!users) return res.status(401).json({ errorcode: 1, status: false, message: "user not found", data: null });//error code changed
        let compare = await bcrypt.compare(password, users.password);
        if (!compare)
            return res.status(401).json({ errorcode: 2, status: false, message: "password not matching", data: null });//error code changed
         
         const token=createToken(users._id);
         res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
         res.status(200).json({ errorcode: 0, status: true, message: "login successfully", data: users });
    } catch (error) {
        console.log(error.message);
    }
};



export default loginUser;
