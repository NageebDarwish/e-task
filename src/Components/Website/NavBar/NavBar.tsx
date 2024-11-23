import { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../Context/UserContext";
import Cookie from "cookie-universal";

export default function NavBar() {
  const { user } = useContext(User)!;
  const cookie = Cookie();

  const handleLogout = () => {
    cookie.remove("e-commerce");
    window.location.reload();
  };

  return (
    <>
      <nav className="py-3">
        <div className="container">
          <div className="flex items-center justify-between flex-wrap">
            <Link className="col-3" to="/">
              <img width="200px" src={"/images/logo.png"} alt="logo" />
            </Link>
            <div className="w-full md:w-1/3 md:order-2 order-3 md:mt-0 mt-3 relative rounded-sm">
              <input
                type="Search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Search Product"
              />
              <h3 className="btn btn-primary absolute top-0 end-0 cursor-pointer rounded-sm text-white m-0 px-4 rounded-0 bg-blue-400 h-full flex items-center justify-center">
                Search
              </h3>
            </div>
            <div className="flex align-center justify-end gap-4 md:order-3 order-1">
              <Link to="/cart">
                <img width="30px" src={"/icons/cart.png"} alt="Cart" />
              </Link>
              {!user ? (
                <Link
                  className="bg-primary-700 text-white px-4 py-2 rounded-sm"
                  to="/login"
                >
                  Login
                </Link>
              ) : (
                <p className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </p>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
