import { Document, Schema, model, models } from "mongoose";

export interface ITrial extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    trialDate: Date;
    createdAt: Date;
}

const TrialSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    trialDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Trial = models.Trial || model("Trial", TrialSchema);

export default Trial;