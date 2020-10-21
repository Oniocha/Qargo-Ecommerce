import React, { useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { cartTotal, getCart } from "../../helpers/cartHelpers";
import Rave from "./PaymentMethods";

import MiddleBar from "../../components/Header/MiddleBar";

import "../../components/Header/header-styles.scss";
import "./styles.scss";

const CheckOutPage = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [shipping, setShipping] = useState({
    name: "",
    country: "",
    address: {
      line1: "",
      line2: "",
      city: "",
    },
    phonenumber: "",
  });

  const [billing, setBilling] = useState({
    name: "",
    country: "",
    address: {
      line1: "",
      line2: "",
      city: "",
    },
    phonenumber: "",
  });

  useEffect(() => {
    setCount(cartTotal());
    setProducts(getCart());
  }, [count]);

  const getSum = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const vat = (sum) => {
    return sum * 0.03;
  };

  const orderTotal = (vat, sum, shippingCost = 0) => {
    return vat + sum + shippingCost;
  };

  // Getting all shipping durations for later use
  const shippingTime = () => {
    let newArr = [];
    for (var i = 0; i < products.length; i++) {
      newArr.push(products[i].shippingTime);
    }
  };

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
              <h3>1. Delivery information</h3>
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
                <label className="form-input-label">Full Name</label>
                <br />
                <input type="text" name="name" className="form-control" />
              </div>
              <div className="col-6 mt-4 mb-4">
                <label className="form-input-label">Email</label>
                <br />
                <input type="email" name="email" className="form-control" />
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
                <label className="form-input-label">Phone Number</label>
                <br />
                <input type="tel" name="phonenumber" className="form-control" />
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
                <label className="form-input-label">Full Name</label>
                <br />
                <input type="text" name="name" className="form-control" />
              </div>
              <div className="col-6 mt-4 mb-4">
                <label className="form-input-label">Email</label>
                <br />
                <input type="email" name="email" className="form-control" />
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
                <label className="form-input-label">Phone Number</label>
                <br />
                <input type="tel" name="phonenumber" className="form-control" />
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
              <h3>3. How would you like to pay?</h3>
            </button>
          </h2>
        </div>
        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordion"
        >
          <Rave />
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
          <div className="col-lg-3 col-md-3">
            <div className="card p-4">
              <Link to="/cart">
                <button className="btn btn-pale">Modify Cart</button>
              </Link>
              <hr />
              <h4>Order Summary</h4>
              <div className="row">
                <div className="col-6">
                  <p className="checkout-summary text-left">
                    Items: {cartTotal()}
                  </p>
                </div>
                <div className="col-6">
                  <p className="checkout-summary text-right">GHS {getSum()}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <p className="checkout-summary text-left">Shipping:</p>
                </div>
                <div className="col-6 text-right">
                  <select className="checkout-summary">
                    <option>FREE Shipping</option>
                    <option>Pick up</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <p className="checkout-summary text-left">VAT (3%)</p>
                </div>
                <div className="col-6">
                  <p className="checkout-summary text-right">{vat(getSum())}</p>
                </div>
              </div>
              <hr />
              <div className="row order-total">
                <div className="col-6">
                  <h4 className="text-left">Order Total:</h4>
                </div>
                <div className="col-6">
                  <h4 className="text-right">
                    GHS {orderTotal(vat(getSum()), getSum())}
                  </h4>
                </div>
              </div>
              <hr />
              <div>
                <button className="btn btn-action">Place Order</button>
                <p className="checkout-summary mt-3 text-center">
                  By placing your order you agree to Qargo's Conditions of Use &
                  Sale. Please see our{" "}
                  <Link to="/privacy-policy">Privacy Notice</Link>, and our
                  <Link to="/terms"> Terms and Conditions.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckOutPage;
