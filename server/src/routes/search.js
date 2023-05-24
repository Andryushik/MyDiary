import express from "express";
import {
  searchTags,
  mostPopularTags,
  searchUsers,
} from "../controllers/search.js";

const searchRouter = express.Router();
import requireAuth from "../middleware/requireAuth.js";
// require authorization for all the protected routes
searchRouter.use(requireAuth);

searchRouter.get("/tags", searchTags);
searchRouter.get("/tags/:most", mostPopularTags);
searchRouter.get("/users", searchUsers);

export default searchRouter;
