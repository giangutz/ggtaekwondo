"use server";

import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { revalidatePath } from "next/cache";
import Trial from "../database/models/trial.model";
import { CreateTrialParams } from "@/types";

export async function createTrial(trialData: CreateTrialParams) {
  try {
    await connectToDatabase();

    const trial = await Trial.create(trialData);

    if (trial) revalidatePath("/admin/trial");

    return JSON.parse(JSON.stringify(trial));
  } catch (error) {
    handleError(error);
  }
}