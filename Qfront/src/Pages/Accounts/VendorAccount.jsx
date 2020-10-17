import React, { useEffect } from "react";
import {
  VendorLinks,
  VendorInformation,
  PurchaseHistory,
} from "../../components/Dashboard/Dashboard";

import "./accounts-styles.scss";

const VendorAccount = () => {
  useEffect(() => {
    document.title = "Qargo - Your Vendor Account";
  }, []);

  return (
    <div className="user-account">
      <div className="container account-page">
        <h2 className="account-title">Your Vendor Account</h2>
        <div className="row">
          <div className="col-lg-3 col-xl-3 col-md-3 col-sm-12">
            <VendorLinks />
          </div>
          <div className="col-lg-9 col-xl-9 col-md-9 col-sm-12">
            <VendorInformation />
            <PurchaseHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAccount;
