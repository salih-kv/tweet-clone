import jwt from "jsonwebtoken";
import formData from "../model/user.model.js";

const protect=async(req,res,next)=>{
let token

console.log("req.headers.authorization==",req.headers.authorization);
try {
    if(req.headers.authorization &&  req.headers.authorization.startsWith("Bearer"))
    {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
           
            // console.log("decode=",decode);
            req.user= await formData.findById(decode.id).select("-password")
            console.log("req.user==",req.user);
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new error("not authorized,token failed")
        }
    }
    if(!token){
        console.log("req.headers.authorization==",req.headers.authorization)
        res.status(401)
        throw new Error("not authorized,no token")
    }
} catch (error) {
    console.log(error.message);
}


}


export default protect

