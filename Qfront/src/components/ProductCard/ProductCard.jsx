import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
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

  const cartComp = () => {
    return (
      <div className="row mt-5 card pt-3 pb-3 pl-auto pr-auto">
        <div className="col-6">
          <div className="row">
            <div className="col-2">
              <ShowImage item={product} url="product" />
            </div>
            <div className="col-1">
              <div className="vertical-line"></div>
            </div>
            <div className="col-6">
              <div>
                <span>{product.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return !cart ? homePage() : cartComp();
};

export default ProductCard;
