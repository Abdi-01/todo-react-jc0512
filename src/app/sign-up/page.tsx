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
  const [typePass, setTypePass] = React.useState<string>("password");

  const onHandleTypePass = () => {
    if (typePass === "password") {
      setTypePass("text");
    } else {
      setTypePass("password");
    }
  };

  const onSignUp = async (values: IFormValue) => {
    try {
      const response = await apiCall.post("/account", {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
      });
      toast(`Periksa email ${response.data.email} anda`);
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
                console.log("Data from input", values);
                onSignUp(values);
              }}
            >
              {(props: FormikProps<IFormValue>) => {
                const { errors, values, handleChange } = props;
                console.log("Error message from yup", errors);

                return (
                  <Form>
                    <div className="py-2 md:py-6 space-y-5">
                      <div className="flex gap-8">
                        <Input
                          name="firstname"
                          type="text"
                          placeholder="Firstname"
                          onChange={handleChange}
                          value={values.firstname}
                        />
                        <Input
                          name="lastname"
                          type="text"
                          placeholder="Lastname"
                          onChange={handleChange}
                        />
                      </div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                      <div className="flex items-center justify-between border border-black pr-2">
                        <Input
                          name="password"
                          type={typePass}
                          placeholder="Password"
                          className="border-none shadow-none"
                          onChange={handleChange}
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
                          name="confPassword"
                          type={typePass}
                          placeholder="Confirmation Password"
                          className="border-none shadow-none"
                          onChange={handleChange}
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
                          type="submit"
                          className="bg-gray-400 text-white px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full shadow"
                        >
                          Sign Up
                        </Button>
                      </div>
                    </div>
                  </Form>
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
