import connectdb from "../../../database/connect";
import { setCookie } from "cookies-next";

import role from "../../../middleware/role";
import User from "../../../database/Models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  await connectdb();
  const { method } = req;
  if (method != "POST") {
    return res
      .status(500)
      .json({ success: false, message: "only post method allowed" });
  }

  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Wrong password or username" });

    const token = jwt.sign({ id: user._id }, "jwtkey");
    setCookie("access_token", token, { req, res });

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "no request",
    });
  }
};

export default login;
