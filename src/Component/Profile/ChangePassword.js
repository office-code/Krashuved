import React, { useState } from 'react'
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import useForm from "../../hook/useForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Sidebar from "./Sidebar"
import Navbar from "../../Common/Nav";
import Footer from "../../Common/Footer";
export default function ChangePassword() {
  const { promiseInProgress } = usePromiseTracker();
  // hook
  const navigate = useNavigate();

  // language
  const { i18n, t } = useTranslation();

  // const navigate = useNavigate();
  const { handleBlur, handleChange, values, errors, resetForm } = useForm(formRequest);
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

  // password hide and show functionality
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

  //api calling changepassword
  function formRequest() {
    const bodyFormData = new FormData();
    bodyFormData.append("password", values.password);
    bodyFormData.append("confirm_password", values.confirmpassword);
    const url = `${process.env.REACT_APP_BASE_URL}/auth/changepassword`;
    trackPromise(
      axios.post(url, bodyFormData, {
        'Content-Type': 'multipart/form-data', headers: {
          'Authorization': JSON.parse(localStorage.getItem("token")),
        }
      })
        .then((response) => {
          if (response.status === 200) {
            resetForm()
            showToastMessage(response.data)
          }
        }).catch((error) => {
          if (error.response && error.response.status === 422) {
            const errorData = error.response.data;
            if (errorData.password) showToastMessageone(errorData.password[0]);
            if (errorData.confirm_password) showToastMessageone(errorData.confirm_password[0]);
          }
          else if (error.response.status == 401) {
            localStorage.removeItem("token");
            showToastMessageone(error.response.data.message)
            navigate("/login", { replace: true });
          }
        })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (Object.keys(errors).length === 0) {
      formRequest();
    } else {
      Object.values(errors).forEach((error) => {
        console.log(error)
      });
    }
  };
  return (
    <>
      <Navbar />
      <section className="account-section user-section bg-gray-200 py-8">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="user-ne-m">
                <div className="account-area user-profile-box p-6 bg-white">
                  <form className="account-form" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3">
                      <div className="w-full px-3 mb-6">
                        <div className="form-group relative">
                          <label className="label block text-gray-700 text-sm font-bold mb-2">
                            {t("register.NewPassword")}
                          </label>
                          <input
                            type={passwordShown1 ? "text" : "password"}
                            name="password"
                            placeholder="New Password"
                            value={values.password || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            autoFocus={false}
                            className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded h-11 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          />
                          <span className="password-change absolute inset-y-0 top-7 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer">
                            <i onClick={togglePasswordVisiblity1}>{eye1}</i>
                          </span>
                          <div className="errorMsg text-red-500 text-xs italic">
                            {errors.password}
                          </div>
                        </div>
                      </div>
                      <div className="w-full px-3 mb-6">
                        <div className="form-group relative">
                          <label className="label block text-gray-700 text-sm font-bold mb-2">
                            {t("register.ConfirmPassword")}
                          </label>
                          <input
                            type={passwordShown2 ? "text" : "password"}
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            value={values.confirmpassword || ""}
                            onChange={handleChange}
                            required={true}
                            autoFocus={false}
                            className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded h-11 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          />
                          <span className="password-change absolute inset-y-0 top-7 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer">
                            <i onClick={togglePasswordVisiblity2}>{eye2}</i>
                          </span>
                          <div className="errorMsg text-red-500 text-xs italic">
                            {errors.confirmpassword}
                          </div>
                        </div>
                      </div>
                    </div>
                    {promiseInProgress === true ? (
                      <div className="flex justify-center items-center h-12">
                        <ThreeDots
                          height="60"
                          width="60"
                          color="#ffc107"
                          ariaLabel="circles-loading"
                          wrapperStyle={{}}
                          wrapperClassName=""
                          visible={true}
                        />
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className=" block mx-auto  items-center rounded-full mt-2 bg-lime-950 text-white font-medium  h-11 px-4  focus:outline-none focus:shadow-outline"
                      >
                        {t("register.ChangePassword")}
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
