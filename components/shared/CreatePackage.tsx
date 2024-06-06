// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
import { Package2 } from "lucide-react";
import PackageForm from "@/components/shared/PackageForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IPackage } from "@/lib/database/models/packages.model";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";

type packageProps = {
  pkg?: IPackage;
  classId?: string | undefined;
};

const CreatePackage = ({ pkg, classId }: packageProps) => {
  return (
      <Credenza>
        <CredenzaTrigger className="cursor-pointer" asChild>
          {pkg ? (
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
              <Package2
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
              {pkg ? "Update Student Package" : "Create Student Package"}
            </CredenzaTitle>
            <CredenzaDescription>
              {pkg
                ? "Update a student package by filling out the form below."
                : "Fill out the form below to create a student package."}
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>
            <PackageForm pkg={pkg} classId={classId} />
          </CredenzaBody>
        </CredenzaContent>
      </Credenza>
  );
};

export default CreatePackage;
