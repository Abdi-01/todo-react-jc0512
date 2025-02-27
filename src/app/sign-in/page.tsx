"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Formik, Form, FormikProps } from "formik";
import { SignInSchema } from "./schemas/SignInSchema";
import { apiCall } from "@/utils/apiHelper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../hook";
import { setSignIn } from "@/lib/redux/features/authSlice";

interface IFormValue {
  email: string;
  password: string;
}

const SignInPage: React.FunctionComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [typePass, setTypePass] = React.useState<string>("password");
  const onHandleTypePass = () => {
    if (typePass === "password") {
      setTypePass("text");
    } else {
      setTypePass("password");
    }
  };

  const onSignIn = async (values: IFormValue) => {
    try {
      const response = await apiCall.get(
        `/users?email=${values.email}&password=${values.password}`
      );
      console.log(response.data);

      if (response.data.length === 1) {
        toast("Sign in berhasil");
        dispatch(
          setSignIn({
            id: response.data[0].id,
            firstname: response.data[0].firstname,
            lastname: response.data[0].lastname,
            email: response.data[0].email,
          })
        );
        router.replace("/todo");
      } else {
        throw "Akun tidak ditemukan";
      }
    } catch (error: any) {
      console.log(error);
      toast(error);
    }
  };
  return (
    <div className="h-screen py-32">
      <div className="w-1/3 h-fit rounded-2xl px-10 py-8 bg-white shadow m-auto">
        <h1 className="text-2xl">Sign in </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            console.log(values);
            onSignIn(values);
          }}
        >
          {(props: FormikProps<IFormValue>) => {
            const { errors, values, handleChange } = props;
            return (
              <Form>
                <div className="py-6 space-y-5">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={values.email}
                  />
                  {errors.email && (
                    <span className="text-red-400 text-sm">{errors.email}</span>
                  )}
                  <div className="flex items-center justify-between border border-black pr-2">
                    <Input
                      name="password"
                      type={typePass}
                      placeholder="Password"
                      className="border-none shadow-none"
                      onChange={handleChange}
                      value={values.password}
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
                  {errors.password && (
                    <span className="text-red-400 text-sm">
                      {errors.password}
                    </span>
                  )}
                  <div className="flex items-center justify-end gap-4">
                    <Button
                      type="submit"
                      className="bg-slate-700 text-white px-4 py-2 shadow"
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignInPage;
