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
  likes:[],

  comments: {
    type: String,
  },
},
{
  timestamps: true,
}

);

const Posts = model("Posts", postSchema);

export default Posts;
