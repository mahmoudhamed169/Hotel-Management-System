import { Outlet } from "react-router-dom";
import MasterPageTitle from "../../Utils/MasterPageTitle";
import { useLoading } from "../../Contexts/LoadingContext/LoadingContext";
import { useEffect } from "react";
import MainLoading from "../../Components/SharedComponents/MainLoading/MainLoading";

export default function MasterLayout() {
  MasterPageTitle();
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
