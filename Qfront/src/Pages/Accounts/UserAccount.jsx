import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../API_CALLS/Auth/authMethods";

import "./accounts-styles.scss";

const UserAccount = () => {
  useEffect(() => {
    document.title = "Qargo - Your Account";
  }, []);

  const redirectUser = () => {
    if (isAuthenticated() && isAuthenticated().user.role === 0) {
      return;
    } else {
      return <Redirect to="/partners/account" />;
    }
  };

  const {
    user: { name, email, username, mobile, role },
  } = isAuthenticated();

  const usefulLinks = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Useful Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="list-group-item">
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li className="list-group-item">
            <Link to="/account/update">Update profile</Link>
          </li>
          <li className="list-group-item">
            <Link to="/security">Security Settings</Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInformation = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <span>Name:</span>
            <br />
            {name}{" "}
          </li>
          <li className="list-group-item">
            <span>Email:</span>
            <br />
            {email}{" "}
          </li>
          <li className="list-group-item">
            <span>Username:</span>
            <br />
            {`@${username}`}{" "}
          </li>
          {mobile ? (
            <li className="list-group-item">
              <span>Mobile number:</span>
              <br />
              {mobile}{" "}
            </li>
          ) : null}{" "}
          <li className="list-group-item">
            <span>Role:</span>
            <br />
            {role === 0 ? "Registered User" : role === 1 ? "Vendor" : ""}{" "}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase History</h3>
        <ul className="list-group">
          <li className="list-group-item">Orders</li>
          <li className="list-group-item">History</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="user-account">
      {redirectUser()}
      <div className="container account-page">
        <h2 className="account-title">Your Account</h2>
        <div className="row">
          <div className="col-lg-3 col-xl-3 col-md-3 col-sm-12">
            {usefulLinks()}
          </div>
          <div className="col-lg-9 col-xl-9 col-md-9 col-sm-12">
            {userInformation()}
            {purchaseHistory()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
