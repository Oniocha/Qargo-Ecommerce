import React from "react";

import "./styles.scss";
const TopFooter = () => {
  return (
    <div>
      <div className="footer-top">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <h5 className="text-right">Get the latest deals and more.</h5>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="input-group input-group-lg">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email address"
              />
              <div className="input-group-append">
                <button className="btn btn-action" style={{ height: "auto" }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="text-center">
              <h5>Qargo App</h5>
              <span style={{ color: "#fff" }}>Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFooter;
