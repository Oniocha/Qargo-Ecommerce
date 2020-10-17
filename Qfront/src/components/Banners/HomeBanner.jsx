import React from "react";
import Shoes from "../../images/banner/shoes.jpg";
import Women from "../../images/banner/women.jpg";
import Suits from "../../images/banner/suits.jpeg";
import Bags from "../../images/banner/bags.jpg";

const HomeBanner = () => {
  return (
    <div>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Women} className="d-block w-100" alt="women" />
          </div>
          <div className="carousel-item">
            <img src={Shoes} className="d-block w-100" alt="shoes" />
          </div>
          <div className="carousel-item">
            <img src={Bags} className="d-block w-100" alt="suits" />
          </div>
          <div className="carousel-item">
            <img src={Suits} className="d-block w-100" alt="suits" />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default HomeBanner;
