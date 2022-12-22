import connectdb from "../../../database/connect";
import role from "../../../middleware/role";
import User from "../../../database/Models/User";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  await connectdb();
  const { method } = req;
  if (method != "POST") {
    return res
      .status(500)
      .json({ success: false, message: "only post method allowed" });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await user.save();
    res.status(200).json({ success: true, message: "User has been created" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${
        error.keyValue.email === req.body.email
          ? `email already exist "${error.keyValue.email}"`
          : `username already exist "${error.keyValue.username}"`
      }`,
    });
  }
};

export default register;
