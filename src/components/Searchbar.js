import React, { useEffect, useState } from 'react';
import './styles/Searchbar.css';

const Searchbar = ({ searchFilter, setSearchFilter }) => {
  const searchParams = ['name', 'color', 'gender', 'type'];
  const [filterProducts, setFilterProducts] = useState([]);
  const [productList, setProductList] = useState([]);

  const handleSearch = () => {
    const search = searchFilter.toLowerCase();
    if (search.length) {
      const filteredProducts = productList.filter((product) =>
        searchParams.some((category) =>
          product[category].toLowerCase().includes(search)
        )
      );
      setFilterProducts(filteredProducts);
    } else {
      setFilterProducts(productList);
    }
  };

  useEffect(() => {
    setFilterProducts([...productList]);
  }, [productList]);

  return (
    <div className='search-container'>
      <div className='search-input-container'>
        <input
          className='search-input'
          placeholder='Type to Search'
          type='text'
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button className='search-button' onClick={handleSearch}>
          <img src='assets/bx-search.svg' alt='search-btn' />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
