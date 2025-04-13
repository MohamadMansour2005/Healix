import React from "react";

function FilteredResults({ data }) {
  return (
    <div>
      <h2>Filtered Results</h2>
      {data.length === 0 ? <p>No results found</p> : 
        data.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.specialty} | {item.location}</p>
          </div>
        ))
      }
    </div>
  );
}

export default FilteredResults;
