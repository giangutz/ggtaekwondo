"use server";

import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Class from "../database/models/class.model";

export async function getAllClass() {
  try {
    await connectToDatabase();

    const classes = await Class.find();

    return JSON.parse(JSON.stringify(classes));
  } catch (error) {
    handleError(error);
  }
};

export async function getClassById(id: string) {
  try {
    await connectToDatabase();

    const userClass = await Class.findById(id);

    return JSON.parse(JSON.stringify(userClass));
  } catch (error) {
    handleError(error);
  }
};