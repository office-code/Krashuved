import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import { GoLocation } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import useForm from "../../hook/useForm";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";

const Contact = () => {

  // language
  const { i18n, t } = useTranslation();

  //loder
  const { promiseInProgress } = usePromiseTracker();

  // useform function
  const {
    handleBlur,
    handleChange,
    values,
    errors,
    // setValues,
    handleSubmit,
    resetForm,
  } = useForm(formRequest);

  // mobile number state
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

  // contactus api calling function
  function formRequest() {
    trackPromise(
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/contactus`, {
          name: values.contactname,
          email: values.email,
          phone: mobilenumber,
          message: values.contactmessage,
          subject: values.subject,
        })
        .then((response) => {
          if (response.status === 200) {
            showToastMessage(response.data);
            resetForm();
            setmobilenumber("");
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            showToastMessageone(error.response.data.phone[0]);
          }
        })
    );
  }

  return (
    <>
      <div className="container mx-auto">
        <div
          className="my-5 bg-white flex flex-col md:flex-row sm:p-6 md:p-8 lg:p-10 xl:p-12 p-6  rounded-lg"
        >
          <div className="left-side md:relative md:-top-15">
            <div className="contact-fot space-y-8">
              <div className="address details space-y-2">
                <GoLocation className="contact_location text-orange-600 text-3xl" />
                <div className="topic text-lg font-semibold text-lime-950">
                  {t("contact.address")}
                </div>
                <p>Indore Madhya Pradesh 452001</p>
              </div>
              <div className="phone details space-y-2">
                <FiPhoneCall className="contact_location text-orange-600 text-3xl" />
                <div className="topic text-lg font-semibold text-lime-950">
                  {t("contact.phone")}
                </div>
                <p>96853227296</p>
              </div>
              <div className="email details space-y-2">
                <AiOutlineMail className="contact_location  text-orange-600 text-3xl" />
                <div className="topic text-lg font-semibold text-lime-950">
                  {t("contact.cemail")}
                </div>
                <p>info@krashuved.com</p>
              </div>
            </div>
          </div>
          <div className="right-side flex-1 md:ml-16 mt-12 md:mt-0 p-4">
            <div className="topic-text text-2xl font-semibold text-lime-950">
              {t("contact.title")}
            </div>
            <p className="mt-2">
              {t("contact.paragraph")}
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="row">
                <div className="col-md-6">
                  <div className="w-full">
                    <label className="contact-label block  tracking-wide text-gray-700 text-xs font-bold mb-2">
                      {t("contact.placholder")}
                    </label>
                    <input
                      type="text"
                      className={`input-box appearance-none block w-full bg-white
                        text-gray-700 border ${errors.name ? "border-red-500" : "border-gray-200"
                        } 
                        rounded px-4 min-h-11 mb-3 leading-tight focus:outline-none focus:bg-white`}
                      name="contactname"
                      value={values.contactname || ""}
                      placeholder="Enter Your Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={true}
                      autoComplete="off"
                    />
                    {errors.contactname && (
                      <p className="text-red-500 text-xs">
                        {errors.contactname}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="w-full">
                    <label className="contact-label block  tracking-wide text-gray-700 text-xs font-bold mb-2">
                      {t("contact.placholder1")}
                    </label>
                    <input
                      type="email"
                      className={`input-box appearance-none block w-full bg-white
                        text-gray-700 border ${errors.name ? "border-red-500" : "border-gray-200"
                        } 
                         rounded px-4 min-h-11 mb-3 leading-tight focus:outline-none focus:bg-white`}
                      name="email"
                      value={values.email || ""}
                      placeholder="Enter Your Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={true}
                      autoComplete="off"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="w-full mb-2">
                    <label className="contact-label block  tracking-wide text-gray-700 text-xs font-bold mb-2">
                      {t("contact.placholder2")}
                    </label>
                    <input type="number"
                      placeholder="Mobile Number"
                      value={mobilenumber}
                      onChange={(e) => {
                        setmobilenumber(e.target.value);
                        mobilevalidation(e.target.value);
                      }}
                      className="text-sm mt-1 block w-full px-2 border
                        border-gray-300 rounded-md h-11 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

                <div className="col-md-6">
                  <div className="w-full">
                    <label className="contact-label block  tracking-wide text-gray-700 text-xs font-bold mb-2">
                      {t("contact.placholder3")}
                    </label>
                    <input
                      type="text"
                      className={`input-box appearance-none block w-full bg-white
                        text-gray-700 border ${errors.name ? "border-red-500" : "border-gray-200"
                        } 
                        rounded px-2 min-h-11 mb-3 leading-tight focus:outline-none focus:bg-white`}
                      name="subject"
                      placeholder="Enter Your Subject"
                      value={values.subject || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={true}
                      autoComplete="off"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs">{errors.subject}</p>
                    )}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="w-full">
                    <label className="contact-label block  tracking-wide text-gray-700 text-xs font-bold mb-2">
                      {t("contact.placholder4")}
                    </label>
                    <textarea
                      className={`input-box message-box  appearance-none block w-full bg-white text-gray-700 border ${errors.message ? "border-red-500" : "border-gray-200"
                        } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                      rows="5"
                      id="comment"
                      placeholder="Message"
                      name="contactmessage"
                      value={values.contactmessage || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={true}
                      autoComplete="off"
                    />
                    {errors.contactmessage && (
                      <p className="text-red-500 text-xs">
                        {errors.contactmessage}
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
                <>
                  <button
                    className="bg-gradient-to-r bg-lime-950 shadow-md text-white font-semibold py-2 px-6 rounded-full mx-auto block w-2/4"
                    type="submit"
                  >
                    {t("contact.submit")}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="map mt-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.294942119946!2d75.87456207455458!3d22.717276279388884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd13e26d019b%3A0x69548871791255d1!2sIMPETROSYS!5e0!3m2!1sen!2sin!4v1717996443377!5m2!1sen!2sin"
          width="100%"
          height="600"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default Contact;
