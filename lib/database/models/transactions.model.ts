import { Document, Schema, model, models } from "mongoose";
import { ExpenseCategory, IncomeSource, TransactionType } from "@/constants";

export interface ITransaction extends Document {
  _id: string;
  studentId: string;
  packageId: string;
  amount: number;
  transactionDate: Date;
  transactionType: typeof TransactionType;
  incomeSource?: typeof IncomeSource;
  expenseCategory?: typeof ExpenseCategory;
}

const TransactionSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  packageId: { type: Schema.Types.ObjectId, ref: "Package" },
  attendanceId: { type: Schema.Types.ObjectId, ref: "Attendance" },
  remarks: { type: String },
  amount: { type: Number, required: true },
  transactionDate: { type: Date, required: true },
  transactionType: { type: String, enum: TransactionType, required: true },
  incomeSource: { type: String, enum: IncomeSource },
  expenseCategory: { type: String, enum: ExpenseCategory },
});

const Transaction = models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;