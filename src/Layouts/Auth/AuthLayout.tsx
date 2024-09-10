import { Outlet } from "react-router-dom";
import AuthPageTitle from "../../Utils/AuthPageTitle";

export default function AuthLayout() {
  AuthPageTitle();
  return (
    <div>
      <Outlet />
    </div>
  );
}
