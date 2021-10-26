import express from "express"
import { getPosts, createPost, updatePost, deletePost, likePost, getPostBySearch, getPost, commentPost, getPostsByCreator, commentDelete } from "../controllers/post.js"
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
router.delete("/:id/comment/:commentId", auth, commentDelete)

export default router