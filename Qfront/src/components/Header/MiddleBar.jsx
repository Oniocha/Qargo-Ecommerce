import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Qargo from "../../images/Qargo-white.png";
import SearchBar from "../SearchBar/SearchBar";
import Cart from "./Cart";

const MiddleBar = ({ checkout = false }) => {
  const checkoutMargin = checkout ? "mb-5" : "";

  return (
    <div className={checkoutMargin}>
      <nav className="navbar navbar-expand-lg middle-bar">
        <Link to="/" className="navbar-brand">
          <img
            src={Qargo}
            alt="Qargo Logo"
            className="brand d-none d-xl-block d-lg-block"
          />
        </Link>
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
