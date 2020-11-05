import queryString from "query-string";

export const getFilteredProducts = (skip, limit, filters) => {
  const data = { skip, limit, filters };
  return fetch(process.env.REACT_APP_API_URL + "/products/by/search", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// API url for fetching all departments
let one = process.env.REACT_APP_API_URL + "/departments";

export const getDepartments = () => {
  return fetch(one, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const listProducts = (params) => {
  const query = queryString.stringify(params);
  console.log("query", query);
  return fetch(`${process.env.REACT_APP_API_URL}/products/search?${query}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const readProduct = (prodId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/product/${prodId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const listRelated = (prodId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/product/related/${prodId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getTransactionFees = (cost) => {
  let fee = { amount: cost };
  return fetch(`${process.env.REACT_APP_API_URL}/rave/transaction/fees`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(fee),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const initateTransaction = (
  ref,
  mail,
  cost,
  kind,
  number,
  telco,
  redirect,
  name
) => {
  let payment = {
    currency: "GHS",
    fullname: name,
    tx_ref: ref,
    amount: cost,
    email: mail,
    type: kind,
    phone_number: number,
    network: telco,
    redirect_url: redirect,
  };
  return fetch(`${process.env.REACT_APP_API_URL}/rave/momopayment`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(payment),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const createOrder = (userId, access, orderData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
