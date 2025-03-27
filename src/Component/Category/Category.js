import React, { useState, useEffect, useRef } from 'react';
import service1 from "../../Theme/service1.png";
import service2 from "../../Theme/service2.png";
import { CiLocationOn } from "react-icons/ci";
import { NavLink } from "react-router-dom";

import { FaSearch, FaRegCalendarAlt } from "react-icons/fa";
import "./Category.css";
const Category = () => {
  const [lgShow, setLgShow] = useState(false);
  // rang slider
  const [value, setValue] = useState(10);
  const sliderInputRef = useRef(null);
  const sliderThumbRef = useRef(null);
  const sliderLineRef = useRef(null);

  const showSliderValue = () => {
    if (
      sliderInputRef.current &&
      sliderThumbRef.current &&
      sliderLineRef.current
    ) {
      const bulletPosition = value / sliderInputRef.current.max;
      const space =
        sliderInputRef.current.offsetWidth - sliderThumbRef.current.offsetWidth;
      sliderThumbRef.current.style.left = bulletPosition * space + "px";
      sliderLineRef.current.style.width = value + "%";
    }
  };

  useEffect(() => {
    showSliderValue();
    window.addEventListener("resize", showSliderValue);
    return () => {
      window.removeEventListener("resize", showSliderValue);
    };
  }, [value]);
  return (
    <>
      <section className="bg-album">
        <div className="overlay"></div>
        <div className="container">
          <div className="gallry-heading">
            <h4>All categories</h4>
          </div>
        </div>
      </section>
      <div className="main-category">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="atf-widget atf-sidebar-widget mt-lg-0">
                <h3 className="atf-widget-title">Search</h3>
                <div className="blog_search">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <a href="#">
                    <i className="fas fa-search">
                      <FaSearch />
                    </i>
                  </a>
                </div>
              </div>

              <div className="atf-widget atf-sidebar-widget">
                <h3 className="atf-widget-title">All Categories</h3>
                <ul className="atf-widget-list">
                  <li>
                    <a href="#">
                      Wheat <span>(65)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Gram <span>(50)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Rice <span>(70)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Vagitable <span>(80)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Fruit <span>(53)</span>
                    </a>
                  </li>
                </ul>
                <div className="widget-types mt-5">
                  <h3 className="atf-widget-title">Type</h3>
                  <ul className="atf-widget-list">
                    <li>
                      <a href="#">Sujata</a>
                    </li>
                    <li>
                      <a href="#">Lockone</a>
                    </li>
                    <li>
                      <a href="#">Doller</a>
                    </li>
                    <li>
                      <a href="#">Wh</a>
                    </li>
                    <li>
                      <a href="#">Wheat</a>
                    </li>
                  </ul>
                </div>

                <div className="widget-quantity mt-5">
                  <h3 className="atf-widget-title">Quantity</h3>
                  <select
                    className="form-control"
                    id="quantity"
                    name="quantity"
                  >
                    <option value="0">Select Quantity</option>
                    <option value="1">50 Tons</option>
                    <option value="2">60 Tons</option>
                    <option value="3">70 Tons</option>
                    <option value="4">80 Tons</option>
                    <option value="5">90 Tons</option>
                  </select>
                </div>

                <div className="price mt-5">
                  <h3 className="atf-widget-title">Price</h3>
                  <div className="range-slider">
                    <div
                      id="slider_thumb"
                      ref={sliderThumbRef}
                      className="range-slider_thumb"
                    >
                      {value}
                    </div>
                    <div className="range-slider_line">
                      <div
                        id="slider_line"
                        ref={sliderLineRef}
                        className="range-slider_line-fill"
                      ></div>
                    </div>
                    <input
                      id="slider_input"
                      ref={sliderInputRef}
                      className="range-slider_input"
                      type="range"
                      value={value}
                      min="0"
                      max="100"
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="all-category">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="service-box">
                      <div className="serv-img">
                        <img src={service1} className="serviecs-im" />
                      </div>
                      <div className="demond-box">
                        <div className="service-title">
                          <h4>Wheat</h4>
                          <p>efficient market solutions.</p>
                        </div>

                        <div className="demans">
                          <div className="date-demand">
                            <i>
                              <FaRegCalendarAlt />
                            </i>
                            <span>13 jun 2024</span>
                          </div>
                          <div className="date-demand">
                            <i>
                              <CiLocationOn style={{ fontSize: "25px" }} />
                            </i>
                            <span>Indore</span>
                          </div>
                        </div>
                        <table className="table mt-2">
                          <thead>
                            <tr>
                              <th>Type</th>
                              <th>Price</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Sujata</td>
                              <td>3200 Rs</td>
                              <td>70 Tons</td>
                            </tr>
                            <tr>
                              <td>Lockone</td>
                              <td>4000 Rs</td>
                              <td>70 Tons</td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="demaons-btn">
                          <NavLink onClick={() => setLgShow(true)}>
                            Contact Now
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="service-box">
                      <div className="serv-img">
                        <img src={service2} className="serviecs-im" />
                      </div>
                      <div className="demond-box">
                        <div className="service-title">
                          <h4>Gram</h4>
                          <p>market hubs.</p>
                        </div>
                        <div className="demans">
                          <div className="date-demand">
                            <i>
                              <FaRegCalendarAlt />
                            </i>
                            <span>13 jun 2024</span>
                          </div>
                          <div className="date-demand">
                            <i>
                              <CiLocationOn style={{ fontSize: "25px" }} />
                            </i>
                            <span>Indore</span>
                          </div>
                        </div>
                        <table className="table mt-2">
                          <thead>
                            <tr>
                              <th>Type</th>
                              <th>Price</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Doller</td>
                              <td>5000 Rs</td>
                              <td>70 Tons</td>
                            </tr>
                            <tr>
                              <td>Desi</td>
                              <td>6000 Rs</td>
                              <td>70 Tons</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="demaons-btn">
                          <NavLink onClick={() => setLgShow(true)}>
                            Contact Now
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="service-box">
                      <div className="serv-img">
                        <img src={service1} className="serviecs-im" />
                      </div>
                      <div className="demond-box">
                        <div className="service-title">
                          <h4>Wheat</h4>
                          <p>efficient market solutions.</p>
                        </div>
                        <div className="demans">
                          <div className="date-demand">
                            <i>
                              <FaRegCalendarAlt />
                            </i>
                            <span>13 jun 2024</span>
                          </div>
                          <div className="date-demand">
                            <i>
                              <CiLocationOn style={{ fontSize: "25px" }} />
                            </i>
                            <span>Indore</span>
                          </div>
                        </div>
                        <table className="table mt-2">
                          <thead>
                            <tr>
                              <th>Type</th>
                              <th>Price</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Sujata</td>
                              <td>3200 Rs</td>
                              <td>70 Tons</td>
                            </tr>
                            <tr>
                              <td>Lockone</td>
                              <td>4000 Rs</td>
                              <td>70 Tons</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="demaons-btn">
                          <NavLink onClick={() => setLgShow(true)}>
                            Contact Now
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-4">
                    <div className="service-box">
                      <div className="serv-img">
                        <img src={service1} className="serviecs-im" />
                      </div>
                      <div className="demond-box">
                        <div className="service-title">
                          <h4>Wheat</h4>
                          <p>efficient market solutions.</p>
                        </div>

                        <div className="demans">
                          <div className="date-demand">
                            <i>
                              <FaRegCalendarAlt />
                            </i>
                            <span>13 jun 2024</span>
                          </div>
                          <div className="date-demand">
                            <i>
                              <CiLocationOn style={{ fontSize: "25px" }} />
                            </i>
                            <span>Indore</span>
                          </div>
                        </div>
                        <table className="table mt-2">
                          <thead>
                            <tr>
                              <th>Type</th>
                              <th>Price</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Sujata</td>
                              <td>3200 Rs</td>
                              <td>70 Tons</td>
                            </tr>
                            <tr>
                              <td>Lockone</td>
                              <td>4000 Rs</td>
                              <td>70 Tons</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="demaons-btn">
                          <NavLink onClick={() => setLgShow(true)}>
                            Contact Now
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="service-box">
                      <div className="serv-img">
                        <img src={service2} className="serviecs-im" />
                      </div>
                      <div className="demond-box">
                        <div className="service-title">
                          <h4>Gram</h4>
                          <p>market hubs.</p>
                        </div>
                        <div className="demans">
                          <div className="date-demand">
                            <i>
                              <FaRegCalendarAlt />
                            </i>
                            <span>13 jun 2024</span>
                          </div>
                          <div className="date-demand">
                            <i>
                              <CiLocationOn style={{ fontSize: "25px" }} />
                            </i>
                            <span>Indore</span>
                          </div>
                        </div>
                        <table class="table mt-2">
                          <thead>
                            <tr>
                              <th>Type</th>
                              <th>Price</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Doller</td>
                              <td>5000 Rs</td>
                              <td>70 Tons</td>
                            </tr>
                            <tr>
                              <td>Desi</td>
                              <td>6000 Rs</td>
                              <td>70 Tons</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="demaons-btn">
                          <NavLink onClick={() => setLgShow(true)}>
                            Contact Now
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="service-box">
                      <div className="serv-img">
                        <img src={service1} className="serviecs-im" />
                      </div>
                      <div className="demond-box">
                        <div className="service-title">
                          <h4>Wheat</h4>
                          <p>efficient market solutions.</p>
                        </div>

                        <div className="demans">
                          <div className="date-demand">
                            <i>
                              <FaRegCalendarAlt />
                            </i>
                            <span>13 jun 2024</span>
                          </div>
                          <div className="date-demand">
                            <i>
                              <CiLocationOn style={{ fontSize: "25px" }} />
                            </i>
                            <span>Indore</span>
                          </div>
                        </div>
                        <table className="table mt-2">
                          <thead>
                            <tr>
                              <th>Type</th>
                              <th>Price</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Sujata</td>
                              <td>3200 Rs</td>
                              <td>70 Tons</td>
                            </tr>
                            <tr>
                              <td>Lockone</td>
                              <td>4000 Rs</td>
                              <td>70 Tons</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="demaons-btn">
                          <NavLink onClick={() => setLgShow(true)}>
                            Contact Now
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
