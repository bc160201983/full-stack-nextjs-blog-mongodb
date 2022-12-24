import connectdb from "../../../database/connect";

const getPosts = async (req, res) => {
  await connectdb();
  const { method } = req;
  if (method != "POST") {
    return res
      .status(500)
      .json({ success: false, message: "only post method allowed" });
  }

  try {
    res.status(200).json({ success: true, message: "User has been created" });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

export default getPosts;
