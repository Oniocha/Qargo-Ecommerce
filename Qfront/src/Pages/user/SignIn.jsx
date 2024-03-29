import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  signin,
  authenticate,
  isAuthenticated,
} from "../../API_CALLS/Auth/authMethods";

import "./styles.scss";
import Qargo from "../../images/Qargo.png";
import { useEffect } from "react";

const SignIn = ({ location }) => {
  const path = location.state;
  const [prev, setPrev] = useState(undefined);
  const [form, setForm] = useState({
    email: "jaduntiamoah@gmail.com",
    password: "Reacted123",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  useEffect(() => {
    if (path !== undefined) {
      setPrev(path.prevPath);
    }

    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, loading: false, error: false, [name]: value });
  };

  const { email, password, error, loading, redirectToReferrer } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ ...form, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data?.error) {
        setForm({ ...form, error: data?.error, loading: false });
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
      if (prev !== undefined) {
        return <Redirect to="/cart" />;
      }
      if (isAuthenticated() && isAuthenticated().user.role === 0) {
        return (window.location.href = "/");
      }
      if (isAuthenticated() && isAuthenticated().user.role === 1) {
        return (window.location.href = "/partners/account");
      }
    }
    if (isAuthenticated()) {
      return (window.location.href = "/");
    }
  };

  return (
    <div>
      <div style={{ display: "none" }}>{redirectUser()}</div>
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
            {loading ? (
              showLoading()
            ) : (
              <button className="btn btn-action">
                Sign into your Qargo Account
              </button>
            )}
          </form>

          <Link to="/forgotpassword">Forgot password?</Link>

          <div className="notice mt-3">
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
