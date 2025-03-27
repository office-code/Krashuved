import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate, useLocation } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import ConfirmStatus from "./ConfirmStatus";
import Nav from "../../Common/Nav";
import Footer from "../../Common/Footer";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

export default function MyDemandContactUserList() {
  // language
  const { i18n, t } = useTranslation();

  // drop downmenu state function
  // const [isOpen, setIsOpen] = useState(null);
  // const toggleDropdown = (id) => {
  //   setIsOpen((prev) => (prev === id ? null : id));
  // };

  // model
  // const [imagepopup, setImagePopup] = useState(false)
  // const [showpopupimage, setShowPopupImage] = useState("")

  // function handleCloseImagePopup() { setImagePopup(false) }

  // hook
  const params = useParams();
  const navigate = useNavigate();
  const data = useLocation();

  // navigation sand data get state
  const [CurrentVideo, setCurrentVideo] = useState({});
  useEffect(() => {
    if (data.state != null) {
      setCurrentVideo(data.state.currentvideo);
    }
  }, [data]);

  // loder
  const { promiseInProgress } = usePromiseTracker();

  // state
  const [DemandData, setDemandData] = useState([]);
  const [perPage] = useState(6);
  const [PageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [lgShow, setLgShow] = useState(false);
  const [contactid, setContactid] = useState();
  const [deletestatus, setdeletestatus] = useState(false);
  const [closestate, setCloseState] = useState(false);

  // pagenation  onclick function
  const handlePageClick = (selected) => {
    const selectedPage = selected.selected;
    setOffset(selectedPage * perPage);
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

  // calling api contactuserlist
  useEffect(() => {
    mydemandfun();
  }, [deletestatus, closestate]);

  function mydemandfun() {
    const header = {
      Authorization: JSON.parse(localStorage.getItem("token")),
      "Content-Type": "application/json",
    };
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/contactuserlist/${params.cropId}`,
      headers: header,
    };
    trackPromise(
      axios
        .request(config)
        .then((response) => {
          setDemandData(response.data);
          setPageCount(Math.ceil(response.data.length / perPage));
        })
        .catch((error) => {
          if (error.response.status == 401) {
            showToastMessageone(error.response.data.message);
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
          }
        })
    );
  }

  const [getbookingstatus, setGetBookingStatus] = useState();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/getcropsstatus`, {
        crops_id: params.cropId,
      })
      .then((response) => {
        if (response.status == 200) {
          setGetBookingStatus(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [closestate]);

  // reject api calling
  function handleRejected(id) {
    const bodyFormData = new FormData();
    bodyFormData.append("contact_id", id);
    const url = `${process.env.REACT_APP_BASE_URL}/rejectcropscontact`;
    axios
      .post(url, bodyFormData, {
        "Content-Type": "multipart/form-data",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setdeletestatus(!deletestatus);
          showToastMessage(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          showToastMessageone(error.response.data.message);
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
      });
  }

  // Pending api calling
  function handlePending(id) {
    const bodyFormData = new FormData();
    bodyFormData.append("contact_id", id);
    const url = `${process.env.REACT_APP_BASE_URL}/pendingcropscontact`;
    axios
      .post(url, bodyFormData, {
        "Content-Type": "multipart/form-data",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setdeletestatus(!deletestatus);
          showToastMessage(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          showToastMessageone(error.response.data.message);
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
      });
  }

  const [showclosecroppoup, setShowCloseCropPoup] = useState(false);
  function handleClose() {
    setShowCloseCropPoup(false);
  }

  // delete function
  function handleCloseCrop() {
    const bodyFormData = new FormData();
    bodyFormData.append("crops_id", CurrentVideo.crops_id);
    const url = `${process.env.REACT_APP_BASE_URL}/closedcropscontact`;
    axios
      .post(url, bodyFormData, {
        "Content-Type": "multipart/form-data",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setShowCloseCropPoup(false);
          showToastMessage(response.data);
          setCloseState(!closestate);
        } else if (response.status === 201) {
          setShowCloseCropPoup(false);
          showToastMessageone(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          showToastMessageone(error.response.data.message);
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
      });
  }

  // drop down table
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (index) => {
    if (dropdownOpen === index) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(index);
    }
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown-container")) {
      setDropdownOpen(null);
    }
  };

  const handleScroll = () => {
    setDropdownOpen(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Nav />
      <div className="container">
        {promiseInProgress === true ? (
          <div
            className="spinner"
            style={{
              display: "flex",
              justifyContent: "center",
              alignIitems: "center",
              height: "300px",
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
          <div className="bg-white p-4 my-3">
            <div className="container-fluid">
              <h1 className="text-[20px] font-semibold text-center ">
                My Demand {CurrentVideo.crops_name} User List
              </h1>
              <div className="flex flex-col sm:flex-row justify-between items-center  border-b border-gray-300 pb-3">
                {getbookingstatus === "CLOSED" ? (
                  <></>
                ) : (
                  <button
                    className="sm:w-30 border border-black px-2 py-1 rounded-full  font-semibold mt-2 sm:mt-0 sm:mr-3 text-red-800"
                    onClick={() => {
                      setShowCloseCropPoup(true);
                    }}
                  >
                    {t("usercontactlist.closedemandtitle")}
                  </button>
                )}
                <div className=" sm:w-20 bg-lime-950 text-white py-1 px-1 text-center rounded-full hover:bg-indigo-700 hover:text-white mt-2 sm:mt-0">
                  <button onClick={handleBackClick} className="create-demand-icon ">{t("button.Back")}</button>
                </div>
              </div>
              {DemandData.length === 0 ? (
                <div className="h-56 text-center mt-5">
                  <p>
                    {t("demand_list_data_show_messages.DemandUserListContact")}
                  </p>
                </div>
              ) : (
                <>
                  <div className="px-4 sm:px-8">
                    <div className="-mx-4 sm:-mx-8 px-2 sm:px-8 py-2 overflow-x-auto">
                      <div className="inline-block min-w-full  rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider whitespace-nowrap"
                              >
                                {t("tableheadername.NAME")}
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider whitespace-nowrap"
                              >
                                {t("tableheadername.PHONENUMBER")}
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider whitespace-nowrap"
                              >
                                {t("tableheadername.PRICE")}
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider whitespace-nowrap"
                              >
                                {t("tableheadername.USERRATE")}
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider whitespace-nowrap"
                              >
                                {t("tableheadername.QUANTITY")}
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider whitespace-nowrap"
                              >
                                {t("tableheadername.USERQUANTITY")}
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider whitespace-nowrap"
                              >
                                {t("tableheadername.BOOKINGSTATUS")}
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider whitespace-nowrap"
                              >
                                {t("tableheadername.ACTION")}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {DemandData.slice(offset, offset + perPage).map(
                              (element, index) => {
                                return (
                                  <>
                                    <tr>
                                      <td className="px-2 py-4 whitespace-nowrap">
                                        {element.crops_name}
                                      </td>
                                      <td className="px-2 py-4 whitespace-nowrap">
                                        {element.phone}
                                      </td>
                                      <td className="px-2 py-4 whitespace-nowrap">
                                        <div className="d-flex">
                                          <span>
                                            <FaRupeeSign />
                                          </span>
                                          {element.price}
                                        </div>
                                      </td>
                                      <td className="px-2 py-4 whitespace-nowrap">
                                        <div className="d-flex">
                                          <span>
                                            <FaRupeeSign />
                                          </span>
                                          {element.user_rate}
                                        </div>
                                      </td>
                                      <td className="px-2 py-4 whitespace-nowrap">
                                        {element.quantity}
                                      </td>
                                      <td className="px-2 py-4 whitespace-nowrap">
                                        {element.user_quantity}
                                      </td>
                                      <td className="px-2 py-4 whitespace-nowrap">
                                        <span
                                          className={`rounded-full text-white ${element.bookingstatus === "Pending"
                                            ? "bg-yellow-500  px-4 py-2"
                                            : element.bookingstatus ===
                                              "Completed"
                                              ? "bg-green-500  px-3 py-2"
                                              : element.bookingstatus ===
                                                "Rejected" || "Closed"
                                                ? "bg-red-600  px-4 py-2"
                                                : ""
                                            }`}
                                        >
                                          {element.bookingstatus}
                                        </span>
                                      </td>
                                      <td className="px-2 py-2 text-sm text-center dropdown-container">
                                        <button
                                          type="button"
                                          className="inline-block text-gray-500 hover:text-gray-700"
                                          onClick={() => toggleDropdown(index)}
                                        >
                                          <svg
                                            className="inline-block h-6 w-6 fill-current"
                                            viewBox="0 0 24 24"
                                          >
                                            <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                          </svg>
                                        </button>
                                        {dropdownOpen === index && (
                                          <Dropdown.Menu
                                            show
                                            className="right-[58px]"
                                          >
                                            <Dropdown.Item>
                                              <NavLink
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                to={`/demand-details/${window.btoa(
                                                  element.crops_id
                                                )}`}
                                              >
                                                {t("dropdownoption.View")}
                                              </NavLink>
                                              {element.bookingstatus ===
                                                "Closed" ? null : (
                                                <>
                                                  {element.bookingstatus ===
                                                    "Completed" ? null : (
                                                    <NavLink
                                                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                      onClick={() => {
                                                        setLgShow(true);
                                                        setContactid(
                                                          element.id
                                                        );
                                                      }}
                                                    >
                                                      {t(
                                                        "dropdownoption.CompleteDemand"
                                                      )}
                                                    </NavLink>
                                                  )}
                                                  {element.bookingstatus ===
                                                    "Pending" ? null : (
                                                    <button
                                                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                      onClick={() => {
                                                        handlePending(
                                                          element.id
                                                        );
                                                      }}
                                                    >
                                                      {t(
                                                        "dropdownoption.Pending"
                                                      )}
                                                    </button>
                                                  )}
                                                  {element.bookingstatus ===
                                                    "Rejected" ? null : (
                                                    <button
                                                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                      onClick={() => {
                                                        handleRejected(
                                                          element.id
                                                        );
                                                      }}
                                                    >
                                                      {t(
                                                        "dropdownoption.Rejected"
                                                      )}
                                                    </button>
                                                  )}
                                                </>
                                              )}
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        )}
                                      </td>
                                    </tr>
                                  </>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
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
                </>
              )}
              <ConfirmStatus
                show={lgShow}
                close={() => setLgShow(false)}
                contactid={contactid}
                mydemandfun={mydemandfun}
                headingname="Demand"
              />
            </div>
          </div>
        )}
      </div>
      <Modal
        size="md"
        show={showclosecroppoup}
        onHide={handleClose}
        centered="true"
      >
        <Modal.Header closeButton>
          <h1>Close supply</h1>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to close this supply?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="bg-red-600"
            onClick={handleClose}
          >
            No
          </Button>
          <Button variant="primary" onClick={() => handleCloseCrop(contactid)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
}
