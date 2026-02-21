const express = require("express");
const multer = require("multer");
const postController = require("../controllers/post.controller");
const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const IdentifyUser=require("../middleware/auth.middleware")

postRouter.post("/", upload.single("chacha"), IdentifyUser,postController.createPostController);
postRouter.get("/", IdentifyUser,postController.getPostController);
postRouter.get("/details/:postId",IdentifyUser, postController.getPostDetailsController);

module.exports = postRouter;
