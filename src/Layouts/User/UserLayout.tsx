import { Outlet } from "react-router-dom";
import UserPageTitle from "../../Utils/UserPageTitle";
import MainLoading from "../../Components/SharedComponents/MainLoading/MainLoading";
import { useLoading } from "../../Context/LoadingContext/LoadingContext";
import { useEffect } from "react";

export default function UserLayout() {
  UserPageTitle();
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
      setLoading(true);
    };
  }, [setLoading]);

  if (loading) {
    return <MainLoading />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
