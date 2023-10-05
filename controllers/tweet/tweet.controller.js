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

export const getTweets = async (req, res,next) => {
  
  const { userId,forProfile } = req.body;
  try {
  // Validate user id
  if(!userId) {
    return res.status(400).send('User ID required');
  }

  let user = await Users.findOne({ userId });

  if(!user) {
    return res.status(400).send('User not found');
  }

  // Get tweets from user and followers 
  const tweets = await Tweets.getFeed(userId,forProfile); 
  //console.log("tweets",tweets)
  // Map tweets to response
  const mappedTweets = tweets.map(tweet => {
   // console.log(tweet,"tweet")
    return {
      id: tweet._id,
      text: tweet.userTweet, 
      firstname: tweet.userId.fname,
      lastname: tweet.userId.lname,
      likes: tweet.likes,
      avatar:tweet.userId.avatar,
      comments: [],
      createdAt:tweet.createdAt,
      updatetedAt:tweet.updatedAt
    }
  });
 // console.log(mappedTweets,"mappedTweets")
  res.json(mappedTweets);
}catch(err){
  // console.log(err,"error new")
  res.json({
    status:false,
    message:err
  })
}
}
// Tweet model method 
Tweets.getFeed = async function(userId,forProfile) {
try{
// Get user and followers
const user = await Users.findOne({userId}).populate('followers');
// console.log(user,"user 1")
// console.log(forProfile,"forProfile ")
 // Query tweets 
 let query;
 if(forProfile=="false"){
   query = {
    $or: [
     { userId: user.userId }, // Tweets by the user
     {userId: {$in: user.following|| []}}   , // Tweets by users they are following
    ]
  };
//   console.log(query,"1st query")  

 }else{
  query = { userId:user.userId };
//   console.log(query,"2nd query")  
 }
 
// const query = { userId:user.userId };
//  console.log(query,"user query")  

 return this.find(query)
   .populate({
    path: 'userId',
    select: 'fname lname username avatar',
  foreignField: 'userId' // match on this field in User model
  })
   .populate({
     path: 'likes',
     select: 'count'  
   })
   .populate({
     path: 'comments', 
     select: 'count'
   })
   .sort({createdAt: -1});

}catch(err){

  // console.log(err,"error")
}
  

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
