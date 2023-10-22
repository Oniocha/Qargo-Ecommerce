import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllDepartments } from "../../redux/departments/actions";
import { listProducts } from "../../redux/product/filteredProducts/actions";
import { useDispatch, useSelector } from 'react-redux';

import "./search-styles.scss";

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { fetchedDepartments, departmentsApiError } = useSelector(state => state.loadDepartments);
  const departments = fetchedDepartments || [];
  const [query, setQuery] = useState({
    department: "",
    results: [],
    search: "",
    error: departmentsApiError || ""
  });

  const { department, search } = query;

  useEffect(() => {
    dispatch(getAllDepartments())
    dispatch(listProducts())
  }, [dispatch]);

  const searchProduct = () => {
    if (search) {
      const params = {
        ...(search ? { search } : {}),
        ...(department ? { department } : {}),
      }
      dispatch(listProducts(params)).finally(() => {
        const queryString = new URLSearchParams(params).toString();
        return history.push(`/products/search?${queryString}`)
      })
    }
  };

  const handleChange = (name) => (e) => {
    setQuery({ ...query, [name]: e.target.value, searched: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchProduct();
  };

  return (
    <div style={{ width: "100%" }}>
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
