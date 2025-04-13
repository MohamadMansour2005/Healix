import React, { useState } from "react";

function FilterComponent({ onFilterChange }) {
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ specialty, location, name });
  };

  return (
    <div>
      <label>Specialty:</label>
      <input
        type="text"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
        placeholder="Enter specialty"
      />

      <label>Location:</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />

      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />

      <button onClick={handleFilterChange}>Apply Filters</button>
      <button onClick={() => { setSpecialty(""); setLocation(""); setName(""); handleFilterChange(); }}>
        Clear Filters
      </button>
    </div>
  );
}

export default FilterComponent;
