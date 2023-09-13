import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { cartTotal, getCart } from "../../helpers/cartHelpers";
import ProductCard from "../../components/ProductCard/ProductCard";
import CheckOut from "../../components/CheckOut/CheckOut";
import "./cart-styles.scss";
import { isAuthenticated } from "../../API_CALLS/Auth/authMethods";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setCartItems(getCart());
  }, [run]);

  const noItemsMessage = () => {
    return (
      <div>
        <h2>Your cart is empty</h2>
        <br />
        <Link to="/shop">
          <h2>Continue shopping</h2>
        </Link>
      </div>
    );
  };

  const showCheckOut = () => {
    return (
      <div className="col-lg-4 col-md-4 col-xl-4">
        <CheckOut products={cartItems} />
        <div>
          {isAuthenticated() ? (
            <a href="/checkout">
              <button className="btn btn-action">Proceed to checkout</button>
            </a>
          ) : (
            <div>
              <Link to={{ pathname: "/signin", state: { prevPath: "/cart" } }}>
                <button className="btn btn-action m-3">
                  Sign in to checkout
                </button>
              </Link>{" "}
              <br />
              <Link to="/checkout">Checkout as guest</Link>{" "}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="row cart-page">
      <div className="col-lg-8 col-md-8 col-xl-8">
        <div>
          <h1>
            Cart ({cartTotal()} {cartTotal() === 1 ? "item" : "items"})
          </h1>
        </div>
        <div>
          {cartItems.length > 0 ? (
            <Fragment>
              <ul className="cart-arrange">
                {cartItems?.map((item, i) => (
                  <Fragment key={i}>
                    <ProductCard
                      product={item}
                      cart={true}
                      setRun={setRun}
                      run={run}
                    />
                  </Fragment>
                ))}
              </ul>
              <span>
                Placing an item in your shopping cart does not reserve that item
                or price. We only reserve stock for your order once payment is
                received.
              </span>
            </Fragment>
          ) : (
            noItemsMessage()
          )}
        </div>
      </div>
      {cartItems.length > 0 && showCheckOut()}
    </div>
  );
};

export default CartPage;
