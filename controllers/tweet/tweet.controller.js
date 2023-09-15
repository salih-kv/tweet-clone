
import jwt from "jsonwebtoken";
import {BearerParser} from 'bearer-token-parser';
import Posts from "../../model/posts.model.js";




export const getTweets = async (req, res) => {
  const token =  BearerParser.parseBearerToken(req.headers);
  const { userId } = req.body
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const currentUserPosts = await Posts.find({ userId: userId });
    const followingposts = await Posts.find();// logic to fectch posts of all followers or all posts
    let tweets=[...currentUserPosts,followingposts]
    res.status(200).json({
      errorcode: 0,
      status: true,
      message: "Fetched posts successfully",
      data: tweets
    });
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
        errorcode: 1,
        status: false,
        message: "Invalid Token",
        data: null,
      });
  }
};

export const createNewTweet = async (req, res) => {
    const token =  BearerParser.parseBearerToken(req.headers);
    const { userTweet } = req.body
    
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const newPost = new Posts(req.body);
    await newPost.save();
    res.status(200).json({
      errorcode: 0,
      status: true,
      message: "New tweet created successully",
      // data: {
      //   posts:"trial"
      // },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
        errorcode: 1,
        status: false,
        message: "Invalid Token",
        data: null,
      });
  }
};

export const updateTweet = async (req, res) => {
    const token =  BearerParser.parseBearerToken(req.headers);
    const { tweetId,userTweet } = req.body
  try {
    console.log("req.body",req.body)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const post = await Posts.findById(tweetId);
    let updatedTweet={"userTweet":userTweet}
    if (post._id === tweetId) {
      await post.updateOne({ $set: updatedTweet});
      res.status(200).json({
        errorcode: 0,
        status: true,
        message: "Tweet updated successully",
        // data: {
        //   posts:"trial"
        // },
      });
    }
    
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
        errorcode: 1,
        status: false,
        message: "Invalid Token",
        data: null,
      });
  }
};

export const deleteTweet = async (req, res) => {
    const token =  BearerParser.parseBearerToken(req.headers);
    const { id } = req.body
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const post = await Posts.findById(id);
    if (post._id === id) {
      await post.deleteOne();
      res.status(200).json({
        errorcode: 0,
        status: true,
        message: "Tweet deleted successully",
        // data: {
        //   posts:"trial"
        // },
      });
    }
    
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
        errorcode: 1,
        status: false,
        message: "Invalid Token",
        data: null,
      });
  }
};


// like/dislike a post
export const likePost = async (req, res) => {
  const tweetId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await Posts.findById(tweetId);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Tweet liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Tweet Unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

