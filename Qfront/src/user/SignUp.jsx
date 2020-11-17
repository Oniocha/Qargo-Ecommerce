import React, { useState } from "react";
import { Link } from "react-router-dom";
import Qargo from "../images/Qargo.png";
import { signup, authenticate } from "../API_CALLS/Auth/authMethods";
import "./styles.scss";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    success: false,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, error: false, [name]: value });
  };

  const { name, username, email, password, error, success } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ ...form, error: "" });

    if (form.password && form.confirmPassword !== form.password) {
      setForm({ ...form, error: "Passwords do not match." });
    } else {
      signup({ name, username, email, password }).then((data) => {
        if (data.error) {
          setForm({ ...form, error: data.error, success: false });
        } else {
          setForm({
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            error: "",
            success: true,
          });
          authenticate(data, () => {
            return (window.location.href = "/");
          });
        }
      });
    }
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
  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        User succesfully created
      </div>
    );
  };

  return (
    <div>
      <Link to="/">
        <img src={Qargo} alt="logo" className="logo" />
      </Link>
      <div className="box container">
        <div className="signup-page container-fluid">
          <h3>Create new account</h3>
          {showError()}
          {showSuccess()}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">
                Your full name<sup>*</sup>
              </label>
              <input
                autoFocus
                tabIndex="2"
                type="text"
                name="name"
                className="form-control"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">
                Create username<sup>*</sup>
              </label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    @
                  </span>
                </div>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="text-muted">
                Email<sup>*</sup>
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">
                Create password<sup>*</sup>
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">
                Confirm password<sup>*</sup>
              </label>
              <input
                required
                type="password"
                name="confirmPassword"
                className="form-control"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-action">
              Create Your Qargo Account
            </button>
          </form>
          <div className="notice">
            <small>
              By creating an account, you agree to Qargo's{" "}
              <Link to="/">Conditions of Use</Link> and{" "}
              <Link to="/">Privacy Notice</Link>.
            </small>
            <hr />
            <small>
              Already have an account? <Link to="/signin">Sign in</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
