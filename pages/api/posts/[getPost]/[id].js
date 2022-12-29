import { Aggregate, ObjectId } from "mongoose";
import mongoose from "mongoose";
import connectdb from "../../../../database/connect";
import Post from "../../../../database/Models/post/create";
import User from "../../../../database/Models/User";

const getPost = async (req, res) => {
  const db = await connectdb();

  const {
    method,
    query: { id },
  } = req;

  if (method != "GET") {
    return res
      .status(500)
      .json({ success: false, message: "only GET method allowed" });
  }

  try {
    let finalData = {};
    const post = await Post.findById({ _id: id });
    const user = await User.findById({ _id: post.uid });
    const { username, userImg, ...others } = user;
    finalData = { username, userImg, ...post._doc };
    // const post = await Post.aggregate([
    //   {
    //     $match: { _id: post_id },
    //   },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "uid",
    //       foreignField: "_id",
    //       as: "userInfo",
    //     },
    //   },
    // {
    //   $limit: 1,
    // },
    // {
    //   $unwind: "$userInfo",
    // },
    // ]);
    res.status(200).json({ success: true, finalData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "can not found post",
    });
  }
};

export default getPost;
