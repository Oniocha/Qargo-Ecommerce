import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "./authMethods";
import { cartTotal } from "../../helpers/cartHelpers";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

export const CheckoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        cartTotal() > 0 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/cart",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
