import React, { useState, useEffect } from "react";
import Checkbox from "../../components/Checkbox";
import Radio from "../../components/Radio";
import { prices } from "../../helpers/fixedPrices";
import { getFilteredProducts } from "../../API_CALLS/userApis";
import SearchResult from "./SearchResult";
import {useDispatch, useSelector} from 'react-redux';
import "./styles.scss";
import { getAllCategories } from "../../redux/product/loadByCategories/actions";

const Shop = () => {
  const allCategories = useSelector(state => state.loadCategories)
  const dispatch = useDispatch();
  const categories = allCategories?.data || [];
  // All the states needed for this component
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [filteredResults, setFilteredResults] = useState([]);

  // Function to send search filters to backend
  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data?.error) {
        setError(data?.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  // 'Load more' button function
  const loadMore = () => {
    const toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data?.error) {
        setError(data?.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
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
    loadFilteredResults(limit, skip, myFilters.filters);

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
