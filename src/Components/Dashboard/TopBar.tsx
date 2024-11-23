import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Menu } from "../../Context/MenuContext";
import { LOGOUT, USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";

import Cookie from "cookie-universal";
import { User } from "../../Context/UserContext";

export default function TopBar() {
  const { setIsOpen } = useContext(Menu)!;

  // const cookie = Cookie();
  const { user } = useContext(User)!;

  // async function handleLogOut() {
  //   try {
  //     const res = await Axios.get(`/${LOGOUT}`);
  //     cookie.remove("e-commerce");
  //     window.location.pathname = "/login";
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className="rounded mb-3 py-2 shadow-sm">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center justify-between gap-5">
          <h5 className="m-0">{user?.name}</h5>
          <FontAwesomeIcon
            onClick={() => {
              setIsOpen((prev: boolean) => !prev);
            }}
            cursor={"pointer"}
            icon={faBars}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}
