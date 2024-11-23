import { Axios } from "../../../Api/axios";
import { CAT, Pro } from "../../../Api/Api";
import { Form, Formik } from "formik";

import Inputs from "../../../Components/Dashboard/Inputs";
import Loader from "../../../Components/Dashboard/Loader";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { ProductSchema } from "../../../validation/ProductValidation";
import { product } from "../../../types/products";

export default function AddProduct() {
  //   Handle SubmitP
  const nav = useNavigate();

  const { data: categories } = useQuery({
    queryFn: () => Axios.get(`/${CAT}`),
    queryKey: ["categories"],
  });

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (values: product) => {
      const formData = new FormData();
      formData.append("category", values.category);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("About", values.About);
      formData.append("discount", values.discount);
      formData.append("stock", values.stock);
      for (let i = 0; i < values.images.length; i++) {
        formData.append(`images[]`, values?.images?.[i]);
      }
      await Axios.post(`${Pro}/add`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product Added Successfully");
      nav("/dashboard/products");
    },
  });

  return (
    <div className="p-4">
      <Formik
        initialValues={{
          category: "Select Category",
          title: "",
          description: "",
          price: "",
          About: "",
          discount: "",
          stock: "",
          images: "",
        }}
        enableReinitialize
        validationSchema={ProductSchema}
        onSubmit={mutateAsync}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-4 md:space-y-4">
            <Inputs
              select
              options={categories?.data?.map((cat) => {
                return { name: cat.title, value: cat.id };
              })}
              title="Category"
              name="category"
              type="file"
              placeholder="Ahmed"
            />
            <Inputs
              title="Title"
              name="title"
              type="text"
              placeholder="New Product"
            />
            <Inputs
              title="Description"
              name="description"
              type="text"
              placeholder="Some Info About Product"
            />{" "}
            <Inputs title="Price" name="price" type="number" placeholder="50" />{" "}
            <Inputs
              title="Discount"
              name="discount"
              type="number"
              placeholder="50"
            />{" "}
            <Inputs
              title="About"
              name="About"
              type="text"
              placeholder="About The Product"
            />{" "}
            <Inputs title="Stock" name="stock" type="number" placeholder="3" />{" "}
            <Inputs
              setFieldValue={setFieldValue}
              title="Images"
              name="images"
              type="file"
              placeholder=""
              multiple
            />{" "}
            <button
              disabled={isSubmitting}
              type="submit"
              className={` text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-3   ${
                isSubmitting && "cursor-not-allowed"
              }`}
            >
              Add Product {isSubmitting && <Loader />}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
