import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Qargo from "../../images/Qargo-white.png";
import SearchBar from "../SearchBar/SearchBar";
import Cart from "./Cart";

const MiddleBar = ({ checkout = false }) => {
  const checkoutMargin = checkout ? "mb-5" : "";
  const checkoutBarColor = checkout
    ? "navbar navbar-expand-lg middle-bar"
    : "navbar navbar-expand-lg middle-bar";

  return (
    <div className={checkoutMargin}>
      <nav className={checkoutBarColor}>
        <a href="/" className="navbar-brand">
          <img
            src={Qargo}
            alt="Qargo Logo"
            className="brand d-none d-xl-block d-lg-block"
          />
        </a>
        {checkout && (
          <h2 style={{ color: "white", fontWeight: "300", fontSize: "1.5rem" }}>
            Checkout Securely
          </h2>
        )}
        {!checkout && (
          <Fragment>
            <SearchBar />
            <div className="d-none d-xl-block d-lg-block">
              <Cart fill="white" className="mid-cart-count" />
            </div>
          </Fragment>
        )}
      </nav>
    </div>
  );
};

export default MiddleBar;
