import React from "react";
import { Link } from "react-router-dom";
import Qargo from "../../images/Qargo-white.png";
import SearchBar from "../SearchBar/SearchBar";
import Cart from "./Cart";

const MiddleBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg middle-bar">
        <Link to="/" className="navbar-brand">
          <img
            src={Qargo}
            alt="Qargo Logo"
            className="brand d-none d-xl-block d-lg-block"
          />
        </Link>
        <SearchBar />
        <div className="d-none d-xl-block d-lg-block">
          <Cart fill="white" className="mid-cart-count" />
        </div>
      </nav>
    </div>
  );
};

export default MiddleBar;
