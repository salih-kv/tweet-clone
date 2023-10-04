import { Schema, model } from "mongoose";

const fileSchema = Schema({
    myFile : String
});

// export default mongoose.models.fileUpload || mongoose.model('fileUpload', fileSchema)
const fileUpload = model("fileUpload", fileSchema);

export default fileUpload;