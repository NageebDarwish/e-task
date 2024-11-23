import { useState } from "react";
import { CAT, Cat } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Categories() {
  // States

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data: categories, isLoading: loading } = useQuery({
    queryFn: () => Axios.get(`/${CAT}?limit=${limit}&page=${page}`),
    queryKey: ["categories", page, limit],
  });

  const header = [
    { key: "title", name: "Title" },
    {
      key: "image",
      name: "Image",
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
    mutationFn: (id) => Axios.delete(`${Cat}/${id}`),
    mutationKey: ["login"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category Deleted Successfully");
    },
  });

  return (
    <div className="bg-white w-100 px-4 py-3 rounded shadow-sm">
      <div className="flex items-center justify-between mb-16 ">
        <h1 className="lg:text-4xl font-bold text-gray-700">Categories Page</h1>
        <Link
          className="bg-primary-700 text-white rounded-sm px-4 py-2"
          to="/dashboard/category/add"
        >
          Add Category
        </Link>
      </div>

      <TableShow
        header={header}
        data={categories?.data?.data}
        deleteFn={mutateAsync}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        loading={loading}
        total={categories?.data?.total}
        searchLink={Cat}
      />
    </div>
  );
}
