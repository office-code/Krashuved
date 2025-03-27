import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import login from "../../Theme/login.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import useForm from "../../hook/useForm";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import Nav from "../../Common/Nav";
import Footer from "../../Common/Footer";
const Loginwithemail = () => {
  // Hook
  const navigate = useNavigate();
  const { handleBlur, handleChange, values, errors, handleSubmit, resetForm } =
    useForm(formRequest); //Final submit function

  // language
  const { i18n, t } = useTranslation();

  //loder
  const { promiseInProgress } = usePromiseTracker();

  // state
  const [rememberme, setrememberme] = useState(false);
  const getItem_Checked = JSON.parse(localStorage.getItem("isCheck"));
  const getItem_email = JSON.parse(localStorage.getItem("email"));
  const getItem_password = JSON.parse(localStorage.getItem("password"));
  const [navigatestate, setnavigatestate] = useState("/my-profile");

  // password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const eye = passwordShown ? (
    <FaRegEye icon={FaRegEye} />
  ) : (
    <FaRegEyeSlash icon={FaRegEyeSlash} />
  );

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
  // rememberme functionality
  useEffect(() => {
    if (
      getItem_Checked === undefined ||
      getItem_Checked === null ||
      getItem_Checked === false
    ) {
      setrememberme(false);
    } else {
      values.email = getItem_email;
      values.password1 = getItem_password;
      setrememberme(true);
    }
  }, [getItem_Checked]);

  const captchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleCaptchaVerify = (token) => {
    setCaptchaToken(token);
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
  

  // form submit function
  function formRequest() {
    if (!captchaToken) {
      showToastMessageone("Please complete the CAPTCHA verification");
      return;
    }
    trackPromise(
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
          email: values.email,
          password: values.password1,
        })
        .then((response) => {
          if (response.status == 200 && rememberme === true) {
            localStorage.setItem(
              "token",
              JSON.stringify(response.data.data[0].token)
            );
            localStorage.setItem("email", JSON.stringify(values.email));
            localStorage.setItem("password", JSON.stringify(values.password1));
            localStorage.setItem("isCheck", JSON.stringify(rememberme));
            localStorage.setItem(
              "user_id",
              JSON.stringify(response.data.data[0].user_id)
            );
            if (JSON.parse(localStorage.getItem("loginstatus")) === "1") {
              navigate("/");
            } else {
              navigate(navigatestate);
              localStorage.setItem("loginstatus", JSON.stringify("1"));
            }
            showToastMessage(response.data.message);
          } else if (response.status == 200 && rememberme === false) {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            localStorage.removeItem("isCheck");
            localStorage.setItem(
              "token",
              JSON.stringify(response.data.data[0].token)
            );
            localStorage.setItem(
              "user_id",
              JSON.stringify(response.data.data[0].user_id)
            );
            if (JSON.parse(localStorage.getItem("loginstatus")) === "1") {
              navigate("/");
            } else {
              navigate(navigatestate);
              localStorage.setItem("loginstatus", JSON.stringify("1"));
            }
            showToastMessage(response.data.message);
          } else if (response.status == 201) {
            showToastMessageone(response.data.message);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const errorData = error.response.data;
            if (errorData.password) showToastMessageone(errorData.password[0]);
            if (errorData.email) showToastMessageone(errorData.email[0]);
          }
        })
    );
  }

  return (
    <>
      <Nav />
      <section className=" bg-cover min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="sm:py-6 md:py-8 lg:py-10 xl:py-12 py-6 flex justify-center">
            <div
              className="account-area-login  
               bg-white max-w-full w-[620px] mx-auto rounded-lg
                sm:p-6 md:p-8 lg:p-10 xl:p-12 py-2 px-4"
            >
              <div className="text-center">
                <div className="login-header mt-3 mb-3">
                  <NavLink to="/">
                    <img
                      src={login}
                      alt="images"
                      className="mx-auto w-28 md:w-40 lg:w-48"
                    />
                  </NavLink>
                  <h3
                    className=" mt-1 text-[21px] sm:text-[24px] md:text-[24px] lg:text-[26px] xl:text-[26px]
                   font-semibold text-lime-950"
                  >
                    {t("register.WelcomeBack")}
                  </h3>

                  <p className="mb-4 text-sm">{t("register.loginpra")}</p>
                </div>
              </div>
              <form className="account-form login" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-dark-900">
                    {t("register.Email")} / {t("register.MobileNumber")}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm h-11 outline-none"
                    placeholder="Enter Your Email / Mobile Number"
                    name="email"
                    value={values.email || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={true}
                  />
                  {/* {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )} */}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-dark-900">
                    {t("register.Password")}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={passwordShown ? "text" : "password"}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm h-11 outline-none"
                      placeholder=" Enter Your Password"
                      name="password1"
                      value={values.password1 || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={true}
                    />
                    <i
                      className="password-icon absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                      onClick={togglePasswordVisiblity}
                    >
                      {eye}
                    </i>
                  </div>
                  {errors.password1 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password1}
                    </p>
                  )}
                </div>
                <div className="flex  sm:flex-row justify-between items-center mb-4 px-2 sm:px-0">
                  <div className="flex items-center">
                    <input
                      className="h-4 w-4 text-indigo-600 border-gray-300"
                      type="checkbox"
                      name="isChecked"
                      id="remember_me"
                      checked={rememberme}
                      onChange={() => setrememberme(!rememberme)}
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      {t("register.RememberMe")}
                    </label>
                  </div>

                  <div className="flex items-center text-right">
                    <NavLink
                      to="/forgot-password"
                      className="text-sm text-lime-950 font-semibold"
                    >
                      {t("register.ForgotPassword")}
                    </NavLink>
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

                <div className="row captcha">
                    <div className="col-md-12">
                    <div className="flex justify-center items-center w-full mb-4">
                  <div className="w-full max-w-xs">
                    <ReCAPTCHA
                      sitekey="6Ldo_xcqAAAAACO5elkD5QfOYjSU81YNaDsuoq9N"
                      ref={captchaRef}
                      onChange={handleCaptchaVerify}
                    />
                  </div>
                </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                  {promiseInProgress ? (
                    <div className="spinner flex justify-center items-center h-12">
                      <ThreeDots
                        height="60"
                        width="60"
                        color="#063014"
                        ariaLabel="circles-loading"
                        visible={true}
                      />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-32 bg-lime-950 text-white py-2 px-4 rounded-full hover:bg-orange-700"
                    >
                      {t("register.Login")}
                    </button>
                  )}
                </div>
              </form>
              <div className="Already-text mt-1 text-center">
                <span className="text-sm text-gray-600">
                  {t("register.Notamember")}
                </span>
                <NavLink
                  to="/Register"
                  className="text-sm text-orange-600 font-semibold ml-1 underline"
                >
                  {t("register.Register")}
                </NavLink>
              </div>

              {/* <div className="Already-text mt-1 mb-2 text-center">
                <NavLink
                  to="/"
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

export default Loginwithemail;
