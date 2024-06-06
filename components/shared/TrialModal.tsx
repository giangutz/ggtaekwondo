"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { useToast } from "@/components/ui/use-toast";
import { trialDefaultValues } from "@/constants";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { createTrial } from "@/lib/actions/trial.actions";
import { Confetti } from "@/components/magicui/confetti";

const phoneRegex = new RegExp("^((\\+63)|63|0)\\d{10}$");
const ageRegex = new RegExp("^(?:[2-9]|[1-5][0-9]|60)$");

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Phone number must be a valid PH number"),
  age: z.string().regex(ageRegex, "Age must be between 2 and 60"),
  opt: z.boolean(),
});

const TrialModal = () => {
  const { toast } = useToast();
  const initialValues = trialDefaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const today = new Date();
  today.setMonth(today.getMonth() + 1, 1); // Set to first day of next month

  while (today.getDay() !== 6) {
    today.setDate(today.getDate() + 1); // Increment day until it's Saturday
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formattedDate = `${
    monthNames[today.getMonth()]
  } ${today.getDate()}, ${today.getFullYear()}`;

  const handleClick = () => {
    Confetti({});
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const trialDate = new Date(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
      );
      const result = await createTrial({
        ...values,
        age: parseInt(values.age),
        trialDate: trialDate,
        createdAt: new Date(),
      });

      if (result) {
        toast({
          title: `Your Free Trial is Registered, ${values.firstName}! 🎉`,
          description: `We will contact you shortly to confirm your trial class. The next free trial is on ${formattedDate}.`,
        });
        form.reset();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred while registering your trial. 😢",
        description: "Please try again later.",
      });
    }
  }
  return (
    <Credenza>
      <CredenzaTrigger className="cursor-pointer" asChild>
        <button
          onClick={handleClick}
          className="w-full rounded-md bg-[#ff571b] px-6 py-2 font-medium text-white shadow-[3px_3px_0px_black] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none sm:w-fit"
        >
          Sign Up for a Free Trial
        </button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Get Your Free Taekwondo Trial!</CredenzaTitle>
          <CredenzaDescription>
            Fill out the form below to register.{" "}
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="First Name"
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Last Name"
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Email"
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Phone Number"
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Age"
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="opt"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={true}
                        onCheckedChange={field.onChange}
                        className="hidden"
                      />
                    </FormControl>
                    <div className="p-regular-16 space-y-1 leading-none">
                      <FormLabel>
                        By submitting this form, you agree to receive email and
                        SMS communications from us.
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="button w-full"
              >
                {" "}
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};

export default TrialModal;
