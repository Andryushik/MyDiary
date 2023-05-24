import express from "express";
import cors from "cors";

import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import searchRouter from "./routes/search.js";
import fileUpload from "express-fileupload";

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Tell express to use the fileUpload middleware
app.use(fileUpload({ useTempFiles: true }));

// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/search", searchRouter);

export default app;
