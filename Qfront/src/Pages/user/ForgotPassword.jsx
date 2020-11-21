import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetMail } from "../../API_CALLS/Auth/authMethods";
import Qargo from "../../images/Qargo.png";

import "./styles.scss";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [utils, setUtils] = useState({
    loading: false,
    error: false,
    success: false,
  });

  const { loading, error, success } = utils;

  const handleChange = (e) => {
    setUtils({ ...utils, loading: false });
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUtils({ error: "", loading: true, success: "" });
    sendPasswordResetMail(email).then((data) => {
      console.log(data);
      if (data.error) {
        setUtils({
          loading: false,
          error: data.error,
        });
      } else {
        setUtils({
          error: false,
          loading: false,
          success: data.message,
        });
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
          Sending reset token...
        </button>
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        {success}
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
          <h3>Forgot your password?</h3>
          {showError()}
          {showSuccess()}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">
                Enter the email address associated with your account, and we’ll
                email you a link to reset your password.
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
            </div>

            {loading ? (
              showLoading()
            ) : (
              <button className="btn btn-action">
                Send password reset token
              </button>
            )}
          </form>
          <div style={{ textAlign: "center" }}>
            <span>
              <Link to="/signin">Go back to sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
