"use server";

import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import Transaction from "@/lib/database/models/transactions.model";
import { revalidatePath } from "next/cache";
import {
  CreateTransactionParams,
  GetAllTransactionsParams,
  GetTransactionByStudentParams,
  UpdateTransactionParams,
} from "@/types";

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
export async function getAllTransactions({
  query,
  limit = 6,
  page,
}: GetAllTransactionsParams) {
  try {
    await connectToDatabase();

    const conditions = query ? { transactionDate: new Date(query) } : {};

    const skipAmount = (Number(page) - 1) * limit;
    const transactionQuery = Transaction.find(conditions)
      .sort({ transactionDate: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const transactionRecords = await transactionQuery.exec();
    const transactionCount = await Transaction.countDocuments(conditions);

    if (!transactionRecords) {
      return handleError("No transaction records found");
    }

    return {
      data: JSON.parse(JSON.stringify(transactionRecords)),
      totalPages: Math.ceil(transactionCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getTransactionByStudent({
  studentId,
  query,
  limit = 6,
  page,
}: GetTransactionByStudentParams) {
  try {
    await connectToDatabase();

    const dateCondition = query ? { transactionDate: new Date(query) } : {};

    const conditions = {
      studentId: studentId,
      ...dateCondition,
    };

    const skipAmount = (Number(page) - 1) * limit;
    const transactionQuery = Transaction.find(conditions)
      .sort({ transactionDate: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const transactionRecords = await transactionQuery.exec();
    const transactionCount = await Transaction.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(transactionRecords)),
      totalPages: Math.ceil(transactionCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function deleteTransaction(id: string) {
  try {
    await connectToDatabase();
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    revalidatePath("/admin/dashboard");
    revalidatePath("/dashboard");
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
    revalidatePath("/dashboard");
    return JSON.parse(JSON.stringify(updatedTransaction));
  } catch (error) {
    handleError(error);
  }
}
