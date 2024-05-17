"use client";
import React, { useState, useEffect } from "react";
import { CircleChevronLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { SearchParamProps } from "@/types";
import { useRouter } from "next/navigation";
import Search from "@/components/shared/Search";
import { getAllUser } from "@/lib/actions/user.actions";
import Pagination from "@/components/shared/Pagination";
import { getAllTransactions } from "@/lib/actions/transaction.actions";
import CreateTransactions from "@/components/shared/CreateTransactions";
import DeleteTransaction from "@/components/shared/DeleteTransaction";

const Page = ({ searchParams }: SearchParamProps) => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState<{
    data: any;
    totalPages: number;
  }>({ data: [], totalPages: 0 });

  const transactionPage = Number(searchParams?.transactionPage) || 1;
  const searchText = (searchParams?.query as string) || "";

  useEffect(() => {
    const fetchData = async () => {
      const fetchUsers = await getAllUser();
      setUsers(fetchUsers);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTransactions = await getAllTransactions({
        query: searchText,
        page: transactionPage,
        limit: 15,
      });
      setTransactions(fetchedTransactions as { data: any; totalPages: number });
    };

    fetchData();
  }, [transactionPage, searchText]);
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center md:space-x-4">
        <div
          className="mr-2 h-8 w-8 cursor-pointer hover:bg-gray-200 rounded-full p-1 transition-colors duration-200 ease-in-out"
          onClick={() => router.push("/admin/dashboard")} // or onClick={() => history.goBack()}
        >
          <CircleChevronLeft />
        </div>
        <h2 className="w-full items-center text-2xl md:text-3xl font-bold tracking-tight text-center md:text-left">
          Transactions
        </h2>
      </div>
      {transactions?.data.length > 0 ? (
        <div className="md:wrapper overflow-x-auto">
          <Table>
            {/* <TableCaption>
                  A list of Expenses made from the gym.
                </TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-center">Paid</TableHead>
                <TableHead className="text-center">Remarks</TableHead>
                <TableHead className="w-[50px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.data.map((transaction: any) => (
                <TableRow key={transaction._id}>
                  <TableCell className="font-medium text-center">
                    <span className="sm:hidden">
                      {new Date(transaction.transactionDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "numeric",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                    <span className="hidden sm:inline">
                      {new Date(transaction.transactionDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction.incomeSource || transaction.expenseCategory}
                  </TableCell>
                  <TableCell className="text-center">
                    ₱
                    {parseFloat(transaction.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction.paidIn}
                  </TableCell>
                  <TableCell className="text-center">
                    {(() => {
                      const user: any = users.find(
                        (user: any) => transaction.studentId === user._id
                      );
                      return transaction.transactionType === "Income"
                        ? `${user?.firstName} ${user?.lastName}${
                            transaction.remarks
                              ? ` - ${transaction.remarks}`
                              : ""
                          }`
                        : transaction.remarks;
                    })()}
                  </TableCell>
                  <TableCell className="flex justify-center items-center gap-4">
                    <CreateTransactions transaction={transaction} />
                    <DeleteTransaction transaction={transaction} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {transactions?.totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                urlParamName={"transactionPage"}
                page={transactionPage}
                totalPages={transactions?.totalPages}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="wrapper overflow-x-auto flex justify-center">
          <p>There is no transactions made in the system yet.</p>
        </div>
      )}
    </div>
  );
};

export default Page;
