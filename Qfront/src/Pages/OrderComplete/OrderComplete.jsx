import React, { useEffect } from "react";
import { emptyCart } from "../../helpers/cartHelpers";

function OrderComplete() {
  useEffect(() => {
    emptyCart();
  }, []);
  return (
    <div>
      <h2>Thank you for your order</h2>
    </div>
  );
}

export default OrderComplete;
