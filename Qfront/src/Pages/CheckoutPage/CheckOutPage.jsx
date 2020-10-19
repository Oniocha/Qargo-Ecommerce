import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { cartTotal, getCart } from "../../helpers/cartHelpers";
import PayStack from "./PayStack";

import MiddleBar from "../../components/Header/MiddleBar";

import "../../components/Header/header-styles.scss";
import "./styles.scss";
import { useEffect } from "react";
import { useState } from "react";

const CheckOutPage = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(cartTotal());
    setProducts(getCart());
  }, []);

  const shippingAddress = () => {
    return (
      <div>
        <div className="card-header" id="headingOne">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left"
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
          className="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordion"
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
              <div className="col-8">
                <label className="form-input-label">Town / City</label>
                <br />
                <input type="text" name="city" className="form-control" />
              </div>
              <div className="col-4">
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
          data-parent="#accordion"
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

            <label className="form-input-label">Town / City</label>
            <br />
            <input type="text" name="city" className="form-control mb-4" />
          </form>
        </div>
      </div>
    );
  };

  const paymentMethod = () => {
    return (
      <div>
        <div className="card-header" id="headingThree">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left"
              type="button"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <h3>3. Choose Payment Method</h3>
            </button>
          </h2>
        </div>
        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordion"
        >
          <PayStack products={products} />
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <header>
        <MiddleBar checkout={true} />
      </header>
      <div className="checkout-page">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-12">
            <h2>Getting your order</h2>
            <hr />
            <div className="accordion" id="accordion">
              {shippingAddress()}
              {billingAddress()}
              {paymentMethod()}
            </div>
          </div>
          {/* <div className="col-lg-1 col-md-1"></div> */}
          <div className="col-lg-3 col-md-3 card pt-4 mt-4">
            <button className="btn btn-action mb-5">Place Order</button>
            <Link to="/cart">
              {" "}
              <button className="btn btn-pale mb-5">Modify Cart</button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckOutPage;
