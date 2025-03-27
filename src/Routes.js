import React, { Suspense } from "react";
import Loader from "./Loader";
import { useRoutes, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Demanddetails from "../src/Component/Homes/Demand_details";
import Supplydetails from "../src/Component/Homes/Supply_details"
import Blogdetails from "../src/Component/Blogs/Blog_details";
import Termcondition from "../src/Pages/Term_Condition";
import Privacypolicy from "../src/Pages/Privacy_Policy";
import Contact from "../src/Pages/Contact";
import Login from "../src/Pages/Login";
import Register from "./Pages/Register";
import Gallery from "./Pages/Gallery";
import Categories from "./Pages/Categories";
import MyProfile from "./Pages/MyProfile";
import MyDemand from './Component/Profile/MyDemand'
import MySupply from './Component/Profile/MySupply'
import MyContactDemand from "./Component/Profile/MyContactDemand";
import ChangePassword from "./Component/Profile/ChangePassword";
import MyDemandContactUserList from "./Component/Profile/MyDemandContactUserList";
import MySupplyContactUserList from "./Component/Profile/MySupplyContactUserList";
import Aboutas from './Pages/About_As';
import ForgotPassword from "./Component/Authontication/ForgotPassword";
import Resetpassword from "./Component/Authontication/Resetpassword";
import Supplies from './Pages/Supplies'
import Demands from './Pages/Demands'
import all from "./Component/Homes/Notificationall";
import NotFound from './Pages/Page404';
import Loginwithemail from "./Component/Authontication/Loginwithemail";
import LoginOTP from "./Component/Authontication/Login-otp"

export default function Router() {
  const Isloggin = localStorage.getItem("token");

  return (
    <Suspense fallback={<Loader />}>
      {useRoutes([
        { path: "/", element: <HomePage /> },
        { path: "/gallery", element: <Gallery /> },
        { path: "/contact", element: <Contact /> },
        { path: "/login", element: (Isloggin) ? <><Navigate to="/" /></> : <Login /> },
        { path: "/login-with-password", element: (Isloggin) ? <><Navigate to="/" /></> : <Loginwithemail /> },
        { path: "/login-otp", element: (Isloggin) ? <><Navigate to="/" /></> : <LoginOTP /> },
        { path: "/forgot-password", element: (Isloggin) ? <><Navigate to="/" /></> : <ForgotPassword /> },
        { path: "/reset-password", element: (Isloggin) ? <><Navigate to="/" /></> : <Resetpassword /> },
        { path: "/Register", element: (Isloggin) ? <><Navigate to="/" /></> : <Register /> },
        { path: "/demand-details/:cropId", element: <Demanddetails /> },
        { path: "/supply-details/:cropId", element: <Supplydetails /> },
        { path: "/Blog_details", element: <Blogdetails /> },
        { path: "/Categories", element: <Categories /> },
        { path: '/my-profile', element: <MyProfile /> },
        { path: "/my-demand", element: <MyDemand /> },
        { path: "/my-supply", element: <MySupply /> },
        { path: "/change-password", element: <ChangePassword /> },
        { path: "/my-bid", element: <MyContactDemand /> },
        { path: "/supply", element: <Supplies /> },
        { path: "/demand", element: <Demands /> },
        { path: "/terms-condition", element: <Termcondition /> },
        { path: "/privacy-policy", element: <Privacypolicy /> },
        { path: "/about-us", element: <Aboutas /> },
        { path: "/my-demand-userbids-list/:cropId", element: <MyDemandContactUserList /> },
        { path: "/my-supply-userbids-list/:cropId", element: <MySupplyContactUserList /> },
        { path: "/notification-all", element: <Notificationall /> },
        { path: "*", element: <NotFound /> }
      ])}
    </Suspense>
  );
}
