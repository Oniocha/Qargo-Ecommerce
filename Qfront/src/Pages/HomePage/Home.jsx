import React from "react";
import HomeBanner from "../../components/Banners/HomeBanner";
import NewArrivals from "../../components/ProductsDisplay/NewArrivals";
import BannerOne from "../../components/Banners/LowerHomeBanner/BannerOne";
import "../../components/Banners/LowerHomeBanner/styles.scss";

import "./home-styles.scss";

const Home = () => {
  return (
    <div className="homepage pb-5">
      <HomeBanner />
      <BannerOne />
      <NewArrivals />
    </div>
  );
};

export default Home;
