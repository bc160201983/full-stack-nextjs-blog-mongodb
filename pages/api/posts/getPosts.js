import connectdb from "../../../database/connect";
import Post from "../../../database/Models/post/create";

const getPosts = async (req, res) => {
  await connectdb();
  const { method, query } = req;
  if (method != "GET") {
    return res
      .status(500)
      .json({ success: false, message: "only GET method allowed" });
  }

  try {
    const posts = query.cat
      ? await Post.find({ cat: query.cat }).sort({ createdAt: -1 })
      : await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export default getPosts;
