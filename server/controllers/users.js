import User from "../models/user.js";

// READ USER
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// READ AND GRAB USER'S FRIENDS
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // make array of all friends' IDs
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    // MODIFY SCHEMA BEFORE SENDING DATA TO FRONTEND
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id); //grabbing current id
    const friend = await User.findById(friendId); //grab friend information

    // First try removing friend
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      // Removing friend from user's friend list
      //IF the id is NOT the same as friendId, THEN it will be filtered AND included in new array
      friend.friends = friend.friends.filter((id) => id !== id);
      // Removing user from friends list

      // if not, add friend to list
    } else {
      user.friends.push(friendId); //push = appends new elements to end of array
      friend.friends.push(id);
    }

    // wait for this to save completely
    await user.save();
    await friend.save();

    // make array of all friends' IDs
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // MODIFY SCHEMA BEFORE SENDING DATA TO FRONTEND
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
