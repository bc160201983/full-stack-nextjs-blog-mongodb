import { models, model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    img: String,
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
