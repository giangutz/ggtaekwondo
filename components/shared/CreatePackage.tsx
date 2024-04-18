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
import { Package2 } from "lucide-react";
import PackageForm from "@/components/shared/PackageForm";
import { Button } from "@/components/ui/button";

const CreatePackage = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <Sheet key={"bottom"}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full border-2 border-orange-500 p-2 flex items-center justify-center hover:bg-slate-100"
          >
            <Package2 className="s-8 text-muted-foreground" color="#f97316" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"bottom"}>
          <SheetHeader>
            <SheetTitle>Student Package</SheetTitle>
            <SheetDescription>
              Fill out the form below to update your student package.
            </SheetDescription>
          </SheetHeader>
          <PackageForm />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreatePackage;
