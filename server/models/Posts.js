import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map, //Map is how mongoDB saves these
      //MAP is much more efficient than array
      //we simply dont need to search through array wen unliking
      of: Boolean, // check if user ID exists in this Map.
      // IF you like the post, THEN it adds a Map
      // IF you unlike the post, THEN it removes a Map
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timeStampes: true }
);

const Post = mongoose.model("POST", postSchema);

export default Post;
