import React from "react";
import "./Business.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import merchantbusiness from "../../Theme/merchantbusiness.png";
import busnissapple from "../../Theme/busnissapple.png";
import nii from "../../Theme/nii.png";
import busnissgoogle from "../../Theme/busnissgoogle.png";
import play from "../../Theme/play.png";
import scan from "../../Theme/scan.png";
import instant from "../../Theme/instant.png";
import transaction from "../../Theme/transaction.png";
import credit from "../../Theme/credit.png";
import grow from "../../Theme/grow.png";
import { NavLink } from "react-router-dom";
import home from "../../Theme/icons/home.png";
import stor from "../../Theme/icons/stor.png";
import stor1 from "../../Theme/icons/stor1.png";
import stor2 from "../../Theme/icons/stor2.png";
import stor3 from "../../Theme/icons/stor3.png";
import stor4 from "../../Theme/icons/stor4.png";
import ondemand1 from "../../Theme/icons/ondemand1.png";
import ondemand2 from "../../Theme/icons/ondemand2.png";
import ondemand3 from "../../Theme/icons/ondemand3.png";
import ondemand4 from "../../Theme/icons/ondemand4.png";
import ondemand5 from "../../Theme/icons/ondemand5.png";
import store1 from "../../Theme/icons/store1.png";
import store2 from "../../Theme/icons/store2.png";
import bctbuniss from "../../Theme/bctbuniss.png";
import { useTranslation } from "react-i18next";
const BusinessCard = () => {
  const { i18n, t } = useTranslation();
  return (
    <>
      <div className="business-card">
        <Container>
          <Row>
            <div className="col-lg-8 col-md-8 col-sm-12 no-padding">
              <h1 className="banner-heading">
              {t("businessCard.title")}
              </h1>
              <p className="banner-content">
              {t("businessCard.paragraph")}
              </p>
              <div className="col-xs-12 no-padding">
                <a href="#" target="_blank" className="merchant_btn">
                {t("businessCard.businessCardbtn")}
                </a>
              </div>
            </div>
            <div className=" col-lg-4 col-md-4 col-sm-12 no-padding">
              <img className="mobile-image-header" src={bctbuniss} />
            </div>
          </Row>
        </Container>
      </div>

      <section className="bg-white busines">
          <div className="col-xs-12 no-padding text-center">
            <h1 className="business_head">
              <span className="chap_color"> {t("businessCard.businesstitle")}</span> {t("businessCard.businesstitle1")}
            </h1>
            <div className="col-xs-12 text-center no-padding">
              <div className="domore-content merchant-content">
              {t("businessCard.businessparagraph")}
              </div>
            </div>
            <div
              className="col-xs-12 no-padding text-center"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <img className="Bct-businnes" src={merchantbusiness} />
            </div>
            <div className="col-xs-12 no-padding text-center mer_a">
              <a href="#" target="_blank" className="merchant_btn new">
              {t("businessCard.businessCardbtn")}
              </a>

              <a href="#" className="mer_app">
                <img src={play} className="play" />
                {t("businessCard.businessCardbtn1")}
              </a>
            </div>
          </div>
      </section>

      <section className="feature-main">
        <Container>
          <Row>
            <div className="col-lg-6 col-md-12 col-sm-12 no-padding">
              <h5 className="banner-heading text-dark">
              {t("businessCard.featuressectiontitle")}
              
              </h5>
              <p className="banner-content text-dark">
              {t("businessCard.featuressectionparagraph")}
              </p>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 no-padding">
              <Row>
                <Col md={6}>
                  <div className="service_box">
                    <div className="service_icon">
                      <i>
                        <img src={scan} />
                      </i>
                    </div>
                    <h3> {t("businessCard.step")}</h3>
                    <p>
                    {t("businessCard.paragraph1")}
                    </p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="service_box">
                    <div className="service_icon">
                      <i>
                        <img src={instant} />
                      </i>
                    </div>
                    <h3> {t("businessCard.step1")}</h3>
                    <p>
                    {t("businessCard.paragraph2")}
                    </p>
                   
                  </div>
                </Col>
                <Col md={6}>
                  <div className="service_box">
                    <div className="service_icon">
                      <i>
                        <img src={transaction} />
                      </i>
                    </div>
                    <h3> {t("businessCard.step3")}</h3>
                    <p>
                    {t("businessCard.paragraph3")}
                    </p>
                   
                  </div>
                </Col>
                <Col md={6}>
                  <div className="service_box">
                    <div className="service_icon">
                      <i>
                        <img src={credit} />
                      </i>
                    </div>
                    <h3> {t("businessCard.step4")}</h3>
                    <p>
                    {t("businessCard.paragraph4")}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
      </section>
      <section className="bg-white march-dah">
        <Container>
          <Row>
            <Col lg={6} md={12}>
              <div className="marchant-dash">
                <h2> {t("businessCard.merchant")}</h2>
                <h1>{t("businessCard.merchanttitle")}</h1>
                <h5>{t("businessCard.merchanthead")}</h5>
                <ul>
                  <li>
                  {t("businessCard.merchantp")}
                  </li>
                  <li>{t("businessCard.merchantp1")}</li>
                  <li>{t("businessCard.merchantp2")}</li>
                  <li>{t("businessCard.merchantp3")}</li>
                </ul>
              </div>
            </Col>
            <Col lg={6} md={12}>
              <img className="marchnt-dashboard" src={merchantbusiness} />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="getStarted">
        <Container>
          <Row>
            <Col md={6} sm={6} xs={12}>
              <img src={nii} className="bunis" />
            </Col>
            <Col md={6} sm={6} xs={12} className=" getStarted-right">
              <h2>{t("businessCard.Registertitle")}</h2>
              <Row>
                <Col sm={4} xs={12} className="getStarted-steps">
                  <h3>1. {t("businessCard.Registerhead")}</h3>
                  <p>
                  {t("businessCard.Registerparagraph")}
                  </p>
                </Col>
                <Col sm={4} xs={12} className="getStarted-steps">
                  <h3>2. {t("businessCard.Activatehead")}</h3>
                  <p>
                  {t("businessCard.Activateparagraph")}
                  </p>
                </Col>
                <Col sm={4} xs={12} className="getStarted-steps">
                  <h3>3.  {t("businessCard.gethead")}</h3>
                  <p>
                  {t("businessCard.getparagraph")}
                  </p>
                </Col>
              </Row>
              <h5> {t("businessCard.download")}</h5>
              <div className="col-xs-12 text-center getStarted-app">
                <NavLink href="#">
                  <img src={busnissgoogle} />
                </NavLink>
                <NavLink href="#">
                  <img src={busnissapple} />
                </NavLink>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-white store">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 no-padding text-center">
              <h1 className="business_head business_head3">
              {t("businessCard.Businesshead")}
               
              </h1>
              <div className="domore-content merchant-content3">
              {t("businessCard.Businessparagraph")}
              </div>
            </div>

            <div className="col-xs-12 no-padding">
              <Container>
                <Row>
                  <div className="col-sm-4 col-xs-12 ecosystem">
                    <h5>{t("businessCard.Businesstitle")}</h5>
                    <ul>
                      <li>
                        <img src={home} />
                        {t("businessCard.Businessp")}
                      </li>
                      <li>
                        <img src={stor} />
                        {t("businessCard.Businessp1")}
                      </li>
                      <li>
                        <img src={stor1} />
                        {t("businessCard.Businessp2")}
                      </li>
                      <li>
                        <img src={stor2} />
                        {t("businessCard.Businessp3")}
                      </li>
                      <li>
                        <img src={stor3} />
                        {t("businessCard.Businessp4")}
                      </li>
                      <li>
                        <img src={stor4} />
                        {t("businessCard.Businessp5")}
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-4 col-xs-12 ecosystem">
                    <h5>{t("businessCard.servicestitle")}</h5>
                    <ul>
                      <li>
                        <img src={ondemand1} />
                        {t("businessCard.servicesp")}
                      </li>
                      <li>
                        <img src={ondemand2} />
                        {t("businessCard.servicesp1")}
                      </li>
                      <li>
                        <img src={ondemand3} />
                        {t("businessCard.servicesp2")}
                      </li>
                      <li>
                        <img src={ondemand4} />
                        {t("businessCard.servicesp3")}
                      </li>
                      <li>
                        <img src={ondemand5} />
                        {t("businessCard.servicesp4")}
                      </li>
                      <li>
                        <img src={stor4} />
                        {t("businessCard.Businessp5")}
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-4 col-xs-12 ecosystem">
                    <h5> {t("businessCard.Onlinetitle")}</h5>
                    <ul>
                      <li>
                        <img src={store1} />
                        {t("businessCard.Onlinep")}
                      </li>
                      <li>
                        <img src={store2} />
                        {t("businessCard.Onlinep1")}
                      </li>
                      <li>
                        <img src={stor4} />
                        {t("businessCard.Businessp5")}
                      </li>
                    </ul>
                  </div>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </section>

      <section className="get-start">
        <Container>
          <Row>
            <Col md={12}>
              <div className="get-start-1">
                <h2> {t("businessCard.customershead")}</h2>
                <p> {t("businessCard.customersparagraph")}</p>
                <a href="#" target="_blank" className="merchant_btn new">
                {t("businessCard.businessCardbtn")}
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BusinessCard;
