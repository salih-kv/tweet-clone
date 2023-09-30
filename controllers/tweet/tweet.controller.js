import Tweets from "../../model/tweet.model.js";

export const createNewTweet = async (req, res, next) => {
  try {
    const newTweet = await Tweets.create(req.body);
    res.status(200).json({
      status: true,
      message: "New tweet created successfully",
      data: newTweet,
    });
  } catch (err) {
    next(err);
  }
};

export const getTweets = async (req, res, next) => {
  const userId = req.params;

  try {
    const currentUserTweets = await Tweets.find(userId);
    // logic to fetch posts of all followers or all posts

    res.status(200).json({
      status: true,
      message: "Fetched tweets successfully",
      data: currentUserTweets,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTweet = async (req, res, next) => {
  const { id } = req.body;
  try {
    const post = await Tweets.findById(id);
    if (post._id === id) {
      await post.deleteOne();
      res.status(200).json({
        status: true,
        message: "Tweet deleted successully",
      });
    }
  } catch (err) {
    next(err);
  }
};

// like/dislike a tweet
export const likeTweet = async (req, res, next) => {
  const { tweetId, userId } = req.body;

  try {
    const tweet = await Tweets.findById(tweetId);
    if (!tweet.likes.includes(userId)) {
      await tweet.updateOne({ $push: { likes: userId } });
      res.status(200).json(tweet);
    } else {
      await tweet.updateOne({ $pull: { likes: userId } });
      res.status(200).json(tweet);
    }
  } catch (err) {
    next(err);
  }
};
