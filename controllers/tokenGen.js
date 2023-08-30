import jwt from "jsonwebtoken";
const maxAge =3*24*60*60;

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{
        expiresIn:maxAge
    })
} 


export default createToken;