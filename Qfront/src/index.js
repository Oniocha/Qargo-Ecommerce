import React from "react";
import ReactDOM from "react-dom";
import "./main-styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Routes from "./Routes";
import * as serviceWorker from "./serviceWorker";
import {Provider} from "react-redux";
import store from './redux/configStore';

// console.log(`

// \          SORRY            /
// \                         /
//  \    There's nothing    /
//   ]   to see here.      [    ,'|
//   ]                     [   /  |
//   ]___               ___[ ,'   |
//   ]  ]\             /[  [ |:   |
//   ]  ] \           / [  [ |:   |
//   ]  ]  ]         [  [  [ |:   |
//   ]  ]  ]__     __[  [  [ |:   |
//   ]  ]  ] ]\ _ /[ [  [  [ |:   |
//   ]  ]  ] ] (#) [ [  [  [ :===='
//   ]  ]  ]_].nHn.[_[  [  [
//   ]  ]  ]  HHHHH. [  [  [
//   ]  ] /   'HH("N  \ [  [
//   ]__]/     HHH  "  \[__[
//   ]         NNN         [
//   ]         N/"         [
//   ]         N H         [
//  /          N            \
// /           q,            \
// /                           \
// `);

ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById("root")
  );
  
  serviceWorker.unregister();
