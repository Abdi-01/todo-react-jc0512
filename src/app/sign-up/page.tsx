"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef } from "react";
import { apiCall } from "@/utils/apiHelper";
import { toast } from "react-toastify";
import { Formik, Form, FormikProps } from "formik";
import { SignUpSchema } from "./schemas/SignUpSchema";

interface IFormValue {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confPassword: string;
}

const SignUp = () => {
  const inputFirstnameRef = useRef<HTMLInputElement>(null);
  const inputLastnameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputConfPasswordRef = useRef<HTMLInputElement>(null);

  const [typePass, setTypePass] = React.useState<string>("password");

  const onHandleTypePass = () => {
    if (typePass === "password") {
      setTypePass("text");
    } else {
      setTypePass("password");
    }
  };

  const onSignUp = async () => {
    try {
    } catch (error: any) {
      console.log(error);
      toast(error);
    }
  };
  return (
    <div className="h-screen py-36">
      <div className="w-full md:w-1/3 m-auto h-fit">
        <Card>
          <CardHeader>
            <h1 className="text-2xl">Sign up now</h1>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                confPassword: "",
              }}
              validationSchema={SignUpSchema}
              onSubmit={(values) => {
                //
                console.log(values);
              }}
            >
              {(props: FormikProps<IFormValue>) => {
                const { errors, values, handleChange } = props;
                console.log("Error message from yup", errors);

                return (
                  <div className="py-2 md:py-6 space-y-5">
                    <div className="flex gap-8">
                      <Input
                        type="text"
                        placeholder="Firstname"
                        ref={inputFirstnameRef}
                      />
                      <Input
                        type="text"
                        placeholder="Lastname"
                        ref={inputLastnameRef}
                      />
                    </div>
                    <Input
                      type="email"
                      placeholder="Email"
                      ref={inputEmailRef}
                    />
                    <div className="flex items-center justify-between border border-black pr-2">
                      <Input
                        type={typePass}
                        placeholder="Password"
                        className="border-none shadow-none"
                        ref={inputPasswordRef}
                      />
                      <Button
                        type="button"
                        className="shadow-none p-0"
                        onClick={onHandleTypePass}
                      >
                        {typePass === "password" ? (
                          <FaEye size={24} />
                        ) : (
                          <FaEyeSlash size={24} />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border border-black pr-2">
                      <Input
                        type={typePass}
                        placeholder="Confirmation Password"
                        className="border-none shadow-none"
                        ref={inputConfPasswordRef}
                      />
                      <Button
                        type="button"
                        className="shadow-none p-0"
                        onClick={onHandleTypePass}
                      >
                        {typePass === "password" ? (
                          <FaEye size={24} />
                        ) : (
                          <FaEyeSlash size={24} />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        onClick={onSignUp}
                        className="bg-gray-400 text-white px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full shadow"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </div>
                );
              }}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
