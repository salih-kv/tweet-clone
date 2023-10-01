import { Schema, model } from "mongoose";
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from 'uuid'

const tweetSchema = Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().slice(0,6),
    },
    userId: { type: String, required: true },
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
