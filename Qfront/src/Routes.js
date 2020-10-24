import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute, { CheckoutRoute } from "./API_CALLS/Auth/PrivateRoute";
import VendorRoute from "./API_CALLS/Auth/VendorRoute";
import ScrollToTop from "./helpers/ScrollToTop";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const SignIn = lazy(() => import("./user/SignIn"));
const SignUp = lazy(() => import("./user/SignUp"));
const Home = lazy(() => import("./Pages/HomePage/Home"));
const Shop = lazy(() => import("./Pages/Shop/Shop"));
const UserAccount = lazy(() => import("./Pages/Accounts/UserAccount"));
const VendorAccount = lazy(() => import("./Pages/Accounts/VendorAccount"));
const AddCategory = lazy(() => import("./Pages/Admin/AddCategory"));
const AddProduct = lazy(() => import("./Pages/Admin/AddProduct"));
const SearchPage = lazy(() => import("./Pages/SearchPage/SearchPage"));
const ProductPage = lazy(() => import("./Pages/ProductPage/ProductPage"));
const CartPage = lazy(() => import("./Pages/Cart/CartPage"));
const CheckOutPage = lazy(() => import("./Pages/CheckoutPage/CheckOutPage"));
const OrderComplete = lazy(() => import("./Pages/OrderComplete/OrderComplete"));

const Routes = () => {
  return (
    <Router>
      <Switch>
        <ScrollToTop>
          <Suspense
            fallback={
              <div className="qargo-preloader-wrapper">
                <div className="qargo-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>
            }
          >
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route exact path="/shop" component={Shop} />
            <Route path="/products/search" exact component={SearchPage} />
            <Route path="/product/:productId" exact component={ProductPage} />
            <PrivateRoute path="/account" exact component={UserAccount} />
            <VendorRoute
              path="/partners/account"
              exact
              component={VendorAccount}
            />
            <VendorRoute
              path="/create/category"
              exact
              component={AddCategory}
            />
            <VendorRoute path="/create/product" exact component={AddProduct} />
            <Route exact path="/cart" component={CartPage} />
            <CheckoutRoute exact path="/checkout" component={CheckOutPage} />
            <Route exact path="/order-complete" component={OrderComplete} />
            <Footer />
          </Suspense>
        </ScrollToTop>
      </Switch>
    </Router>
  );
};

export default Routes;
