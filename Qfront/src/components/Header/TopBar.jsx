import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../API_CALLS/Auth/authMethods";
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
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            className="bi bi-bag"
            fill="inherit"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z"
            />
          </svg>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item active">
                  <Link to="/signin" className="nav-link">
                    Sign in <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Sign up
                  </Link>
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
            {isAuthenticated() && user.role === 1 && (
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
