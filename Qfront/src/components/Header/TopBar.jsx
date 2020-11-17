import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../API_CALLS/Auth/authMethods";
import Cart from "./Cart";
import Qargo from "../../images/Qargo.png";

import "./header-styles.scss";

const TopBar = ({ history }) => {
  const { user } = isAuthenticated();

  return (
    <div id="top-bar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="navbar-brand">
          <img
            src={Qargo}
            alt="Qargo Logo"
            className="brand d-block d-sm-block d-md-block d-xl-none d-lg-none"
          />
        </Link>
        <div className="d-block d-sm-block d-md-block d-xl-none d-lg-none">
          <Cart fill="inherit" className="top-cart-count" />
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item active">
                  <a href="/signin" className="nav-link">
                    Sign in <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/signup" className="nav-link">
                    Sign up
                  </a>
                </li>
              </Fragment>
            )}
            {isAuthenticated() && user.role === 0 && (
              <li className="nav-item">
                <Link to="/account">
                  <span className="nav-link clickable">
                    {`Hi, ${user.name.split(" ")[0]}!`}
                  </span>
                </Link>
              </li>
            )}
            {isAuthenticated() && user.role === 2424 && (
              <li className="nav-item">
                <Link to="/partners/account">
                  <span className="nav-link clickable">
                    {`Hi, ${user.name.split(" ")[0]}!`}
                  </span>
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Deals
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Top Brands
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link to="/" className="dropdown-item">
                  Gucci
                </Link>
                <Link to="/" className="dropdown-item">
                  Louis Vuitton
                </Link>
                <Link to="/" className="dropdown-item">
                  Ralph Lauren
                </Link>
              </div>
            </li>
            <div className="d-block d-sm-block d-md-block d-lg-none d-xl-none">
              <li className="nav-item">
                <Link to="/shop" className="nav-link">
                  All Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Need Help?
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Wishlist
                </Link>
              </li>
              {isAuthenticated() && (
                <li className="nav-item">
                  <span
                    className="nav-link clickable"
                    onClick={() => signout(() => history.push("/"))}
                  >
                    Sign out
                  </span>
                </li>
              )}
            </div>
          </ul>
          <div className="clearfix">
            <button className="btn btn-action float-right">
              Sell on Qargo
            </button>
          </div>
        </div>
        <div className="d-none d-xl-block d-lg-block">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/shop" className="nav-link">
                All Products
              </Link>
            </li>{" "}
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Need Help?
              </Link>
            </li>{" "}
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Wishlist
              </Link>
            </li>{" "}
            {isAuthenticated() && (
              <li className="nav-item">
                <span
                  className="nav-link clickable"
                  onClick={() => signout(() => history.push("/"))}
                >
                  Sign out
                </span>
              </li>
            )}
          </ul>
        </div>{" "}
      </nav>
    </div>
  );
};

export default withRouter(TopBar);
