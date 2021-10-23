import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    // res.send("THIS WORKS!")
    const {page} = req.query

    try {
        const LIMIT =  8
        const startIndex = (Number(page) -1)*LIMIT
        const total = await PostMessage.countDocuments({})
        const postMessages = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)
        console.log(postMessages)
        res.status(200).json({data: postMessages, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)})
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

export const getPostBySearch = async (req, res) => {
    // res.send("THIS WORKS!")
    const {searchQuery, tags} = req.query
    try {
        const title = new RegExp(searchQuery, "i")

        const posts = await PostMessage.find({ $or: [ {title}, { tags: { $in: tags.split(",") } } ] })

        res.json({data: posts})
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    // res.send("Post Created!")
    const post = req.body

    const newPost = new PostMessage({...post, creator: req.user.id, createdAt: new Date().toISOString()})

    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch(error) {
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async (req, res) => {
    // res.send("Post Created!")
    const {id: _id} = req.params
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {_id, ...post}, {new: true})

    res.json(updatedPost)

}

export const deletePost = async (req, res) => {
    // res.send("Post Created!")
    const {id: _id} = req.params

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")

    await PostMessage.findByIdAndDelete(_id)

    res.json({message: "Post deleted successfuly!"})

}

export const likePost = async (req, res) => {
    // res.send("Post Created!")
    const {id: _id} = req.params

    console.log(req.user, "%%%%%%%%%%%%%%%%%")
    if((!req.user.id)) return res.json({message: "Unauthorised"})

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")

    const post = await PostMessage.findById(_id)

    const index = post.likes.findIndex((id) => id === String(req.user.id))

    if(index === -1) {
        post.likes.push(req.user.id)
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.user.id))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})

    res.json(updatedPost)

}