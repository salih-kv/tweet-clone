
import jwt from "jsonwebtoken";
import {BearerParser} from 'bearer-token-parser';

export const getTweets = async (req, res) => {
  const token =  BearerParser.parseBearerToken(req.headers);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
	
    res.status(200).json({
      errorcode: 0,
      status: true,
      message: "Fetched posts successfully",
      data: {
        posts:"trial"
      },
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
	
    res.status(200).json({
      errorcode: 0,
      status: true,
      message: "New tweet created successully",
      data: {
        posts:"trial"
      },
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
	
    res.status(200).json({
      errorcode: 0,
      status: true,
      message: "Tweet updated successully",
      data: {
        posts:"trial"
      },
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

export const deleteTweet = async (req, res) => {
    const token =  BearerParser.parseBearerToken(req.headers);
    const { id } = req.body
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
	
    res.status(200).json({
      errorcode: 0,
      status: true,
      message: "Tweet deleted successully",
      data: {
        posts:"trial"
      },
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

