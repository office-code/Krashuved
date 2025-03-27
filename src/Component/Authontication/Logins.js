import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import login from "../../Theme/login.png";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import useForm from "../../hook/useForm";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import Nav from "../../Common/Nav";
import Footer from "../../Common/Footer"

const Login = () => {
  // Hook
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

  // useform function and validation function
  const { handleSubmit } = useForm(formRequest); //Final submit function

  // language
  const { i18n, t } = useTranslation();

  //loder
  const { promiseInProgress } = usePromiseTracker();

  // state
  const [rememberme, setrememberme] = useState(false);
  const getItem_Checked = JSON.parse(localStorage.getItem("isCheck"));
  const getItem_mobilenumber = JSON.parse(localStorage.getItem("mobilenumber"));
  const [mobilenumber, setmobilenumber] = useState("");
  // const [valid, setvalid] = useState(false);
  const [mobilevalid, setmobilevalid] = useState(false);
  const [mobilevalidationerror, setmobilevalidationerror] = useState("");

  // mobile number validation
  const mobilevalidation = (mobile) => {
    if (!new RegExp(/^[0-9]{10}$/).test(mobile)) {
      setmobilevalidationerror("Please Enter A valid Mobile Number");
      setmobilevalid(false);
    } else {
      setmobilevalidationerror("");
      setmobilevalid(true);
    }
  };
  // toast messages function
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
      setrememberme(true);
      setmobilenumber(getItem_mobilenumber);
    }
  }, [getItem_Checked]);


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


  // form submit function api calling otplogin
  function formRequest() {
    trackPromise(
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/auth/otplogin`, {
          mobile_no: mobilenumber,
        })
        .then((response) => {
          if (response.status == 200 && rememberme === true) {
            navigate("/login-otp", {
              replace: true,
              state: {
                mobilenumber: mobilenumber,
              },
            });
            localStorage.setItem("isCheck", JSON.stringify(rememberme));
            localStorage.setItem("mobilenumber", JSON.stringify(mobilenumber));
            showToastMessage(response.data.message)
          }

          else if (response.status == 200 && rememberme === false) {
            navigate("/login-otp", {
              replace: true,
              state: {
                mobilenumber: mobilenumber,
              },
            });
            localStorage.removeItem("isCheck");
            showToastMessage(response.data.message)
          }
          else if (response.status == 201) {
            showToastMessageone(response.data.message)
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const errorData = error.response.data;
            if (errorData.mobile_no) showToastMessageone(errorData.mobile_no[0]);
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
            <div className="account-area-login   bg-white w-full max-w-[600px] mx-auto rounded-lg
            sm:p-6 md:p-8 lg:p-10 xl:p-12 px-4 py-2">
              <div className="text-center">
                <div className="login-header mt-3 mb-3">
                  <NavLink
                    to="/">
                    <img
                      src={login}
                      alt="images"
                      className="mx-auto w-28 md:w-40 lg:w-48"
                    />
                  </NavLink>
                  <h3 className=" text-[21px] sm:text-[24px] md:text-[24px] lg:text-[26px] xl:text-[26px]
                   font-semibold text-lime-950">
                    {t("register.WelcomeBack")}
                  </h3>
                  {/* <h3 className="text-2xl font-semibold mt-3 text-lime-950">
                    {t("register.WelcomeBack")}
                  </h3> */}
                  <p className="mb-4 text-sm">
                    {t("register.loginpra")}
                  </p>
                </div>
              </div>
              <form className="account-form login" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-dark-900">
                    {t("contact.placholder2")}
                    <span className="text-red-500">*</span>
                  </label>
                  <input type="number"
                    placeholder="Mobile Number"
                    value={mobilenumber}
                    onChange={(e) => {
                      setmobilenumber(e.target.value);
                      mobilevalidation(e.target.value);
                    }}
                    className="text-sm mt-1 block w-full px-2 border
                   border-gray-300 rounded-md h-11 outline-none [appearance:textfield] 
                   [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    name="mobilenumber"
                  />
                  <span>
                    {mobilevalid ? (
                      <></>
                    ) : (
                      <>
                        <p className="text-red-500 ">
                          {mobilevalidationerror}
                        </p>
                      </>
                    )}
                  </span>
                </div>
                <div className="flex  sm:flex-row justify-between items-center mb-4 px-2 sm:px-0">
                  <div className="flex items-center">
                    <input
                      className="h-4 w-4 text-indigo-600 border-gray-300"
                      type="checkbox"
                      name="isChecked"
                      id="remember_me"
                      checked={rememberme}
                      value={rememberme}
                      onChange={(e) => {
                        setrememberme(!rememberme);
                      }}
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
                      to="/login-with-password"
                      className="text-sm text-orange-600 font-semibold ml-1"
                    >
                      Password
                    </NavLink>
                  </h6>
                </div>
                <div className="flex justify-center items-center mt-3">
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
                      className="w-32 bg-lime-950 text-white py-2 px-4 rounded-full hover:bg-orange-600"
                    >
                      {t("register.Login")}
                    </button>
                  )}
                </div>
              </form>
              <div className="Already-text mt-2 text-center">
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
              {/* <div className="Already-text mt-1 mb-3 text-center">
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

export default Login;