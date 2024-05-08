"use client";
import { ITransaction } from "@/lib/database/models/transactions.model";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import UserDropdown from "@/components/shared/UserDropdown";
import { transactionDefaultValues } from "@/constants";
import ClassDropdown from "./ClassDropdown";
import PackageDropdown from "./PackageDropdown";
import IncomeSourceDropdown from "./IncomeSourceDropdown";
import { Input } from "../ui/input";
import TransactionTypeDropdown from "./TransactionTypeDropdown";
import { Textarea } from "../ui/textarea";
import ExpenseDropdown from "./ExpenseDropdown";
import ModDropdown from "./ModDropdown";
import {
  createTransaction,
  updateTransaction,
} from "@/lib/actions/transaction.actions";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  classId: z.string().optional(),
  studentId: z.string().optional(),
  packageId: z.string().optional(),
  attendanceId: z.string().optional(),
  expenseCategory: z.string().optional(),
  incomeSource: z.string().optional(),
  remarks: z.string().optional(),
  amount: z.string().refine((value) => !isNaN(Number(value)), {
    message: "Amount must be a number",
    path: ["amount"],
  }),
  transactionDate: z.date(),
  paidIn: z.string(),
  transactionType: z.string(),
});

type transactionsProps = {
  transaction?: ITransaction;
  createdBy?: string;
};

const TransactionForm = ({ transaction, createdBy }: transactionsProps) => {
  const { toast } = useToast();
  const initialValues = transaction
    ? {
        ...transaction,
        transactionDate: new Date(transaction.transactionDate),
        amount: transaction.amount.toString(),
      }
    : transactionDefaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const selectedClassId = form.watch("classId");
  const selectedTransactionType = form.watch("transactionType");

  useEffect(() => {
    // reset the form when the transaction type changes
    form.reset({
      ...transactionDefaultValues,
      transactionType: selectedTransactionType,
    });
  }, [selectedTransactionType, form]);

  useEffect(() => {
    form.setValue("studentId", "");
  }, [selectedClassId, form]);

  useEffect(() => {
    if (transaction) {
      form.reset({
        ...transaction,
        transactionDate: new Date(transaction.transactionDate),
        amount: transaction.amount.toString(),
      });
    }
  }, [transaction, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const amount = Number(values.amount);

    // Only include `studentId` and `incomeSource` if they are not empty
    if (values.studentId === "") {
      delete values.studentId;
    }
    if (values.incomeSource === "") {
      delete values.incomeSource;
    }

    // Only include `packageId`, `attendanceId`, and `expenseCategory` if they are not empty
    if (values.packageId === "") {
      delete values.packageId;
    }
    if (values.attendanceId === "") {
      delete values.attendanceId;
    }
    if (values.expenseCategory === "") {
      delete values.expenseCategory;
    }

    if (transaction) {
      try {
        const updatedTransaction = {
          _id: transaction._id,
          updatedTransactionData: {
            ...values,
            amount: amount,
            createdBy: createdBy,
          },
        };
        const updatedTransac = await updateTransaction(updatedTransaction);
        if (updatedTransac) {
          toast({
            title: "Transaction updated successfully",
            description: "The transaction has been updated successfully",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Transaction updated successfully",
          description: "The transaction has been updated successfully",
        });
      }
    } else {
      try {
        const transactionData = await createTransaction({
          ...values,
          amount: amount,
          createdBy: createdBy,
        });
        if (transactionData) {
          form.reset();
          toast({
            title: "Transaction created successfully",
            description: "The transaction has been created successfully",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  console.log(transaction);
  console.log(selectedClassId);
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => (
              <FormItem className="w-full mt-4">
                <FormControl>
                  <TransactionTypeDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {selectedTransactionType === "Income" && (
            <>
              <FormField
                control={form.control}
                name="incomeSource"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <IncomeSourceDropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {transaction ? (
                <>
                  <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <UserDropdown
                            onChangeHandler={field.onChange}
                            value={
                              transaction ? transaction.studentId : field.value
                            }
                            classId={selectedClassId} // Pass the selected class ID to the UserDropdown
                            transac={transaction}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            placeholder="Amount"
                            className="input-field"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col items-center sm:flex-row">
                    <FormField
                      control={form.control}
                      name="paidIn"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <ModDropdown
                              onChangeHandler={field.onChange}
                              value={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transactionDate"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                              <Image
                                src="/assets/icons/calendar.svg"
                                alt="calendar"
                                width={24}
                                height={24}
                                className="filter-grey"
                              />
                              <p className="ml-3 whitespace-nowrap text-grey-600">
                                Transaction Date:
                              </p>
                              <DatePicker
                                selected={field.value}
                                onChange={(date: Date) => field.onChange(date)}
                                // showTimeSelect
                                // timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy"
                                wrapperClassName="datePicker"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="remarks"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Textarea
                            placeholder="Remarks"
                            {...field}
                            className="textarea rounded-2xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="classId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <ClassDropdown
                            onChangeHandler={field.onChange}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {selectedClassId && (
                    <>
                      <FormField
                        control={form.control}
                        name="studentId"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <UserDropdown
                                onChangeHandler={field.onChange}
                                value={field.value}
                                classId={selectedClassId} // Pass the selected class ID to the UserDropdown
                                transac={transaction}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                placeholder="Amount"
                                className="input-field"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-col items-center sm:flex-row">
                        <FormField
                          control={form.control}
                          name="paidIn"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <ModDropdown
                                  onChangeHandler={field.onChange}
                                  value={field.value}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="transactionDate"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                  <Image
                                    src="/assets/icons/calendar.svg"
                                    alt="calendar"
                                    width={24}
                                    height={24}
                                    className="filter-grey"
                                  />
                                  <p className="ml-3 whitespace-nowrap text-grey-600">
                                    Transaction Date:
                                  </p>
                                  <DatePicker
                                    selected={field.value}
                                    onChange={(date: Date) =>
                                      field.onChange(date)
                                    }
                                    // showTimeSelect
                                    // timeInputLabel="Time:"
                                    dateFormat="MM/dd/yyyy"
                                    wrapperClassName="datePicker"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="remarks"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Textarea
                                placeholder="Remarks"
                                {...field}
                                className="textarea rounded-2xl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}

          {selectedTransactionType === "Expense" && (
            <>
              <FormField
                control={form.control}
                name="expenseCategory"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <ExpenseDropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="Amount"
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-center sm:flex-row">
                <FormField
                  control={form.control}
                  name="paidIn"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <ModDropdown
                          onChangeHandler={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transactionDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                          <Image
                            src="/assets/icons/calendar.svg"
                            alt="calendar"
                            width={24}
                            height={24}
                            className="filter-grey"
                          />
                          <p className="ml-3 whitespace-nowrap text-grey-600">
                            Transaction Date:
                          </p>
                          <DatePicker
                            selected={field.value}
                            onChange={(date: Date) => field.onChange(date)}
                            // showTimeSelect
                            // timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy"
                            wrapperClassName="datePicker"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* remarks form field */}
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        placeholder="Remarks"
                        {...field}
                        className="textarea rounded-2xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={
              form.getValues("transactionType") === "" ||
              (form.getValues("transactionType") === "Income" &&
                (!form.getValues("incomeSource") ||
                  !form.getValues("classId") ||
                  !form.getValues("studentId") ||
                  !form.getValues("amount") ||
                  !form.getValues("transactionDate"))) ||
              (form.getValues("transactionType") === "Expense" &&
                (!form.getValues("expenseCategory") ||
                  !form.getValues("amount") ||
                  !form.getValues("transactionDate"))) ||
              form.formState.isSubmitting
            }
            className="button w-full"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default TransactionForm;
