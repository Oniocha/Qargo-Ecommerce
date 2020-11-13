import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";

function SearchPage({ location }) {
  const results = location.state;
  // console.log("search page", results.searchResults.data);
  const [search, setSearch] = useState([]);

  const searchMessage = () => {
    if (search.length > 0) {
      return <h2 className="mt-3 mb-5">Found {search.length} products</h2>;
    } else {
      return <h2 className="mt-3 mb-5">No products found</h2>;
    }
  };

  useEffect(() => {
    setSearch(results.searchResults.data);
  }, [results.searchResults]);

  return (
    <div className="container">
      {searchMessage()}
      <div className="row">
        {search.length > 0
          ? search.map((r, i) => <ProductCard key={i} product={r} />)
          : null}
      </div>
    </div>
  );
}

export default SearchPage;
