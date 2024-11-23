import { useState } from "react";
import Cookie from "cookie-universal";

import axios from "axios";
import { LOGIN, baseURL } from "../../../Api/Api";

import { Link } from "react-router-dom";
import NavBar from "../../../Components/Website/NavBar/NavBar";
import { Form, Formik } from "formik";
import { LoginSchema } from "../../../validation/AuthValidation";
import Inputs from "../../../Components/Dashboard/Inputs";
import { useMutation } from "@tanstack/react-query";
import Alerts from "../../../Components/Dashboard/Alerts";
import Loader from "../../../Components/Dashboard/Loader";

export default function Login() {
  const [err, setErr] = useState("");

  // Cookies
  const cookie = Cookie();

  const { mutateAsync } = useMutation({
    mutationFn: (values) => axios.post(`${baseURL}/${LOGIN}`, values),
    mutationKey: ["login"],
    onSuccess: (res) => {
      console.log(res);
      const token = res.data.token;
      const role = res.data.user.role;
      const go = role === "1995" ? "users" : "/";
      cookie.set("e-commerce", token);
      window.location.pathname = `/dashboard/${go}`;
    },

    onError: (err) => {
      if (err?.response?.status === 401) {
        setErr("Wrong Email Or Password");
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
                Sign in to your account
              </h1>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={mutateAsync}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4 md:space-y-6" action="#">
                    <Inputs
                      title="Email"
                      name="email"
                      type="email"
                      placeholder="ah@gmail.com"
                    />
                    <Inputs
                      title="Password"
                      name="password"
                      type="password"
                      placeholder="*******"
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-500">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    {err && <Alerts message={err} />}
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-3   ${
                        isSubmitting && "cursor-not-allowed"
                      }`}
                    >
                      Sign in {isSubmitting && <Loader />}
                    </button>
                    <p className="text-sm font-light text-gray-500 ">
                      Don’t have an account yet?{" "}
                      <Link
                        to="/register"
                        className="font-medium text-primary-600 hover:underline "
                      >
                        Sign up
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
