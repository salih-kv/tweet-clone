import fileUpload from "../../model/fileupload.model.js";

/** POST: http://localhost:3000/uploads  */
export const uploadProfile = async (req, res, next) => {
    const  myFile  = req.body;
    try{
        const newImage = await fileUpload.create(myFile)
        newImage.save();
        res.status(201).json({ msg : "New image uploaded...!"})
    }catch(error){
        res.status(409).json({ message : error.message })
    }
}