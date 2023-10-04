import { Schema, model } from "mongoose";
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from 'uuid'
import mongoose from 'mongoose';
const tweetSchema = Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().slice(0,6),
    },
    userId: { type: String, required: true ,ref: 'Users' },
    // user: { // Reference to User model
    //   type:String,
    //   ref: 'Users' 
    // },
    userTweet: {
      type: String,
      required: [true, "Content is required"],
    },
    likes: [],

    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Tweets = model("Tweets", tweetSchema);

export default Tweets;
