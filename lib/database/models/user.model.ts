import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
//   userType: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  photo: { type: String, required: true },
});

const User = models.User || model("User", UserSchema);

export default User;
