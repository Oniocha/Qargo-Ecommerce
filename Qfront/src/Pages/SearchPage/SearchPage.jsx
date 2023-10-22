import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getQueriedProducts } from "../../redux/product/filteredProducts/FilteredProducts";
import ProductCard from "../../components/ProductCard/ProductCard";

function SearchPage() {
  const searchResults = useSelector(getQueriedProducts)

  const searchMessage = () => {
    if (searchResults?.length > 0) {
      return <h2 className="mt-3 mb-5">Found {searchResults?.length} products</h2>;
    } else {
      return <h2 className="mt-3 mb-5">No products found</h2>;
    }
  };

  return (
    <div className="container">
      {searchMessage()}
      <div className="row">
        {searchResults?.length > 0
          ? searchResults?.map((result, i) => <ProductCard key={i} product={result} />)
          : null}
      </div>
    </div>
  );
}

export default SearchPage;
