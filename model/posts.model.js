import { Schema, model } from "mongoose";

const postSchema = Schema({
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
