import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  clerkId?: string;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  userType: {
    type: Schema.Types.ObjectId,
    ref: "UserType",
    required: true,
    default: new mongoose.Types.ObjectId("6626ffe2ca9888dab9ebdd31"),
  },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
});

const User = models.User || model("User", UserSchema);

export default User;
