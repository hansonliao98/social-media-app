import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// REGISTER USER

export const register = async (req, res) => {
  try {
    const {
      firstName,
      LastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt(); //this is encryption: Generate random salt to encrypt password
    const passwordHash = await bcrypt.hash(password, salt); //hash password with salt

    const newUser = new User({
      // encrypt password, and save it.
      // later wen they sign in, a JSON webtoken will be given to them
      firstName,
      LastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save(); //send back correct front end user
    res.status(201).json(savedUser); //send user a 201, meaning smth has been created
  } catch (error) {
    const message = error.message;
    res.status(500).json({ message });
  }
};

// LOGGIN IN
export const login = async (res, req) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }); //we use mongoose here to find which one has the specified email
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password); //compare the password just sent vs the user password that was saved from before. Theyre gonna use the same salt, to see if theyre the same hash. Boolean
    if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password; //so password doesnt get sent back to the frontend
    res.status(200).json({ error: error.message })

  } catch (error) {
    const message = error.message;
    res.status(500).json({ message });
  }
};

// UPDATE 8/1/2023 = LEFT OFF IN VIDEO AT 34:20 https://www.youtube.com/watch?v=K8YELRmUb5o&ab_channel=EdRoh
