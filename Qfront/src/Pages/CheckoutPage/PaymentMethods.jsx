import React, { useState, useEffect } from "react";
import Momo from "../../images/Mobile-Money.png";

import "./styles.scss";

const Rave = () => {
  const [toggle, setToggle] = useState(false);
  const [showMomo, setShowMomo] = useState(false);
  const [phonenumber, setPhonenumber] = useState("");
  const [showSelector, setShowSelector] = useState(false);

  const momoPay = toggle ? "none" : "";
  const payMomo = showMomo ? "" : "none";
  const approved = showSelector ? "" : "none";

  const handleChange = (e) => {
    setPhonenumber(e.target.value);
  };

  const handleMobileSelector = () => {
    if (
      phonenumber &&
      phonenumber.toString().length &&
      phonenumber.toString().length === 10
    ) {
      if (
        phonenumber.indexOf(parseInt("020")) === 1 ||
        phonenumber.indexOf(parseInt("050")) === 1 ||
        phonenumber.indexOf(parseInt("027")) === 1 ||
        phonenumber.indexOf(parseInt("026")) === 1 ||
        phonenumber.indexOf(parseInt("057")) === 1 ||
        phonenumber.indexOf(parseInt("056")) === 1 ||
        phonenumber.indexOf(parseInt("054")) === 1 ||
        phonenumber.indexOf(parseInt("055")) === 1 ||
        phonenumber.indexOf(parseInt("024")) === 1 ||
        phonenumber.indexOf(parseInt("059")) === 1
      ) {
        setShowSelector(true);
      }
    } else if (
      phonenumber &&
      phonenumber.toString().length &&
      phonenumber.toString().length < 10
    ) {
      setShowSelector(false);
    } else if (
      phonenumber &&
      phonenumber.toString().length &&
      phonenumber.toString().length > 10
    ) {
      setShowSelector(false);
    }
  };

  useEffect(() => {
    handleMobileSelector();
  }, [phonenumber]);

  const mobileMoney = () => {
    return (
      <div style={{ display: payMomo }}>
        <span>Please provide your Mobile Money number below for payment</span>
        <br />
        <input
          type="number"
          className="form-control mt-3"
          name="phonenumber"
          value={phonenumber}
          onChange={handleChange}
        />
        <select style={{ display: approved }}>
          <option value="MTN">MTN</option>
          <option value="Vodafone">Vodafone</option>
          <option value="airteltigo">AirtelTigo</option>
        </select>
      </div>
    );
  };

  return (
    <div>
      <div
        onClick={() => {
          setToggle(true);
          setShowMomo(true);
        }}
        style={{ display: momoPay }}
      >
        <img
          src={Momo}
          alt="mobile money"
          style={{ width: "50px", marginRight: "20px" }}
        />
        <span className="momo"> Mobile Money (Ghana)</span>
      </div>
      {mobileMoney()}
    </div>
  );
};

export default Rave;
