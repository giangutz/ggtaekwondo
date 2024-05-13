"use client";

import React, { useEffect, useState } from "react";
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
import {
  createAttendance,
  updateAttendance,
} from "@/lib/actions/attendance.actions";
import { IAttendance } from "@/lib/database/models/attendance.model";
import { attendanceDefaultValues } from "@/constants";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { getUsersByClass } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";

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

type AttendanceFormProps = {
  attendance?: IAttendance;
};

const AttendanceForm = ({ attendance }: AttendanceFormProps) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { toast } = useToast();
  const initialValues = attendance
    ? {
        ...attendance,
        trainingDate: new Date(attendance.trainingDate),
      }
    : attendanceDefaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const selectedClass = form.watch("class");

  useEffect(() => {
    const fetchUsers = async () => {
      if (selectedClass) {
        const userList = await getUsersByClass(selectedClass);
        setUsers(userList);
      }
    };

    fetchUsers();
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass) {
      if (!attendance) {
        const defaultAttendance = users.map((user) => ({
          studentId: user._id,
          status: "absent",
        }));
        form.setValue("students", defaultAttendance);
      }
    } else {
      form.setValue("students", []);
    }
  }, [selectedClass, users, form, attendance]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (attendance) {
      // console.log(values);
      // Update attendance
      try {
        const newData = {
          _id: attendance._id,
          classId: values.class,
          trainingDate: values.trainingDate,
          students: values.students,
        };
        const attendanceData = await updateAttendance(newData);
        if (attendanceData) {
          toast({
            title: "Attendance updated successfully",
            description: "You have successfully updated an attendance record",
          });
        }
      } catch (error) {
        // console.error(error);
        toast({
          title: "Error updating an attendance!",
          description:
            "An error occurred while updating the attendance. Please try again.",
        });
      }
    } else {
      try {
        const attendance = await createAttendance(values);

        if (attendance) {
          form.reset();
          toast({
            title: "Attendance created successfully",
            description: "You have successfully created an attendance record",
          });
        }
        // redirect("/");
      } catch (error) {
        // console.error(error);
        toast({
          title: "Error creating an attendance!",
          description:
            "An error occurred while creating the attendance record. Please try again.",
        });
      }
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
          <FormField
            control={form.control}
            name="students"
            render={({ field }) => (
              <FormItem className="w-full mt-4">
                <FormControl>
                  <div className="max-h-[300px] overflow-auto">
                    <UserCheckbox
                      onChangeHandler={field.onChange}
                      value={field.value}
                      attendance={attendance}
                      users={users}
                    />
                  </div>
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

export default AttendanceForm;
