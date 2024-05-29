import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  clerkId?: string;
  class?: string;
  photo?: string;
  parent?: string;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  class: { type: Schema.Types.ObjectId, ref: "Class" },
  role: { type: String, required: true },
  parent: { type: String },
});

const User = models.User || model("User", UserSchema);

export default User;
