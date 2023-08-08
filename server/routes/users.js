import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE READ ROUTES = just ways to grab information. not changing, adding, or editng info in database

router.get("/:id", verifyToken, getUser); //'user/:id' = basically a useParams to gather info from link
router.get("/:id/friends", verifyToken, getUserFriends); //

// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
