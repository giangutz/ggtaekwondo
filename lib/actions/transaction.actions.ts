"use server";

import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import Transaction from "@/lib/database/models/transactions.model";
import { revalidatePath } from "next/cache";
import {
  CreateTransactionParams,
  GetAllTransactionsParams,
  GetTransactionByDateParams,
  GetTransactionByStudentParams,
  UpdateTransactionParams,
} from "@/types";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

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

export async function getTransactionByMonth({
  monthSelected,
}: GetTransactionByDateParams) {
  try {
    await connectToDatabase();

    const startDate = startOfMonth(monthSelected);
    const endDate = endOfMonth(monthSelected);

    const conditions = {
      transactionDate: {
        $gte: startDate,
        $lt: endDate,
      },
    };

    const transactionRecords = await Transaction.find(conditions);

    // Total revenue based on the selected month
    const totalRevenue = transactionRecords
      .filter((record) => record.transactionType === "Income")
      .reduce((total, record) => total + record.amount, 0);

    // Total expenses for the selected month
    const totalExpenses = transactionRecords
      .filter((record) => record.transactionType === "Expense")
      .reduce((total, record) => total + record.amount, 0);

    // Percentage of revenue based on the previous month's revenue
    const previousMonthStartDate = startOfMonth(subMonths(monthSelected, 1));
    const previousMonthEndDate = endOfMonth(subMonths(monthSelected, 1));

    const previousMonthConditions = {
      transactionDate: {
        $gte: previousMonthStartDate,
        $lt: previousMonthEndDate,
      },
      transactionType: "Income",
    };

    const previousMonthIncomeRecords = await Transaction.find(
      previousMonthConditions
    );
    const previousMonthTotalRevenue = previousMonthIncomeRecords.reduce(
      (total, record) => total + record.amount,
      0
    );

    const revenuePercentage =
      ((totalRevenue - previousMonthTotalRevenue) / previousMonthTotalRevenue) *
      100;

    // Percentage of all income from the selected month and separate on different categories
    const incomeByCategory: { [category: string]: number } = transactionRecords
      .filter((record) => record.transactionType === "Income")
      .reduce((totals, record) => {
        totals[record.incomeSource] =
          (totals[record.incomeSource] || 0) + record.amount;
        return totals;
      }, {});

    const incomePercentageByCategory = Object.fromEntries(
      Object.entries(incomeByCategory).map(([category, amount]) => [
        category,
        amount
      ])
    );

    return {
      totalRevenue,
      revenuePercentage,
      totalExpenses,
      incomePercentageByCategory,
      transactionRecords: JSON.parse(JSON.stringify(transactionRecords)),
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
