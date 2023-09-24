import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { listProducts } from "../../API_CALLS/userApis";
import { getAllDepartments } from "../../redux/departments/actions";
import { useDispatch, useSelector } from 'react-redux';

import "./search-styles.scss";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { fetchedDepartments, departmentsApiError } = useSelector(state => state.loadDepartments);
  const departments = fetchedDepartments || [];
  const [query, setQuery] = useState({
    department: "",
    results: [],
    search: "",
    error: departmentsApiError || ""
  });

  const [redirect, setRedirect] = useState(false);

  const { results, department, search } = query;

  useEffect(() => {
    dispatch(getAllDepartments())
  }, [dispatch]);

  const searchProduct = () => {
    if (search) {
      listProducts({
        search: search || undefined,
        department: department || undefined,
      }).then((data) => {
        if (data?.error) {
          console.log(data?.error);
        } else {
          setQuery({ ...query, results: data });
        }
      });
    }
  };

  const handleChange = (name) => (e) => {
    setQuery({ ...query, [name]: e.target.value, searched: false });
    setRedirect(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchProduct();
    if (search) setRedirect(true);
  };

  const redirectUser = () => {
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: "/products/search",
            search: `f?f76%cuf-8ffdu=${department}?${search}&bbn=667846011&rh=n%3A667846011%2Cp_36%3A1253507011&dc&field-shipping_option-bin=3242350011&pf_rd_i=1622500${department}9011&pf_rd_i=230659011&pf_rd_m=ATVPDKIKX0DER&pf_rd_m=ATVPDKIKX0DER&pf_rd_p=85a9188d-dbd5-424e-9512-339a1227d37c&pf_r${department}c2-b79bf2e3ba39&pf_rd_r=70GESADTH9Z54BS7YXE9&pf_rd_r=KC8BD9F1MYF88PD92SR6&pf_rd_s=merchan${department}`,
            state: { searchResults: results },
          }}
        />
      );
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {redirectUser()}
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-lg" id="searchbar">
          <div className="input-group-preppend">
            <select
              className="search-category d-none d-sm-none d-md-block"
              onChange={handleChange("department")}
            >
              <option value="All">All Departments</option>
              {departments?.map((d, i) => (
                <option key={i} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control search-field"
            onChange={handleChange("search")}
          />
          <div className="input-group-append">
            <button
              className="btn btn-action search-btn"
              onClick={handleSubmit}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-search"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                />
                <path
                  fillRule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                />
              </svg>
            </button>{" "}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
