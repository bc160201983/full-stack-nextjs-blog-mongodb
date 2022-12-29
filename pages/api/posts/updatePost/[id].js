import connectdb from "../../../../database/connect";
import Post from "../../../../database/Models/post/create";
import withMiddleware from "../../../../middleware/role";

const updatePost = async (req, res) => {
  await connectdb();

  const {
    method,
    query: { postId },
  } = req;

  if (method != "PUT") {
    return res
      .status(500)
      .json({ success: false, message: "only PUT method allowed" });
  }
  console.log(req.body);

  try {
    await Post.findByIdAndUpdate({ _id: req.query.id }, req.body);
    res.status(200).json({ success: true, data: "Post has been Updated" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "can not found post",
    });
  }
};

export default withMiddleware("verifyTokenAndUser")(updatePost);
