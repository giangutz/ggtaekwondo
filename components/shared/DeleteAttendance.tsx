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
import { IAttendance } from "@/lib/database/models/attendance.model";
import { deleteAttendance } from "@/lib/actions/attendance.actions";
import { useForm } from "react-hook-form";

type attendanceProps = {
  attendance?: IAttendance;
};

const DeleteAttendance = ({ attendance }: attendanceProps) => {
  const form = useForm();
  async function onSubmit() {
    try {
      const attendanceDeleted = await deleteAttendance(attendance?._id || "");
      if (attendanceDeleted) {
        alert("Attendance deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete attendance:", error);
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
                <DialogTitle>Delete attendance</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this attendance?
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

export default DeleteAttendance;
