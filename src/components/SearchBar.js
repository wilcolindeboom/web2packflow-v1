import React from 'react';
import './SearchBar.css';


function SearchBar({filter}) {

    return (
        <form className="searchbar">
            <input
                type="text"
                name="search"
                placeholder="type een ordernummer"
            />

            <button type="submit">
                Zoek
            </button>
        </form>
    );
}

export default SearchBar;