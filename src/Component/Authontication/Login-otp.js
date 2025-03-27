import React, { useState, useEffect } from "react";
import useForm from "../../hook/useForm";
import axios from "axios";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import login from "../../Theme/login.png";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Nav from "../../Common/Nav";
import Footer from "../../Common/Footer"
const LoginOtp = () => {
    // hooks
    const navigate = useNavigate();
    const location = useLocation();

    // language
    const { i18n, t } = useTranslation();

    //loder
    const { promiseInProgress } = usePromiseTracker();

    // useform function
        // useform function

    const { handleBlur, handleChange, values, errors, handleSubmit, resetForm } = useForm(formRequest); //Final submit function
    const [navigatestate, setnavigatestate] = useState("/my-profile");

    // toast message functionality
    const showToastMessage = (data) => {
        toast.success(data, {
            position: toast.POSITION.TOP_CENTER,
        });
    };
    const showToastMessageone = (data) => {
        toast.error(data, {
            position: toast.POSITION.TOP_CENTER,
        });
    };


    useEffect(() => {
        const handleStorageChange = (event) => {
          if (event.key === "token" && event.newValue) {
            navigate("/");
          }
        };
        window.addEventListener("storage", handleStorageChange);
    
        return () => {
          window.removeEventListener("storage", handleStorageChange);
        };
      }, [navigate]);



    // resetpassword  api calling
    function formRequest() {
        trackPromise(
            axios
                .post(`${process.env.REACT_APP_BASE_URL}/auth/checkotp`, {
                    mobile_no: location.state.mobilenumber,
                    otp: values.otpcode,
                })
                .then((response) => {
                    if (response.status === 200) {
                        // resetForm();
                        localStorage.setItem("token", JSON.stringify(response.data.data[0].token));
                        localStorage.setItem("user_id", JSON.stringify(response.data.data[0].user_id));
                        if (JSON.parse(localStorage.getItem("loginstatus")) === "1") {
                            navigate("/");
                        } else {
                            navigate(navigatestate);
                            localStorage.setItem("loginstatus", JSON.stringify("1"))
                        }
                        showToastMessage(response.data.message);
                    } else if (response.status === 201) {
                        resetForm();
                        showToastMessageone(response.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 422) {
                        const errorData = error.response.data;
                        if (errorData.mobile_no) showToastMessageone(errorData.mobile_no[0]);
                        if (errorData.otp) showToastMessageone(errorData.otp[0]);
                    }
                })
        );
    }

    // resetpassword  api calling
    function resendotp() {
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/auth/resendotp`, {
                mobile_no: location.state.mobilenumber,
            })
            .then((response) => {
                if (response.status === 200) {
                    showToastMessage(response.data.message);
                } else if (response.status === 201) {
                    resetForm();
                    showToastMessageone(response.data.message);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    const errorData = error.response.data;
                    if (errorData.mobile_no) showToastMessageone(errorData.mobile_no[0]);
                }
            })

    }


    return (
        <>
            <Nav />
            <section className="bg-cover min-h-screen flex items-center">
                <div className="container mx-auto">
                    <h1>hello</h1>
                    <div className="sm:py-6 md:py-8 lg:py-8 xl:py-8 py-6 flex justify-center">
                        <div className="bg-white w-full max-w-[600px] mx-auto rounded-lg sm:p-6 md:p-8 lg:p-8 xl:p-6 p-6">
                            <div className="text-center">
                                <div className="mt-2 mb-3">
                                    <NavLink
                                        to="/">
                                        <img
                                            src={login}
                                            alt="images"
                                            className="mx-auto w-28 md:w-40 lg:w-46"
                                        />
                                    </NavLink>
                                    <h3 className="mt-1 text-[21px] sm:text-[24px] md:text-[24px] lg:text-[26px] xl:text-[26px]
                                     font-semibold text-lime-950">
                                        {t("register.VerifyOTP")}
                                    </h3>
                                    <p className="mb-4 text-sm">
                                        {t("register.PleaseVerifyYourOTP")}
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group mb-4 relative">
                                            <div className="d-flex justify-between">
                                                <label className="block text-sm font-semibold text-dark-900">
                                                    {t("register.OTP")}
                                                    <span className="text-red-500">*</span>
                                                </label>
                                                <p className="text-end text-orange-600 cursor-pointer" onClick={() => {
                                                    resendotp();
                                                }}>{t("register.ResendOTP")}</p>
                                            </div>
                                            <input
                                                type="number"
                                                className="relative mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm h-11 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                value={values.otpcode || ""}
                                                placeholder="Enter Your OTP"
                                                name="otpcode"
                                                onBlur={handleBlur}
                                                required={true}
                                                autoComplete="off"
                                                onChange={handleChange}
                                            />
                                            {errors.otpcode && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.otpcode}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {promiseInProgress === true ? (
                                    <div
                                        className="spinner"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignIitems: "center",
                                            height: "50px",
                                        }}
                                    >
                                        <ThreeDots
                                            height="60"
                                            width="60"
                                            color="#063014"
                                            ariaLabel="circles-loading"
                                            wrapperStyle={{}}
                                            wrapperclassName=""
                                            visible={true}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center mt-1">
                                        <button
                                            type="submit"
                                            className="w-32 bg-lime-950 text-white py-2 px-4 rounded-full hover:bg-indigo-700"
                                        >
                                            {t("button.Submit")}
                                        </button>
                                    </div>
                                )}
                            </form>
                            <div className="Already-text mt-1 text-center">
                                <NavLink
                                    to="/login"
                                    className="text-sm text-orange-600 font-semibold ml-1"
                                >
                                    {t("button.Back")}
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default LoginOtp;