import React, { useEffect, Fragment, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { cartTotal, getCart } from "../../helpers/cartHelpers";
import Momo from "../../images/Mobile-Money.png";
import { getTransactionFees, initiateTransaction } from "../../redux/transactions/actions";
import { useDispatch, useSelector } from "react-redux";

import MiddleBar from "../../components/Header/MiddleBar";

import "../../components/Header/header-styles.scss";
import "./styles.scss";

const CheckOutPage = () => {
  const { transactionFee, redirect, paymentUrl } = useSelector(state => state.transaction)
  const dispatch = useDispatch();
  const fees = transactionFee || "";
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
    redirect_url: "http://localhost:3000/order-complete",
    amount: "",
    error: false,
  });
const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    country: "",
    street: "",
    landmark: "",
    city: "",
  });

  const { country, street, landmark, city } = address;

  const {
    fullname,
    email,
    amount,
    phone_number,
    redirect_url,
    network,
    type,
    tx_ref,
  } = values;

  // States for Mobile payment
  const [toggle, setToggle] = useState(false);
  const [showMomo, setShowMomo] = useState(false);
  const [showSelector, setShowSelector] = useState(false);

  const momoPay = toggle ? "none" : "";
  const payMomo = showMomo ? "" : "none";
  const approved = showSelector ? "" : "none";

  // Dynamically show mobile network selector if user's network is supported
  const handleMobileSelector = () => {
    if (
      phone_number &&
      phone_number.toString().length &&
      parseInt(phone_number.toString()[0]) === 0 &&
      phone_number.toString().length === 10
    ) {
      if (
        phone_number.indexOf(parseInt("020")) === 1 ||
        phone_number.indexOf(parseInt("050")) === 1 ||
        phone_number.indexOf(parseInt("027")) === 1 ||
        phone_number.indexOf(parseInt("026")) === 1 ||
        phone_number.indexOf(parseInt("057")) === 1 ||
        phone_number.indexOf(parseInt("056")) === 1 ||
        phone_number.indexOf(parseInt("054")) === 1 ||
        phone_number.indexOf(parseInt("055")) === 1 ||
        phone_number.indexOf(parseInt("024")) === 1 ||
        phone_number.indexOf(parseInt("059")) === 1
      ) {
        setShowSelector(true);
      }
    } else if (
      phone_number &&
      phone_number.toString().length &&
      phone_number.toString().length < 10
    ) {
      setShowSelector(false);
    } else if (
      phone_number &&
      phone_number.toString().length &&
      phone_number.toString().length > 10
    ) {
      setShowSelector(false);
    }
  };

    // Get subtotal for items in cart
  const productSum = useMemo(() => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  }, [products]);

  useEffect(() => {
    handleMobileSelector();
    // eslint-disable-next-line
  }, [phone_number]);

  useEffect(() => {
    const cost = productSum;
    if (typeof cost === 'number' && cost > 0) {
      dispatch(getTransactionFees({ cost }));
    }
  }, [dispatch, productSum])

  // This is the RAVE MOMO form
  const Rave = () => {
    return (
      <div>
        <div
          onClick={() => {
            setToggle(true);
            setShowMomo(true);
          }}
          style={{ display: momoPay, cursor: "pointer" }}
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

  // Handle change from delivery form
  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setLoading(false);
    setValues({ ...values, [name]: value });
  };

  const handleAddress = (name) => (e) => {
    const value = e.target.value;
    setLoading(false);
    setAddress({ ...address, [name]: value });
  };


  // Calculate Tax
  const vat = (sum) => {
    return +(sum * 0.03).toFixed(2);
  };

  // First load to get cart count and products
  useEffect(() => {
    setCount(cartTotal());
    setProducts(getCart());
    setValues({ ...values, amount: orderTotal(vat(productSum), productSum) });
    // eslint-disable-next-line
  }, [count, amount]);

  // Add tax to subtotal + shipping
  const orderTotal = (vat, sum, shippingCost = 0) => {
    return vat + sum + shippingCost;
  };

  // Get transaction fees
  const setFees = (cost) => {
    setValues({ ...values, error: "" });
    dispatch(getTransactionFees({cost}));
  };

  // Set transaction fees
  // useEffect(() => {
  //   let tax = vat(productSum);
  //   let fullOrder = orderTotal(tax, productSum);
  //   setFees(fullOrder);

  // eslint-disable-next-line
  // }, [showMomo]);

  // TODO Getting all shipping methods and durations for later use
  // const shippingController = () => {
  //   let shippingArr = [],
  //     shippingDuration = [];
  //   for (var i = 0; i < products.length; i++) {
  //     shippingArr.push(products[i].shipping);
  //     shippingDuration.push(products[i].shippingTime);
  //     if (shippingArr.includes("pickUp")) {
  //       // TODo handle this part
  //       console.log("One of more of your items are only available for pick up");
  //     }
  //   }
  // };

  // Initiate payment
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(initiateTransaction({ tx_ref, email, amount, type, phone_number, network, redirect_url, fullname }));
  };

  // Mobile Payment field
  const mobileMoney = () => {
    return (
      <div style={{ display: payMomo }}>
        <div className="card momo-window">
          <div className="card-header">
            <h5>Please provide your Mobile Money number below for payment</h5>
          </div>
          <div className="row pt-3 pl-3 pr-3">
            <div className="col-4">
              <p>
                Transaction fee: {fees} <small>(Powered by Flutterwave)</small>
              </p>
            </div>
          </div>
          <div className="m-3">
            <form>
              <input
                type="number"
                required
                className="form-control mb-3"
                placeholder="Enter mobile number"
                value={phone_number}
                onChange={handleChange("phone_number")}
              />
              <select
                required
                style={{ display: approved }}
                className="form-control"
                onChange={handleChange("network")}
              >
                <option>Choose Your Network</option>
                <option value="MTN">MTN</option>
                <option value="Vodafone">Vodafone</option>
                <option value="airteltigo">AirtelTigo</option>
              </select>
              {loading ? (
                showLoading()
              ) : (
                <button
                  className="btn btn-action  mt-3 mb-3"
                  onClick={handleSubmit}
                >
                  Place order
                </button>
              )}
            </form>
            <span
              className="pay-different"
              onClick={() => {
                setToggle(false);
                setShowMomo(false);
              }}
            >
              Choose another payment method
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Delivery details field
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
                <label className="form-input-label">
                  Full Name <sup>*</sup>
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  value={fullname}
                  onChange={handleChange("fullname")}
                />
              </div>
              <div className="col-6 mt-4 mb-4">
                <label className="form-input-label">
                  Email <sup>*</sup>
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="form-control"
                  onChange={handleChange("email")}
                />
              </div>
            </div>
            <label className="form-input-label">
              Country <sup>*</sup>
            </label>
            <br />
            <input
              type="text"
              name="country"
              className="form-control mb-4"
              value={country}
              onChange={handleAddress("country")}
            />
            <label className="form-input-label">Street Address</label>
            <br />
            <input
              type="text"
              placeholder="Full Address"
              name="street"
              value={street}
              onChange={handleAddress("street")}
              className="form-control mb-4"
            />
            <input
              type="text"
              placeholder="Landmark"
              name="landmark"
              value={landmark}
              onChange={handleAddress("landmark")}
              className="form-control mb-4"
            />
            <div className="mb-5">
              <label className="form-input-label">Town / City</label>
              <br />
              <input
                type="text"
                name="city"
                className="form-control"
                value={city}
                onChange={handleAddress("city")}
              />
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
          <p className="mt-3">Select your payment method</p>
          <ul>
            <li>{Rave()}</li>
          </ul>
        </div>
      </div>
    );
  };

  const redirectUserForPayment = () => {
    return paymentUrl && redirect && (window.location.href = paymentUrl);
  };

  const showLoading = () => {
    return (
      <div>
        <button className="btn btn-action mt-3" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Initiating Payment...
        </button>
      </div>
    );
  };

  return (
    <Fragment>
      <div style={{ display: "none" }}>{redirectUserForPayment()}</div>
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
              <a href="/cart">
                <button className="btn btn-pale">Modify Cart</button>
              </a>
              <hr />
              <h4>Order Summary</h4>
              <div className="row">
                <div className="col-6">
                  <p className="checkout-summary text-left">
                    Items: {cartTotal()}
                  </p>
                </div>
                <div className="col-6">
                  <p className="checkout-summary text-right">GHS {productSum}</p>
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
                  <p className="checkout-summary text-right">{vat(productSum)}</p>
                </div>
              </div>
              <hr />
              <div className="row order-total">
                <div className="col-6">
                  <h4 className="text-left">Order Total:</h4>
                </div>
                <div className="col-6">
                  <h4 className="text-right">
                    GHS {orderTotal(vat(productSum), productSum)}
                  </h4>
                </div>
              </div>
              <hr />
              <div>
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
