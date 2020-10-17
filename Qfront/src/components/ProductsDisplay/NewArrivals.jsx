import React, { useState, useEffect, lazy, Suspense } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./styles.scss";
const ProductCard = lazy(() => import("../ProductCard/ProductCard"));

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className={className} onClick={onClick} />;
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return <div id="slicker" className={className} onClick={onClick} />;
};

const NewArrivals = () => {
  const [productsBySell, setProductsBySell] = useState([]),
    [productsByArrival, setProductsByArrival] = useState([]),
    [productsByPrice, setProductsByPrice] = useState([]),
    [error, setError] = useState(false);

  const loadBySell = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/products?sortBy=sold&order=desc&limit=10`
      )
      .then((res) => setProductsBySell(res.data))
      .catch((err) => console.log(err.message));
  };

  const fetchByArrival = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/products?sortBy=createdAt&order=desc&limit=10`
      )
      .then((res) => setProductsByArrival(res.data))
      .catch((err) => console.log(err.message));
  };

  const fetchByPrice = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/products?sortBy=price&order=asc&limit=10`
      )
      .then((res) => setProductsByPrice(res.data))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchByArrival();
    fetchByPrice();
    loadBySell();
  }, []);

  var settings = {
    dots: false,
    infinite: false,
    accessibility: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="container">
      <Suspense
        fallback={
          <div className="qargo-preloader-wrapper">
            <div className="qargo-preloader">
              <span></span>
              <span></span>
            </div>
          </div>
        }
      >
        <div className="card mt-5 pt-3 pl-3 pr-3 pb-3">
          <h2 className="home-products-head">New Arrivals</h2>
          <Slider {...settings}>
            {productsByArrival.map((prod, i) => (
              <div key={i}>
                <ProductCard product={prod} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="card mt-5 pt-3 pl-3 pr-3 pb-3">
          <h2 className="home-products-head">Hot on the market 🔥</h2>
          <Slider {...settings}>
            {productsBySell.map((prod, i) => (
              <div key={i}>
                <ProductCard product={prod} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="card mt-5 pt-3 pl-3 pr-3 pb-3">
          <h2 className="home-products-head">Products under GHS 50</h2>
          <Slider {...settings}>
            {productsByPrice.map((prod, i) => (
              <div key={i}>
                <ProductCard product={prod} />
              </div>
            ))}
          </Slider>
        </div>
      </Suspense>
    </div>
  );
};

export default NewArrivals;
