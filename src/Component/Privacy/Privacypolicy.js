import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";
import banner1 from "../../Theme/topsectionimage3.jpg";
const Privacypolicy = () => {
  const { i18n, t } = useTranslation();
  return (
    <>
      <section
        id="banner"
        className="relative bg-cover bg-center py-32"
        style={{ backgroundImage: `url(${banner1})` }}
      >
        <div className="absolute inset-0 bg-green-900 opacity-70"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="text-box">
            <h1 className="text-white text-2xl md:text-4xl font-bold mb-4">
            {t("footer.footerPrivacy")}
            </h1>
          </div>
        </div>
      </section>

      <div className="term-0">
        <Container>
          <Row>
          <Col md={12}>
              <div className="mt-4 mb-4">
                <h5 className="text-[28px] font-semibold"> {t("term&condistion.OwnershipandUseofBrand")}</h5>
                <p className="text-gray-500  leading-6">
                {t("term&condistion.OwnershipandUseofBrandpera")}
                </p>
                <h5 className="text-[20px] font-semibold mt-2 mb-2">
                   {t("term&condistion.PlatformServices")}
                </h5>
                <p className="text-gray-500  leading-6">
                {t("term&condistion.PlatformServicespera")}
                </p>
                <h5 className="text-[20px] font-semibold mt-2 mb-2">
                     {t("term&condistion.ResponsibilitiesofBuyersandSellers")}
                </h5>
                <p className="text-gray-500  leading-6">
                {t("term&condistion.ResponsibilitiesofBuyersandSellerspera")}
                </p>
                <h5 className="text-[20px] font-semibold mt-2 mb-2">
               {t("term&condistion.TransportationandLogistics")}
                </h5>
                <p className="text-gray-500  leading-6">
                {t("term&condistion.TransportationandLogisticspera")}
                </p>
                <h5 className="text-[20px] font-semibold mt-2 mb-2">
                 {t("term&condistion.PaymentProcessing")}
                </h5>
                <p className="text-gray-500  leading-6">
                {t("term&condistion.PaymentProcessingpera")}
                </p>

                <h5 className="text-[20px] font-semibold mt-2 mb-2">
                 {t("term&condistion.CompliancewithIndianLaws")}
                </h5>
                <p className="text-gray-500  leading-6">
                {t("term&condistion.CompliancewithIndianLawspera")}
                </p>

                <h5 className="text-[20px] font-semibold mt-2 mb-2">
                {t("term&condistion.DisputeResolution")}
                </h5>
                <p className="text-gray-500  leading-6">
                {t("term&condistion.DisputeResolutionpera")}
                </p>

                <h5 className="text-[20px] font-semibold mt-2 mb-2">
                   {t("term&condistion.GoverningLaw")}
                </h5>
                <p className="text-gray-500  leading-6">
                {t("term&condistion.GoverningLawpera")}
                </p>

                <h5 className="text-[20px] font-semibold mt-2 mb-2">
                     {t("term&condistion.PrivacyPolicy")}
                </h5>
                <p className="text-gray-500  leading-6">
                {t("term&condistion.PrivacyPolicypera")}
                </p>

              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Privacypolicy;
