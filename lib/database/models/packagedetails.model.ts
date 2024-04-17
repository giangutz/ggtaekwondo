import { Document, Schema, model, models } from "mongoose";

export interface IPackageDetails extends Document {
  _id: string;
  name: string;
  price: number;
}

const PackageDetailsSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const PackageDetails =
  models.PackageDetails || model("PackageDetails", PackageDetailsSchema);

export default PackageDetails;