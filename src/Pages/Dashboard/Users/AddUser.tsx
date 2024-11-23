import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";
import { Form, Formik } from "formik";
import { UserSchema } from "../../../validation/UserValidation";
import Inputs from "../../../Components/Dashboard/Inputs";
import Loader from "../../../Components/Dashboard/Loader";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Alerts from "../../../Components/Dashboard/Alerts";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function AddUser() {
  const [err, setErr] = useState("");

  //   Handle SubmitP
  const nav = useNavigate();

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (values) => Axios.post(`${USER}/add`, values),
    mutationKey: ["login"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User Added Successfully");
      nav("/dashboard/users");
    },

    onError: (err: AxiosError) => {
      if (err?.response?.status === 422) {
        setErr("The Email Is Already Been Taken");
      } else {
        setErr("Internal Server ERR");
      }
    },
  });

  return (
    <div className="p-4">
      {/* {loading && <Loading />} */}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          role: "Select Role",
        }}
        validationSchema={UserSchema}
        onSubmit={mutateAsync}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 md:space-y-4">
            <Inputs title="Name" name="name" type="text" placeholder="Ahmed" />
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
            />{" "}
            <Inputs
              select
              options={[
                { name: "User", value: "2001" },
                { name: "Admin", value: "1996" },
              ]}
              title="Role"
              name="role"
              type="text"
              placeholder="Ahmed"
            />
            {err && <Alerts message={err} />}
            <button
              disabled={isSubmitting}
              type="submit"
              className={` text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-3   ${
                isSubmitting && "cursor-not-allowed"
              }`}
            >
              Add User {isSubmitting && <Loader />}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
