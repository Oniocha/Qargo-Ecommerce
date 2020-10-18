import React from "react";

const CheckOut = ({ products }) => {
  const getSum = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  return (
    <div>
      <h2>Your total is</h2>
      <h2>¢{getSum()}</h2>
    </div>
  );
};

export default CheckOut;
