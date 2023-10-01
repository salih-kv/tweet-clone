import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const {connection}= await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("SERVER CONNECTED @",connection.host);
  } catch (err) {
    console.log(err.message);
  }
};
