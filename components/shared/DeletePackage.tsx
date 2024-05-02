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
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { deletePackage } from "@/lib/actions/packages.actions";
import { IPackage } from "@/lib/database/models/packages.model";

type packageProps = {
  pkg: IPackage;
};

const DeletePackage = ({ pkg }: packageProps) => {
  const { toast } = useToast();
  const form = useForm();
  async function onSubmit() {
    try {
      const pkgDeleted = await deletePackage(pkg?._id);
      if (pkgDeleted) {
        toast({
          title: "Package deleted successfully",
          description: "The package has been deleted successfully",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Package deletion failed",
        description: "An error occurred while deleting the package",
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
                <DialogTitle>Delete package</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this package?
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

export default DeletePackage;
