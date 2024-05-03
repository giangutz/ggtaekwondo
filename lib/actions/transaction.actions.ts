"use server";

import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import Transaction from "@/lib/database/models/transactions.model";
import { revalidatePath } from "next/cache";
import { CreateTransactionParams, UpdateTransactionParams } from "@/types";

// CREATE a new transaction record
export async function createTransaction(
  transactionData: CreateTransactionParams
) {
  try {
    await connectToDatabase();
    const newTransaction = await Transaction.create(transactionData);
    revalidatePath("/transactions");
    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}

// GET all transactions
export async function getAllTransactions() {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find();
    if (!transactions) return console.error("No transactions found");
    return JSON.parse(JSON.stringify(transactions));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteTransaction(id: string) {
  try {
    await connectToDatabase();
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    revalidatePath("/transactions");
    return JSON.parse(JSON.stringify(deletedTransaction));
  } catch (error) {
    handleError(error);
  }
}

export async function updateTransaction(
  transactionData: UpdateTransactionParams
) {
  try {
    await connectToDatabase();
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionData._id,
      transactionData,
      { new: true }
    );
    revalidatePath("/admin/dashboard");
    return JSON.parse(JSON.stringify(updatedTransaction));
  } catch (error) {
    handleError(error);
  }
}
