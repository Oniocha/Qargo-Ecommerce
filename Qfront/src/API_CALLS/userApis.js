// export const getTransactionFees = (cost) => {
//   let fee = { amount: cost };
//   return fetch(`${process.env.REACT_APP_API_URL}/rave/transaction/fees`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(fee),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// };

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

export const createAuthOrder = (userId, access, orderData) => {
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

export const createGuestOrder = (orderData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/order/guest/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
