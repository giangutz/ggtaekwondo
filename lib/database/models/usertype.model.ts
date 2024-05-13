import { Schema, model, models } from "mongoose";

export interface IUserType extends Document {
  _id: string;
  name: string;
}

const UserTypeSchema = new Schema({
  name: { type: String, required: true },
});

const UserType = models.UserType || model("UserType", UserTypeSchema);

export default UserType;

// async function createDefaultUserTypes() {
//   const userTypes = ["Student", "Parent", "Admin"];

//   for (const name of userTypes) {
//     let userType = await UserType.findOne({ name });

//     if (!userType) {
//       userType = new UserType({ name });
//       await userType.save();
//     }
//   }
// }

// createDefaultUserTypes().catch(console.error);
