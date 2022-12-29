import { Aggregate, ObjectId } from "mongoose";
import mongoose from "mongoose";
import withMiddleware from "../../../../middleware/role";
import jwt from "jsonwebtoken";
import connectdb from "../../../../database/connect";
import Post from "../../../../database/Models/post/create";
import User from "../../../../database/Models/User";

const deletePost = async (req, res) => {
  await connectdb();

  const {
    method,
    query: { postId },
  } = req;

  if (method != "DELETE") {
    return res
      .status(500)
      .json({ success: false, message: "only DELETE method allowed" });
  }

  try {
    await Post.findByIdAndDelete({ _id: req.query.id });
    res.status(200).json({ success: true, data: "Post has been deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "can not found post",
    });
  }
};

export default withMiddleware("verifyTokenAndUser")(deletePost);
