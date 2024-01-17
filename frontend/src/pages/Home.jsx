import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
// import CountUp from "react-countup";

import ulala from "../assets/images/ulala.png";
import gold from "../assets/images/band.png";
import Subtitle from "../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonials/Testimonials";
import Newsletter from "../shared/Newsletter";

const Home = () => {
  return (
    <>
      {/* -------------hero section start -------------------- */}

      <section className="bgimg">
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                {/* <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div> */}
                <h1>
                  Elevate your Sikkim adventure <br />
                  <span className="highlight">with our handpicked hotels</span>
                </h1>
              </div>
            </Col>

            <SearchBar />
          </Row>
        </Container>
      </section>
      {/*----------------featured tour section start */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="gold-img">
                <img src={gold} alt="" />
              </div>
              {/* <Subtitle subtitle={"Explore"} /> */}
              <h2 className="featured__tour-title">
                Featured hotels Recommendations for you{" "}
              </h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/*----------------featured tour section end --------------*/}
      {/* -------------hero section end -------------------- */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <h2 className="services__title">We offer our best services</h2>
              {/* <h5 className="services__subtitle">What we serve</h5> */}
            </Col>
          </Row>
          <Row>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/*---------------------experience section start -------------*/}
      <section>
        <Container>
          <Row lg="6" className="space">
            <div lg="2" className="experience__img">
              <img src={ulala} alt="" className="ulala" />
            </div>
            {/* </row>
          <Row> */}
            <Col lg="6">
              <div className="experience__content">
                {/* <Subtitle subtitle={"Experience"} /> */}
                <h2>
                  Crafting excellence through experience, <br /> we humbly serve
                  you.
                </h2>
                <p>
                  Your Comfort and Satisfaction Are Always at the Heart of Our
                  Service
                  {/* <br />
                  but know how to eat first like kaushik #topalifematt!! */}
                </p>
              </div>
              {/* <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>
                    <CountUp start={0} end={1200} duration={5} />
                  </span>
                  <h6>Successful Trip</h6>
                </div>
                <div className="counter__box">
                  <span>
                    <CountUp start={0} end={2000} duration={5} separator="," />
                    {"K"}
                  </span>

                  <h6>Regular clients</h6>
                </div>
                <div className="counter__box">
                  <span>
                    <CountUp start={0} end={15} duration={2} separator="," />
                    {"K"}
                  </span>

                  <h6>Years experience</h6>
                </div>
              </div> */}

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12K+</span>
                  <h6>Successful Trip</h6>
                </div>
                <div className="counter__box">
                  <span>2K+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter__box">
                  <span>15</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/*---------------------experience section end-------------*/}
      {/*---------------------gallery section start-------------*/}
      <Container>
        <Row>
          <Col lg="12">
            <Subtitle subtitle={"Gallery"} />
            <h2 className="gallery__title">Visit our customers tour gallery</h2>
          </Col>
          <Col lg="12">
            <MasonryImagesGallery />
          </Col>
        </Row>
      </Container>
      {/*---------------------gallery section end-------------*/}
      {/*---------------------testimonial section start-------------*/}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial__title">What our fans say about us</h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>

      {/*---------------------testimonial section end-------------*/}
      <Newsletter />
    </>
  );
};

export default Home;
