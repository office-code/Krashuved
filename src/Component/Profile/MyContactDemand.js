import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { HiDotsVertical } from "react-icons/hi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Sidebar from "./Sidebar"
import Navbar from "../../Common/Nav";
import Footer from "../../Common/Footer";
export default function MyContactDemand() {
  // language
  const { i18n, t } = useTranslation();

  // const [isOpen, setIsOpen] = useState(null);
  // const toggleDropdown = (id) => {
  //   setIsOpen((prev) => (prev === id ? null : id));
  // };
  const navigate = useNavigate();
  // model
  const [imagepopup, setImagePopup] = useState(false)
  const [showpopupimage, setShowPopupImage] = useState("")

  function handleCloseImagePopup() { setImagePopup(false) }

  // loder
  const { promiseInProgress } = usePromiseTracker();

  // state
  const [DemandData, setDemandData] = useState([]);
  const [perPage] = useState(4);
  const [PageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  // const [deletestatus, setdeletestatus] = useState(false);


  // const showToastMessage = (data) => {
  //   toast.success(data, {
  //     position: toast.POSITION.TOP_CENTER,
  //   });
  // };

  const showToastMessageone = (data) => {
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  // api calling
  useEffect(() => {
    mycontactdemandfun();
  }, []);

  function mycontactdemandfun() {
    const header = {
      Authorization: JSON.parse(localStorage.getItem("token")),
      "Content-Type": "application/json",
    };
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/mybid`,
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
            localStorage.removeItem("token");
            showToastMessageone(error.response.data.message)
            navigate("/login", { replace: true });
          }
        })
    );
  }

  // pagenation  onclick function
  const handlePageClick = (selected) => {
    const selectedPage = selected.selected;
    setOffset(selectedPage * perPage);
  };

  // function handleDelete(id) {
  //   const bodyFormData = new FormData();
  //   bodyFormData.append("contact_id", id);
  //   const url = `${process.env.REACT_APP_BASE_URL}/contactdeletebyuser`;

  //   axios
  //     .post(url, bodyFormData, {
  //       "Content-Type": "multipart/form-data",
  //       headers: {
  //         Authorization: JSON.parse(localStorage.getItem("token")),
  //       },
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setdeletestatus(!deletestatus);
  //         showToastMessage(response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response.status == 401) {
  //         localStorage.removeItem("token");
  //         showToastMessageone(error.response.data.message)
  //         navigate("/login", { replace: true });
  //       }
  //     });
  // }
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
              <div className="bg-white px-4">
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
                  <div className="account-area  user-profile-box">
                    {DemandData.length === 0 ? (
                      <div className="pb-4 pt-4">
                        <p className="text-center">
                          {t("demand_list_data_show_messages.MyContact")}
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
                                      className="px-2 py-3 whitespace-nowrap text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                    >
                                      {t("tableheadername.IMAGE")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-2 py-3 text-left whitespace-nowrap text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                    >
                                      {t("tableheadername.NAME")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-2 py-3 text-left whitespace-nowrap text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                    >
                                      {t("tableheadername.PRICE")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-2 py-3 text-left whitespace-nowrap text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                    >
                                      {t("tableheadername.USERRATE")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-2 py-3 text-left whitespace-nowrap text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                    >
                                      {t("tableheadername.QUANTITY")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-2 py-3 text-left whitespace-nowrap text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                    >
                                      {t("tableheadername.USERQUANTITY")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-2 py-3 text-left whitespace-nowrap text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                    >
                                      {t("tableheadername.USERREMARKS")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-2 py-3 text-left whitespace-nowrap text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                    >
                                      {t("tableheadername.CROPSTYPE")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-2 py-3 text-left whitespace-nowrap text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                    >
                                      {t("tableheadername.STATUS")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-2 py-3 text-left whitespace-nowrap text-xs font-semibold text-gray-900 uppercase tracking-wider"
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
                                            <td className="px-0 py-2 whitespace-nowrap">
                                              <img
                                                src={element.crops_image}
                                                onClick={() => {
                                                  setImagePopup(true);
                                                  setShowPopupImage(element.crops_image)
                                                }}
                                                className="w-24 h-24 cursor-pointer"
                                                alt="img_events"
                                              />
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                              {element.crops_name}
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                              <div className="d-flex">
                                                <span>
                                                  <FaRupeeSign />
                                                </span>
                                                {element.price}
                                              </div>
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                              <div className="d-flex">
                                                <span>
                                                  <FaRupeeSign />
                                                </span>
                                                {element.user_rate}
                                              </div>
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                              {element.quantity}
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                              {element.user_quantity}
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                              <OverlayTrigger
                                                placement="bottom"
                                                overlay={<Tooltip id="button-tooltip-2">{element.user_remarks}</Tooltip>}
                                              >
                                                <p className="overflow-hidden text-ellipsis line-clamp-0 w-40">{element.user_remarks}</p>
                                              </OverlayTrigger>
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                              {element.crops_type}
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap">
                                              <span
                                                className={`rounded-full text-white ${element.bookingstatus === 'Pending' ? 'bg-yellow-500  px-4 py-2' :
                                                  element.bookingstatus === 'Completed' ? 'bg-green-500  px-3 py-2' :
                                                    element.bookingstatus === 'Rejected' || 'CLOSED' ? 'bg-red-600  px-4 py-2' :
                                                      ''
                                                  }`}
                                              >
                                                {element.bookingstatus}
                                              </span>
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
                                                        <OverlayTrigger
                                                          placement="bottom"
                                                          overlay={<Tooltip id="button-tooltip-2">{element.remarks}</Tooltip>}
                                                        >
                                                          <p className="overflow-hidden text-ellipsis line-clamp-0 w-40">{element.remarks}</p>
                                                        </OverlayTrigger>
                                                      </> : null}
                                                  </div>
                                                )}
                                              </p>
                                            </td>
                                            <td className="px-2 py-2 whitespace-nowrap dropdown-container">
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
                                                      to={`/demand-details/${window.btoa(element.crops_id)}`}
                                                    >
                                                      {t("dropdownoption.View")}
                                                    </NavLink>
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
                  </div>
                )}
                <Modal
                  size="md"
                  show={imagepopup}
                  onHide={handleCloseImagePopup}
                  centered="true"
                  animation="true"
                >
                  <Modal.Body className="p-0">
                    <p onClick={handleCloseImagePopup} className="absolute z-50 right-2 top-2 text-white text-3xl cursor-pointer"><MdClose /></p>
                    <img
                      src={showpopupimage}
                      className="w-full"
                      alt="img_events"
                    />
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
