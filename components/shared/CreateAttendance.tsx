
import { UserRoundCheck, FilePenLine } from "lucide-react";
import AttendanceForm from "@/components/shared/AttendanceForm";
import { Button } from "@/components/ui/button";
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

type attendanceProps = {
  attendance?: IAttendance;
}; 

const CreateAttendance = ({ attendance }: attendanceProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="cursor-pointer" asChild>
          {attendance ? (
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          ) : (
            <Button
              variant="outline"
              className="rounded-full border-2 border-orange-500 p-2 flex items-center justify-center"
            >
              <UserRoundCheck
                className="s-8 text-muted-foreground"
                color="#f97316"
              />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Attendance</DialogTitle>
            <DialogDescription>
              Fill out the form below to create an attendance.
            </DialogDescription>
          </DialogHeader>
          <AttendanceForm attendance={attendance} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateAttendance;
