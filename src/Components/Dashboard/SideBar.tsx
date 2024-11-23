import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NavLink } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext } from "react";
import { WindowSize } from "../../Context/WindowContext";
import { links } from "./NavLink";
import { User } from "../../Context/UserContext";

export default function SideBar() {
  const menu = useContext(Menu);
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext?.windowSize;
  const isOpen = menu?.isOpen;
  const { user } = useContext(User)!;

  return (
    <>
      <div
        className={`fixed z-[90] top-0 left-0 w-full h-screen bg-black bg-opacity-15 ${
          windowSize! < "768" && isOpen ? "!block" : "!hidden"
        }`}
      ></div>
      <div
        className={`pt-3 z-[99] text-white shadow-sm min-h-screen bg-[#1C2434] ${
          windowSize! < "768" ? (isOpen ? 0 : "-100%") : 0
        } ${windowSize! < "768" ? "fixed" : "sticky"} ${
          isOpen ? "w-[240px]" : "w-[70px]"
        } transition `}
      >
        {isOpen ? (
          <h5 className="text-center mb-8">Dashboard</h5>
        ) : (
          <>
            <h6 className="text-center mb-0">Dash</h6>
            <h6 className="text-center">board</h6>
          </>
        )}

        {links.map(
          (link, key) =>
            link.role.includes(user!.role) && (
              <NavLink
                key={key}
                to={link.path}
                className={`flex items-center hover:bg-gray-700 ${
                  !isOpen && "justify-center"
                } gap-2 mb-2 py-1 mx-4 rounded-md`}
              >
                <FontAwesomeIcon className="p-2" icon={link.icon} />
                <p
                  className="m-0"
                  style={{
                    display: isOpen ? "block" : "none",
                  }}
                >
                  {link.name}
                </p>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}
