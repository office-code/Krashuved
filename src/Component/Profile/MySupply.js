import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import CreateCrop from "./CreateCrop";
import UpdateCrop from "./UpdateCrop";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Sidebar from "./Sidebar"
import Navbar from "../../Common/Nav";
import Footer from "../../Common/Footer";
export default function MySupply() {

  // language
  const { i18n, t } = useTranslation();

  // hooks
  const navigate = useNavigate();

  // loder
  const { promiseInProgress } = usePromiseTracker();

  // state
  const [SupplyData, setSupplyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [perPage] = useState(4);
  const [PageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);

  // model state
  const [lgShow, setLgShow] = useState(false);
  const [lgShowUpdate, setLgShowUpdate] = useState(false);
  const [cropid, setCropid] = useState();
  const [deletestatus, setdeletestatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // pagenation onclick function
  const handlePageClick = (selected) => {
    const selectedPage = selected.selected;
    setOffset(selectedPage * perPage);
  };

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


  // api calling funtion mysupplylist
  useEffect(() => {
    mydemandfun();
  }, [deletestatus]);

  function mydemandfun() {
    const header = {
      Authorization: JSON.parse(localStorage.getItem("token")),
      "Content-Type": "application/json",
    };
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/mysupplylist`,
      headers: header,
    };
    trackPromise(
      axios
        .request(config)
        .then((response) => {
          setSupplyData(response.data);
          setFilteredData(response.data);
          setPageCount(Math.ceil(response.data.length / perPage));
        })
        .catch((error) => {
          if (error.response.status == 401) {
            showToastMessageone(error.response.data.message)
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
          }
        })
    );
  }

  // model state
  const [showdeletepoup, setShowDeletePoup] = useState(false);
  const [imagepopup, setImagePopup] = useState(false)
  const [showpopupimage, setShowPopupImage] = useState("")


  // delete function
  function handleDelete(id) {
    const bodyFormData = new FormData();
    bodyFormData.append("crops_id", id);
    const url = `${process.env.REACT_APP_BASE_URL}/deletecrop`;
    axios
      .post(url, bodyFormData, {
        "Content-Type": "multipart/form-data",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setShowDeletePoup(false)
          setdeletestatus(!deletestatus);
          showToastMessage(response.data);
        } else if (response.status === 201) {
          setShowDeletePoup(false)
          showToastMessageone(response.data.message)
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          showToastMessageone(error.response.data.message)
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
      });
  }

  function handleClose() { setShowDeletePoup(false) };

  function handleCloseImagePopup() { setImagePopup(false) }


  // search functionality
  useEffect(() => {
    const filtered = SupplyData.filter((element) =>
      element.crops_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    setPageCount(Math.ceil(filtered.length / perPage));
    setOffset(0); // Reset to first page on new search
  }, [searchQuery, SupplyData]);

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
              <div className="bg-white px-4 py-4">
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
                    <div className="account-area  user-profile-box">
                      <div className="flex justify-between items-center py-4">
                        <div className="w-full max-w-xs">
                          <input
                            type="search"
                            placeholder="search type..."
                            className="w-full px-4 h-12 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="ml-4">
                          <button
                            className="px-4 py-2 bg-lime-950 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                            onClick={() => setLgShow(true)}
                          >
                            {t("myprofiledemand&supply.Create")}
                          </button>
                        </div>
                      </div>
                      {filteredData.length === 0 ? (
                        <div className="pb-4">
                          <p className="text-center">
                            {t("supply_list_data_show_messages.Supply")}
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
                                        className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                      >
                                        {t("tableheadername.IMAGE")}
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                      >
                                        {t("tableheadername.NAME")}
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                      >
                                        {t("tableheadername.QUANTITY")}
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                      >
                                        {t("tableheadername.PRICE")}
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                      >
                                        {t("tableheadername.STATUS")}
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                                      >
                                        {t("tableheadername.ACTION")}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredData.slice(offset, offset + perPage).map(
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
                                                  }
                                                  }
                                                  className="w-24 h-24 cursor-pointer object-cover"
                                                  alt="img_events"
                                                />
                                              </td>
                                              <td className="px-2 py-2 whitespace-nowrap">
                                                {element.crops_name}
                                              </td>
                                              <td className="px-2 py-2 whitespace-nowrap">
                                                {element.qty}
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
                                                <span
                                                  className={`rounded-full  ${element.selling_status === 'OPEN' ? 'bg-lime-800 text-white  px-4 py-2' :
                                                    element.selling_status === 'COMPLETED' ? 'bg-green-500 text-white  px-3 py-2' :
                                                      element.selling_status === 'CLOSED' ? 'bg-red-500 text-white  px-3 py-2' :
                                                        ''
                                                    }`}
                                                >
                                                  {element.selling_status}
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
                                                        className="px-2 py-1 text-gray-700"
                                                        to={`/supply-details/${window.btoa(element.crops_id)}`}
                                                      >
                                                        {t("dropdownoption.View")}
                                                      </NavLink>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                      <NavLink
                                                        className="px-2 py-1 text-gray-700"
                                                        to={`/my-supply-userbids-list/${window.btoa(element.crops_id)}`}
                                                        state={{
                                                          currentvideo: element,
                                                        }}
                                                      >
                                                        {t("dropdownoption.Contact")}
                                                      </NavLink>
                                                    </Dropdown.Item>
                                                    {element.selling_status === "OPEN" ?
                                                      <Dropdown.Item>
                                                        <NavLink
                                                          className="px-2 py-1 text-gray-700"
                                                          onClick={() => {
                                                            setLgShowUpdate(true);
                                                            setCropid(element.crops_id);
                                                          }}
                                                        >
                                                          {t("dropdownoption.Edit")}
                                                        </NavLink>
                                                      </Dropdown.Item> : null
                                                    }
                                                    {element.is_crop_in_contact !== 1 && (
                                                      <Dropdown.Item>
                                                        <button
                                                          className="px-2 py-0 text-gray-700"
                                                          onClick={() => {
                                                            setShowDeletePoup(true);
                                                            setCropid(element.crops_id);
                                                          }}
                                                        >
                                                          {t("dropdownoption.Delete")}
                                                        </button>
                                                      </Dropdown.Item>
                                                    )}
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
                  </>
                )}
                <CreateCrop
                  show={lgShow}
                  close={() => setLgShow(false)}
                  cropid={cropid}
                  mydemandfun={mydemandfun}
                  SellingStatus="open_supply"
                  cropname="Supply"
                />
                <UpdateCrop
                  show={lgShowUpdate}
                  close={() => setLgShowUpdate(false)}
                  cropid={cropid}
                  mydemandfun={mydemandfun}
                  SellingStatus="open_supply"
                  cropname="Supply"
                />

                <Modal
                  size="md"
                  show={showdeletepoup}
                  onHide={handleClose}
                  centered="true"
                >
                  <Modal.Header closeButton>
                    <h1>Delete My Supply</h1>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Are you sure you want to delete this My Supply?</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" className="bg-red-600" onClick={handleClose}>
                      No
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete(cropid)}>
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>

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
