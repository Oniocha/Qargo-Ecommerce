import React, { useState } from "react";

function Radio({ prices, handleFilters }) {
  const [values, setValues] = useState(0);

  const handleChange = (e) => {
    handleFilters(e.target.value);
    setValues(e.target.value);
  };

  return prices.map((p, i) => (
    <div key={i}>
      <input
        className="form-check-input"
        onChange={handleChange}
        name={p}
        value={p._id}
        type="radio"
      />
      <label className="form-check-label">{p.name}</label>
    </div>
  ));
}

export default Radio;
