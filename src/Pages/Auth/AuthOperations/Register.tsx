import { useState } from "react";
import Cookie from "cookie-universal";

import axios from "axios";
import { LOGIN, REGISTER, baseURL } from "../../../Api/Api";

import { Link } from "react-router-dom";
import NavBar from "../../../Components/Website/NavBar/NavBar";
import { Form, Formik } from "formik";
import {
  LoginSchema,
  RegisterSchema,
} from "../../../validation/AuthValidation";
import Inputs from "../../../Components/Dashboard/Inputs";
import { useMutation } from "@tanstack/react-query";
import Alerts from "../../../Components/Dashboard/Alerts";
import Loader from "../../../Components/Dashboard/Loader";

export default function Login() {
  const [err, setErr] = useState("");

  // Cookies
  const cookie = Cookie();

  const { mutateAsync } = useMutation({
    mutationFn: (values) => axios.post(`${baseURL}/${REGISTER}`, values),
    mutationKey: ["register"],
    onSuccess: (res) => {
      console.log(res);
      const token = res.data.token;
      const role = res.data.user.role;
      const go = role === "1995" ? "`/dashboard/users" : "/";
      cookie.set("e-commerce", token);
      window.location.pathname = `${go}`;
    },

    onError: (err) => {
      if (err?.response?.status === 500) {
        setErr("Email Is Already Been Taken");
      } else {
        setErr("Internal Server ERR");
      }
    },
  });

  return (
    <>
      <NavBar />
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Register New Account
              </h1>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  password_confirmation: "",
                }}
                validationSchema={RegisterSchema}
                onSubmit={mutateAsync}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4 md:space-y-6" action="#">
                    <Inputs
                      title="Name"
                      name="name"
                      type="text"
                      placeholder="Nageeb"
                    />
                    <Inputs
                      title="Email"
                      name="email"
                      type="email"
                      placeholder="nageeb@gmail.com"
                    />
                    <Inputs
                      title="Password"
                      name="password"
                      type="password"
                      placeholder="*******"
                    />{" "}
                    <Inputs
                      title="Password Confirmation"
                      name="password_confirmation"
                      type="password"
                      placeholder="*******"
                    />
                    {err && <Alerts message={err} />}
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-3   ${
                        isSubmitting && "cursor-not-allowed"
                      }`}
                    >
                      Register {isSubmitting && <Loader />}
                    </button>
                    <p className="text-sm font-light text-gray-500 ">
                      Already Have account?{" "}
                      <Link
                        to="/login"
                        className="font-medium text-primary-600 hover:underline "
                      >
                        Log In
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
