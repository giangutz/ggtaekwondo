"use server";

import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Class from "../database/models/class.model";

export const getAllClass = async () => {
  try {
    await connectToDatabase();

    const classes = await Class.find();

    return JSON.parse(JSON.stringify(classes));
  } catch (error) {
    handleError(error);
  }
};