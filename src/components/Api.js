import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Homepage.css";
import { config } from "../App";
import Header from "./Header";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

function Homepage({ cartItems, handleAddToCart, totalQuantity }) {
  const url = `${config.endpoint}`;
  const [productList, setProductList] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const searchParams = ["name", "color", "gender", "type"];
  const [isOpen, setIsOpen] = useState(false);

  const performAPICall = async (url) => {
    try {
      const response = await axios.get(url);
      setProductList(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (filterProducts, searchParams, searchFilter) => {
    const search = searchFilter.toLowerCase();
    if (search.length) {
      const filteredProducts = filterProducts.filter((product) =>
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
    performAPICall(url);
  }, []);

  useEffect(() => {
    setFilterProducts([...productList]);
  }, [productList]);

  return (
    <div className="container">
      <Header cartItems={cartItems} totalQuantity={totalQuantity} />

      <div className="searchbar">
        <input
          className="input"
          type="text"
          placeholder="Search for products..."
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <div className="space-gap"></div>
        <button
          className="searchbutton"
          onClick={() =>
            handleSearch(filterProducts, searchParams, searchFilter)
          }
        >
          <i
            className="fa fa-search"
            style={{ fontSize: "20px", color: "white" }}
          ></i>
        </button>
        <div className="space-gap"></div>
        <div className="filterToggle">
          <button className="filterbutton" onClick={toggleSidebar}>
            <i
              className="fa fa-filter"
              style={{ fontSize: "20px", color: "white", margin: "0.5rem" }}
            ></i>
          </button>
          <Filter
            productList={productList}
            searchFilter={searchFilter}
            setProductList={setProductList}
            setFilterProducts={setFilterProducts}
            filterProducts={filterProducts}
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
      </div>

      <div className="dashboard">
        <Filter
          productList={productList}
          searchFilter={searchFilter}
          setFilterProducts={setFilterProducts}
          filterProducts={filterProducts}
        />
        <ProductCard
          filterProducts={filterProducts}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}

export default Homepage;
