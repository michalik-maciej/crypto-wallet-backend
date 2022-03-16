import express from "express";
import User from "../models/user.model";

export const ping = (_req: express.Request, res: express.Response) => {
  res.json({ message: "ping" });
};

export const add = async (req: express.Request, res: express.Response) => {
  try {
    const isUser = await User.find({ email: req.body.email });
    if (isUser.length) return res.status(409).json("User already exists");
    const newUser = await new User({ ...req.body, coins: [] });
    await newUser.save();
    return res.json({ message: "User account created" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.find({ email });
    if (!isUser || !isUser.length) res.status(404).json("User not found");
    else {
      const auth = await User.findOne({ email }, { _id: 1, password: 1 });
      if (auth?.password !== password) {
        res.status(401).json("Incorrect password");
      } else
        res.json({
          message: "Logged in successfully",
          userId: auth._id,
          admin: email === "halniak24@gmail.com",
        });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
