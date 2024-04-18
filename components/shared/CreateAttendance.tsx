import { auth } from "@clerk/nextjs";
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
import { UserRoundCheck } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateAttendance = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full border-2 border-orange-500 p-2 flex items-center justify-center"
          >
            <UserRoundCheck
              className="s-8 text-muted-foreground"
              color="#f97316"
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Attendance</DialogTitle>
            <DialogDescription>
              Fill out the form below to create an attendance.
            </DialogDescription>
          </DialogHeader>
          <AttendanceForm />
          {/* <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue="https://ui.shadcn.com/docs/installation"
                readOnly
              />
            </div>
            <Button type="submit" size="sm" className="px-3">
              <span className="sr-only">Copy</span>
               <Copy className="h-4 w-4" /> 
            </Button>
          </div> */}
          {/* <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
      {/* <Sheet key={"bottom"}>
        <SheetTrigger className="rounded-full border-2 border-orange-500 p-2 flex items-center justify-center">
          <UserRoundCheck
            className="s-8 text-muted-foreground"
            color="#f97316"
          />
        </SheetTrigger>
        <SheetContent side={"bottom"}>
          <SheetHeader>
            <SheetTitle>Attendance</SheetTitle>
            <SheetDescription>
                Fill out the form below to create an attendance.
            </SheetDescription>
          </SheetHeader>
          <AttendanceForm />
        </SheetContent>
      </Sheet> */}
    </>
  );
};

export default CreateAttendance;
