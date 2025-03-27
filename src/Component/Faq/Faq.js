import React from "react";
import "./Faq.css";
import Data from "../Homes/Ewallet.json";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useTranslation } from "react-i18next";
import Accordion from "react-bootstrap/Accordion";
const Faq = () => {
  const { i18n, t } = useTranslation();
  return (
    <>
      <div className="faq-set">
        <Container>
          <Col md={6} sm={12}>
            <h6 className="faq">{t("faq.main")}</h6>
            <h2 className="faq">{t("faq.title")}</h2>
          </Col>
        </Container>
      </div>
      <section class="faq-section">
        <Container>
          <Accordion>
            <Row>
              <Col md={6}>
                <Accordion.Item eventKey="0">
                  <div class="card">
                    <Accordion.Header>
                      {" "}
                      <div class="card-header" id="faqHeading-1">
                        <h5>
                          <span class="badge">1</span>
                          {t("faq.faqtitle1")}
                        </h5>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div class="card-body">
                        <p>{t("faq.faqparagraph1")}</p>
                      </div>
                    </Accordion.Body>
                  </div>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <div class="card">
                    <Accordion.Header>
                      <div class="card-header" id="faqHeading-1">
                        <h5>
                          <span class="badge">3</span>
                          {t("faq.faqtitle3")}
                        </h5>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div class="card-body">
                        <p>{t("faq.faqparagraph3")}</p>
                      </div>
                    </Accordion.Body>
                  </div>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <div class="card">
                    <Accordion.Header>
                      <div class="card-header" id="faqHeading-1">
                        <h5>
                          <span class="badge">5</span>
                          {t("faq.faqtitle5")}
                        </h5>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div class="card-body">
                        <p>{t("faq.faqparagraph5")}</p>
                      </div>
                    </Accordion.Body>
                  </div>
                </Accordion.Item>
              </Col>
              <Col md={6}>
                <Accordion.Item eventKey="1">
                  <div class="card">
                    <Accordion.Header>
                      <div class="card-header" id="faqHeading-1">
                        <h5>
                          <span class="badge">2</span>
                          {t("faq.faqtitle2")}
                        </h5>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div class="card-body">
                        <p>{t("faq.faqparagraph2")}</p>
                      </div>
                    </Accordion.Body>
                  </div>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <div class="card">
                    <Accordion.Header>
                      <div class="card-header" id="faqHeading-1">
                        <h5>
                          <span class="badge">4</span>
                          {t("faq.faqtitle4")}
                        </h5>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div class="card-body">
                        <p>{t("faq.faqparagraph4")}</p>
                      </div>
                    </Accordion.Body>
                  </div>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <div class="card">
                    <Accordion.Header>
                      <div class="card-header" id="faqHeading-1">
                        <h5>
                          <span class="badge">6</span>
                          {t("faq.faqtitle4")}
                        </h5>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div class="card-body">
                        <p>{t("faq.faqparagraph4")}</p>
                      </div>
                    </Accordion.Body>
                  </div>
                </Accordion.Item>
              </Col>
            </Row>
          </Accordion>
        </Container>
      </section>
    </>
  );
};

export default Faq;
