import User from "../models/Donor.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { fullname, email,mobile,gender,bloodGroup , city, aadharNumber , password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email }, { aadharNumber }] });
    if (user) {
      return res.status(400).json({ error: "Donor already registered" });
    }
   const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      fullname, email,mobile,gender,bloodGroup , city, aadharNumber ,password:hashPassword
    });
    await newUser.save();
    if (newUser) {
      res.status(201).json({
        message: "Registration successful",
        user: {
          id: newUser.id,
          fullname: newUser.fullname,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Log In API

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
      const isMatch = await bcrypt.compare(password, user.password);
    if (!user) {
      return res.status(400).json({ error: "Donor not found" });
    }
    else if(!isMatch){
      return res.status(400).json({ error: "Invalid user password" });
    }
   
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      },

    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User not registered" });
  }
};

// Logout API
export const logout = async (req, res) => {
  try {
    res.status(201).json({ message: "User log out successfully.." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User not log out.. " });
  }
};