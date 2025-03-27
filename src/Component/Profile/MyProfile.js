import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCameraFill } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";
import useForm from "../../hook/useForm";
import { useTranslation } from "react-i18next";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import Sidebar from "./Sidebar"

export default function MyProfile() {

  // language 
  const { i18n, t } = useTranslation();

  // loder
  const { promiseInProgress } = usePromiseTracker();

  // hook
  const navigate = useNavigate();

  // useform function
  const { handleBlur, handleChange, values, errors, setValues } = useForm(formRequest);

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

  // state all
  const [mobile, setmobile] = useState("");
  const [imagesupload, setimagesupload] = useState("");
  const [storeimage, setstoreimage] = useState("");
  const [profiledatas, setprofiledatas] = useState(false);
  const [get_user, setget_user] = useState({});
  const [mobileValidationMessage, setMobileValidationMessage] = useState("");
  const [citydata, setCityData] = useState([]);
  const [districtdata, setDistrictData] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  // localstorge data
  const token = localStorage.getItem("token");
  const handleCityChange = (e) => setCity(e.target.value);
  const handleDistrictChange = (e) => setDistrict(e.target.value);

  // district api calling
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

  // city api calling
  useEffect(() => {
    if (district) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/citylist/${district}`)
        .then((response) => {
          if (response.status == 200) {
            setCityData(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [district]);

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
      trackPromise(
        axios
          .request(config)
          .then((response) => {
            if (response.status === 200) {
              setget_user(response.data[0])
              setmobile(response.data[0].mobile_no);
              setCity(response.data[0].city);
              setDistrict(response.data[0].dist);
              setValues({
                fname: response.data[0].first_name,
                lname: response.data[0].last_name,
                village: response.data[0].village,
                pincode: response.data[0].pin_code,
              });
            }
          })
          .catch((error) => {
            if (error.response.status == 401) {
              localStorage.removeItem("token");
              showToastMessageone(error.response.data.message)
              navigate("/login", { replace: true });
            }
          })
      )
    }
  }, [profiledatas, token, setValues]);


  // image upload validation function 
  const upload = (event) => {
    const imageFile = event.target.files[0];
    setimagesupload(imageFile);
    setstoreimage(URL.createObjectURL(imageFile));
    if (!imageFile) {
      showToastMessage("Please select image.");
      return false;
    } else if (!imageFile.name.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
      showToastMessage("Please select valid image.");
      return false;
    }
  };

  // mobile number validaton
  useEffect(() => {
    setMobileValidationMessage("");
  }, [values.fname, values.lname, values.email]);

  function formRequest() {
    const bodyFormData = new FormData();
    bodyFormData.append("first_name", values.fname);
    bodyFormData.append("last_name", values.lname);
    bodyFormData.append("mobile_no", mobile);
    bodyFormData.append("dist", district);
    bodyFormData.append("village", values.village);
    bodyFormData.append("pin_code", values.pincode);
    bodyFormData.append("city", city);
    bodyFormData.append("photo", imagesupload);
    const url = `${process.env.REACT_APP_BASE_URL}/updateuserprofile`;
    trackPromise(
      axios.post(url, bodyFormData, {
        'Content-Type': 'multipart/form-data', headers: {
          'Authorization': JSON.parse(localStorage.getItem("token")),
        }
      })
        .then((response) => {
          if (response.status === 200) {
            setprofiledatas(!profiledatas);
            localStorage.setItem("headeruserupdate", "updated" + profiledatas);
            showToastMessage(response.data)
          }
        }).catch((error) => {
          if (error.response && error.response.status === 422) {
            const errorData = error.response.data;
            if (errorData.first_name) showToastMessageone(errorData.first_name[0]);
            if (errorData.last_name) showToastMessageone(errorData.last_name[0]);
            if (errorData.dist) showToastMessageone(errorData.dist[0]);
            if (errorData.city) showToastMessageone(errorData.city[0]);
            if (errorData.village) showToastMessageone(errorData.village[0]);
            if (errorData.mobile_no) showToastMessageone(errorData.mobile_no[0]);
            if (errorData.pin_code) showToastMessageone(errorData.pin_code[0]);
          }
          else if (error.response.status == 401) {
            localStorage.removeItem("token");
            showToastMessageone(error.response.data.message)
            navigate("/login", { replace: true });
          }
        })
    )
  }

  const isValidMobile = (mobile) => {
    return !!mobile && /^[0-9+]{6,12}$/.test(mobile);
  };

  // submit function
  const handleSubmit = (e) => {
    if (Object.keys(errors).length === 0 && isValidMobile(mobile)) {
      setMobileValidationMessage("");
      formRequest();
    } else {
      if (!isValidMobile(mobile)) {
        setMobileValidationMessage("Please enter a valid Mobile Number.");
      }
      Object.values(errors).forEach((error) => {
        console.log(error);
      });
    }
  };

  return (
    <>
      <section className="account-section user-section bg-gray-200 py-8">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">

              <div className="user-ne-m bg-white py-5 px-4">
                {promiseInProgress === true ? (
                  <div
                    className="spinner"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "300px",
                    }}
                  >
                    <ThreeDots
                      height="60"
                      width="60"
                      color="#063014"
                      ariaLabel="circles-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  </div>
                ) : (
                  <>
                    <div className="account-area user-profile-box">
                      <form className="account-form">
                        <div className="flex justify-center relative">
                          <div className="avatar-upload">
                            <div className="avatar-edit">
                              <input
                                type="file"
                                id="imageUpload"
                                onChange={(e) => {
                                  upload(e);
                                }}
                                className="hidden"
                              />
                              <label htmlFor="imageUpload">
                                <BsFillCameraFill className="cursor-pointer absolute inset-y-40 z-50	  ms-5" />
                              </label>
                            </div>
                            <div className="avatar-preview">
                              <div
                                id="imagePreview"
                                className="flex justify-center items-center"
                              >
                                {storeimage ? (
                                  <img
                                    src={storeimage}
                                    alt="Preview"
                                    className="profile-logo rounded-full h-32 w-32 object-cover"
                                  />
                                ) : (
                                  <img
                                    src={get_user.photo}
                                    alt="Profile"
                                    className="profile-logo rounded-full h-32 w-32 object-cover"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" mt-4">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group mb-3">
                                <label className="text-[14px] font-semibold mb-2">
                                  {t("register.FirstName")}
                                </label>
                                <input
                                  type="text"
                                  name="fname"
                                  value={values.fname || ""}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  required={true}
                                  className=" appearance-none border text-[14px]
                              rounded w-full h-12 py-1 px-3 text-gray-700
                               leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.fname && (
                                  <p className="text-red-500 text-sm mt-1">{errors.fname}</p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group mb-3">
                                <label className="text-[14px] font-semibold mb-2">

                                  {t("register.LastName")}
                                </label>
                                <input
                                  type="text"
                                  name="lname"
                                  value={values.lname || ""}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  required={true}
                                  className=" appearance-none border text-[14px]
                              rounded w-full h-12 py-1 px-3 text-gray-700
                               leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.lname && (
                                  <p className="text-red-500 text-sm mt-1">{errors.lname}</p>
                                )}
                              </div>
                            </div>

                            <div className="col-md-4 mb-3">
                              <div className="form-group">
                                <label className="text-[14px] font-semibold mb-2">
                                  {t("register.Pincode")}
                                </label>
                                <input
                                  type="number"
                                  name="pincode"
                                  value={values.pincode || ""}
                                  onBlur={handleBlur}
                                  required={true}
                                  autoComplete="off"
                                  onChange={handleChange}
                                  className=" appearance-none border text-[14px]
                              rounded w-full h-12 py-1 px-3 text-gray-700
                               leading-tight focus:outline-none focus:shadow-outline [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                {errors.pincode && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.pincode}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-4 mb-3">
                              <div className="form-group">
                                <label className="text-[14px] font-semibold mb-2">
                                  {t("register.District")}
                                </label>
                                <select
                                  value={district}
                                  onChange={handleDistrictChange}
                                  name="district"
                                  id="district"
                                  className=" bg-white appearance-none border text-[14px]
                              rounded w-full h-12 py-1 px-3 text-gray-700
                               leading-tight focus:outline-none focus:shadow-outline"
                                >
                                  {districtdata.map((diselement, index) => (
                                    <option
                                      key={index}
                                      value={`${diselement.dist_id}`}
                                    >
                                      {diselement.dist_name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4 mb-3">
                              <div className="form-group">
                                <label className="text-[14px] font-semibold mb-2">
                                  {t("register.City")}
                                </label>
                                <select
                                  value={city}
                                  onChange={handleCityChange}
                                  name="city"
                                  id="city"
                                  className=" bg-white appearance-none border text-[14px]
                              rounded w-full h-12 py-1 px-3 text-gray-700
                               leading-tight focus:outline-none focus:shadow-outline"
                                >
                                  {citydata.map((cityelement, index) => (
                                    <option
                                      key={index}
                                      value={`${cityelement.city_id}`}
                                    >
                                      {cityelement.city_name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group mb-3">
                                <label className="text-[14px] font-semibold mb-2">
                                  {t("register.Village")}
                                </label>
                                <input
                                  type="text"
                                  name="village"
                                  value={values.village || ""}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  required={true}
                                  className=" appearance-none border text-[14px]
                              rounded w-full h-12 py-1 px-3 text-gray-700
                               leading-tight focus:outline-none focus:shadow-outline"
                                  style={{ width: "100%" }}
                                />
                                {errors.village && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.village}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {promiseInProgress === true ? (
                          <div className="flex justify-center items-center mt-4">
                            <ThreeDots
                              height="60"
                              width="60"
                              color="#ffc107"
                              ariaLabel="circles-loading"
                              wrapperStyle={{}}
                              wrapperclassName=""
                              visible={true}
                            />
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="mt-4 block mx-auto bg-lime-950 text-white w-32 h-10 rounded-full"
                            onClick={handleSubmit}
                          >
                            {t("button.update")}
                          </button>
                        )}
                      </form>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
