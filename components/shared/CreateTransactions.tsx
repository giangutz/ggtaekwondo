import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowLeftRight } from "lucide-react";
import TransactionForm from "@/components/shared/TransactionForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ITransaction } from '@/lib/database/models/transactions.model';

type transactionsProps = {
  transaction?: ITransaction;
  createdBy?: string;
}

const CreateTransactions = ({ transaction, createdBy }: transactionsProps) => {
  return (
    <>
      <Sheet key={"bottom"}>
        <SheetTrigger asChild>
          {transaction ? (
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          ) : (
            <Button
              variant="outline"
              className="rounded-full border-2 border-orange-500 p-2 flex items-center justify-center hover:bg-slate-100"
            >
              <ArrowLeftRight
                className="s-8 text-muted-foreground"
                color="#f97316"
              />
            </Button>
          )}
        </SheetTrigger>
        <SheetContent side={"bottom"}>
          <SheetHeader>
            <SheetTitle>Create Transaction</SheetTitle>
            <SheetDescription>
              Fill out the form below to make a transaction.
            </SheetDescription>
          </SheetHeader>
          <TransactionForm transaction={transaction} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateTransactions