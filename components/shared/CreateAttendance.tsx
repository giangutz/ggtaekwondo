import { UserRoundCheck, FilePenLine } from "lucide-react";
import AttendanceForm from "@/components/shared/AttendanceForm";
import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import Image from "next/image";
import { IAttendance } from "@/lib/database/models/attendance.model";

type attendanceProps = {
  attendance?: IAttendance;
};

const CreateAttendance = ({ attendance }: attendanceProps) => {
  return (
    <Credenza>
      <CredenzaTrigger className="cursor-pointer" asChild>
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
            className="flex items-center justify-center rounded-full border-2 border-orange-500 p-2"
          >
            <UserRoundCheck
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
            {attendance ? "Update Attendance" : "Create Attendance"}
          </CredenzaTitle>
          <CredenzaDescription>
            {attendance
              ? `Make changes for ${new Date(attendance.trainingDate).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Manila' })} attendance`
              : "Fill out the form below to create an attendance"}
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <AttendanceForm attendance={attendance} />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>

    // <Dialog>
    //   <DialogTrigger className="cursor-pointer" asChild>
    //     {attendance ? (
    //       <Image
    //         src="/assets/icons/edit.svg"
    //         alt="edit"
    //         width={20}
    //         height={20}
    //       />
    //     ) : (
    //       <Button
    //         variant="outline"
    //         className="rounded-full border-2 border-orange-500 p-2 flex items-center justify-center"
    //       >
    //         <UserRoundCheck
    //           className="s-8 text-muted-foreground"
    //           color="#f97316"
    //           height={20} width={20}
    //         />
    //       </Button>
    //     )}
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-md">
    //     <DialogHeader>
    //       <DialogTitle>Attendance</DialogTitle>
    //       <DialogDescription>
    //         Fill out the form below to create an attendance.
    //       </DialogDescription>
    //     </DialogHeader>
    //     <AttendanceForm attendance={attendance} />
    //   </DialogContent>
    // </Dialog>
  );
};

export default CreateAttendance;
