import Tweets from "../../model/tweet.model.js";
import Users from "../../model/user.model.js";

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

// export const getTweets = async (req, res, next) => {
//   const userId = req.params;

//   try {
//     const currentUserTweets = await Tweets.find(userId);
//     // logic to fetch posts of all followers or all posts

//     res.status(200).json({
//       status: true,
//       message: "Fetched tweets successfully",
//       data: currentUserTweets,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const getTweets = async (req, res) => {
  
  const { userId } = req.body;

  // Validate user id
  if(!userId) {
    return res.status(400).send('User ID required');
  }

  let user = await Users.findOne({ userId });

  if(!user) {
    return res.status(400).send('User not found');
  }

  // Get tweets from user and followers 
  const tweets = await Tweets.getFeed(userId); 
  
  // Map tweets to response
  const mappedTweets = tweets.map(tweet => {
    return {
      id: tweet._id,
      text: tweet.text, 
      user: tweet.user.name,
      likes: tweet.likes.length,
      comments: tweet.comments.length
    }
  });

  res.json(mappedTweets);
}
// Tweet model method 
Tweets.getFeed = async function(userId) {

  // Get user and followers
  const user = await this.populate(userId, 'followers');

  // Query tweets 
  const query = {
    $or: [
      {user: userId}, 
      {user: {$in: (user.following || []).map(id => id)}}
    ]
  };

  return this.find(query)
    .populate('fname', 'lname', 'username', 'avatar')
    .populate({
      path: 'likes',
      select: 'count'  
    })
    .populate({
      path: 'comments', 
      select: 'count'
    })
    .sort({createdAt: -1});

}

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
     let newtweet= await Tweets.findById(tweetId);
      res.status(200).json(newtweet);
    } else {
      await tweet.updateOne({ $pull: { likes: userId } });
      let newtweet= await Tweets.findById(tweetId);
      //res.status(200).json(newtweet);
      res.status(200).json(newtweet);
    }
  } catch (err) {
    next(err);
  }
};
