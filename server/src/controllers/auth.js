import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import { hashPassword } from "../util/password.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export const signupUser = async (req, res) => {
  const { email, password, firstName, lastName, birthday, country, bio } =
    req.body;
  const user = {
    email,
    password,
    firstName,
    lastName,
    birthday,
    country,
    bio,
  };
  if (typeof user !== "object") {
    res.status(400).json({
      success: false,
      msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
        user
      )}`,
    });
    return;
  }
  const errorList = validateUser(user);
  if (errorList.length > 0) {
    res.status(400).json({ success: false, msg: errorList });
  }

  const exists = await User.findOne({ email: user.email });

  if (exists) {
    res.status(409).json({ success: false, msg: "Email already in use" });
    return;
  }

  try {
    user.password = await hashPassword(user.password);
    const newUser = await User.create(user);
    // create token
    const token = createToken(newUser._id);
    const result = { email: user.email, id: newUser._id, token };
    res.status(201).json({ success: true, result: result });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: `Unable to create user, try again later. Error: ${error}`,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // create token
    const token = createToken(user._id);

    const result = { email, id: user._id, token };
    res.status(200).json({ success: true, result: result });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "Unable login: " + error,
    });
  }
};

// Authorization checks
export const authCheckId = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error("Authorization header not found");
  }
  const token = authorization.split(" ")[1];

  try {
    //Check if token expired
    const decodedToken = jwt.decode(token);
    if (decodedToken.exp < Date.now() / 1000) {
      return res.status(401).json({
        success: false,
        msg: "Token is expired",
      });
    }
    // Access the user ID from the decoded payload and check if the token is expired
    const { _id } = jwt.verify(token, process.env.SECRET);
    return _id;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        msg: "Token is expired",
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        msg: "Invalid Token",
      });
    } else {
      return res.status(401).json({
        success: false,
        msg: "Unexpected error while verifying Token. ",
      });
    }
  }
};
