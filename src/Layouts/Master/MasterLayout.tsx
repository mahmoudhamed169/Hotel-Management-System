import { Outlet } from "react-router-dom";
import MasterPageTitle from "../../Utils/MasterPageTitle";

export default function MasterLayout() {
  MasterPageTitle();
  return (
    <div>
      <Outlet />
    </div>
  );
}
