import { Schema, model } from "mongoose";
import { nanoid } from 'nanoid';


const postSchema = Schema({
  
  _id: {
    type: String,
    default: () => nanoid(),
  },
  userId: { type: String},
  userTweet: {
    type: String,
    required: [true, "Content is required"],
  },
  likes: {
    type: Number,
  },
  comments: {
    type: String,
  },
});

const Posts = model("Posts", postSchema); // users is the collection name

export default Posts;
