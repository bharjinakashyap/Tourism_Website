import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import Routers from "../../router/Routers";
// import HotelRegistration from "../hotel-registration/HotelRegistration";

const Layout = () => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
      {/* <HotelRegistration /> */}
    </>
  );
};

export default Layout;
