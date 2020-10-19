import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../API_CALLS/Auth/authMethods";
import { createProduct } from "../../API_CALLS/vendorApis";
import { VendorLinks } from "../../components/Dashboard/Dashboard";

import "../Accounts/accounts-styles.scss";

import NoPhoto from "../../images/no-photo-available.png";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    tag: "",
    category: [],
    quantity: "",
    size: [],
    photo: "",
    department: "",
    condition: "",
    shipping: "",
    shippingTime: "",
    loading: false,
    error: "",
    createdProduct: "",
  });
  const [formData, setFormData] = useState(""),
    [categories, setCategories] = useState([]),
    [tags, setTags] = useState([]),
    [departments, setDepartments] = useState([]);

  const {
    name,
    description,
    price,
    quantity,
    photo,
    category,
    loading,
    error,
    createdProduct,
  } = values;

  //destructuring localstorage
  const { user, token } = isAuthenticated();

  let one = `${process.env.REACT_APP_API_URL}/categories`;
  let two = `${process.env.REACT_APP_API_URL}/tags`;
  let three = `${process.env.REACT_APP_API_URL}/departments`;

  useEffect(() => {
    axios
      .get(two)
      .then((data) => setTags(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(three)
      .then((data) => setDepartments(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(one)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFormData(new FormData());
  }, []);

  const handleChange = (name) => (e) => {
    let value = name === "photo" ? e.target.files[0] : e.target.value;
    if (formData !== undefined) {
      formData.set(name, value);
    } else {
      console.error("formData is not set");
    }
    setValues({ ...values, error: "", createdProduct: "", [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          name: "",
          description: "",
          price: "",
          tag: "",
          category: [],
          quantity: "",
          size: [],
          photo: "",
          department: "",
          condition: "",
          shipping: "",
          shippingTime: "",
          loading: false,
          error: "",
          createdProduct: data.name,
        });
      }
    });
  };

  const newProduct = () => {
    return (
      <form className="mb-3 card contained" onSubmit={handleSubmit}>
        <div className=" row">
          <div className="col-lg-9 col-xl-9 col-md-9 col-sm-12">
            <div className="form-group">
              <h4>Title</h4>
              <input
                autoFocus
                type="text"
                className="form-control"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            <hr />
            <div className="form-group row">
              <div className="col-4">
                <label>Product Photo</label>
                <label className="btn btn-action" htmlFor="productImg">
                  <input
                    id="productImg"
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange("photo")}
                  />
                  Upload an image
                </label>
              </div>
              <div className="col-8">
                <div className="image-preview">
                  <img
                    className="no-image"
                    src={photo ? URL.createObjectURL(photo) : NoPhoto}
                    alt="product preview"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                className="form-control"
                onChange={handleChange("description")}
              />
            </div>
            <div className="form-group">
              <label>Condition</label>
              <br />
              <select
                className="form-control"
                onChange={handleChange("condition")}
              >
                <option>New or used</option>
                <option value="1">New</option>
                <option value="0">Used</option>
              </select>
            </div>
            <div
              className="form-group mr-4"
              style={{ display: "inline-block" }}
            >
              <label>Price (GH₵)</label>
              <input
                value={price}
                type="number"
                className="form-control"
                onChange={handleChange("price")}
              />
            </div>
            <div className="form-group" style={{ display: "inline-block" }}>
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                className="form-control"
                onChange={handleChange("quantity")}
              />
            </div>
            <div className="form-group">
              <label>Shipping</label>
              <select
                className="form-control mb-4"
                onChange={handleChange("shipping")}
              >
                <option>Choose shipping method</option>
                <option value="pick up">Only Pick up available</option>
                <option value="delivery">Only on delivery</option>
                <option value="pick up or delivery">
                  Can be picked up up or delivered
                </option>
              </select>
              <label style={{ display: "block" }}>Shipping Duration</label>
              <input
                className="form-control mr-3"
                type="number"
                onChange={handleChange("shippingTime")}
                style={{ display: "inline-block", width: "100px" }}
              />
              <span>days</span>
            </div>
          </div>
          <div className="col-lg-3 col-xl-3 col-md-3 col-sm-12">
            <div className=" mb-5">
              <h5 className="card-head">Department</h5>
              <select
                className="form-control"
                onChange={handleChange("department")}
              >
                <option>Pick a Department</option>
                {departments && departments.length > 0
                  ? departments.map((dept, i) => (
                      <option value={dept._id} key={i}>
                        {dept.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className=" mb-5">
              <h5 className="card-head">Category & Size</h5>
              <select
                multiple
                className="form-control mb-3"
                onChange={handleChange("category")}
              >
                {/* <option>Choose a Category</option> */}
                {categories && categories.length > 0
                  ? categories.map((cat, i) => (
                      <option value={cat._id} key={i}>
                        {cat.name}
                      </option>
                    ))
                  : null}
              </select>
              <div className="form-check">
                <label style={{ display: "block" }}>Sizes Available</label>
                <input
                  type="checkbox"
                  onChange={handleChange("size")}
                  className="mr-3"
                  value="Small"
                />
                <label>S</label>
                <br />
                <input
                  type="checkbox"
                  onChange={handleChange("size")}
                  className="mr-3"
                  value="Meduim"
                />
                <label>M</label>
                <br />
                <input
                  type="checkbox"
                  onChange={handleChange("size")}
                  className="mr-3"
                  value="Large"
                />
                <label>L</label>
                <br />
              </div>
            </div>
            <div className=" mb-5 ">
              <h5 className="card-head">Brand</h5>
              <div>
                <select
                  multiple
                  className="form-control mb-3"
                  onChange={handleChange("tag")}
                >
                  {/* <option>Choose a Category</option> */}
                  {tags && tags.length > 0
                    ? tags.map((tag, i) => (
                        <option value={tag._id} key={i}>
                          {tag.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-action" style={{ width: "max-content" }}>
          Create Product
        </button>
      </form>
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none", textAlign: "center" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: createdProduct ? "" : "none", textAlign: "center" }}
    >
      {`${createdProduct} has been succesfully created`}
    </div>
  );

  const showLoading = () => (
    <div
      className="alert alert-success"
      style={{ display: loading ? "" : "none", textAlign: "center" }}
    >
      Loading...
    </div>
  );

  return (
    <div>
      <div className="user-account" id="addProducts">
        {showError()}
        {showSuccess()}
        {showLoading()}
        <div className="container account-page">
          <h2 className="account-title">
            <Link to="/partners/account">Your Vendor Account</Link>
          </h2>
          <span>{` > `}</span>
          <h2 className="account-title">Add Product</h2>
          <div className="row">
            <div className="col-lg-3 col-xl-3 col-md-3 col-sm-12">
              <VendorLinks />
            </div>
            <div className="container col-lg-9 col-xl-9 col-md-9 col-sm-12">
              {newProduct()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
