import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

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
};

export default ProductCard;
