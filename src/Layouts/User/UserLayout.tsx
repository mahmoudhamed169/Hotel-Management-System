import { Outlet } from "react-router-dom";
import UserPageTitle from "../../Utils/UserPageTitle";

export default function UserLayout() {
  UserPageTitle();
  return (
    <div>
      <Outlet />
    </div>
  );
}
