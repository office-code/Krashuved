import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import useForm from "../../hook/useForm";
import { useTranslation } from "react-i18next";
import Nav from "../../Common/Nav";
import Footer from "../../Common/Footer";
import { CiLocationOn } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaRupeeSign } from "react-icons/fa";
import banner1 from "../../Theme/topsectionimage3.jpg";
import axios from "axios";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/autoplay";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import ReactPaginate from "react-paginate";

const Demand_details = () => {

  // language 
  const { i18n, t } = useTranslation();

  // hooks
  const params = useParams();
  const navigate = useNavigate();

  //loder
  const { promiseInProgress } = usePromiseTracker();

  //token and userid
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const token = JSON.parse(localStorage.getItem("token"));

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  //toast messages function
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

  // state
  const [perPage] = useState(4);
  const [PageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [listcropdatadetails, setlistcropdatadetails] = useState({});
  const [cropsid, setCropsId] = useState("");
  const [cropallimage, setCropAllImage] = useState([])
  const [listcropdata, setListCropData] = useState([]);
  const [contactuserlist, setContactUserList] = useState([])

  // pagenation onclick function
  const handlePageClick = (selected) => {
    const selectedPage = selected.selected;
    setOffset(selectedPage * perPage);
  };

  //cropdetails api calling 
  useEffect(() => {
    trackPromise(
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/cropdetails/${params.cropId}`, {
          user_id: user_id
        })
        .then((response) => {
          if (response.status == 200) {
            setlistcropdatadetails(response.data[0]);
            setCropsId(response.data[0].crops_id);
            setCropAllImage(response.data[0].crops_photo);
            setContactUserList(response.data[0].contactuserlist)
            setPageCount(Math.ceil(response.data[0].contactuserlist.length / perPage));
          }
        })
        .catch((error) => {
          console.log(error);
        })
    )
  }, [params.cropId]);

  // croplist api calling
  useEffect(() => {
    trackPromise(
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/croplist`, {
          type: "demand",
        })
        .then((response) => {
          if (response.status == 200) {
            setListCropData(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
    )
  }, []);

  // form validation 
  const [Unit, setUnit] = useState("");
  const handleUnitChange = (e) => setUnit(e.target.value);

  const [mobilenumber, setmobilenumber] = useState("");
  const [valid, setvalid] = useState(false);
  const [mobilevalid, setmobilevalid] = useState(false);
  const [mobilevalidationerror, setmobilevalidationerror] = useState("");
  const mobilevalidation = (mobile) => {
    if (!new RegExp(/^[0-9]{10}$/).test(mobile)) {
      setmobilevalidationerror("Please Enter A valid Mobile Number");
      setmobilevalid(false);
    } else {
      setmobilevalidationerror("");
      setmobilevalid(true);
    }
  };

  const { handleBlur, handleChange, values, errors, handleSubmit, resetForm } = useForm(formRequest); //Final submit function

  // cropcontact and guestcropscontact api calling 
  function formRequest() {
    if (token) {
      const bodyFormData = new FormData();
      bodyFormData.append("crops_id", cropsid);
      bodyFormData.append("user_quantity", values.quantity + " " + Unit);
      bodyFormData.append("user_rate", values.userrate);
      bodyFormData.append("user_remarks", values.userremarks);
      const url = `${process.env.REACT_APP_BASE_URL}/cropscontact`;
      axios
        .post(url, bodyFormData, {
          "Content-Type": "multipart/form-data",
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            resetForm()
            setmobilenumber("");
            setUnit("")
            showToastMessage(response.data);
          }
          else if (response.status == 201) {
            resetForm()
            setmobilenumber("");
            setUnit("")
            showToastMessageone(response.data);
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            const errorData = error.response.data;
            if (errorData.user_remarks) showToastMessageone(errorData.user_remarks[0]);
            if (errorData.user_rate) showToastMessageone(errorData.user_rate[0]);
            if (errorData.user_quantity) showToastMessageone(errorData.user_quantity[0]);
            if (errorData.phone) showToastMessageone(errorData.phone[0]);
            if (errorData.email) showToastMessageone(errorData.email[0]);
            if (errorData.name) showToastMessageone(errorData.name[0]);
          }
        });
    } else {
      trackPromise(
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/guestcropscontact`, {
            crops_id: cropsid,
            email: values.email,
            name: values.fname,
            phone: mobilenumber,
            user_quantity: values.quantity + " " + Unit,
            user_rate: values.userrate,
            user_remarks: values.userremarks
          })
          .then((response) => {
            resetForm()
            setmobilenumber("");
            setUnit("")
            showToastMessage(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 422) {
              const errorData = error.response.data;
              if (errorData.user_remarks) showToastMessageone(errorData.user_remarks[0]);
              if (errorData.user_rate) showToastMessageone(errorData.user_rate[0]);
              if (errorData.user_quantity) showToastMessageone(errorData.user_quantity[0]);
              if (errorData.phone) showToastMessageone(errorData.phone[0]);
              if (errorData.email) showToastMessageone(errorData.email[0]);
              if (errorData.name) showToastMessageone(errorData.name[0]);
            }
          })
      );
    }
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Nav />
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
          <section
            className="relative bg-cover bg-center h-72 bg-no-repeat"
            style={{ backgroundImage: `url(${banner1})` }}
          >
            <div className="absolute inset-0 bg-lime-950 opacity-50"></div>
            <div className="container mx-auto">
              <div className="relative text-center pt-24 text-white">
                <h4 className="text-3xl font-semibold"> {listcropdatadetails.user_id === user_id ? <>{t("demands.detailsheadingdemand2")}</> : <>{t("demands.detailsheadingdemand1")}</>}  </h4>
              </div>
            </div>
          </section>
          <div className="demand-details">
            <div className="container-fluid mt-3 mb-3">
              <div className="row no-gutters">
                <div className="col-md-8">
                  <div className="bg-white p-10 shadow-md">
                    <div className="demo">
                      <Swiper
                        style={{
                          "--swiper-navigation-color": "#fff",
                          "--swiper-pagination-color": "#fff",
                        }}
                        spaceBetween={10}
                        navigation={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                      >
                        <SwiperSlide>
                          <img
                            src={listcropdatadetails.crops_image}
                            className="w-full h-125 border border-gray-300 p-2"
                          />
                        </SwiperSlide>
                      </Swiper>
                      <div className="mt-2">
                        <div className="d-flex justify-between items-center">
                          <h4 className="text-lg font-bold">
                            {t("suppliesanddemandsfiled.Description")}
                          </h4>
                          <p className={`rounded-full  ${listcropdatadetails.selling_status === 'OPEN' ? 'bg-lime-800 text-white text-md font-bold px-4 py-2' :
                            listcropdatadetails.selling_status === 'CLOSED' ? 'bg-red-500 text-white text-md font-bold px-3 py-2' :
                              ''
                            }`}>{listcropdatadetails.selling_status}</p>
                        </div>
                        <p className="text-sm">
                          {listcropdatadetails.crops_description}
                        </p>
                      </div>
                      {cropallimage.length === 0 ?
                        <></>
                        :
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          spaceBetween={10}
                          slidesPerView={4}
                          freeMode={true}
                          watchSlidesProgress={true}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="mySwiper mt-3"
                        >
                          {cropallimage.map((elementimg) => {
                            return (
                              <SwiperSlide>
                                <img
                                  src={elementimg.photo}
                                  className="w-full h-28 border border-gray-300 p-2"
                                />
                              </SwiperSlide>
                            )
                          })}
                        </Swiper>
                      }
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-7 col-sm-6 col-12">

                        <h2 className="text-xl font-semibold text-green-900">
                          {listcropdatadetails.crops_name}
                        </h2>

                      </div>
                      <div className="col-md-5 col-sm-6 col-12">
                        <div className="flex justify-start sm:justify-end text-left sm:text-right text-gray-600">
                          <FaRegCalendarAlt className="mr-2 text-green-800" />
                          <span>{listcropdatadetails.crop_date}</span>
                        </div>
                      </div>

                      <div className="about mt-3">
                        <h4 className="text-lg font-bold flex">
                          <FaRupeeSign />
                          <span>
                            {listcropdatadetails.price} - {listcropdatadetails.qty}
                          </span>
                        </h4>
                        <h4 className="text-lg font-medium">
                          <span className="text-lg font-bold">
                            {t("suppliesanddemandsfiled.GradingType")}
                          </span> : {listcropdatadetails.grading_type}
                        </h4>
                        <h4 className="text-lg font-medium">
                          <span className="text-lg font-bold">
                            {t("suppliesanddemandsfiled.Variety")}
                          </span> : {listcropdatadetails.variety_name}
                        </h4>
                        <h4 className="text-lg font-medium">
                          <span className="text-lg font-bold">
                            {t("suppliesanddemandsfiled.Category")}
                          </span> : {listcropdatadetails.category_name}
                        </h4>
                        <h4 className="text-lg font-medium">
                          <span className="text-lg font-bold">
                            {t("suppliesanddemandsfiled.Size")}
                          </span> : {listcropdatadetails.size}
                        </h4>
                        <h4 className="text-lg font-medium">
                          <span className="text-lg font-bold">
                            {t("suppliesanddemandsfiled.Location")}
                          </span> : {listcropdatadetails.location}
                        </h4>
                      </div>
                      {listcropdatadetails.crops_video === "" ?
                        <></>
                        :
                        <div className="mt-3">
                          <video width="320" height="240" controls>
                            <source src={listcropdatadetails.crops_video} type="video/mp4" />
                          </video>
                        </div>
                      }
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-white p-10 shadow-md">
                    {listcropdatadetails.user_id === user_id ?
                      <>
                        {contactuserlist.length === 0 ?
                          <div className="h-56 text-center mt-5">
                            <p className="shipping-add-message">
                              {t("demand_list_data_show_messages.DemandDetails")}
                            </p>
                          </div> :
                          <>
                            <div className="d-flex justify-between items-center border-b-2 pb-2 border-orange-500">
                              <h1 className="text-xl font-semibold ">
                                {t("suppliesanddemandsfiled.detailspageheading1")} ({contactuserlist.length})
                              </h1>
                              <div className=" sm:w-20 bg-lime-950 text-white py-1 px-1 text-center rounded-full hover:bg-indigo-700 hover:text-white mt-2 sm:mt-0">
                                <button onClick={handleBackClick} className="create-demand-icon ">{t("button.Back")}</button>
                              </div>
                            </div>
                            <div className="overflow-x-auto h-[680px] bg-white  mb-3">
                              {contactuserlist.slice(offset, offset + perPage).map((element, index) => {
                                return (
                                  <div key={index} className="py-3 px-2  bg-white">
                                    <div className="border-b pb-4 border-gray-300">
                                      <h4 className="text-sm py-2 text-gray-600">
                                        <span className="text-md font-semibold text-gray-900 uppercase ">
                                          {t("tableheadername.NAME")}
                                        </span> : {element.name}
                                      </h4>
                                      <h4 className="text-sm py-2 text-gray-600">
                                        <span className="text-md font-semibold text-gray-900 uppercase ">
                                          {t("suppliesanddemandsfiled.MobileNumber")}
                                        </span> :  {element.phone}
                                      </h4>
                                      <h4 className="text-sm py-2 text-gray-600">
                                        <span className="text-md font-semibold text-gray-900 uppercase ">
                                          {t("suppliesanddemandsfiled.DATE&TIME")}
                                        </span> :  {element.bookingdate}
                                      </h4>
                                      <h4 className="text-sm py-2 d-flex text-gray-600">
                                        <span className="text-md font-semibold text-gray-900 uppercase ">
                                          {t("tableheadername.USERRATE")}
                                        </span> :  <div className="d-flex">
                                          <span>
                                            <FaRupeeSign />
                                          </span>
                                          {element.user_rate}
                                        </div>
                                      </h4>
                                      <h4 className="text-sm py-2 text-gray-600">
                                        <span className="text-md font-semibold text-gray-900 uppercase ">
                                          {t("tableheadername.USERQUANTITY")}
                                        </span> : {element.user_quantity}
                                      </h4>
                                      <h4 className="text-sm py-2 text-gray-600">
                                        <span className="text-md font-semibold text-gray-900 uppercase ">
                                          {t("tableheadername.USERREMARKS")}
                                        </span> : {element.user_remarks}
                                      </h4>
                                      <h4 className="text-sm py-2 text-gray-600">
                                        <span className="text-md font-semibold text-gray-900 uppercase ">
                                          {t("tableheadername.STATUS")}
                                        </span> : <span className={`rounded-sm text-white ${element.bookingstatus === 'Pending' ? 'bg-yellow-500 text-md px-2 py-1' :
                                          element.bookingstatus === 'Completed' ? 'bg-green-500 text-md px-2 py-1' :
                                            element.bookingstatus === 'Rejected' || "CLOSED" ? 'bg-red-600 text-md px-2 py-1' :
                                              ''
                                          }`}> {element.bookingstatus}</span>
                                        <p>
                                          {element.sold_at === 0 ? (
                                            <></>
                                          ) : (
                                            <div className="d-flex mt-2">
                                              {element.bookingstatus === "Completed" ?
                                                <>
                                                  <span>
                                                    <FaRupeeSign />
                                                  </span>
                                                  {element.sold_at} &nbsp;
                                                  <p className="overflow-hidden text-ellipsis line-clamp-0 w-40">{element.remarks}</p>
                                                </> : null}
                                            </div>
                                          )}
                                        </p>
                                      </h4>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                            {PageCount > 1 && (
                              <ReactPaginate
                                previousLabel={"< Previous"}
                                nextLabel={"Next >"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={PageCount}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={1}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                              />
                            )}

                          </>}
                      </>
                      :
                      <>
                        <div className="d-flex justify-between items-center">
                          <h1 className="text-xl font-semibold">
                            {t("suppliesanddemandsfiled.detailspageheading")}
                          </h1>
                          <div className=" sm:w-20 bg-lime-950 text-white py-1 px-1 text-center rounded-full hover:bg-indigo-700 hover:text-white mt-2 sm:mt-0">
                            <button onClick={handleBackClick} className="create-demand-icon ">{t("button.Back")}</button>
                          </div>
                        </div>
                        <form className="account-form mb-4" onSubmit={handleSubmit}>
                          <div className="demand-details">
                            {token ? <></>
                              :
                              <>
                                <div className="demand-details-fill mt-3">
                                  <h3 className="text-lg font-semibold mb-2">
                                    {t("suppliesanddemandsfiled.FullName")}
                                  </h3>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="fname"
                                    value={values.fname || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required={true}
                                    autoComplete="off"
                                    placeholder='Full Name'
                                  />
                                </div>
                                <div className="demand-details-fill mt-3">
                                  <h3 className="text-lg font-semibold mb-2">
                                    {t("suppliesanddemandsfiled.MobileNumber")}
                                  </h3>
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
                              </>
                            }
                            <div className="demand-details-fill mt-3">
                              <h3 className="text-lg font-semibold mb-2">
                                {t("suppliesanddemandsfiled.UserRate")}
                              </h3>
                              <input
                                type="number"
                                className=" mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                placeholder="User Rate"
                                name="userrate"
                                value={values.userrate || ""}
                                // onChange={handleChange}
                                onBlur={handleBlur}
                                required={true}
                                onChange={(e) => {
                                  // Ensure the input value is non-negative
                                  const value = e.target.value;
                                  if (value >= 0 || value === '') {
                                    handleChange(e);
                                  }
                                }}
                                min="0"
                              />
                              {errors.userrate && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.userrate}
                                </p>
                              )}
                            </div>
                            <div className="demand-details-fill mt-3">
                              <h3 className="text-lg font-semibold mb-2">
                                {t("suppliesanddemandsfiled.UserQuantity")}
                              </h3>
                              <input
                                type="number"
                                className=" mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                placeholder="User Quantity"
                                name="quantity"
                                value={values.quantity || ""}
                                // onChange={handleChange}
                                onBlur={handleBlur}
                                required={true}
                                onChange={(e) => {
                                  // Ensure the input value is non-negative
                                  const value = e.target.value;
                                  if (value >= 0 || value === '') {
                                    handleChange(e);
                                  }
                                }}
                                min="0"
                              />
                              {errors.quantity && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.quantity}
                                </p>
                              )}
                            </div>
                            <div className="demand-details-fill mt-3">
                              <h3 className="text-lg  font-semibold mb-2">
                                {t("suppliesanddemandsfiled.Unit")}
                              </h3>
                              <select
                                name="Unit"
                                id="Unit"
                                className="form-control"
                                value={Unit}
                                onChange={handleUnitChange}
                              >
                                <option >Select Unit</option>
                                <option value="tons">Tons</option>
                                <option value="quintal">Quintal</option>
                                <option value="kg">KG</option>
                                <option value="grams">Grams</option>
                              </select>
                            </div>
                            <div className="demand-details-fill mt-3">
                              <h3 className="text-lg  font-semibold mb-2">
                                {t("suppliesanddemandsfiled.UserRemarks")}
                              </h3>
                              <textarea
                                className=" mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                outline-none"
                                rows="5"
                                name="userremarks"
                                placeholder="Description"
                                value={values.userremarks || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required={true}
                                autoComplete="off"
                              />
                              {errors.userremarks && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.userremarks}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="gallery ">
                            <div
                              className="relative p-8 text-center">
                              <div className="absolute inset-0 "></div>
                              <div className="content z-10 relative">
                                <div className="contac-side w-3/5 rounded-full p-2 mx-auto bg-lime-950 text-white">
                                  <button
                                    type="submit"
                                  >
                                    {t("button.buttonnow")}
                                  </button>
                                </div>
                                <p className="text-black mt-3">
                                  {t("suppliesanddemandsfiled.prag")}
                                </p>
                              </div>
                              <div className="overlay absolute inset-0 bg-black bg-opacity-70 z-[-1]"></div>
                            </div>
                          </div>
                        </form>
                      </>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="service  bg-gray-200">
            <div className="container-fluid">
              <div className="flex flex-wrap justify-between items-center py-6">
                <h4 className="text-2xl font-medium text-black-700">
                  {t("demands.detailsheadingdemand3")}
                </h4>
              </div>
              <Swiper
                slidesPerView={4}
                modules={[Autoplay]}
                spaceBetween={20}
                autoplay={false}
                breakpoints={{
                  991: { slidesPerView: 4 },
                  768: { slidesPerView: 3 },
                  767: { slidesPerView: 2 },
                  480: { slidesPerView: 1 },
                  320: { slidesPerView: 1 },
                }}
              >
                {listcropdata.map((element, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <NavLink to={`/demand-details/${window.btoa(element.crops_id)}`}>
                        <div className="service-box bg-white rounded-lg shadow-md mb-5">
                          <div className="serv-img">
                            <img
                              src={element.crops_image}
                              className="serviecs-im w-full h-56 object-cover rounded-t-lg"
                            />
                          </div>
                          <div className="demond-box p-2">
                            <div className="service-title p-2">
                              <h4 className="text-lg font-semibold  line-clamp-1">
                                {element.crops_name}
                              </h4>
                              <p className="overflow-hidden text-sm text-ellipsis whitespace-nowrap line-clamp-2">
                                {element.short_description}
                              </p>
                            </div>

                            <div className="demans flex justify-between border-b border-gray-300  p-1 ">
                              <div className="date-demand flex items-center mb-2">
                                <i>
                                  <FaRegCalendarAlt className="text-lime-600" />
                                </i>
                                <span className="text-sm pl-2 text-black">
                                  {element.crop_date}
                                </span>
                              </div>
                              <div className="date-demand flex items-center  mb-2">
                                <i>
                                  <CiLocationOn className="text-2xl text-lime-600" />
                                </i>
                                <span className="text-sm pl-2 text-black">
                                  {element.city}
                                </span>
                              </div>
                            </div>
                            <table className="table w-full min-w-full leading-normal">
                              <tbody>
                                <tr>
                                  <th className="text-sm">
                                    {t("suppliesanddemandsfiled.Type")}
                                  </th>
                                  <td className="text-sm text-right">
                                    {element.grading_type}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="text-sm">
                                    {t("suppliesanddemandsfiled.Quantity")}
                                  </th>
                                  <td className="text-sm text-right">
                                    {element.qty}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="text-sm">
                                    {t("suppliesanddemandsfiled.Price")}
                                  </th>
                                  <td className="text-sm text-right">
                                    <span className="inline-flex items-center">
                                      <FaRupeeSign className="text-base" />
                                      <span className="ml-1">
                                        {element.price}
                                      </span>
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="demaons-btn text-center bg-lime-950 p-2 rounded mt-3 mb-2">
                              <NavLink
                                to={`/demand-details/${window.btoa(element.crops_id)}`}
                                className="text-white text-sm font-medium"
                              >
                                {t("button.buttonnow")}
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Demand_details;








