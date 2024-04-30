"use server";

import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import Transaction from "@/lib/database/models/transactions.model";
import { revalidatePath } from "next/cache";
import { CreateTransactionParams, UpdateTransactionParams } from "@/types";

// CREATE a new transaction record
export async function createTransaction(transactionData: CreateTransactionParams) {
  try {
    await connectToDatabase();
    const newTransaction = await Transaction.create(transactionData);
    revalidatePath("/transactions");
    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}   