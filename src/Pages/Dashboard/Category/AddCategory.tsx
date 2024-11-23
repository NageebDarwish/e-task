import { Axios } from "../../../Api/axios";
import { Cat } from "../../../Api/Api";
import { Form, Formik } from "formik";

import Inputs from "../../../Components/Dashboard/Inputs";
import Loader from "../../../Components/Dashboard/Loader";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { CategorySchema } from "../../../validation/CategoryValidation";

export default function AddCategory() {
  //   Handle SubmitP
  const nav = useNavigate();

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("image", values.image);
      await Axios.post(`${Cat}/add`, formData);
    },
    mutationKey: ["login"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User Added Successfully");
      nav("/dashboard/categories");
    },
  });

  return (
    <div className="p-4">
      {/* {loading && <Loading />} */}
      <Formik
        initialValues={{
          title: "",
          image: "",
        }}
        validationSchema={CategorySchema}
        onSubmit={mutateAsync}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-4 md:space-y-4">
            <Inputs
              title="Title"
              name="title"
              type="text"
              placeholder="Laptops"
            />
            <Inputs
              setFieldValue={setFieldValue}
              title="Image"
              name="image"
              type="file"
              placeholder=""
            />

            <button
              disabled={isSubmitting}
              type="submit"
              className={` text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-3   ${
                isSubmitting && "cursor-not-allowed"
              }`}
            >
              Add Category {isSubmitting && <Loader />}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
