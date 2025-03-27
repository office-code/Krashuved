import React, { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { IoCallOutline } from "react-icons/io5";
import { Nav } from "react-bootstrap";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function MyProfile() {
    const [activeKey, setActiveKey] = useState("one");

    // language 
    const { i18n, t } = useTranslation();

    const getButtonClasses = (isActive) => {
        return `user-profile-butt ${isActive
            ? "bg-lime-950 text-white border-0 w-full text-center mb-2"
            : "bg-white text-black border-gray-100 text-[14px] w-full mb-2 text-center"
            } border-2 py-2 px-3 `;
    };

    // hook
    const navigate = useNavigate();

    // state all
    const [get_user, setget_user] = useState({});

    // localstorge data
    const token = localStorage.getItem("token");

    // userprofile api calling
    useEffect(() => {
        if (token) {
            const header = {
                "Authorization": JSON.parse(localStorage.getItem("token")),
            };
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_BASE_URL}/getuserdetails`,
                headers: header,
            };
            axios
                .request(config)
                .then((response) => {
                    if (response.status === 200) {
                        setget_user(response.data[0])
                    }
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        localStorage.removeItem("token");
                        navigate("/login", { replace: true });
                    }
                })
        }

    }, [token, localStorage.getItem("headeruserupdate")]);


    return (
        <>
            <div className="user-pr-box bg-white mb-3 mr-2 py-4 px-3">
                <div className="avatar-imges-user-profile flex justify-center py-3">
                    <img
                        src={get_user.photo}
                        alt="Profile"
                        className="rounded-full h-32 w-32 object-cover"
                    />
                </div>
                <div className="user-p">
                    <div className="profile--h">
                        <h4 className="flex items-center mb-3">
                            <FaRegUser className="nt--r mr-1 size-6 text-lime-800" />
                            <span className="text-[14px] font-medium">
                                {get_user.first_name} {get_user.last_name}
                            </span>
                        </h4>
                        <h4 className="flex items-center mb-3">
                            <CgMail className="nt--r mr-1 size-6 text-lime-800" />
                            <span className="text-[14px] font-medium">
                                {get_user.email}
                            </span>
                        </h4>
                        <h6 className="flex items-center mb-3">
                            <IoCallOutline className="nt--r mr-1 size-6 text-lime-800" />
                            <span className="text-[14px] font-medium">
                                {get_user.mobile_no}
                            </span>
                        </h6>
                    </div>
                    <Nav variant="pills" className="flex-column mt-4">
                        <NavLink
                            to="/my-demand"
                            className="text-black bg-white p-0 mb-2"
                            className={({ isActive }) => getButtonClasses(isActive)}
                            onClick={() => setActiveKey("one")}
                        >
                            {t("myprofile.MyDemand")}
                        </NavLink>

                        <NavLink
                            to="/my-supply"
                            className="mt-4 mb-2 text-black bg-white p-0"
                            className={({ isActive }) => getButtonClasses(isActive)}
                            onClick={() => setActiveKey("two")}
                        >
                            {t("myprofile.MySupply")}
                        </NavLink>

                        <NavLink
                            to="/my-bid"
                            className="mt-2 text-black bg-white p-0"
                            className={({ isActive }) => getButtonClasses(isActive)}
                            onClick={() => setActiveKey("three")}
                        >
                            {t("myprofile.MyBid")}
                        </NavLink>

                        <NavLink
                            to="/my-profile"
                            className="text-black bg-white p-0"
                            className={({ isActive }) => getButtonClasses(isActive)}
                            onClick={() => setActiveKey("four")}
                        >
                            {t("myprofile.MyProfile")}
                        </NavLink>

                        <NavLink
                            to="/change-password"
                            className="mt-2 text-black bg-white p-0"
                            className={({ isActive }) => getButtonClasses(isActive)}
                            onClick={() => setActiveKey("five")}
                        >
                            {t("myprofile.ChangePassword")}
                        </NavLink>
                    </Nav>
                </div>
            </div>
            <div className="p-4">
                <Outlet />
            </div>
        </>
    );
}
