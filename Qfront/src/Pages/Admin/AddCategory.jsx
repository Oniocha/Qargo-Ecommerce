import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../API_CALLS/Auth/authMethods";
import { createCategory } from "../../API_CALLS/vendorApis";
import { VendorLinks } from "../../components/Dashboard/Dashboard";

import "../Accounts/accounts-styles.scss";

const AddCategory = () => {
  const [name, setName] = useState(""),
    [error, setError] = useState(false),
    [success, setSuccess] = useState(false);

  //destructuring localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    let input = e.target.value;
    setError(false);
    setSuccess(false);
    setName(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    //Process data from api call
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setName("");
        setError(false);
        setSuccess(true);
      }
    });
  };

  const newCategory = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group card contained">
          <h4>Category Name</h4>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange}
          />
          <hr />
          <button className="btn btn-action">Create Category</button>
        </div>
      </form>
    );
  };

  const showError = () => {
    if (error) {
      return (
        <div className="alert alert-danger" style={{ textAlign: "center" }}>
          <span> Category already exists</span>
        </div>
      );
    }
  };
  const showSuccess = () => {
    if (success) {
      return (
        <div className="alert alert-success" style={{ textAlign: "center" }}>
          <span>Category succesfully created</span>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="user-account">
        {showError()}
        {showSuccess()}
        <div className="container account-page">
          <h2 className="account-title">
            <Link to="/partners/account">Your Vendor Account</Link>
          </h2>
          <span>{` > `}</span>
          <h2 className="account-title">Create Category</h2>
          <div className="row">
            <div className="col-lg-3 col-xl-3 col-md-3 col-sm-12">
              <VendorLinks />
            </div>
            <div className="container col-lg-6 col-xl-6 col-md-6 col-sm-12">
              {newCategory()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
