import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";

export default function MyContactSupply() {
  // const [isOpen, setIsOpen] = useState(null);

  // const toggleDropdown = (id) => {
  //   setIsOpen((prev) => (prev === id ? null : id));
  // };

  const navigate = useNavigate();

  // loder
  const { promiseInProgress } = usePromiseTracker();

  // state
  const [SupplyData, setSupplyData] = useState([]);
  const [perPage] = useState(6);
  const [PageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [deletestatus, setdeletestatus] = useState(false);

  // api calling
  useEffect(() => {
    mycontactsupplyfun();
  }, [deletestatus]);

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


  function mycontactsupplyfun() {
    const header = {
      Authorization: JSON.parse(localStorage.getItem("token")),
      "Content-Type": "application/json",
    };
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/mysupplycontact`,
      headers: header,
    };
    trackPromise(
      axios
        .request(config)
        .then((response) => {
          setSupplyData(response.data);
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

  function handleDelete(id) {
    const bodyFormData = new FormData();
    bodyFormData.append("contact_id", id);
    const url = `${process.env.REACT_APP_BASE_URL}/contactdeletebyuser`;

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
          showToastMessageone(error.response.data.message)
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
  return (
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
        <>
          <div className="account-area  user-profile-box">
            {SupplyData.length === 0 ? (
              <div className="pb-4 pt-4">
                <p className="text-center">
                  You have no my contact supply list available.
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
                          Image
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                        >
                          User Rate
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                        >
                          User Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                        >
                          User Remark
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {SupplyData.slice(offset, offset + perPage).map(
                        (element,index) => {
                          return (
                            <>
                              <tr>
                                <td className="px-0 py-2 whitespace-nowrap">
                                  <img
                                    src={element.crops_image}
                                    className="w-24 h-24"
                                    alt="img_events"
                                  />
                                </td>
                                <td className="px-0 py-2 text-clip  normal w-full text-[15px] text-gray-600">
                                  {element.crops_name}
                                </td>
                                <td className="px-0 py-2 whitespace-nowrap">
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
                                <td className="px-0 py-2 whitespace-nowrap">
                                  {element.quantity}
                                </td>
                                <td className="px-2 py-2 whitespace-nowrap">
                                  {element.user_quantity}
                                </td>
                                <td className="px-2 py-2 whitespace-nowrap">
                                  {element.user_remarks}
                                </td>
                                <td className="px-0 py-2 whitespace-nowrap">
                                  {element.bookingstatus}
                                  <p>
                                    {element.sold_at === 0 ? (
                                      <></>
                                    ) : (
                                      <div className="d-flex">
                                        <span>
                                          <FaRupeeSign />
                                        </span>
                                        {element.sold_at} &nbsp;
                                        {element.remarks}
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
                                            to={`/supply-details/${element.crops_id}`}
                                          >
                                            View
                                          </NavLink>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                        {element.bookingstatus === "Pending" ? (
                                            <button
                                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                              onClick={() =>
                                                handleDelete(element.id)
                                              }
                                            >
                                              Delete
                                            </button>
                                          ) : (
                                            <></>
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
          </div>
        </>
      )}
    </div>
  );
}
