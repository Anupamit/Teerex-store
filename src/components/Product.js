import React, { useEffect, useState } from 'react';
import Card from './Card';
import Header from './Header';
import Filterpage from './Filterpage';
import './styles/Searchbar.css';
import './styles/Product.css';

const Product = ({ handleAddtocart, cartItems, totalQuantity }) => {
  const searchParams = ['name', 'color', 'gender', 'type'];
  const [isOpen, setIsOpen] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [productList, setProductList] = useState([]);

  const fetchData = async () => {
    const url = "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";
    const response = await fetch(url);
    const responseData = await response.json();
    setProductList(responseData);
    console.log(responseData,"data");
    setFilterProducts(responseData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = () => {
    const search = searchFilter.toLowerCase();
    if (search.length) {
      const filteredProducts = filterProducts.filter(product =>
        searchParams.some(category =>
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
    <div className='container'>
      <Header cartItems={cartItems} totalQuantity={totalQuantity} />
      <div className='searchbar'>
        <input className='input' placeholder='Type to Search' type='text' value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
        <button className="searchbutton" onClick={handleSearch}>
          <img src='assets/bx-search.svg' alt='search-btn' />
        </button>
        <div className="space-gap"></div>
        <div className="filterToggle">
          <button className="filterbutton" onClick={toggleSidebar}>
            <img src='assets/bx-filter-alt.svg' alt='filter-btn' />
          </button>
          <Filterpage
            productList={productList}
            searchFilter={searchFilter}
            setFilterproducts={setFilterProducts}
            filterProducts={filterProducts}
            isOpen={isOpen}
            toggle
            ToggleSidebar={toggleSidebar}
          />
        </div>
      </div>
      <div className="dashboard">
        <Filterpage
          productList={productList}
          searchFilter={searchFilter}
          setFilterproducts={setFilterProducts}
          filterProducts={filterProducts}
        />
        <Card filterProducts={filterProducts} setFilterProducts={setFilterProducts} handleAddtocart={handleAddtocart} />
      </div>
    </div>
  );
};

export default Product;
