"use client";

import React, { useState } from "react";
import Meteors from "./magicui/meteors";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";
import CustomInput from "./CustomInput";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setuser] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="">
      <Meteors number={35} />
      <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
          <h1 className="text-26 font-poppins font-bold text-black-1">Atlas</h1>
          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user
                ? "Link Account"
                : type === "sign-in"
                ? "Sign In"
                : "Sign Up"}
            </h1>
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
            <>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {type === "sign-up" && (
                    <>
                      <div className="flex gap-4">
                        <CustomInput
                          control={form.control}
                          name="firstName"
                          label="First Name"
                          placeholder="Enter your first name"
                        />
                        <CustomInput
                          control={form.control}
                          name="lastName"
                          label="Last Name"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </>
                  )}

                  <CustomInput
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                  />
                  <CustomInput
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                  />
                  {type === "sign-up" && (
                    <CustomInput
                      control={form.control}
                      name="password"
                      label="Confirm password"
                      placeholder="Renter your password"
                    />
                  )}
                  <div className="flex flex-col gap-4">
                    <Button type="submit" disabled={isLoading} className="">
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" /> &nbsp;
                          Loading...
                        </>
                      ) : type === "sign-in" ? (
                        "Sign In"
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>

              <footer className="flex justify-center gap-1">
                <p className="text-14 font-semibold text-gray-600">
                  {type === "sign-in"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </p>
                <Link
                  href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                  className="form-link"
                >
                  {type === "sign-in" ? " Sign Up" : "Sign In"}
                </Link>
              </footer>
            </>
          </div>
        </header>
      </section>
    </div>
  );
};

export default AuthForm;
