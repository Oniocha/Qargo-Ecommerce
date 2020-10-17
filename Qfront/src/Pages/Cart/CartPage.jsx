import React, { useState, useEffect } from "react";
import { cartTotal, getCart, updateQuantity } from "../../helpers/cartHelpers";
import ShowImage from "../../components/ProductCard/ShowImage";
import "./cart-styles.scss";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleChange = (productId) => (e) => {
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.value.target >= 1) {
      updateQuantity(productId, e.target.value);
    }
  };

  const AdjustQantity = () => {
    return;
  };

  return (
    <div className="row cart-page">
      <div className="col-lg-8 col-md-8 col-xl-8">
        <div>
          <h1>
            Cart ({cartTotal()} {cartTotal() === 1 ? "item" : "items"})
          </h1>
        </div>
        <div>
          {cartItems.length > 0 ? (
            <table>
              <thead className="table-headings">
                <tr>
                  <th>
                    <p>ITEM</p>
                  </th>
                  <th className="text-center">
                    <p>QUANTITY</p>
                  </th>
                  <th className="text-center">
                    <p>UNIT PRICE</p>
                  </th>
                  <th className="text-center">
                    <p>SUBTOTAL</p>
                  </th>
                </tr>
              </thead>
              <tbody className="cart-arrange">
                {cartItems.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <h2>{item.name}</h2>
                      <ShowImage item={item} url="product" className="img" />
                    </td>
                    <td>
                      <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </td>
                    <td>₵{item.price}</td>
                    <td>₵{item.category.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>Your cart is empty</div>
          )}
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-xl-4">
        Put in ahipping details, billing details and shipping
      </div>
    </div>
  );
};

export default CartPage;
