"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import DatePicker from "react-datepicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ClassDropdown from "@/components/shared/ClassDropdown";
import UserCheckbox from "@/components/shared/UserCheckbox";
import Image from "next/image";
import { createAttendance } from "@/lib/actions/attendance.actions";

const formSchema = z.object({
  class: z.string(),
  students: z.array(
    z.object({
      studentId: z.string(),
      status: z.string(),
    })
  ),
  trainingDate: z.date(),
});

const AttendanceForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      students: [],
      trainingDate: new Date(Date.now()),
    },
  });
  const selectedClass = form.watch("class");

  useEffect(() => {
    // Reset the students field in the form when the selectedClass prop changes
    form.setValue("students", []);
  }, [selectedClass, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const attendance = await createAttendance(values);

      if (attendance) {
        form.reset();
        alert("Attendance created successfully");
      }
    } catch (error) {
      console.error(error);
    }

    console.log(values);
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
            name="class"
            render={({ field }) => (
              <FormItem className="w-full">
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
          <FormField
            control={form.control}
            name="trainingDate"
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
                      Training Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="students"
            render={({ field }) => (
              <FormItem className="w-full mt-4">
                <FormControl>
                  <UserCheckbox
                    onChangeHandler={field.onChange}
                    value={field.value}
                    selectedClass={selectedClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem className="w-full mt-4">
                <FormControl>
                  <UserCheckbox 
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

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

export default AttendanceForm;
