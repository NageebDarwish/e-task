import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";

export default function Dashboard() {
  return (
    <div className="position-relative ">
      <div className="dashboard flex ">
        <SideBar />
        <div className="w-full ">
          <div className="md:px-3 px-1 mt-2">
            <TopBar />
          </div>
          <div className="md:px-3 px-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
