import { Schema, model } from "mongoose";
import { IUser } from "../types";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUser>({
  avatar: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  username: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  links: [{
    is_active: {type: String},
    title: {type: String},
    url: {type: String}
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

export default model("User", UserSchema);