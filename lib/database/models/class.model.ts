import { Document, Schema, model, models } from "mongoose";

export interface IClass extends Document {
  _id: string;
  name: string;
}

const ClassSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Class = models.Class || model("Class", ClassSchema);

export default Class;
