import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, minLength: 3, maxLength: 10000 },
    image: { type: String, default: "" },
    isPrivate: { type: Boolean, default: true },
    isBanned: { type: Boolean, default: false },
    isReported: { type: Boolean, default: false },
    tags: { type: Array, default: [] },
    likes: { type: Array, default: [] },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", postSchema);

export const validatePost = (postObject) => {
  const errorList = [];
  const allowedKeys = [
    "content",
    "image",
    "isPrivate",
    "isBanned",
    "tags",
    "likes",
    "userId",
  ];

  const validatedKeysMessage = validateAllowedFields(postObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }
  if (postObject.content == null) {
    errorList.push("content is a required field");
  }
  if (postObject.userId == null) {
    errorList.push("userId is a required field");
  }

  return errorList;
};

export default Post;
