import React, { useState, Component } from "react";
import TopBar from "./TopBar";
import MiddleBar from "./MiddleBar";
import ScrollableTabsButtonAuto from "./ScrollableTabsButtonAuto";
import { useEffect } from "react";

const Header = () => {
  const [toggle, setToggle] = useState(true);

  const toggleHeader = toggle ? { display: "" } : { display: "none" };

  useEffect(() => {
    if (
      window.location.pathname === "/signin" ||
      window.location.pathname === "/signup"
    ) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, []);

  return (
    <header className={toggleHeader}>
      <TopBar />
      <MiddleBar />
      <ScrollableTabsButtonAuto />
    </header>
  );
};

export default Header;
