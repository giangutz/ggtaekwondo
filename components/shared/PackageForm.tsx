"use client";

import React, { useEffect, useState } from "react";
import { Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import DatePicker from "react-datepicker";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllUser } from "@/lib/actions/user.actions";
import UserDropdown from "./UserDropdown";
import PackageDropdown from "./PackageDropdown";
import { createPackage } from "@/lib/actions/packages.actions";

const formSchema = z.object({
  studentId: z.string(),
  availPackage: z.string(),
  startDateTime: z.date(),
  classesPerWeek: z.string(),
});

const PackageForm = () => {
  const [classesPerWeek, setClassesPerWeek] = useState<number | undefined>(
    undefined
  );

  // console.log(users);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      availPackage: "",
      startDateTime: new Date(Date.now()),
      classesPerWeek: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // parse the classes per week to number
    const perWeek = parseInt(values.classesPerWeek);
    let endDate = new Date(values.startDateTime);

    if (values.availPackage === "12 Sessions") {
      // Compute for end date of package based on start date and how many times per week the student will attend
      const sessions = 12;
      const weeks = Math.ceil(sessions / perWeek);
      endDate.setDate(endDate.getDate() + weeks * 7);
    }

    if (values.availPackage === "6 Sessions") {
      // Compute for end date of package based on start date and how many times per week the student will attend
      const sessions = 6;
      const weeks = Math.ceil(sessions / perWeek);
      endDate.setDate(endDate.getDate() + weeks * 7);
    }

    let studentPkg = {
      studentId: values.studentId,
      name: values.availPackage,
      startDate: values.startDateTime,
      endDate: endDate,
      classesPerWeek: perWeek,
      isActive: true,
    };

    const newPackage = await createPackage(studentPkg);
    console.log(newPackage);
    console.log(values);
  }
  return (
    <>
      <Sheet key={"bottom"}>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem className="w-full mt-3">
                    <FormControl>
                      <UserDropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
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
                  <FormItem className="w-full mt-3">
                    <FormControl>
                      <PackageDropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="classesPerWeek"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="How many times per week?"
                        {...field}
                        className="input-field"
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
                          showTimeSelect
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy h:mm aa"
                          wrapperClassName="datePicker"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Submit</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default PackageForm;
