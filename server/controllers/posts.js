import Post from "../models/Posts.js";
import User from "../models/user.js";

// CREATE POSTS
export const createPost = async (req, res) => {
  try {
    // pull values from req and User
    const { userId, description, picturePath } = req.body; //grab info
    const user = await User.findById(userId); //grab all user info

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {
        // heres where users who liked it will be listed
      },
      comments: [],
    });
    await newPost.save(); // save into mongodb

    const post = await Post.find(); //grab ALL the posts; updated for the frontend to work on it here

    res.status(201).json(post); //show success in CREATING smth (201)
  } catch (error) {
    res.status(409).json({ message: error.message }); //error in CREATING POST
  }
};

// READ POSTS FUNCTIONS
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find(); //grab ALL the posts

    res.status(200).json(post); //show success in RETURNING smth (200)
  } catch (error) {
    res.status(404).json({ message: error.message }); //error in OBTAINING POST
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }); //grab user's posts

    res.status(200).json(post); //show success in RETURNING smth (200)
  } catch (error) {
    res.status(404).json({ message: error.message }); //error in OBTAINING POSTS
  }
};

// UPDATE POSTS
export const likePost = async (req, res) => {
  try {
    const { postId } = req.params; //remember req will be attached to the event pressed
    const { userId } = req.body;

    const post = await Post.findById(postId); //grabbing post info
                                              // Remember, const 'post' is now a snapshot of Post u fetched 
    const isLiked = post.likes.get(userId); //BOOLEAN: check if THIS user (who wants to like a post) exists already in THIS post's likelist

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate( //now update the actual Post with the const 'post' information
      postId, //provide the Id
      { likes: post.likes },
      { new: true } 
    );

    res.status(200).json(updatedPost); //update the FrontEnd!
  } catch (error) {
    res.status(404).json({ message: error.message }); //error in EDITING POSTS (general error)
  }
};
