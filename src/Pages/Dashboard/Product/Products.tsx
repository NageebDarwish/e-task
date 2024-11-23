import { useState } from "react";
import { PRO, Pro } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
export default function Products() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data: products, isLoading: loading } = useQuery({
    queryFn: () => Axios.get(`/${PRO}?limit=${limit}&page=${page}`),
    queryKey: ["products", page, limit],
  });

  const header = [
    { key: "images", name: "Images" },
    { key: "title", name: "Title" },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
    {
      key: "created_at",
      name: "Created",
    },
    {
      key: "updated_at",
      name: "Updated",
    },
  ];

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (id) => Axios.delete(`${Pro}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product Deleted Successfully");
    },
  });

  return (
    <div className="bg-white w-100 px-4 py-3 rounded shadow-sm">
      <div className="flex items-center justify-between mb-16 ">
        <h1 className="lg:text-4xl font-bold text-gray-700">Products Page</h1>
        <Link
          className="bg-primary-700 text-white rounded-sm px-4 py-2"
          to="/dashboard/product/add"
        >
          Add Product
        </Link>
      </div>

      <TableShow
        header={header}
        data={products?.data?.data}
        deleteFn={mutateAsync}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        loading={loading}
        total={products?.data?.total}
        searchLink={Pro}
      />
    </div>
  );
}
