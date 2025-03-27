import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import banner1 from "../../Theme/topsectionimage3.jpg";
import { useTranslation } from "react-i18next";
const Aboutus = () => {
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
                            About Us
                        </h1>
                    </div>
                </div>
            </section>
            <div className="m-4">
                <Container>
                    <Row>
                        <Col md={6} sm={6}>
                            <div className="bg-white p-4">
                                <h5 className="text-[25px] font-semibold mb-1 text-cyan-950"> Vision</h5>
                                <p className="text-[14px] text-gray-500 leading-6">
                                    To create an efficient Agri-ecosystem which can bring convenience, high productivity and profitability for its stakeholder
                                </p>
                            </div>
                        </Col>
                        <Col md={6} sm={6}>
                            <div className="bg-white p-4">
                                <h5 className="text-[25px] font-semibold mb-1 text-cyan-950">
                                    Mission                </h5>
                                <p className="text-[14px] text-gray-500 leading-6">
                                    To use technology to bridge the gap between Agri supply chain stakeholders
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Aboutus;
