import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import admin from "firebase-admin";
import serviceAccount from "../config/firebase-key.json" assert { type: "json" };

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-950fc.firebaseio.com",
};



admin.initializeApp(firebaseConfig);
export const authCheck = async (req, res, next) => {
  try {
    console.log("Authorization Token:", req.headers.authtoken); // Check if this prints the token
    const firebaseUser = await adminApp.auth().verifyIdToken(req.headers.authtoken);
    console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const requireSignin = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json(err);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
