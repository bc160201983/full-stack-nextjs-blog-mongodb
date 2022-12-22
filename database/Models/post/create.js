import { Schema, model, models } from "mongoose";

const createPostSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  uid: { type: String, required: true },
});

const Post = models.Post || model("Post", createPostSchema);

export default Post;
