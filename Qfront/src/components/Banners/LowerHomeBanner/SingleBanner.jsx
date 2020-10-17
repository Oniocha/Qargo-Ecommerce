import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const BannerOneSingle = ({ data, spaceBottomClass }) => {
  return (
    <div className="col-lg-3 col-md-4 mt-5 mb-2">
      <div className={`single-banner }`}>
        <Link to={process.env.PUBLIC_URL + data.link}>
          <img
            src={`https://flone.reactdemo.hasthemes.com${data.image}`}
            alt=""
          />
        </Link>
        <div className="banner-content">
          <h3>{data.title}</h3>
          <h4>
            {data.subtitle} <span>{data.price}</span>
          </h4>
          <Link to={process.env.PUBLIC_URL + data.link}>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-right"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

BannerOneSingle.propTypes = {
  data: PropTypes.object,
};

export default BannerOneSingle;
