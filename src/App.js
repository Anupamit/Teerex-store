// import Header from './components/Header';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Product from './components/Product';
import Cartpage from './components/Cartpage';

function App() {
  const [cartItems, setCartitems] = useState([]);
  
  const handleAdd = (product) => {
  const productExist = cartItems.find((item) => item.id === product.id);
  if (productExist && productExist.productinCart < product.quantity) {
    setCartitems(
      cartItems.map((item) =>
        item.id === product.id
          ? { ...productExist, productinCart: productExist.productinCart + 1 }
          : item
    )
    );
  } else {
    alert("Sorry, product is out of stock!");
  }
};
  
const handleDecrease = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);
    if (productExist.productinCart === 1) {
      setCartitems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartitems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...productExist, productinCart: productExist.productinCart - 1 }
            : item
        )
      );
    }
  }; 
  
  const handleDelete = (product) => {
    setCartitems(cartItems.filter((item) => item.id !== product.id));
  };

  const totalQuantity = (cartItems) => {
    if (!cartItems.length) return 0;
    const totalItem = cartItems
      .map((item) => item.productinCart)
      .reduce((totalItem, n) => totalItem + n);
    return totalItem;
  };

  const handleAddtocart = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);
    if(product.quantity!==0){
        if (productExist) {
          alert("Product is alredy in the cart, please check the shopping cart!");
        } else {
          setCartitems([...cartItems, { ...product, productinCart: 1 }]);
        }
      }
      else{
        alert("Sorry, product is out of stock!");
      }
  };
  // const handleAddtocart = (selectedProduct) => {
  //   const productExist = cartItems.find(item => item.id === selectedProduct.id);

  //   if (productExist) {
  //     const updatedCartItems = cartItems.map(item => {
  //       if (item.id === selectedProduct.id) {
  //         return {
  //           ...item,
  //           productinCart: item.productinCart + 1
  //         };
  //       }
  //       return item;
  //     });

  //     setCartitems(updatedCartItems);
  //   } else {
  //     const updatedCartItems = [...cartItems, selectedProduct];

  //     setCartitems(updatedCartItems);
  //   }
  // };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product
            cartItems={cartItems}
            handleAddtocart={handleAddtocart}
            totalQuantity={totalQuantity}
        />} />
        <Route path="/cart" element={<Cartpage
            cartItems={cartItems}
            handleAdd={handleAdd}
            handleDecrease={handleDecrease}
            handleDelete={handleDelete}
            totalQuantity={totalQuantity}
        />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
