import React, { useState, useEffect } from "react";
import useForm from "../../hook/useForm";
import axios from "axios";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import login from "../../Theme/login.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Nav from "../../Common/Nav";
import Footer from "../../Common/Footer";
const Resetpassword = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  // language
  const { i18n, t } = useTranslation();

  //loder
  const { promiseInProgress } = usePromiseTracker();

  // useform function
  const { handleBlur, handleChange, values, errors, handleSubmit, resetForm } =
    useForm(formRequest); //Final submit function

  // password state
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);

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

  // hide and show password functionality
  const togglePasswordVisiblity1 = () => {
    setPasswordShown1(passwordShown1 ? false : true);
  };
  const eye1 = passwordShown1 ? (
    <FaRegEye icon={FaRegEye} />
  ) : (
    <FaRegEyeSlash icon={FaRegEyeSlash} />
  );

  const togglePasswordVisiblity2 = () => {
    setPasswordShown2(passwordShown2 ? false : true);
  };
  const eye2 = passwordShown2 ? (
    <FaRegEye icon={FaRegEye} />
  ) : (
    <FaRegEyeSlash icon={FaRegEyeSlash} />
  );

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
        .post(`${process.env.REACT_APP_BASE_URL}/resetpassword`, {
          mobile_no: location.state.mobilenumber,
          password: values.password,
          confirm_password: values.confirmpassword,
          code: values.otpcode,
        })
        .then((response) => {
          if (response.status === 200) {
            resetForm();
            navigate("/login");
            showToastMessage(response.data);
          } else if (response.status === 201) {
            showToastMessageone(response.data);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const errorData = error.response.data;
            if (errorData.mobile_no) showToastMessageone(errorData.mobile_no[0]);
            if (errorData.code) showToastMessageone(errorData.code[0]);
            if (errorData.password) showToastMessageone(errorData.password[0]);
            if (errorData.confirm_password)
              showToastMessageone(errorData.confirm_password[0]);
          }
        })
    );
  }
  return (
    <>
      <Nav />
      <section className="bg-cover min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="sm:py-6 md:py-8 lg:py-8 xl:py-8 py-6 flex justify-center">
            <div className="bg-white w-full max-w-[600px] mx-auto rounded-lg sm:p-6 md:p-8 lg:p-8 xl:p-6 p-6">
              <div className="text-center">
                <div className="mt-2 mb-3">
                  <NavLink to="/">
                    <img
                      src={login}
                      alt="images"
                      className="mx-auto w-28 md:w-40 lg:w-46"
                    />
                  </NavLink>
                  <h3 className="text-[20px] sm:text-[22px] md:text-[23px] lg:text-[25px] xl:text-[25px] font-semibold mt-2 text-lime-950">
                    {t("register.ResetPassword")}
                  </h3>
                  <p className="mb-4 text-sm">{t("register.loginpra")}</p>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mb-4 relative">
                      <label className="block text-sm font-semibold text-dark-900">
                        {t("register.Code")}
                        <span className="text-red-500">*</span>
                      </label>
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
                  <div className="col-12">
                    <div className="form-group mb-4 relative">
                      <label className="block text-sm font-semibold text-dark-900">
                        {t("register.Password")}

                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="relative mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm h-11 outline-none"
                        placeholder="Enter Your Password"
                        type={passwordShown1 ? "text" : "password"}
                        name="password"
                        value={values.password || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        autoFocus={false}
                      />
                      <i
                        onClick={togglePasswordVisiblity1}
                        className="absolute inset-y-0 top-5 right-0 pr-3 flex items-center cursor-pointer"
                      >
                        {eye1}
                      </i>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mb-4 relative">
                      <label className="block text-sm font-semibold text-dark-900">
                        {t("register.ConfirmPassword")}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="relative mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm h-11 outline-none"
                        placeholder="Enter Your Confirm Password"
                        type={passwordShown2 ? "text" : "password"}
                        name="confirmpassword"
                        value={values.confirmpassword || ""}
                        onChange={handleChange}
                        required={true}
                        autoFocus={false}
                      />
                      <i
                        onClick={togglePasswordVisiblity2}
                        className="absolute inset-y-0 top-5 right-0 pr-3 flex items-center cursor-pointer"
                      >
                        {eye2}
                      </i>
                      {errors.confirmpassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmpassword}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex w-full  sm:w-auto justify-center mb-3">
                  <h6 className="text-sm text-gray-600 flex items-center space-x-1">
                    Login With
                    <NavLink
                      to="/login"
                      className="text-sm text-orange-600 font-semibold ml-1"
                    >
                      Mobile
                    </NavLink>
                  </h6>
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
              {/* <div className="Already-text mt-1 text-center">
                <NavLink
                  to="/login"
                  className="text-sm text-orange-600 font-semibold ml-1"
                >
                  {t("button.Back")}
                </NavLink>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Resetpassword;
