import mongoose from "mongoose";
import { comparePassword, hashPassword } from "../util/password.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, maxLength: 50, unique: true },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    firstName: { type: String, required: true, minLength: 2 },
    lastName: { type: String, required: true, minLength: 2 },
    profilePicture: { type: String, default: "" },
    birthday: { type: Date },
    country: { type: String },
    bio: { type: String },
    active: { type: Boolean, default: true },
    onlineStatus: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isModerator: { type: Boolean, default: false },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
  },
  { timestamps: true }
);

// static signup static method
userSchema.statics.signup = async function (user) {
  const errorList = validateUser(user);

  if (errorList.length > 0) {
    throw new Error(
      `You need to provide a 'user' object. Received: ${validationErrorMessage(
        errorList
      )}`
    );
  } else {
    // THIS CHECK DOESN't WORK added another one in auth
    const exists = await this.findOne({ email: user.email });

    if (exists) {
      throw new Error("Email already in use");
    }
    user.password = await hashPassword(user.password);
    const newUser = await this.create({ user });

    return newUser;
  }
};

// login static method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Invalid email");
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new Error("Invalid password");
  }

  return user;
};

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "email",
    "password",
    "firstName",
    "lastName",
    "profilePicture",
    "birthday",
    "country",
    "bio",
    "active",
    "onlineStatus",
    "isAdmin",
    "isModerator",
    "followers",
    "following",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }
  if (userObject.email == null) {
    errorList.push("email is a required field");
  }
  this;
  if (userObject.password == null) {
    errorList.push("password is a required field");
  }
  if (userObject.firstName == null) {
    errorList.push("first name is a required field");
  }
  if (userObject.lastName == null) {
    errorList.push("last name is a required field");
  }
  if (userObject.birthday == null) {
    errorList.push("birthday is a required field");
  }
  if (userObject.country == null) {
    errorList.push("country is a required field");
  }
  if (userObject.bio == null) {
    errorList.push("bio is a required field");
  }

  return errorList;
};

export default User;
