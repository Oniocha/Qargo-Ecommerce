import React, { useState, useEffect } from "react";
import Checkbox from "../../components/Checkbox";
import Radio from "../../components/Radio";
import { prices } from "../../helpers/fixedPrices";
import SearchResult from "./SearchResult";
import {useDispatch, useSelector} from 'react-redux';
import "./styles.scss";
import { getAllCategories } from "../../redux/product/loadProducts/actions";
import { getFilteredProducts, updateFilteredProducts } from "../../redux/product/filteredProducts/actions";

const Shop = () => {
  const { fetchedCategories } = useSelector(state => state.loadProducts);
  const { fetchedFilteredProducts, fetchedSize, departmentsApiError} = useSelector(state => state.loadFilteredProducts);
  const dispatch = useDispatch();
  const categories = fetchedCategories || [];
  const filteredResults = fetchedFilteredProducts?.data || [];
  const size = fetchedSize || 0
  const error = departmentsApiError || false;
  // All the states needed for this component
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  
  // Function to send search filters to backend
  const loadFilteredResults = (newFilters) => {
    dispatch(getFilteredProducts({skip: skip, limit: limit, filters: newFilters}))
  };

  // 'Load more' button function
  const loadMore = () => {
    const toSkip = skip + limit;
    const filter = myFilters.filters
    // This function might need more testing
    dispatch(updateFilteredProducts({skip: toSkip, limit: limit, filters: filter}))
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="progress-bar-animated">
          Load More
        </button>
      )
    );
  };

  // UseEffect to load when component mounts. Fetches all categories and fetches all products
  useEffect(() => {
    dispatch(getAllCategories())
    loadMore()
    // eslint-disable-next-line
  }, [dispatch]);

  // Method for collecting values to use as filters from each checkbox user checks
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  // Method for handling array for price radio buttons
  const handlePrice = (value) => {
    let data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <div className="shop-wrapper container">
      <div className="row">
        <div className="col-3">
          <h3 className="mt-5">Filter by Category</h3>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h3 className="mt-3">Filter by Price</h3>
          <ul>
            <Radio
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </ul>
        </div>
        <div className="col-1">
          <div className="vertical-line"></div>
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults?.map((p, i) => (
              <SearchResult product={p} key={i} />
            ))}
          </div>
          {loadMoreButton()}
        </div>
      </div>
    </div>
  );
};

export default Shop;
