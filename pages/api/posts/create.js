import connectdb from "../../../database/connect";
import Post from "../../../database/Models/post/create";

const create = async (req, res) => {
  await connectdb();
  const { method } = req;
  if (method != "POST") {
    return res
      .status(500)
      .json({ success: false, message: "only POST method allowed" });
  }
  try {
    const post = new Post(req.body);
    await post.save();

    res.status(200).json({ success: true, message: "Post has been created" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export default create;
