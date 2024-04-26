"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import UserDropdown from "@/components/shared/UserDropdown";
import PackageDropdown from "@/components/shared/PackageDropdown";
import {
  checkExistingPackage,
  createPackage,
  updatePackage,
} from "@/lib/actions/packages.actions";
import "react-datepicker/dist/react-datepicker.css";
import { packageDefaultValues } from "@/constants";
import ClassDropdown from "./ClassDropdown";
import { getClassById } from "@/lib/actions/class.actions";
import { IPackage } from "@/lib/database/models/packages.model";

const formSchema = z.object({
  classId: z.string().optional(),
  studentId: z.string().nonempty("Student is required"),
  availPackage: z.string().nonempty("Package is required"),
  startDateTime: z.date(),
  endDateTime: z.date().optional(),
});

type packageProps = {
  pkg?: IPackage;
  classId?: any;
};

const PackageForm = ({ pkg, classId }: packageProps) => {
  const initialValues = pkg
    ? {
        ...pkg,
        classId: classId,
        startDateTime: new Date(pkg.startDate),
        endDateTime: new Date(pkg.endDate),
        availPackage: pkg.name,
      }
    : packageDefaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const selectedClassId = form.watch("classId");

  useEffect(() => {
    if (pkg) {
      form.reset({
        ...pkg,
        startDateTime: new Date(pkg.startDate),
        endDateTime: new Date(pkg.endDate),
      });
    }
  }, [pkg, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const hasExistingPackage = await checkExistingPackage(
        values.studentId,
        values.startDateTime
      );
      if (hasExistingPackage) {
        // Replace this with your preferred method of user feedback
        alert("User already has an existing package for this class.");
        return;
      }
      // Rest of the code...
    } catch (error) {
      console.error("Failed to check for existing package:", error);
      // Replace this with your preferred method of error feedback
      alert(
        "An error occurred while checking for existing package. Please try again."
      );
    }

    // if (pkg) {
    //   // Update package
    //   try {
    //     const updatedPackageData = {
    //       name: values.availPackage,
    //       startDate: values.startDateTime,
    //       endDate: values.endDateTime,
    //       isActive: true,
    //     };
    //     const updatedPackage = await updatePackage({
    //       packageId: pkg._id,
    //       updatedPackageData,
    //     });
    //     if (updatedPackage) {
    //       alert("Package updated successfully");
    //     }
    //   } catch (error) {
    //     console.error("Failed to update package:", error);
    //     // Replace this with your preferred method of error feedback
    //     alert(
    //       "An error occurred while updating the package. Please try again."
    //     );
    //   }
    // } else {
      let endDate = new Date(values.startDateTime);

      // Fetch the class data from MongoDB
      let classData;
      if (pkg) {
        classData = await getClassById(classId);
      } else {
        if (values.classId) {
          classData = await getClassById(values.classId);
        } else {
          // Handle the case where classId is undefined
          // For example, you might want to show an error message to the user
          alert("Class ID is required.");
          return;
        }
      }
      if (
        values.availPackage === "12 Sessions" ||
        values.availPackage === "6 Sessions"
      ) {
        // Compute for end date of package based on start date and the class days
        const sessions = values.availPackage === "12 Sessions" ? 12 : 6;
        let count = 0;

        // Check if the start day is a class day
        let day = endDate.toLocaleString("en-us", { weekday: "long" });
        if (classData.days.includes(day)) {
          count++;
        }

        while (count < sessions) {
          endDate.setDate(endDate.getDate() + 1);

          // Check if the current day is a class day
          const day = endDate.toLocaleString("en-us", { weekday: "long" });
          if (classData.days.includes(day)) {
            count++;
          }
        }
      }

      const packageData = {
        studentId: values.studentId,
        name: values.availPackage,
        startDate: values.startDateTime,
        endDate: endDate,
        isActive: true,
        path: "/profile",
      };
      // console.log(packageData);
      try {
        const newPackage = await createPackage(packageData);

        if (newPackage) {
          form.reset();
          alert("Student package updated successfully");
        }
      } catch (error) {
        console.log(error);
      }
    // }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="classId"
            render={({ field }) => (
              <FormItem className="w-full mt-4">
                <FormControl>
                  <ClassDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {selectedClassId && (
            <>
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <UserDropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
                        classId={selectedClassId} // Pass the selected class ID to the UserDropdown
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availPackage"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <PackageDropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
                        pkgName={pkg?.name}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                        <Image
                          src="/assets/icons/calendar.svg"
                          alt="calendar"
                          width={24}
                          height={24}
                          className="filter-grey"
                        />
                        <p className="ml-3 whitespace-nowrap text-grey-600">
                          Start Date:
                        </p>
                        <DatePicker
                          selected={field.value}
                          onChange={(date: Date) => field.onChange(date)}
                          // showTimeSelect
                          // timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy"
                          wrapperClassName="datePicker"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {pkg && (
                <FormField
                  control={form.control}
                  name="endDateTime"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                          <Image
                            src="/assets/icons/calendar.svg"
                            alt="calendar"
                            width={24}
                            height={24}
                            className="filter-grey"
                          />
                          <p className="ml-3 whitespace-nowrap text-grey-600">
                            Start Date:
                          </p>
                          <DatePicker
                            selected={field.value}
                            onChange={(date: Date) => field.onChange(date)}
                            // showTimeSelect
                            // timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy"
                            wrapperClassName="datePicker"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className="button w-full"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PackageForm;
