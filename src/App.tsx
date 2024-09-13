import "./App.css";
import {
  createBrowserRouter,
  // createHashRouter,
  RouterProvider,
} from "react-router-dom";
import UserLayout from "./Layouts/User/UserLayout";
import NotFound from "./Pages/NotFound/NotFound";
import Landing from "./Pages/UserPages/Landing/Landing";
import Explore from "./Pages/UserPages/Explore/Explore";
import Favorites from "./Pages/UserPages/Favorites/Favorites";
import RoomDetails from "./Pages/UserPages/RoomDetails/RoomDetails";
import StripePayment from "./Pages/UserPages/StripePayment/StripePayment";
import AuthLayout from "./Layouts/Auth/AuthLayout";
import Login from "./Pages/AuthPages/Login/Login";
import Register from "./Pages/AuthPages/Register/Register";
import ForgetPassword from "./Pages/AuthPages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/AuthPages/ResetPassword/ResetPassword";
import MasterLayout from "./Layouts/Master/MasterLayout";
import Home from "./Pages/AdminPages/Home/Home";
import UsersList from "./Pages/AdminPages/Users/UsersList/UsersList";
import RoomsList from "./Pages/AdminPages/Rooms/RoomsList/RoomsList";
import BookingList from "./Pages/AdminPages/Booking/BookingList/BookingList";
import RoomsData from "./Pages/AdminPages/Rooms/RoomsData/RoomsData";
import FaclilitesList from "./Pages/AdminPages/Facilities/FaclilitesList/FaclilitesList";
import FaclilitesData from "./Pages/AdminPages/Facilities/FaclilitesData/FaclilitesData";
import AdsList from "./Pages/AdminPages/Ads/AdsList/AdsList";
import AdsData from "./Pages/AdminPages/Ads/AdsData/AdsData";
import { Toaster } from "react-hot-toast";
import { FetchProvider } from "./Context/FetchContext";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Landing /> },
        { path: "home", element: <Landing /> },
        { path: "explore", element: <Explore /> },
        { path: "favorite-rooms", element: <Favorites /> },
        { path: "room-details", element: <RoomDetails /> },
        { path: "stripePayment", element: <StripePayment /> },
      ],
    },
    {
      path: "auth",
      element: (
        <FetchProvider>
          <AuthLayout />
        </FetchProvider>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "users", element: <UsersList /> },
        { path: "booking", element: <BookingList /> },
        { path: "rooms", element: <RoomsList /> },
        { path: "rooms/add-new", element: <RoomsData /> },
        { path: "rooms/update/:id", element: <RoomsData /> },
        { path: "room-facilities", element: <FaclilitesList /> },
        {
          path: "room-facilities/add-new-facility",
          element: <FaclilitesData />,
        },
        {
          path: "room-facilities/update-facility/:id",
          element: <FaclilitesData />,
        },
        { path: "ads", element: <AdsList /> },
        { path: "ads/add-new-ads", element: <AdsData /> },
        { path: "ads/update-ads/:id", element: <AdsData /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
}
