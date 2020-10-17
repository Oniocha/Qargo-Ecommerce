import React from "react";
import { Link } from "react-router-dom";
import Qargo from "../../images/Qargo-white.png";
import SearchBar from "../SearchBar/SearchBar";
import { cartTotal } from "../../helpers/cartHelpers";

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
          <svg
            width="2.5em"
            height="2.5em"
            viewBox="0 0 16 16"
            className="bi bi-bag cart"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z"
            />
          </svg>
          <span className="cart-count">{cartTotal()}</span>
        </div>
      </nav>
    </div>
  );
};

export default MiddleBar;
