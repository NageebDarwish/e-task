import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useContext, useEffect } from "react";
import { USER } from "../../../Api/Api";

import { Axios } from "../../../Api/axios";
import Err403 from "../Errors/403";
import Loader from "../../../Components/Dashboard/Loader";
import { User } from "../../../Context/UserContext";

export default function RequireAuth({ allowedRole }: { allowedRole: string }) {
  // User

  const nav = useNavigate();
  const { user, setUser } = useContext(User)!;

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => {
        setUser(data.data);
      })
      .catch(() => nav("/login", { replace: true }));
  }, []);
  //   Token & Cookie
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  return token ? (
    user === null ? (
      <Loader />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
