import React from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../../API_CALLS/Auth/authMethods";

export const VendorLinks = () => {
  return (
    <div className="card mb-5">
      <h3 className="card-header">Vendor Links</h3>
      <ul className="list-group">
        <Link to="/my-orders">
          <li className="list-group-item">Orders</li>
        </Link>
        <li className="list-group-item">
          <a
            data-toggle="collapse"
            href="#collapseProducts"
            role="button"
            aria-expanded="false"
            aria-controls="collapseProducts"
          >
            Products{" "}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-caret-right-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          </a>
        </li>
        <div className="collapse" id="collapseProducts">
          <li className="list-group-item">
            <Link to="/account/products">View products</Link>
          </li>
          <li className="list-group-item">
            <Link to="/create/product">Add product</Link>
          </li>
        </div>
        <li className="list-group-item">
          <Link to="/create/category">Create Category</Link>
        </li>
        <li className="list-group-item">
          <Link to="/create/tag">Create Tag</Link>
        </li>
        <li className="list-group-item">
          <Link to="/cart">View Cart</Link>
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

export const VendorInformation = () => {
  const {
    user: { name, email, username, mobile, role },
  } = isAuthenticated();
  return (
    <div className="card mb-5">
      <h3 className="card-header">Vendor Information</h3>
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

export const PurchaseHistory = () => {
  return (
    <div className="card mb-5">
      <h3 className="card-header">Purchase History</h3>
      <ul className="list-group">
        <li className="list-group-item">History</li>
      </ul>
    </div>
  );
};
