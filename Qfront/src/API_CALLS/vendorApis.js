export const createCategory = (userId, access, category) => {
  return fetch(`${process.env.REACT_APP_API_URL}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const createProduct = (userId, access, product) => {
  return fetch(`${process.env.REACT_APP_API_URL}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
