import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // name: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  // comments: { type: [String], default: [] },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
