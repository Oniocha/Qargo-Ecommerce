import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cartTotal, getCart } from "../../helpers/cartHelpers";

const Cart = ({ fill, className }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
    cartTotal();
  }, []);

  return (
    <Link to="/cart">
      <div className="cart-icon">
        <svg
          width="2.5em"
          height="2.5em"
          viewBox="0 0 16 16"
          className="bi bi-bag cart"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z"
          />
        </svg>
        <span className={className}>{items.length}</span>
      </div>
    </Link>
  );
};
export default Cart;
