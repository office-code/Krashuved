import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import logo1 from "../Theme/logo1.png";
import profile from "../Theme/profilesoundchat.png";
import { FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import CryptoJS from "crypto-js";
import axios from "axios";
import { MdOutlineNotifications } from "react-icons/md";
import { toast } from "react-toastify";

const Navbarr = () => {
  const [isFocused, setIsFocused] = useState(false);
  const buttonRef = useRef(null);
  const [isFocused1, setIsFocused1] = useState(false);
  const buttonRef1 = useRef(null);
  const [isFocused2, setIsFocused2] = useState(false);
  const buttonRef2 = useRef(null);
  // const handleOptionClick = () => {
  //   setIsFocused(false);
  //   if (buttonRef.current) {
  //     buttonRef.current.blur();
  //   }
  // };

  function handleOptionClickNotification() {
    if (isFocused2 == false) {
      setIsFocused2(true);
    } else {
      setIsFocused2(false);
    }
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { i18n, t } = useTranslation();
  console.log(i18n, i18n)
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const [dropdownState, setDropdownState] = useState(false);

  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  };

   // toast messages function
   const showToastMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const SECRET_KEY = "GFSJHGFJSFHFKJGKFSG@!3443";
  const LANG_SECRET_KEY = "DHKJHHKJHHDKJJJ@@##!89";
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [languageslected, setLanguageSlected] = useState();

  
  // select english language
  const selectEnglish = () => {
    i18n.changeLanguage("english");
    const encryptedLanguage = CryptoJS.AES.encrypt(
      "english",
      LANG_SECRET_KEY
    ).toString();

    localStorage.setItem("selectedLanguage", encryptedLanguage);
    setIsLanguageDropdownOpen(false); // Close the language dropdown
  };

  // select hindi language
  const selectGuinea = () => {
    i18n.changeLanguage("hindi");
    const encryptedLanguage = CryptoJS.AES.encrypt(
      "hindi",
      LANG_SECRET_KEY
    ).toString();

    localStorage.setItem("selectedLanguage", encryptedLanguage);
    setIsLanguageDropdownOpen(false); // Close the language dropdown
  };

  useEffect(() => {
    const bytes = CryptoJS.AES.decrypt(
      localStorage.getItem("selectedLanguage"),
      LANG_SECRET_KEY
    );
    const decryptedLanguage = bytes.toString(CryptoJS.enc.Utf8);
    setLanguageSlected(decryptedLanguage);
  }, [isLanguageDropdownOpen, localStorage.getItem("selectedLanguage")]);

  function logoutfuc() {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          navigate("/login",  { replace: true });
          showToastMessage(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function Profilefuc() {
    navigate("/my-profile");
  }
  function Loginfuc() {
    navigate("/login");
  }
  function Registerfuc() {
    navigate("/Register");
  }
  function Notificationfuc() {
    navigate("/notification-all");
  }

  // notificationslist api calling
  const [notificationslistdata, setNotificationsListData] = useState([]);
  const [notificount, setNotifiCount] = useState("");
  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/unreadnotificationslist`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            setNotificationsListData(response.data);
            setNotifiCount(response.data.length);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // dropdown
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const languageRef = useRef(null);
  const userRef = useRef(null);
  const cartRef = useRef(null);

  const toggleLanguageDropdown = () => {
    setIsLanguageOpen((prev) => !prev);
    if (isUserOpen) setIsUserOpen(false);
    if (isCartOpen) setIsCartOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserOpen((prev) => !prev);
    if (isLanguageOpen) setIsLanguageOpen(false);
    if (isCartOpen) setIsCartOpen(false);
  };

  const toggleCartDropdown = () => {
    setIsCartOpen((prev) => !prev);
    if (isLanguageOpen) setIsLanguageOpen(false);
    if (isUserOpen) setIsUserOpen(false);
  };

  const handleClickOutside = (event) => {
    if (languageRef.current && !languageRef.current.contains(event.target)) {
      setIsLanguageOpen(false);
    }
    if (userRef.current && !userRef.current.contains(event.target)) {
      setIsUserOpen(false);
    }
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsCartOpen(false);
    }
  };

  const handleScroll = () => {
    setIsLanguageOpen(false);
    setIsUserOpen(false);
    setIsCartOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header className=" bg-white relative z-50">
        <nav className="relative px-2 py-1">
          <div className="container mx-auto flex justify-between items-center">
            <NavLink to="/">
              <img
                src={logo1}
                className="header-logo w-[87px] h-[87px] "
                alt="Logo"
              />
            </NavLink>
            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6">
              <li>
                <NavLink
                  exact
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 font-semibold "
                      : "text-gray-700"
                  }
                >
                  {t("navbar.htitle")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/about-us"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 font-semibold "
                      : "text-gray-700"
                  }
                >
                  {t("footer.footeraboutas")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/demand"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 font-semibold "
                      : "text-gray-700"
                  }
                >
                  {t("navbar.dtitle")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/supply"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 font-semibold "
                      : "text-gray-700"
                  }
                >
                  {t("navbar.stitle")}
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/gallery"
                  className={({ isActive }) =>
                    isActive ? "text-orange-600 font-semibold " : "text-gray-700"
                  }
                >
                  {t("navbar.mtitle")}

                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-600 font-semibold "
                      : "text-gray-700"
                  }
                >
                  {t("navbar.ctitle")}
                </NavLink>
              </li>
            </ul>
            <div className="relative flex items-center lg:space-x-2">
              {token ? (
                <>
                  <div className="relative">
                    <button
                      onClick={toggleCartDropdown}
                      type="button"
                      className="  relative inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
                    >
                      <MdOutlineNotifications className=" text-orange-600 size-6" />
                    </button>
                    {notificationslistdata.length === 0 ? (
                      <></>
                    ) : (
                      <span className="text-[10px] font-semibold absolute right-0 pt-0 bottom-5 rounded-full bg-red-900 text-white w-5 h-5 d-flex justify-center items-center">
                        {notificount}
                      </span>
                    )}
                  </div>

                  <div
                    ref={cartRef}
                    className={`absolute right-0 z-[1] mt-[460px] w-72
             space-y-4 overflow-hidden rounded-lg 
             bg-white p-2 antialiased shadow-lg dark:bg-gray-800 ${
               isCartOpen ? "block" : "hidden"
             }`}
                  >
                    <ul>
                      <div className="overflow-y-scroll h-[350px]">
                        {notificationslistdata.length === 0 ? (
                          <div className="pb-4 d-flex justify-center items-center h-80 ">
                            <p className="text-center">
                              {t("demand_list_data_show_messages.MyContact")}
                            </p>
                          </div>
                        ) : (
                          <>
                            {notificationslistdata.map((element, index) => {
                              return (
                                <li
                                  className="p-1 border-b border-gray-200 "
                                  key={index}
                                >
                                  <div className="">
                                    {/* <img src={profile} className="header-logo w-12 h-12 rounded-full" alt="Logo" /> */}
                                    <div className="ms-2 hover:text-orange-600">
                                      <div className="d-flex justify-between items-center ">
                                        <p className="text-sm font-semibold">
                                          {element.sender_name}
                                        </p>
                                        <span className="text-[14px] text-gray-500 hover:text-orange-600">
                                          {element.msg_received_since}
                                        </span>
                                      </div>
                                      <p className="text-[14px] mt-2">
                                        {element.message}
                                      </p>
                                      <p className="text-[14px] text-orange-600 text-end">
                                        {element.notification_date}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </>
                        )}
                      </div>
                      <p
                        onClick={() => {
                          Notificationfuc();
                        }}
                        className="text-center m-3  text-[14px] text-cyan-950 font-semibold cursor-pointer"
                      >
                        {t("notifictionbutton.title1")}
                      </p>
                    </ul>
                    {/* <a href="#" title="" className="mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" role="button">
                Proceed to Checkout
              </a> */}
                  </div>
                </>
              ) : null}

              <button
                onClick={toggleLanguageDropdown}
                type="button"
                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
              >
                <FaGlobe className="text-orange-600 size-4"  />
              </button>

              <div
                ref={languageRef}
                className={`absolute right-0 z-[1] mt-28 w-32   divide-y divide-gray-100 overflow-hidden rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700 ${
                  isLanguageOpen ? "block" : "hidden"
                }`}
              >
                <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                  {languageslected === "english" ? (
                    <></>
                  ) : (
                    <li
                      onClick={() => selectEnglish("english")}
                      className="inline-flex w-full items-center gap-2 
                         rounded-md px-3 py-2 text-sm hover:bg-gray-100
                       dark:hover:bg-gray-600 cursor-pointer"
                    >
                      {t("navbar.English")}
                    </li>
                  )}
                  {languageslected === "hindi" ? (
                    <></>
                  ) : (
                    <li
                      onClick={() => selectGuinea("guinea")}
                      className="inline-flex w-full items-center gap-2 rounded-md
                    px-3 py-2 text-sm hover:bg-gray-100
                     dark:hover:bg-gray-600 cursor-pointer"
                    >
                      {t("navbar.Hindi")}
                    </li>
                  )}
                </ul>
              </div>

              <button
                onClick={toggleUserDropdown}
                type="button"
                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
              >
                <FaRegUser className="text-orange-600 size-4 " />
              </button>

              <div
                ref={userRef}
                className={` absolute ${
                  isUserOpen ? "block" : "hidden"
                }`}
              >
                {token ? (
                  <div className="absolute right-[-106px] z-[1] mt-[22px] w-56 max-h-60 divide-y
                  divide-gray-100 overflow-hidden rounded-lg bg-white antialiased 
                  shadow dark:divide-gray-600 dark:bg-gray-700">
                  <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                    <li
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                      
                    >
                      <NavLink to="/my-demand">{t("myprofile.MyDemand")}</NavLink>
                    </li>

                    <li
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    
                    >
                      <NavLink to="/my-supply">{t("myprofile.MySupply")}</NavLink>
                    </li>

                    <li
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    
                    >
                      <NavLink to="/my-bid">   {t("myprofile.MyBid")}</NavLink>
                    </li>

                    <li
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      onClick={() => {
                        Profilefuc();
                      }}
                    >
                      {t("navbar.MyProfile")}
                    </li>
                    <li
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      onClick={() => {
                        logoutfuc();
                      }}
                    >
                      {t("navbar.Logout")}
                    </li>
                  </ul>
                  </div>
                ) : (
                  <div className="absolute right-[-56px] z-[1] mt-[16px] w-48 max-h-60 divide-y
                  divide-gray-100 overflow-hidden rounded-lg bg-white antialiased 
                  shadow dark:divide-gray-600 dark:bg-gray-700">
                  <ul className=" p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                    <li
                      onClick={() => {
                        Loginfuc();
                      }}
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    >
                      {t("navbar.ltitle")}
                    </li>
                    <li
                      onClick={() => {
                        Registerfuc();
                      }}
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    >
                      {t("navbar.rtitle")}
                    </li>
                  </ul>
                  </div>
                )}

               
              </div>

              <button
                id="mobile-icon"
                className="md:hidden ml-4"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          <div
            className={`md:hidden ${
              isMobileMenuOpen ? "block" : "hidden"
            } flex justify-center  mt-3`}
          >
            <div
              id="mobile-menu"
              className="absolute left-0 top-23 w-6/12 bg-white z-[1] leading-9 font-bold h-screen"
            >
              <ul>
                <li className="p-1 px-4 border-b">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-600 font-semibold "
                        : "text-gray-700 text-[15px] font-medium"
                    }
                  >
                    {t("navbar.htitle")}
                  </NavLink>
                </li>
                <li className="p-1 px-4 border-b">
                  <NavLink
                    to="/about-us"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-600 font-semibold "
                        : "text-gray-700 text-[15px] font-medium"
                    }
                  >
                    {t("footer.footeraboutas")}
                  </NavLink>
                </li>

                <li className="p-1  px-4 border-b">
                  <NavLink
                    to="/demand"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-600 font-semibold "
                        : "text-gray-700 text-[15px] font-medium"
                    }
                  >
                    {t("navbar.dtitle")}
                  </NavLink>
                </li>

                <li className="p-1  px-4 border-b">
                  <NavLink
                    to="/supply"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-600 font-semibold "
                        : "text-gray-700 text-[15px] font-medium"
                    }
                  >
                    {t("navbar.stitle")}
                  </NavLink>
                </li>
                {/* <li className="p-1  px-4 border-b">
                  <NavLink
                    to="/gallery"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-600 font-semibold "
                        : "text-gray-700 text-[15px] font-medium"
                    }
                  >
                    {t("navbar.mtitle")}
                  </NavLink>
                </li> */}
                <li className="p-1  px-4 border-b">
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-600 font-semibold "
                        : "text-gray-700 text-[15px] font-medium"
                    }
                  >
                    {t("navbar.ctitle")}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbarr;
