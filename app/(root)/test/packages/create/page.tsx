import { auth } from "@clerk/nextjs";
import PackageForm from "@/components/shared/PackageForm";

const CreatePackage = () => {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create a Package
        </h3>
      </section>

      <div className="wrapper">
        <PackageForm />
      </div>
      {/* <Sheet key={"bottom"}>
        <SheetTrigger>
          <Package2 className="s-8 text-muted-foreground" />
        </SheetTrigger>
        <SheetContent side={"bottom"}>
          <SheetHeader>
            <SheetTitle>Student Package</SheetTitle>
            <SheetDescription>
              Fill out the form below to update your student package.
            </SheetDescription>
          </SheetHeader>
          <PackageForm userId={userId} />
        </SheetContent>
      </Sheet> */}
    </>
  );
};

export default CreatePackage;
