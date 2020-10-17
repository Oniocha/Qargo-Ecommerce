import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "../../components/ProductCard/ShowImage";

const SearchResult = ({ product }) => {
  return (
    <div className="row mb-4 justify-content-center">
      <div className="col-3">
        <Link to={`product/${product._id}`}>
          <ShowImage item={product} url="product" className="product-img" />
        </Link>
      </div>
      <div className="col-9">
        <h2>{product.name}</h2>
        <p>¢{product.price}</p>
        <p>{product.description.substring(0, 100)}</p>{" "}
        <Link to={`product/${product._id}`}>
          <button className="btn btn-outline-warning mr-3">View product</button>
        </Link>
        <button className="btn btn-outline-success">Add product</button>
      </div>
      <hr />
    </div>
  );
};

export default SearchResult;
