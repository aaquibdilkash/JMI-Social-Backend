import express from "express"
import { getPosts, createPost, updatePost, deletePost, likePost, getPostBySearch, getPost, commentPost, getPostsByCreator } from "../controllers/post.js"
import auth from "../middleware/auth.js"
const router = express.Router()

router.get("/search", getPostBySearch)
router.get('/creator', getPostsByCreator);
router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", auth, createPost)
router.patch("/:id", auth, updatePost)
router.delete("/:id", auth, deletePost)
router.patch("/:id/likePost", auth, likePost)
router.post("/:id/commentPost", auth, commentPost)

export default router