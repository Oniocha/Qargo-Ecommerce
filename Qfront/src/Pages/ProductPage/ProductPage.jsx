import React, { useEffect, useState, Fragment } from "react";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
import { listRelated } from "../../redux/product/loadProducts/actions";
import ProductCard from "../../components/ProductCard/ProductCard";
import ShowImage from "../../components/ProductCard/ShowImage";
import { addItem } from "../../helpers/cartHelpers";
import { useSelector, useDispatch } from "react-redux";
import { readProduct } from "../../redux/product/loadProduct/actions";

import "./product-styles.scss";

const ProductPage = ({ match }) => {
  const { productQureied, errorQueringProduct } = useSelector(state => state.loadProduct)
  const { relatedProducts } = useSelector(state => state.loadProducts)
  const dispatch = useDispatch();
  const product = productQureied || {}
  const related = relatedProducts || [];
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  let productId = match.params.productId;

  useEffect(() => {
    dispatch(readProduct(productId))
    dispatch(listRelated(productId))
  }, [dispatch, productId]);

  const buyItem = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const addToCart = () => {
    addItem(product, () => {
      window.location.reload();
    });
  };

  const shouldRedirect = () =>
    redirect && (
      <Redirect to={{ pathname: "/cart", state: { product: product } }} />
    );

  const showRelated = () => (
    <Fragment>
      {related && product.name && (
        <section>
          <h2 className="mt-5 mb-5">Related Products</h2>
          <div className="row" style={{ width: "100%" }}>
            {related?.map((rel, i) => (
              <ProductCard product={rel} key={i} />
            ))}
          </div>
        </section>
      )}
    </Fragment>
  );

  return (
    <div className="row container-fluid product-page">
      {shouldRedirect()}
      {product && product.name && (
        <Fragment>
          <div className="col-lg-6 col-md-8 col-12 mt-4">
            {product && product._id && (
              <ShowImage
                item={product}
                url="product"
                className="product-page-img mb-5"
              />
            )}
            <div className="accordion" id="accordion">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h2 className="mb-0">
                    <button
                      className="btn btn-link btn-block text-left"
                      type="button"
                      data-toggle="collapse"
                      data-target="#description"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Product Descripiton
                    </button>
                  </h2>
                </div>

                <div
                  id="description"
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body lead">{product.description}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-12 mt-4">
            <h2 className="mt-4 product-title">{product.name}</h2>
            <p className="condition">
              In <Link to="">{product.category && product.category.name}</Link>
            </p>
            <small className="condition mb-4">
              Condition:{" "}
              <span>{product.condition ? "Brand New" : "Used Like New"}</span>
            </small>
            {product.quantity > 0 ? (
              <small className="badge badge-info ml-3">In stock</small>
            ) : (
              <small className="badge badge-danger ml-3">Out of stock</small>
            )}
            <hr />
            <span className="price">Price</span>
            <p className="product-price">¢{product.price}.00</p>
            <div className="return pt-2 pl-3 pb-2 pr-3">
              <div>
                <h4>RETURN POLICY SNEAK-VIEW</h4>
                <small>
                  This item can be returned within 1 week after delivery if it
                  does not meet seller's description{" "}
                  <Link to="/return-policy">Learn more</Link>
                </small>
              </div>
            </div>
            <hr />
            <p className="mt-4 mb-4">
              Size: {product.size} <Link to="">See size chart</Link>
            </p>
            <div className="d-flex">
              <div className="size-box"></div>
              <div className="size-box"></div>
              <div className="size-box"></div>
            </div>
            <hr />
            <p>Added {moment(product.createdAt).fromNow()}</p>
          </div>
          <div className="col-lg-1 mt-4">
            <div className="vertical-line	d-none d-lg-block d-xl-block"></div>
          </div>
          <div className="col-lg-2 col-md-12 col-12 mt-4">
            <button onClick={addToCart} className="btn-action btn mb-4">
              Add to cart
            </button>
            <button onClick={buyItem} className="btn-passive btn mb-4">
              Buy Now
            </button>
            <p>
              Available for {product.shipping} in {product.shippingTime}{" "}
              {product.shippingTime === 1
                ? "day"
                : product.shippingTime > 1 && "days"}
            </p>
          </div>
        </Fragment>
      )}
      {showRelated()}
    </div>
  );
};

export default ProductPage;
