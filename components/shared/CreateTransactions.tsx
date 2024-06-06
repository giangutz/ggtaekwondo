import React from "react";
import { ArrowLeftRight } from "lucide-react";
import TransactionForm from "@/components/shared/TransactionForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ITransaction } from "@/lib/database/models/transactions.model";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";

type transactionsProps = {
  transaction?: ITransaction;
  createdBy?: string;
};

const CreateTransactions = ({ transaction, createdBy }: transactionsProps) => {
  return (
    <Credenza>
      <CredenzaTrigger className="cursor-pointer" asChild>
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
            className="flex items-center justify-center rounded-full border-2 border-orange-500 p-2 hover:bg-slate-100"
          >
            <ArrowLeftRight
              className="s-8 text-muted-foreground"
              color="#f97316"
              height={20}
              width={20}
            />
          </Button>
        )}
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>
            {transaction ? "Update a Transaction" : "Create a Transaction"}
          </CredenzaTitle>
          <CredenzaDescription>
            {transaction ? "Make changes on the transaction" : "Fill out the form below to create a transaction."}
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <TransactionForm transaction={transaction} createdBy={createdBy} />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};

export default CreateTransactions;
