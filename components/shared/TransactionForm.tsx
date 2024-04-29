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

const formSchema = z.object({
  classId: z.string().optional(),
  studentId: z.string().optional(),
  packageId: z.string().optional(),
  attendanceId: z.string().optional(),
  expenseCategory: z.string().optional(),
  incomeSource: z.string().optional(),
  remarks: z.string().optional(),
  amount: z.union([z.number(), z.string()]),
  transactionDate: z.date(),
  paidIn: z.string(),
  transactionType: z.string(),
});

type transactionsProps = {
  transaction?: ITransaction;
};

const TransactionForm = ({ transaction }: transactionsProps) => {
  const initialValues = transaction
    ? {
        ...transaction,
        transactionDate: new Date(transaction.transactionDate),
      }
    : transactionDefaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const selectedClassId = form.watch("classId");
  const selectedTransactionType = form.watch("transactionType");

  useEffect(() => {
    if (transaction) {
      form.reset({
        ...transaction,
        transactionDate: new Date(transaction.transactionDate),
      });
    }
  }, [transaction, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* amount field */}
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
                </>
              )}
            </>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
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
