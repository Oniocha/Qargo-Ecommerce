import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  signin,
  authenticate,
  isAuthenticated,
} from "../API_CALLS/Auth/authMethods";

import "./styles.scss";
import Qargo from "../images/Qargo.png";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "jaduntiamoah@gmail.com",
    password: "Reacted123",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, error: false, [name]: value });
  };

  const { email, password, error, loading, redirectToReferrer } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ ...form, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setForm({ ...form, error: data.error, loading: false });
      } else {
        authenticate(data, () =>
          setForm({ ...form, error: "", redirectToReferrer: true })
        );
      }
    });
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  const showLoading = () => {
    return (
      <div>
        <button className="btn btn-action" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          >
            {" "}
          </span>
          Signing in...
        </button>
      </div>
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (isAuthenticated() && isAuthenticated().user.role === 0) {
        return <Redirect to="/" />;
      }
      if (isAuthenticated() && isAuthenticated().user.role === 1) {
        return <Redirect to="/partners/account" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div>
      {redirectUser()}
      <Link to="/">
        <img src={Qargo} alt="logo" className="logo" />
      </Link>
      <div className="box container">
        <div className="signup-page container-fluid">
          <h3>Sign into your account</h3>
          {showError()}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Enter email</label>
              <input
                autoFocus
                tabIndex="2"
                type="text"
                name="email"
                className="form-control"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Enter password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch"
              />
              <label htmlFor="customSwitch" className="custom-control-label">
                Keep me signed in
              </label>
            </div>
            {loading ? (
              showLoading()
            ) : (
              <button className="btn btn-action">
                Sign into your Qargo Account
              </button>
            )}
          </form>
          <div className="notice">
            <small>
              By continuing, you agree to Qargo's{" "}
              <Link to="/">Conditions of Use</Link> and{" "}
              <Link to="/">Privacy Notice</Link>.
            </small>
            <hr />
            <small>
              New customer? <Link to="/signup">Start here</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
