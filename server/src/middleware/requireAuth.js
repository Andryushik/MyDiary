import jwt from "jsonwebtoken";
import User from "../models/User.js";

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  //Check if token expired
  const decodedToken = jwt.decode(token);
  if (decodedToken.exp < Date.now() / 1000) {
    return res.status(401).json({
      success: false,
      msg: "Token is expired",
    });
  }

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: "Request is not authorized",
    });
  }
};

export default requireAuth;
