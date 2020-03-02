import React from 'react';


export default function SearchBar({ searchHandler, enterSearch }) {
    return (
        <div className="searchbar">
            <div className="group">
                <input type="text" required onChange={searchHandler} onKeyPress={enterSearch} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Search Furniture</label>
            </div>
        </div>
    )
};