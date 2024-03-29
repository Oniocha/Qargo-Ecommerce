import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import { updateQuantity, removeItem } from "../../helpers/cartHelpers";

const ProductCard = ({
  product,
  cart = false,
  run = undefined,
  setRun = (f) => f,
}) => {
  const [count, setCount] = useState(product.count);

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

  //What to render if the card is showing on the cart page
  const cartComp = () => {
    return (
      <div className="row mt-3 card pt-3 pb-3 pl-auto">
        <div className="col-12 row">
          <div className="col-2">
            <ShowImage item={product} url="product" />
          </div>
          <div className="col-4">
            <span>{product.name}</span>
          </div>
          <div className="col-3">{AdjustQuantity(product)}</div>
          <div className="col-1">
            <span>¢{product.price}</span>
          </div>
          <div className="col-1">
            <button
              className="btn btn-danger btn-sm"
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
          </div>
        </div>
      </div>
    );
  };

  return !cart ? homePage() : cartComp();
};

export default ProductCard;
