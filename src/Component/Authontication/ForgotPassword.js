import React, { useState, useEffect } from "react";
import useForm from "../../hook/useForm";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import login from "../../Theme/login.png";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Nav from "../../Common/Nav";
import Footer from "../../Common/Footer"
const ForgotPassword = () => {
  // language
  const { i18n, t } = useTranslation();

  // hook
  const navigate = useNavigate();

  //loder
  const { promiseInProgress } = usePromiseTracker();

  // useform function
  const { handleBlur, handleChange, values, errors, handleSubmit, resetForm } = useForm(formRequest); //Final submit function

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

  // forgetpassword api calling
  function formRequest() {
    trackPromise(
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/forgetpassword`, {
          // email: values.email,
          mobile_no: mobilenumber,
        })
        .then((response) => {
          if (response.status === 200) {
            resetForm();
            navigate("/reset-password", {
              replace: true,
              state: {
                mobilenumber: mobilenumber,
              },
            });
            showToastMessage(response.data);
          } else if (response.status === 201) {
            showToastMessageone(response.data);
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
      <section className="bg-cover min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="sm:py-6 md:py-8 lg:py-10 xl:py-12 py-6 flex justify-center">
            <div
              className="bg-white w-full max-w-[600px] mx-auto rounded-lg
              sm:p-6 md:p-8 lg:p-10 xl:p-12 px-4 py-4"
            >
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
                    {t("register.ForgotPassword")}
                  </h3>
                  <p className="mb-4 text-sm">
                    {t("register.ForgotPasswordPra")}
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mb-4">
                      <label className="block text-sm font-semibold text-dark-900">
                        {t("register.MobileNumber")}<span className="text-red-500">*</span>
                      </label>
                      {/* <input
                        type="email"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm h-11 outline-none"
                        placeholder="Enter Your Email"
                        name="email"
                        value={values.email || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        autoComplete="off"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )} */}
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
                  <div className="flex justify-center items-center mt-3">
                    <button
                      type="submit"
                      className="w-35 bg-lime-950 text-white py-2 px-4 rounded-full hover:bg-orange-600"
                    >
                      {t("register.ResetPassword")}
                    </button>
                  </div>
                )}
              </form>
              {/* <div className="Already-text mt-2 text-center">
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
export default ForgotPassword;