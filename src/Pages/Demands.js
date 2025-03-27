import React, { useState, useRef, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import banner1 from "../Theme/topsectionimage3.jpg";
import RangeSlider from "react-range-slider-input";
import { useTranslation } from "react-i18next";
import "react-range-slider-input/dist/style.css";
import { FaRegCalendarAlt, FaRupeeSign } from "react-icons/fa";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import Nav from "../Common/Nav";
import Footer from "../Common/Footer";
const Demands = () => {
  // loder
  const { promiseInProgress } = usePromiseTracker();

  // language
  const { i18n, t } = useTranslation();

  // state
  const [Categorydata, setCategorydata] = useState([]);
  const [category, setCategory] = useState("");
  const [citydata, setCityData] = useState([]);
  const [city, setCity] = useState("");
  const [districtdata, setDistrictData] = useState([]);
  const [district, setDistrict] = useState("");
  const [type, setType] = useState("");
  const [sortby, setSortby] = useState("");
  const [listcropdata, setListCropData] = useState([]);
  const [cropsname, setCropsName] = useState("");
  const [perPage] = useState(6);
  const [PageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0)
  const [cropvariety, setCropvariety] = useState([]);
  const [cropvarietytitle, setCropvarietytitle] = useState("");
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const [chipspassdata, setChipsPassData] = useState([])
  const [chipspassid, setChipsPassId] = useState("")
  const [valueofprice, setValueOfPrice] = useState([1, 100000]);
  const [valueofquantity, setValueOfQuantity] = useState([1, 1000]);
  const [valueofcropsize, setValueOfCropSize] = useState([1, 1000])
  const [pricefrom, setPriceFrom] = useState("")
  const [priceto, setPriceTo] = useState("")
  const [quantityfrom, setQuantityFrom] = useState("")
  const [quantityto, setQuantityTo] = useState("")
  const [cropsizefrom, setCropSizeFrom] = useState("")
  const [cropsizeto, setCropSizeTo] = useState("")

  // pagenation  onclick function
  const handlePageClick = (selected) => {
    const selectedPage = selected.selected;
    setOffset(selectedPage * perPage);
  };

  // api calling cropcategorylist
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/cropcategorylist`,
    };
    axios
      .request(config)
      .then((response) => {
        setCategorydata(response.data);
      })
      .catch((error) => {
        console.log("eror");
      });
  }, [])

  // api calling cropvarietylist
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/cropvarietylist`)
      .then((response) => {
        if (response.status == 200) {
          setCropvariety(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // api calling districtlist
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

  // api calling citylist
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
        })
    }
  }, [district]);

  // api calling chipspasslist
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/chipspasslist`,
    };
    axios
      .request(config)
      .then((response) => {
        setChipsPassData(response.data);
      })
      .catch((error) => {
        console.log("eror");
      });
  }, []);

  useEffect(() => {
    for (let i = 0; i < valueofprice.length; i++) {
      setPriceFrom(valueofprice[0]);
      setPriceTo(valueofprice[1]);
    }
  }, [valueofprice]);

  useEffect(() => {
    for (let i = 0; i < valueofquantity.length; i++) {
      setQuantityFrom(valueofquantity[0]);
      setQuantityTo(valueofquantity[1]);
    }
  }, [valueofquantity]);

  useEffect(() => {
    for (let i = 0; i < valueofcropsize.length; i++) {
      setCropSizeFrom(valueofcropsize[0])
      setCropSizeTo(valueofcropsize[1])
    }
  }, [valueofcropsize])

  useEffect(() => {
    fetchCropList();
  }, [
    category, city, district,
    type, sortby, cropsname, cropvarietytitle,
    valueofprice, pricefrom, priceto,
    valueofquantity, quantityfrom, quantityto,
    valueofcropsize, cropsizefrom, cropsizeto,
    chipspassid]);

  // api calling croplist
  const fetchCropList = () => {
    setOffset(0);  // Reset offset when fetching new crop list
    trackPromise(
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/croplist`, {
          type: "demand",
          user_id: user_id,
          sort_by: sortby,
          city: city,
          dist: district,
          grading_type: type,
          crops_category_id: category,
          from_quantity: quantityfrom,
          to_quantity: quantityto,
          from_price: pricefrom,
          to_price: priceto,
          crops_name: cropsname,
          crops_variety: cropvarietytitle,
          from_crops_size: cropsizefrom,
          to_crops_size: cropsizeto,
          chips_pass: chipspassid
        })
        .then((response) => {
          if (response.status == 200) {
            setListCropData(response.data);
            setPageCount(Math.ceil(response.data.length / perPage));
          }
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  return (
    <>
      <Nav />
      <section
        className="relative bg-cover bg-center h-72"
        style={{ backgroundImage: `url(${banner1})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container relative">
          <div className="text-center">
            <h4 className="text-white font-semibold text-4xl pt-24">
              {t("demands.headingdemands")}
            </h4>
          </div>
        </div>
      </section>
      <div className="container-fluid mt-4 mb-4">
        <div className="row">
          <div className="col-md-3">
            <div className="bg-white py-3 px-4">
              <input
                placeholder="Search Type..."
                type="text"
                className="form-control mt-1 block w-full p-2 border border-gray-300 rounded-md mb-3"
                name="cropsname"
                value={cropsname}
                onChange={(e) => setCropsName(e.target.value)}
              />
              <div className="suply-widght">
                <h3 className="text-[17px] font-semibold py-3">
                  {t("suppliesanddemandsfiled.Categories")}
                </h3>
                <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">Select Category</option>
                  {Categorydata.map((type, index) => {
                    return (
                      <option key={index} value={`${type.cat_id}`}>{type.category_name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="widget-types">
                <h3 className="text-[17px] font-semibold py-3">
                  {t("suppliesanddemandsfiled.CropVariety")}
                </h3>
                <select name="cropvarietytitle" value={cropvarietytitle}
                  onChange={(e) => setCropvarietytitle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">Select Crop Variety </option>
                  {cropvariety.map((element, index) => {
                    return (
                      <option key={index} value={`${element.id}`}>
                        {element.name}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="widget-types">
                <h3 className="text-[17px] font-semibold py-3">
                  {t("suppliesanddemandsfiled.Type")}
                </h3>
                <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">Select Grading Type</option>
                  <option value="gate_cut">Gate Cut</option>
                  <option value="bilty_cut">Bilty Cut</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="widget-quantity">
                <h3 className="text-[17px] font-semibold py-3">
                  {t("suppliesanddemandsfiled.District")}
                </h3>
                <select name="district" value={district} onChange={(e) => setDistrict(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">Select District</option>
                  {districtdata.map((type, index) => {
                    return (
                      <option key={index} value={`${type.dist_id}`}>{type.dist_name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="widget-quantity">
                <h3 className="text-[17px] font-semibold py-3">
                  {t("suppliesanddemandsfiled.City")}
                </h3>
                <select name="city" value={city} onChange={(e) => setCity(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">Select City</option>
                  {citydata.map((type, index) => {
                    return (
                      <option key={index}
                        value={`${type.city_id}`}>{type.city_name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="widget-quantity">
                <h3 className="text-[17px] font-semibold py-3">
                  {t("suppliesanddemandsfiled.Sortby")}
                </h3>
                <select name="sortby" value={sortby} onChange={(e) => setSortby(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">Select Sort by</option>
                  <option value="high_to_low_qty">High To Low Quantity </option>
                  <option value="low_to_high_qty">Low To High Quantity</option>
                  <option value="high_to_low">High To Low Price</option>
                  <option value="low_to_high">Low To High Price</option>
                </select>
              </div>
              <div className="widget-types">
                <h3 className="text-[17px] font-semibold py-3">
                  {t("suppliesanddemandsfiled.ChipsPass")}
                </h3>
                <select name="chipspassid" value={chipspassid}
                  onChange={(e) => setChipsPassId(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">Select Chips Pass </option>
                  {chipspassdata.map((element, index) => {
                    return (
                      <option key={index} value={`${element.id}`}>{element.name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="widget-quantity">
                <h3 className="text-[17px] font-semibold py-3">
                  {t("suppliesanddemandsfiled.CropSize")}
                </h3>
                <RangeSlider min={1} max={1000} value={valueofcropsize} onInput={setValueOfCropSize} />
                <div className="py-3">
                  <span>{valueofcropsize[0]}</span> - <span>{valueofcropsize[1]}</span>
                </div>
              </div>
              <div className="widget-quantity">
                <h3 className="text-[17px] font-semibold py-3">
                  {t("suppliesanddemandsfiled.Quantity")}
                </h3>
                <RangeSlider min={1} max={1000} value={valueofquantity} onInput={setValueOfQuantity} />
                <div className="py-3">
                  <span >{valueofquantity[0]}</span> - <span>{valueofquantity[1]}</span>
                </div>
              </div>
              <div className="widget-quantity">
                <h3 className="text-[17px] font-semibold py-3">
                  {t("suppliesanddemandsfiled.Price")}
                </h3>
                <RangeSlider min={1} max={100000} value={valueofprice} onInput={setValueOfPrice} />
                <div className="py-3">
                  <span>{valueofprice[0]}</span> - <span>{valueofprice[1]}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="bg-white px-4 py-4">
              <div className="container-fluid">
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
                    {listcropdata.length === 0 ?
                      <div className="flex justify-center aline-center mt-4">
                        <p> {t("demand_list_data_show_messages.Demand")}</p>
                      </div>
                      :
                      <>
                        <div className="row">
                          {listcropdata.slice(offset, offset + perPage).map((element, index) => {
                            return (
                              <div className="col-lg-4" key={index}>
                                <NavLink to={`/demand-details/${window.btoa(element.crops_id)}`} >
                                  <div className="service-box bg-white rounded-lg shadow-md mb-5">
                                    <div className="serv-img">
                                      <img
                                        src={element.crops_image}
                                        className="serviecs-im w-full h-56 object-cover rounded-t-lg"
                                      />
                                    </div>
                                    <div className="demond-box p-2">
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
                                              <th className="text-sm">{t("suppliesanddemandsfiled.Type")}</th>
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
                                              <th className="text-sm"> {t("suppliesanddemandsfiled.Price")}</th>
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
                                  </div>
                                </NavLink>
                              </div>
                            );
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
                          />)}
                      </>}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Demands;
