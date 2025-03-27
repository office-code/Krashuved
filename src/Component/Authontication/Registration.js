import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
import login from "../../Theme/login.png";
import useForm from "../../hook/useForm";
import axios from "axios";
import Nav from "../../Common/Nav";
import Footer from "../../Common/Footer"

const Registration = () => {
  // language
  const { i18n, t } = useTranslation();

  // hooks
  const navigate = useNavigate();

  //loder
  const { promiseInProgress } = usePromiseTracker();

  // useform function and validation function
  const { handleBlur, handleChange, values, errors, handleSubmit, resetForm } = useForm(formRequest);

  // all state
  const [mobilenumber, setmobilenumber] = useState("");
  // const [valid, setvalid] = useState(false);
  const [mobilevalid, setmobilevalid] = useState(false);
  const [mobilevalidationerror, setmobilevalidationerror] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("Provider");
  const [citydata, setCityData] = useState([]);
  const [districtdata, setDistrictData] = useState([]);
  const [passwordShown, setPasswordShown] = useState(false);

  // hide and show password functionality
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const eye = passwordShown ? (
    <FaRegEye icon={FaRegEye} />
  ) : (
    <FaRegEyeSlash icon={FaRegEyeSlash} />
  );

  // toast message function 
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

  // onchange function city, district, user type
  const handleCityChange = (e) => setCity(e.target.value);
  const handleDistrictChange = (e) => setDistrict(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  // api calling district
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/districtlist/1`)
      .then((response) => {
        if (response.status == 200) {
          setDistrictData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // api calling city
  useEffect(() => {
    if (district) {
      trackPromise(
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/citylist/${district}`)
          .then((response) => {
            if (response.status == 200) {
              setCityData(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          })
      )
    }
  }, [district]);

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

  // registration api calling
  function formRequest() {
    trackPromise(
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/createuser`, {
          first_name: values.fname,
          last_name: values.lname,
          email: values.email || "",
          password: values.password,
          mobile_no: mobilenumber,
          dist: district,
          city: city,
          village: values.village,
          pin_code: values.pincode || "",
          role: category,
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            localStorage.removeItem("isCheck");
            localStorage.removeItem("loginstatus");
            resetForm();
            setmobilenumber("");
            setCity("");
            setDistrict("");
            setCategory("");
            navigate("/login");
            showToastMessage(response.data)
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const errorData = error.response.data;
            if (errorData.email) showToastMessageone(errorData.email[0]);
            if (errorData.mobile_no) showToastMessageone(errorData.mobile_no[0]);
            if (errorData.first_name) showToastMessageone(errorData.first_name[0]);
            if (errorData.last_name) showToastMessageone(errorData.last_name[0]);
            if (errorData.password) showToastMessageone(errorData.password[0]);
            if (errorData.pin_code) showToastMessageone(errorData.pin_code[0]);
            if (errorData.role) showToastMessageone(errorData.role[0]);
            if (errorData.village) showToastMessageone(errorData.village[0]);
            if (errorData.dist) showToastMessageone(errorData.dist[0]);
            if (errorData.city) showToastMessageone(errorData.city[0]);
          }
        })
    );
  }


  return (
    <>
      <Nav />
      <section className=" bg-cover min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="sm:py-6 md:py-8 lg:py-8 xl:py-8 py-6 flex justify-center">
            <div className=" bg-white w-full max-w-[750px] mx-auto rounded-lg
              sm:p-8 md:p-8 lg:p-8 xl:p-8 p-8">
              <div className="text-center">
                <div className="mb-3">
                  <NavLink to="/">
                    <img
                      src={login}
                      alt="images"
                      className="mx-auto w-28 md:w-40 lg:w-42"
                    />
                  </NavLink>
                  <h3 className="text-[21px] sm:text-[24px] md:text-[24px] lg:text-[26px] xl:text-[26px]
                   font-semibold text-lime-950">
                    {t("register.CreateAccount")}
                  </h3>
                  <p className="mb-4 text-sm">
                    {t("register.registerpra")}
                  </p>
                </div>
              </div>
              <form className="mb-2" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 col-sm-6 col-12">
                    <div className="form-group mb-4">
                      <label className="block text-sm font-semibold text-dark-900">
                        {t("register.FirstName")}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="text-sm mt-1 block w-full px-2 border
                           border-gray-300 rounded-md h-11 outline-none"
                        name="fname"
                        value={values.fname || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        autoComplete="off"
                      />
                      {errors.fname && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fname}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-6 col-12">
                    <div className="form-group mb-4">
                      <label className="block text-sm font-semibold text-dark-900">
                        {t("register.LastName")}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="text-sm mt-1 block w-full px-2 border
                        border-gray-300 rounded-md h-11 outline-none"
                        name="lname"
                        value={values.lname || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        autoComplete="off"
                      />
                      {errors.lname && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lname}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-12">
                    <div className="form-group mb-4">
                      <label className="block text-sm font-semibold text-dark-900">
                        {t("register.Email")}
                        {/* <span className="text-red-500">*</span> */}
                      </label>
                      <input
                        type="email"
                        placeholder="Email"
                        className="text-sm mt-1 block w-full px-2 border
                        border-gray-300 rounded-md h-11 outline-none"
                        name="email"
                        value={values.email || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // required={true}
                        autoComplete="off"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-12">
                    <div className="form-group mb-4">
                      <label className="block text-sm font-semibold text-dark-900 mb-1">
                        {t("register.MobileNumber")}
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
                        border-gray-300 rounded-md h-11 outline-none 
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                  <div className="col-md-6 col-sm-6 col-12">
                    <div className="form-group mb-4">
                      <label className="block text-sm font-semibold text-dark-900">
                        {t("register.Pincode")}
                        {/* <span className="text-red-500">*</span> */}
                      </label>
                      <input
                        type="number"
                        className="text-sm mt-1 block w-full px-2 border
                        border-gray-300 rounded-md h-11 outline-none
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        name="pincode"
                        placeholder="Pincode"
                        value={values.pincode || ""}
                        onBlur={handleBlur}
                        // required={true}
                        autoComplete="off"
                        onChange={handleChange}
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-12">
                    <div className="form-group mb-4">
                      <label className="block text-sm font-semibold text-dark-900">
                        {t("register.Village")}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="village"
                        placeholder="Village"
                        className="text-sm mt-1 block w-full px-2 border
                        border-gray-300 rounded-md h-11 outline-none"
                        value={values.village || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                      />
                      {errors.village && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.village}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-12">
                    <div className="form-group mb-4">
                      <label className="block text-sm font-semibold text-dark-900">
                        {t("register.District")}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={district}
                        onChange={handleDistrictChange}
                        name="district"
                        id="district"
                        className="text-sm mt-1 block w-full px-2 border
                        border-gray-300 rounded-md h-11 outline-none bg-white"
                      >
                        <option value="">Select District</option>
                        {districtdata.map((diselement, index) => {
                          return (
                            <option
                              key={index}
                              value={`${diselement.dist_id}`}
                            >
                              {diselement.dist_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-12">
                    <div className="form-group mb-4">
                      <label className="block text-sm font-semibold text-dark-900">
                        {t("register.City")}
                        <span className="text-red-500">*</span>
                      </label>
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
                            height="30"
                            width="30"
                            color="#063014"
                            ariaLabel="circles-loading"
                            wrapperStyle={{}}
                            wrapperclassName=""
                            visible={true}
                          />
                        </div>
                      ) : (
                        <>
                          <select
                            value={city}
                            onChange={handleCityChange}
                            name="city"
                            id="city"
                            className="text-sm mt-1 block w-full px-2 border
                          border-gray-300 rounded-md h-11 outline-none bg-white"
                          >
                            <option value="">Select City</option>
                            {citydata.map((cityelement, index) => {
                              return (
                                <option
                                  key={index}
                                  value={`${cityelement.city_id}`}>
                                  {cityelement.city_name}
                                </option>
                              );
                            })}
                          </select>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-12">
                    <div className="form-group mb-4 relative">
                      <label className="block text-sm font-semibold text-dark-900">
                        {t("register.Password")}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={passwordShown ? "text" : "password"}
                        className="text-sm mt-1 block w-full px-2 border
                          border-gray-300 rounded-md h-11 outline-none"
                        name="password"
                        placeholder="Password"
                        value={values.password || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={true}
                        autoComplete="off"
                      />
                      <i
                        className="password-icon absolute inset-y-0 right-0 pr-3 flex top-6 items-center text-sm leading-5 cursor-pointer"
                        onClick={togglePasswordVisiblity}
                      >
                        {eye}
                      </i>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-12">
                    <div className="form-group mb-4">
                      <label className="block text-sm font-semibold text-dark-900">
                        {t("register.UserType")}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        id="category"
                        className="text-sm mt-1 block w-full px-2 border
                          border-gray-300 rounded-md h-11 outline-none bg-white"
                        value={category}
                        onChange={handleCategoryChange}
                      >
                        <option value="Provider">Provider</option>
                        <option value="Vendor">Vendor</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center">
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
                    <>
                      <button
                        type="submit"
                        className="w-32 bg-lime-950 text-white py-2 px-4  rounded-full hover:bg-orange-600"
                      >
                        {t("register.Register")}
                      </button>
                    </>
                  )}
                </div>
              </form>
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  {t("register.registerpra1")}
                </span>
                <NavLink
                  to="/login"
                  className="text-sm text-orange-600 font-bold ml-1 underline"
                >
                  {t("register.Login")}
                </NavLink>
              </div>
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

export default Registration;