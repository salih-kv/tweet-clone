import { Schema, model } from "mongoose";
import { nanoid } from "nanoid";

const tweetSchema = Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
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
