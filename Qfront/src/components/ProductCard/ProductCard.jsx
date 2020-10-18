import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
<<<<<<< HEAD
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream

const ProductCard = ({ product }) => {
  return (
    <div>
      <Link to={`/product/${product._id}`}>
        <ShowImage item={product} url="product" className="product-img mb-4" />
      </Link>
      {/* <Link to={`/product/${product._id}`}>
        <button className="btn btn-outline-warning mr-3">View product</button>
      </Link>
      <button className="btn btn-outline-success">Add product</button> */}
    </div>
  );
=======
import { updateQuantity, removeItem } from "../../helpers/cartHelpers";

const ProductCard = ({
  product,
  cart = false,
  run = undefined,
  setRun = (f) => f,
}) => {
  const [count, setCount] = useState(product.count);

=======
import { updateQuantity, removeItem } from "../../helpers/cartHelpers";

const ProductCard = ({
  product,
  cart = false,
  run = undefined,
  setRun = (f) => f,
}) => {
  const [count, setCount] = useState(product.count);

>>>>>>> Stashed changes
=======
import { updateQuantity, removeItem } from "../../helpers/cartHelpers";

const ProductCard = ({
  product,
  cart = false,
  run = undefined,
  setRun = (f) => f,
}) => {
  const [count, setCount] = useState(product.count);

>>>>>>> Stashed changes
  const handleChange = (productId) => (e) => {
    setRun(!run);
    let counter = e.target.value;
    setCount(counter < 1 ? 1 : counter);
    if (counter >= 1) {
      updateQuantity(productId, counter);
    }
  };

  const AdjustQuantity = (product) => (
    <input
      type="number"
      className="form-control"
      onChange={handleChange(product._id)}
      value={count}
    />
  );

  //What to render if the card is showing on the homepage
=======
import { updateQuantity } from "../../helpers/cartHelpers";

const ProductCard = ({ product, cart }) => {
  const [count, setCount] = useState(1);

  const handleChange = () => (e) => {
    console.log(e);
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.value.target >= 1) {
      updateQuantity(product._id, e.target.value);
    }
  };

  const AdjustQuantity = () => {
    return (
      <div className="input-group">
        <div className="inout-group-prepend">
          <span className="input-group-text">Adjust Quantity</span>
        </div>
        <input
          type="number"
          className="form-control"
          onChange={handleChange(product._id)}
          value={count}
        />
      </div>
    );
  };

>>>>>>> 77fb3f6e581cd5d8b24f3cafed2b77c1c85a052e
  const homePage = () => {
    return (
      <div>
        <Link to={`/product/${product._id}`}>
          <ShowImage
            item={product}
            url="product"
            className="product-img mb-4"
          />
        </Link>
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-warning mr-3">View product</button>
        </Link>
        <button className="btn btn-outline-success">Add product</button>
      </div>
    );
  };

<<<<<<< HEAD
  //What to render if the card is showing on the cart page
  const cartComp = () => {
    return (
      <div className="row mt-3 card pt-3 pb-3 pl-auto">
        <div className="col-12">
          <div className="row">
            <div className="col-1">
=======
  const cartComp = () => {
    return (
      <div className="row mt-5 card pt-3 pb-3 pl-auto pr-auto">
        <div className="col-6">
          <div className="row">
            <div className="col-2">
>>>>>>> 77fb3f6e581cd5d8b24f3cafed2b77c1c85a052e
              <ShowImage item={product} url="product" />
            </div>
            <div className="col-1">
              <div className="vertical-line"></div>
            </div>
<<<<<<< HEAD
            <div className="col-3">
              <span>{product.name}</span>
            </div>
            <div className="col-1">
              <div className="vertical-line"></div>
            </div>
            <div className="col-1">{AdjustQuantity(product)}</div>{" "}
            <div className="col-1">
              <div className="vertical-line"></div>
            </div>
            <div className="col-1">
              <span>¢{product.price}</span>
            </div>{" "}
            <div className="col-1">
              <div className="vertical-line"></div>
            </div>
            <div className="col-1">
              <button
                onClick={() => {
                  removeItem(product._id);
                  setRun(!run);
                }}
                style={{ cursor: "pointer" }}
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-trash-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                  />
                </svg>
                <div>Remove</div>
              </button>
=======
            <div className="col-6">
              <div>
                <span>{product.name}</span>
              </div>
>>>>>>> 77fb3f6e581cd5d8b24f3cafed2b77c1c85a052e
            </div>
          </div>
        </div>
      </div>
    );
  };

  return !cart ? homePage() : cartComp();
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> 77fb3f6e581cd5d8b24f3cafed2b77c1c85a052e
};

export default ProductCard;
