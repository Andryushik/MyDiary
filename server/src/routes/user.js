import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  updateUser,
  updateUserPassword,
  uploadProfilePicture,
  getUserFriends,
} from "../controllers/user.js";
import { loginUser, signupUser } from "../controllers/auth.js";
import requireAuth from "../middleware/requireAuth.js";

const userRouter = express.Router();

// These routes will not gonna use requireAuth
// These are in Auth controller not user.
userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);

// require authorization for all the protected routes
userRouter.use(requireAuth);

userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.put("/password/:id", updateUserPassword);
userRouter.post("/upload/:id", uploadProfilePicture);
userRouter.delete("/:id", deleteUser);

userRouter.put("/:id/follow", followUser);
userRouter.get("/friends/:userId", getUserFriends);

export default userRouter;
