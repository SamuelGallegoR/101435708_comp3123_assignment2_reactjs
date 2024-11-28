import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder="Search by name, department, or ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}

export default SearchBar;
