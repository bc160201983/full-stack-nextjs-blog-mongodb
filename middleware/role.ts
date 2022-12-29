import { label, Middleware } from "next-api-middleware";
import jwt from "jsonwebtoken";
import Post from "../database/Models/post/create";

const verifyTokenAndUser: Middleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Not Authenticated" });

  jwt.verify(token, "jwtkey", async (error, userInfo) => {
    if (error)
      return res
        .status(403)
        .json({ success: false, message: "Token is not Valid!" });

    const post = await Post.findById({ _id: req.query.id });

    // console.log(post.uid, userInfo.id);

    if (post.uid === userInfo.id) {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "You are not authorized!" });
    }

    // const postId = req.query.id;
    // await Post.findByIdAndDelete({ _id: postId });
  });
};

const withMiddleware = label({ verifyTokenAndUser });

export default withMiddleware;
