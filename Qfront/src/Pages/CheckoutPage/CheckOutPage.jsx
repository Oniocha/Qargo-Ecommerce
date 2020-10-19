import React, { Fragment } from "react";
import MiddleBar from "../../components/Header/MiddleBar";

import "../../components/Header/header-styles.scss";
import "./styles.scss";

const CheckOutPage = (props) => {
  const shippingAddress = () => {
    return (
      <div>
        <div class="card-header" id="headingOne">
          <h2 className="mb-0">
            <button
              class="btn btn-link btn-block text-left"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <h3>1. Shipping information</h3>
            </button>
          </h2>
        </div>
        <div
          id="collapseOne"
          class="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <form>
            <div className="row">
              <div className="col-6 mt-4 mb-4">
                <label className="form-input-label">First Name</label>
                <br />
                <input type="text" name="fName" className="form-control" />
              </div>
              <div className="col-6 mt-4 mb-4">
                <label className="form-input-label">Last Name</label>
                <br />
                <input type="text" name="lName" className="form-control" />
              </div>
            </div>
            <label className="form-input-label">Country</label>
            <br />
            <input type="text" name="country" className="form-control mb-4" />
            <label className="form-input-label">Street Address</label>
            <br />
            <input
              type="text"
              placeholder="Address line 1"
              name="addressLine1"
              className="form-control mb-4"
            />
            <input
              type="text"
              placeholder="Address line 2"
              name="addressLine2"
              className="form-control mb-4"
            />
            <div className="row mb-5">
              <div className="col-9">
                <label className="form-input-label">Town / City</label>
                <br />
                <input type="text" name="city" className="form-control" />
              </div>
              <div className="col-3">
                <label className="form-input-label">Digital Address</label>
                <br />
                <input type="text" name="postalCode" className="form-control" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const billingAddress = () => {
    return (
      <div>
        <div className="card-header" id="headingTwo">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <h3>2. Billing details</h3>
            </button>
          </h2>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionExample"
        >
          <form>
            <div className="row">
              <div className="col-6 mt-4 mb-4">
                <label className="form-input-label">First Name</label>
                <br />
                <input type="text" name="fName" className="form-control" />
              </div>
              <div className="col-6 mt-4 mb-4">
                <label className="form-input-label">Last Name</label>
                <br />
                <input type="text" name="lName" className="form-control" />
              </div>
            </div>
            <label className="form-input-label">Country</label>
            <br />
            <input type="text" name="country" className="form-control mb-4" />
            <label className="form-input-label">Street Address</label>
            <br />
            <input
              type="text"
              placeholder="Address line 1"
              name="addressLine1"
              className="form-control mb-4"
            />
            <input
              type="text"
              placeholder="Address line 2"
              name="addressLine2"
              className="form-control mb-4"
            />
            <div className="row">
              <div className="col-9">
                <label className="form-input-label">Town / City</label>
                <br />
                <input type="text" name="city" className="form-control" />
              </div>
              <div className="col-3">
                <label className="form-input-label">Digital Address</label>
                <br />
                <input type="text" name="postalCode" className="form-control" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

const paymentMethod = () => {
  return (
    <div>
      <div className="card-header" id="headingTwo">
        <h2 className="mb-0">
          <button
            className="btn btn-link btn-block text-left"
            type="button"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            <h3>2. Billing details</h3>
          </button>
        </h2>
      </div>
      <div
        id="collapseTwo"
        className="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionExample"
      >
      
      </div>
    </div>
  );
}


  return (
    <Fragment>
      <header>
        <MiddleBar checkout={true} />
      </header>
      <div className="checkout-page">
        <div className="container-fluid mr-5 row">
          <div className="col-lg-8 col-md-8 col-12">
            <h2>Getting your order</h2>
            <hr />
            <div class="accordion" id="accordionExample">
              {shippingAddress()}
              {billingAddress()}
            </div>
          </div>
          <div className="col-lg-1 col-md-1"></div>
          <div className="col-lg-3 col md-3 card pt-4">
            <button className="btn btn-action">Place Order</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckOutPage;
