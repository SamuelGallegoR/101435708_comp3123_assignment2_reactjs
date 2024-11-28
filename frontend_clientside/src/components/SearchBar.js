import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value); // Trigger the search on every input change
    };

    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder="Search employees"
                value={query}
                onChange={handleInputChange}
            />
            <button
                className="btn btn-secondary"
                onClick={() => onSearch(query)}
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;
