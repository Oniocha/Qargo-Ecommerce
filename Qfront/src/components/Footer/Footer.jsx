import React, { useState, useEffect } from "react";
import "./styles.scss";
import TopFooter from "./TopFooter";

const Footer = () => {
  let currentPage = window.location.pathname;
  const [toggle, setToggle] = useState(false);
  const [location] = useState(currentPage);
  const toggleFooter = toggle ? { display: "" } : { display: "none" };
  const showHideFooter = () => {
    if (location === "/signin") {
      setToggle(false);
    } else if (location === "/signup") {
      setToggle(false);
    } else if (location === "/checkout") {
      setToggle(false);
    } else if (location === "/forgotpassword") {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  useEffect(() => {
    showHideFooter();

    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <div style={toggleFooter}>
      <TopFooter />
    </div>
  );
};

export default Footer;
