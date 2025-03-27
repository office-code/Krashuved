import React from "react";
import blogImg from "../../Theme/blog-img.jpg";
import blogImg01 from "../../Theme/blog-img-01.jpg";
import blogImg02 from "../../Theme/blog-img-02.jpg";
import bloguser from "../../Theme/bloguser.png";
import bloguser1 from "../../Theme/bloguser1.png";
import bloguser2 from "../../Theme/bloguser2.png";
import { NavLink } from "react-router-dom";
import Nav from "../../Common/Nav";
import Footer from "../../Common/Footer";
import {
  FaSearch,
  FaRegUser,
  FaRegHeart,
  FaRegCalendarAlt,
} from "react-icons/fa";
const Blog_details = () => {
  return (
    <>
      <Nav />
      <section className="bg-album relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto">
          <div className="gallry-heading">
            <h4>Blog details</h4>
          </div>
        </div>
      </section>

      <div className="py-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-2/3 px-4">
              <div className="bg-white p-6 mt-0">
                <div className="post-img">
                  <img src={blogImg} alt="blog" className="w-full" />
                </div>
                <div className="post-review mt-4">
                  <h1 className="post-title mt-3 text-2xl font-bold">
                    Fresh Fruits & Vegetables in our New Markets
                  </h1>
                  <div className="flex mt-3">
                    <div className="flex items-center mr-4">
                      <i className="text-yellow-500">
                        <FaRegUser />
                      </i>
                      <h6 className="ml-2 text-sm">Rahim</h6>
                    </div>
                    <div className="flex items-center mr-4">
                      <i className="text-yellow-500">
                        <FaRegHeart />
                      </i>
                      <h6 className="ml-2 text-sm">1.3k</h6>
                    </div>
                    <div className="flex items-center">
                      <i className="text-yellow-500">
                        <FaRegCalendarAlt />
                      </i>
                      <h6 className="ml-2 text-sm">30 Jun 2024</h6>
                    </div>
                  </div>
                  <p className="mt-4 text-base leading-relaxed">
                    Ballan wrasse climbing gourami amur pike Arctic char,
                    steelhead sprat sea lamprey grunion. Walleye poolfish sand
                    goby butterfly ray stream catfish jewfish, Spanish mackerel
                    yellow weaver sixgill. Sandperch flyingfish yellowfin
                    cutthroat trout grouper whitebait horsefish bullhead shark
                    California
                  </p>
                  <p className="mt-4 text-base leading-relaxed">
                    Smoothtongue, striped burrfish threadtail saber-toothed
                    blenny. Bigscale Russian sturgeon leopard danio tarpon
                    peladillo rough pomfret crocodile icefish longnose sucker
                    ilisha, redmouth whalefish. Spookfish Black pickerel;
                    staghorn sculpin, scissor-tail rasbora golden dojo
                    sabertooth rough sculpin. Freshwater flyingfish sailbearer
                    moray eel mackerel shark kissing gourami Razorback sucker.
                    Snailfish, pelagic cod stingfish seamoth worm eel salmon,
                    Rasbora yellowtail horse mackerel blue triggerfish catfish.
                  </p>
                </div>
              </div>

              <div className="comments-area mt-4 bg-white p-6">
                <div className="comment-list-outer">
                  <h2 className="comments-title text-lg font-bold">
                    Recent Comment(3)
                  </h2>
                  <ol className="comment-list space-y-6">
                    <li className="comment">
                      <div className="comment-body">
                        <div className="comment-content">
                          <p>
                            Lorem ipsum dolor sit amet, consec tetuere adipis
                            cing elit. Lorem ipsum dolor sit amet, consectetuer
                            adipiscing elit. Etpat.Elementum Mauris suscipit
                            lectus ut pharetra
                          </p>
                        </div>
                        <div className="comment-meta flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <div className="comment-img">
                              <img
                                src={bloguser}
                                alt="Image"
                                className="avatar rounded-full w-20 h-20"
                              />
                            </div>
                            <div className="comment-heading ml-3">
                              <a href="#" className="nm font-bold text-black">
                                Abdul Mujib
                              </a>
                              <p className="text-sm text-gray-600">
                                3 days ago
                              </p>
                            </div>
                          </div>
                          <div className="reply">
                            <a
                              href="#"
                              className="comment-reply-link text-green-700 font-semibold flex items-center"
                            >
                              <span> Reply</span>
                              <i className="fas fa-long-arrow-alt-right ml-1"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <ol className="children ml-10 mt-4 space-y-6">
                        <li className="comment">
                          <div className="comment-body">
                            <div className="comment-content">
                              <p>
                                Lorem ipsum dolor sit amet, consec tetuere
                                adipis cing elit. Lorem ipsum dolor sit amet,
                                consectetuer adipiscing elit.
                              </p>
                            </div>
                            <div className="comment-meta flex justify-between items-center mt-4">
                              <div className="flex items-center">
                                <div className="comment-img">
                                  <img
                                    src={bloguser1}
                                    alt="Image"
                                    className="avatar rounded-full w-20 h-20"
                                  />
                                </div>
                                <div className="comment-heading ml-3">
                                  <a
                                    href="#"
                                    className="nm font-bold text-black"
                                  >
                                    Abdul Rahim
                                  </a>
                                  <p className="text-sm text-gray-600">
                                    2 days ago
                                  </p>
                                </div>
                              </div>
                              <div className="reply">
                                <a
                                  href="#"
                                  className="comment-reply-link text-green-700 font-semibold flex items-center"
                                >
                                  <span> Reply</span>
                                  <i className="fas fa-long-arrow-alt-right ml-1"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ol>

                      <div className="comment-body mt-4">
                        <div className="comment-content">
                          <p>
                            Lorem ipsum dolor sit amet, consec tetuere adipis
                            cing elit. Lorem ipsum dolor sit amet, consectetuer
                            adipiscing elit. Etpat.Elementum Mauris suscipit
                            lectus ut pharetra
                          </p>
                        </div>
                        <div className="comment-meta flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <div className="comment-img">
                              <img
                                src={bloguser2}
                                alt="Image"
                                className="avatar rounded-full w-20 h-20"
                              />
                            </div>
                            <div className="comment-heading ml-3">
                              <a href="#" className="nm font-bold text-black">
                                Abdul Hamid
                              </a>
                              <p className="text-sm text-gray-600">
                                4 days ago
                              </p>
                            </div>
                          </div>
                          <div className="reply">
                            <a
                              href="#"
                              className="comment-reply-link text-green-700 font-semibold flex items-center"
                            >
                              <span> Reply</span>
                              <i className="fas fa-long-arrow-alt-right ml-1"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="comment-respond mt-6">
                  <h4 className="comment-reply-title text-lg font-bold">
                    Add Your Comment
                  </h4>
                  <form method="post" className="comment-form mt-4">
                    <div className="flex flex-wrap -mx-4">
                      <div className="w-full md:w-1/2 px-4">
                        <div className="mb-3">
                          <input
                            className="form-control w-full p-3 border border-gray-300 rounded"
                            name="author"
                            type="text"
                            placeholder="Name*"
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 px-4">
                        <div className="mb-3">
                          <input
                            className="form-control w-full p-3 border border-gray-300 rounded"
                            name="email"
                            type="email"
                            placeholder="E-mail*"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-2">
                      <textarea
                        className="form-control w-full p-3 border border-gray-300 rounded"
                        name="comment"
                        cols="40"
                        rows="5"
                        placeholder="Write here...*"
                        required
                      ></textarea>
                    </div>
                    <p className="form-submit mb-2 mt-3 px-4">
                      <button
                        type="submit"
                        className="bg-green-800 text-white py-2 px-4 rounded-full"
                      >
                        <span>SEND MESSAGE</span>
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 px-4">
              <div className="atf-widget atf-sidebar-widget bg-white p-6 mt-0 mb-6">
                <h3 className="atf-widget-title text-lg font-bold mb-3">
                  Search
                </h3>
                <div className="relative blog_search">
                  <input
                    type="text"
                    className="form-control w-full p-3 border border-gray-300 rounded"
                    placeholder="Search..."
                  />
                  <a href="#" className="absolute top-6 right-3">
                    <FaSearch className="text-gray-500" />
                  </a>
                </div>
              </div>

              <div className="atf-widget atf-sidebar-widget bg-white p-6 mt-0 mb-6">
                <h3 className="atf-widget-title text-lg font-bold">Category</h3>
                <ul className="list-unstyled mt-4">
                  <li className="py-2 border px-2 mb-2">
                    <a href="#" className="text-gray-600 hover:text-green-700">
                      Vegetable
                    </a>
                  </li>
                  <li className="py-2 border px-2 mb-2">
                    <a href="#" className="text-gray-600 hover:text-green-700">
                      Fruits
                    </a>
                  </li>
                  <li className="py-2 border px-2 mb-2">
                    <a href="#" className="text-gray-600 hover:text-green-700">
                      Salads
                    </a>
                  </li>
                  <li className="py-2 border px-2 mb-2">
                    <a href="#" className="text-gray-600 hover:text-green-700">
                      Uncategorized
                    </a>
                  </li>
                </ul>
              </div>

              <div className="atf-widget atf-sidebar-widget bg-white p-6 mt-0 mb-6">
                <h3 className="atf-widget-title text-lg font-bold">
                  Recent Posts
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-center">
                    <div className="post-img">
                      <img
                        src={blogImg01}
                        alt="Image"
                        className="rounded-lg w-20 h-16"
                      />
                    </div>
                    <div className="post-cont ml-3">
                      <h4 className="text-sm">
                        <a href="#" className="text-black hover:text-green-700">
                          Fresh Meat Saugage
                        </a>
                      </h4>
                      <span className="text-gray-600 text-xs">30 Jun 2024</span>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="post-img">
                      <img
                        src={blogImg02}
                        alt="Image"
                        className="rounded-lg w-20 h-16"
                      />
                    </div>
                    <div className="post-cont ml-3">
                      <h4 className="text-sm">
                        <a href="#" className="text-black hover:text-green-700">
                          Fresh Fruits
                        </a>
                      </h4>
                      <span className="text-gray-600 text-xs">30 Jun 2024</span>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="post-img">
                      <img
                        src={blogImg02}
                        alt="Image"
                        className="rounded-lg w-20 h-16"
                      />
                    </div>
                    <div className="post-cont ml-3">
                      <h4 className="text-sm">
                        <a href="#" className="text-black hover:text-green-700">
                          Fresh Vegetables
                        </a>
                      </h4>
                      <span className="text-gray-600 text-xs">30 Jun 2024</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="atf-widget atf-sidebar-widget bg-white p-6 mt-0 mb-6">
                <h3 className="atf-widget-title text-lg font-bold">
                  Tag Clouds
                </h3>
                <ul className="flex flex-wrap mt-4">
                  <li className="mr-2 mb-3">
                    <a
                      href="#"
                      className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full hover:bg-green-700 hover:text-white"
                    >
                      Vegetable
                    </a>
                  </li>
                  <li className="mr-2 mb-3">
                    <a
                      href="#"
                      className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full hover:bg-green-700 hover:text-white"
                    >
                      Fruits
                    </a>
                  </li>
                  <li className="mr-2 mb-2">
                    <a
                      href="#"
                      className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full hover:bg-green-700 hover:text-white"
                    >
                      Fresh
                    </a>
                  </li>
                  <li className="mr-2 mb-3">
                    <a
                      href="#"
                      className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full hover:bg-green-700 hover:text-white"
                    >
                      Salad
                    </a>
                  </li>
                  <li className="mr-2 mb-2">
                    <a
                      href="#"
                      className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full hover:bg-green-700 hover:text-white"
                    >
                      Healthy
                    </a>
                  </li>
                  <li className="mr-2 mb-3">
                    <a
                      href="#"
                      className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full hover:bg-green-700 hover:text-white"
                    >
                      Uncategorized
                    </a>
                  </li>
                </ul>
              </div>

              <div className="atf-widget atf-sidebar-widget bg-white p-6 mt-0 mb-6">
                <h3 className="atf-widget-title text-lg font-bold">Archives</h3>
                <ul className="list-unstyled mt-3">
                  <li className="py-3 border-b">
                    <a href="#" className="text-gray-600 hover:text-green-700">
                      March 2024
                    </a>
                  </li>
                  <li className="py-3 border-b">
                    <a href="#" className="text-gray-600 hover:text-green-700">
                      April 2024
                    </a>
                  </li>
                  <li className="py-3 border-b">
                    <a href="#" className="text-gray-600 hover:text-green-700">
                      May 2024
                    </a>
                  </li>
                  <li className="py-3 border-b">
                    <a href="#" className="text-gray-600 hover:text-green-700">
                      June 2024
                    </a>
                  </li>
                </ul>
              </div>

              <div className="atf-widget atf-sidebar-widget bg-white p-6 mt-0 mb-6">
                <h3 className="atf-widget-title text-lg font-bold">Gallery</h3>
                <ul className="gallery row mt-4">
                  <li className="col-4">
                    <a href="#">
                      <img
                        src={bloguser1}
                        alt="Image"
                        className="w-full rounded-lg mb-2"
                      />
                    </a>
                  </li>
                  <li className="col-4">
                    <a href="#">
                      <img
                        src={bloguser2}
                        alt="Image"
                        className="w-full rounded-lg mb-2"
                      />
                    </a>
                  </li>
                  <li className="col-4">
                    <a href="#">
                      <img
                        src={bloguser}
                        alt="Image"
                        className="w-full rounded-lg mb-2"
                      />
                    </a>
                  </li>
                  <li className="col-4">
                    <a href="#">
                      <img
                        src={bloguser1}
                        alt="Image"
                        className="w-full rounded-lg"
                      />
                    </a>
                  </li>
                  <li className="col-4">
                    <a href="#">
                      <img
                        src={bloguser2}
                        alt="Image"
                        className="w-full rounded-lg"
                      />
                    </a>
                  </li>
                  <li className="col-4">
                    <a href="#">
                      <img
                        src={bloguser}
                        alt="Image"
                        className="w-full rounded-lg"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog_details;
