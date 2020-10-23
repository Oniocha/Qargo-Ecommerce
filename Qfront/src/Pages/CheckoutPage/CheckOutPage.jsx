import React, { useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { cartTotal, getCart } from "../../helpers/cartHelpers";
import { getTransactionFees } from "../../API_CALLS/userApis";
import Momo from "../../images/Mobile-Money.png";

import MiddleBar from "../../components/Header/MiddleBar";

import "../../components/Header/header-styles.scss";
import "./styles.scss";

const CheckOutPage = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    tx_ref: Date.now(),
    phone_number: "",
    currency: "GHS",
    type: "mobile_money_ghana",
    network: "",
    redirect_url: "https://qargo.express",
    amount: "",
    fees: "",
    error: false,
    address: {
      country: "",
      line1: "",
      line2: "",
      city: "",
    },
  });

  const {
    fullname,
    email,
    amount,
    fees,
    address,
    phone_number,
    redirect_url,
    network,
    type,
    currency,
    tx_ref,
    error,
  } = values;

  // States for Mobile payment
  const [toggle, setToggle] = useState(false);
  const [showMomo, setShowMomo] = useState(false);
  const [phonenumber, setPhonenumber] = useState("");
  const [showSelector, setShowSelector] = useState(false);

  const momoPay = toggle ? "none" : "";
  const payMomo = showMomo ? "" : "none";
  const approved = showSelector ? "" : "none";

  const handleMomoChange = (e) => {
    setPhonenumber(e.target.value);
  };

  const handleMobileSelector = () => {
    if (
      phonenumber &&
      phonenumber.toString().length &&
      parseInt(phonenumber.toString()[0]) === 0 &&
      phonenumber.toString().length === 10
    ) {
      if (
        phonenumber.indexOf(parseInt("020")) === 1 ||
        phonenumber.indexOf(parseInt("050")) === 1 ||
        phonenumber.indexOf(parseInt("027")) === 1 ||
        phonenumber.indexOf(parseInt("026")) === 1 ||
        phonenumber.indexOf(parseInt("057")) === 1 ||
        phonenumber.indexOf(parseInt("056")) === 1 ||
        phonenumber.indexOf(parseInt("054")) === 1 ||
        phonenumber.indexOf(parseInt("055")) === 1 ||
        phonenumber.indexOf(parseInt("024")) === 1 ||
        phonenumber.indexOf(parseInt("059")) === 1
      ) {
        setShowSelector(true);
      }
    } else if (
      phonenumber &&
      phonenumber.toString().length &&
      phonenumber.toString().length < 10
    ) {
      setShowSelector(false);
    } else if (
      phonenumber &&
      phonenumber.toString().length &&
      phonenumber.toString().length > 10
    ) {
      setShowSelector(false);
    }
  };

  useEffect(() => {
    handleMobileSelector();
  }, [phonenumber]);

  const mobileMoney = () => {
    return (
      <div style={{ display: payMomo }}>
        <span>Please provide your Mobile Money number below for payment</span>
        <br />
        <p>
          Transaction fee: {fees} <small>(Powered by Flutterwave)</small>
        </p>
        <input
          type="number"
          className="form-control mt-3"
          placeholder="Enter mobile number"
          name="phonenumber"
          value={phonenumber}
          onChange={handleMomoChange}
        />
        <select style={{ display: approved }} name="network">
          <option value="MTN">MTN</option>
          <option value="Vodafone">Vodafone</option>
          <option value="airteltigo">AirtelTigo</option>
        </select>
      </div>
    );
  };

  const Rave = () => {
    return (
      <div>
        <div
          onClick={() => {
            setToggle(true);
            setShowMomo(true);
          }}
          style={{ display: momoPay }}
        >
          <img
            src={Momo}
            alt="mobile money"
            style={{ width: "50px", marginRight: "20px" }}
          />
          <span className="momo"> Mobile Money (Ghana)</span>
        </div>
        {mobileMoney()}
      </div>
    );
  };

  // Mobile Payment Code ended

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

  const setFees = (cost) => {
    setValues({ ...values, error: "" });
    getTransactionFees(cost)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, fees: data.data.fee, error: false });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let tax = vat(getSum());
    let fullOrder = orderTotal(tax, getSum());
    setFees(fullOrder);
  }, [showMomo]);

  // Getting all shipping methods and durations for later use
  const shippingController = () => {
    let shippingArr = [],
      shippingDuration = [];
    for (var i = 0; i < products.length; i++) {
      shippingArr.push(products[i].shipping);
      shippingDuration.push(products[i].shippingTime);
      if (shippingArr.includes("pickUp")) {
        console.log("One of more of your items are only available for pick up");
      }
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
            <div className="mb-5">
              <label className="form-input-label">Town / City</label>
              <br />
              <input type="text" name="city" className="form-control" />
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
              <h3>2. How would you like to pay?</h3>
            </button>
          </h2>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordion"
        >
          <p>Select your payment method</p>
          <ul>
            <li>{Rave()}</li>
          </ul>
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
