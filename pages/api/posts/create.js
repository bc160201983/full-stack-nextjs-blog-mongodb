import connectdb from "../../../database/connect";
import Post from "../../../database/Models/post/create";

const create = async (req, res) => {
  try {
    await connectdb();
    console.log("Database Connected");

    const post = new Post(req.body);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
};

export default create;
