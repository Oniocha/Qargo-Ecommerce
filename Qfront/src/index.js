import React from "react";
import ReactDOM from "react-dom";
import "./main-styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Routes from "./Routes";
import * as serviceWorker from "./serviceWorker";

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

ReactDOM.render(<Routes />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
