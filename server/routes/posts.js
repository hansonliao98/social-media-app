import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts); //grabs userfeed when user is on homepage. normally, Homepage will curate all posts in real world.
router.get("/:userId/posts", verifyToken, getUserPosts); //if u visit user's profile, this will only show his posts


// UPDATE
router.patch("/:id/like", verifyToken, likePost) //for liking OR unliking post

export default router;

