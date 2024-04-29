import { Document, Schema, model, models } from "mongoose";
import { ExpenseCategory, IncomeSource, TransactionType, paidInList } from "@/constants";

export interface ITransaction extends Document {
  _id: string;
  studentId: string;
  packageId: string;
  attendanceId: string;
  amount: number;
  remarks: string;
  transactionDate: Date;
  transactionType: string;
  incomeSource?: string;
  expenseCategory?: string;
  paidIn: string;
}

const TransactionSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "User" },
  packageId: { type: Schema.Types.ObjectId, ref: "Package" },
  attendanceId: { type: Schema.Types.ObjectId, ref: "Attendance" },
  remarks: { type: String },
  amount: { type: Number, required: true },
  transactionDate: { type: Date, required: true },
  transactionType: { type: String, enum: TransactionType, required: true },
  incomeSource: { type: String, enum: IncomeSource },
  expenseCategory: { type: String, enum: ExpenseCategory },
  paidIn: { type: String, required: true, enum: paidInList },
});

const Transaction = models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;