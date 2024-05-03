"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ITransaction } from "@/lib/database/models/transactions.model";
import { deleteTransaction } from "@/lib/actions/transaction.actions";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

type transactionProps = {
  transaction?: ITransaction;
};

const DeleteTransaction = ({ transaction }: transactionProps) => {
    const { toast } = useToast();
    const form = useForm();
    async function onSubmit() {
      try {
        const transactionDeleted = await deleteTransaction(
          transaction?._id || ""
        );
        if (transactionDeleted) {
          toast({
            title: "Transaction deleted successfully",
            description: "The transaction has been deleted successfully",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Transaction deleted successfully",
          description: "The transaction has been deleted successfully",
        });
      }
    }

  return (
    <>
      <Dialog>
        <DialogTrigger className="cursor-pointer" asChild>
          <Image
            src="/assets/icons/delete.svg"
            alt="edit"
            width={20}
            height={20}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <DialogHeader>
                <DialogTitle>Delete transaction</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this transaction?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  type="submit"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  className="button w-full bg-destructive hover:bg-red-600"
                >
                  {form.formState.isSubmitting ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteTransaction;
