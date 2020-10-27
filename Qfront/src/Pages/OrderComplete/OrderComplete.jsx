import React, { useState, useEffect } from "react";
import { emptyCart, getCart } from "../../helpers/cartHelpers";

function OrderComplete() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    setOrder(getCart());
    emptyCart();
  }, []);

  return (
    <div>
      <h2>Thank you for your order</h2>
      {JSON.stringify(order)}
    </div>
  );
}

export default OrderComplete;
