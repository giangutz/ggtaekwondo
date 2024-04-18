"use client";

import React from "react";
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
import { createPackage } from "@/lib/actions/packages.actions";

const formSchema = z.object({
  studentId: z.string(),
  availPackage: z.string(),
  startDateTime: z.date(),
  classesPerWeek: z.string(),
});

const PackageForm = () => {
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

    const packageData = {
      studentId: values.studentId,
      name: values.availPackage,
      startDate: values.startDateTime,
      endDate: endDate,
      classesPerWeek: perWeek,
      isActive: true,
      path: "/profile",
    };
    console.log(packageData);
    try {
      const newPackage = await createPackage(packageData);
  
      if (newPackage) {
        form.reset();
        alert("Student package updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
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
            name="studentId"
            render={({ field }) => (
              <FormItem className="w-full mt-4">
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
              <FormItem className="w-full">
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

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
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
