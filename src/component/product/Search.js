import React, { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

import "./Search.css";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate(); // Use useNavigate hook to get navigation function
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        
        if (keyword) {
            navigate(`/products/${keyword}`); // Use the navigate function
        } else {
            navigate("/products");
        }
    };

    return (
        <Fragment>
            <form className='searchBox' onSubmit={searchSubmitHandler}>
                <input type='text' placeholder='Search your products ...' onChange={(e) => setKeyword(e.target.value)} />
                <input type='submit' value="Search" />
            </form>
        </Fragment>
    );
};

export default Search;
