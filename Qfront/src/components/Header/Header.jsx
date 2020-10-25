import React, { useState } from "react";
import TopBar from "./TopBar";
import MiddleBar from "./MiddleBar";
import ScrollableTabsButtonAuto from "./ScrollableTabsButtonAuto";
import { useEffect } from "react";

const Header = () => {
  let currentPage = window.location.pathname;
  const [toggle, setToggle] = useState(false);
  const [location] = useState(currentPage);
  const toggleHeader = toggle ? { display: "" } : { display: "none" };
  const showHideHeader = () => {
    if (location === "/signin") {
      setToggle(false);
    } else if (location === "/signup") {
      setToggle(false);
    } else if (location === "/checkout") {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  useEffect(() => {
    showHideHeader();

    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <header style={toggleHeader}>
      <TopBar />
      <MiddleBar />
      <ScrollableTabsButtonAuto />
    </header>
  );
};

export default Header;
