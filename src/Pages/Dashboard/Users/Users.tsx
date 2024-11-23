import { useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Users() {
  // States

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data: users, isLoading: loading } = useQuery({
    queryFn: () => Axios.get(`/${USERS}?page=${page}&limit=${limit}`),
    queryKey: ["users", page, limit],
  });

  const header = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
    {
      key: "created_at",
      name: "Created",
    },
    {
      key: "updated_at",
      name: "Last Login",
    },
  ];

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (id) => Axios.delete(`${USER}/${id}`),
    mutationKey: ["login"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User Deleted Successfully");
    },
  });

  return (
    <div className="bg-white w-full px-4 py-3 rounded shadow-sm">
      <div className="flex items-center justify-between mb-16 ">
        <h1 className="lg:text-4xl font-bold text-gray-700">Users Page</h1>
        <Link
          className="bg-primary-700 text-white rounded-sm px-4 py-2"
          to="/dashboard/user/add"
        >
          Add User
        </Link>
      </div>

      <TableShow
        header={header}
        data={users?.data?.data}
        deleteFn={mutateAsync}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        loading={loading}
        total={users?.data?.total}
        searchLink={USER}
      />
    </div>
  );
}
